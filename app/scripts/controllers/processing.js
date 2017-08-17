'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:ProcessingCtrl
 * @description
 * # ProcessingCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('ProcessingCtrl', [
  '$scope',
  '$rootScope',
  '$q',
  'Segment',
  'formatTimestampFilter',
  'global',
  'User',
  '$timeout',
  '$location',
  function (
    $scope,
    $rootScope,
    $q,
    Segment,
    formatTimestampFilter,
    global,
    User,
    $timeout,
    $location
  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      segmentsPool: [],
      segmentsVisible: [],
      picturesVisible: [],
      itemsPerPage: 18,

      verticalScrollConfig: {
        axis: 'y',
        theme: 'light',
        scrollButtons: {
          enable: false
        },
        mouseWheel:{ preventDefault: true },
        advanced: {
          updateOnContentResize: true
        },
        callbacks: {
          onInit: function() {
            $scope.mcs=this.mcs;
          },

          onTotalScroll: function(){
            return $scope.onTotalScroll.apply(this,Array.prototype.slice.call(arguments));
          },
          onTotalScrollOffset: 60,
          alwaysTriggerOffsets: false,

        }

      }, // verticalScrollConfig

      initEventHandlers: function(){
        $scope.$on('$locationChangeSuccess',function($event,newUrl,oldUrl,newState,oldState){
          console.log(arguments);
        });
      },

      init: function() {
        $scope.initEventHandlers();

        // load unprocessed segments list
        $scope.loading=true;
        $scope.loadingProgress=0;
        $scope.loadSegments()
          .then(function(segments){
            $scope.segments=segments;
            // load and format segments data (must all be done at once for sortiing)
            segments.reduce(function(promise, segment){
              return $scope.getSegmentData(segment).then(function(){
                ++$scope.loadingProgress;
                $scope.progressStyle={
                  width: ($scope.loadingProgress / segments.length * 100) + '%'
                };
              });
            }, $q.resolve())
            .then(function(){
              Array.prototype.splice.apply($scope.segmentsPool,[0,$scope.segmentsPool.length].concat(segments));
              $scope.loading=false;
            });
          });

      },

      loadSegments: function(){
        return Segment.find({
          filter: {
            where: {
              pointCloudId: {exists: false}
            },
            limit: 21,
            fields: {
              id: true,
              previewId: true,
              timestamp: true,
              userId: true,
              status: true,
              pointCloudId: true,
              created: true
            }
          }
        }).$promise;
      },

      getSegmentData: function(segment) {
        segment.timestamp_str=formatTimestampFilter(segment.timestamp,'ymdhm');
        var q=$q.defer();
        var todo=2;
        function decr(){
           --todo;
           if (!todo) q.resolve();
        }
        $scope.getPicturesCount(segment).finally(decr);
        $scope.getUserInfo(segment).finally(decr);
        return q.promise;
      },

      getPicturesCount: function(segment){
        return Segment.pictures.count(segment,function(result){
          segment.picturesCount=result.count;
        }).$promise;
      },

      getUserInfo: function(segment){
        var userId=segment.userId;
        if (!userId) {
          console.log('no userId',segment);
          return $q.reject();
        }
        if (global.usersCache[userId]) {
          segment.user=global.usersCache[userId];
          return $q.resolve();
        }
        return User.findById({id: userId},function(user){
          global.usersCache[userId]==user;
          segment.user=user;
          if (user.username.length==32 && user.username.match(/^[a-z0-9]+$/)) {
            segment._username='||'+user.username;
          } else {
            segment._username=user.username;
          }
        }, function(err){
          console.log(err);
        }).$promise;
      },

      viewSegment: function(segment){
        if (!segment.pictures) {
          segment.pictures_promise=Segment.pictures({
            id: segment.id,
            fields: {
              id: true
            }
          }, function(pictures){
            segment.pictures=pictures;
            $scope.picturesPool=pictures;
            $scope.picturesVisible=pictures.slice(0,18);

          }, function(err){
            console.log(err);

          }).$promise;
        }

        $rootScope.params.s=segment.id;
        $location.search($rootScope.params);
        $scope.segment=segment;

      },

      onTotalScroll: function() {
        console.log(arguments);
        $scope.getPictures();
      },

      getPictures: function(tableState){
        if (!$scope.segment) return;
        $scope.segment.pictures_promise.then(function(){
          $timeout(function(){
            $scope.picturesVisible=$scope.picturesVisible.concat($scope.picturesPool.slice($scope.picturesVisible.length, $scope.picturesVisible.length+18));
          });
        });
      }



    });

    $scope.init();
  }

]);

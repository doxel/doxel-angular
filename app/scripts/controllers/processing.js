'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:ProcessingCtrl
 * @description
 * # ProcessingCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.directive('lrInfiniteScroll', ['$timeout', function ($timeout) {
        return{
            link: function (scope, element, attr) {
                var
                    lengthThreshold = attr.scrollThreshold || 250,
                    timeThreshold = attr.timeThreshold || 0,
                    handler = scope.$eval(attr.lrInfiniteScroll),
                    promise = null,
                    lastRemaining = 9999;

                lengthThreshold = parseInt(lengthThreshold, 10);
                timeThreshold = parseInt(timeThreshold, 10);

                if (!handler || !angular.isFunction(handler)) {
                    handler = angular.noop;
                }

                element.bind('scroll', function () {
                    lengthThreshold = parseInt(attr.scrollThreshold) || element[0].clientHeight/3;

                    var
                        remaining = element[0].scrollHeight - (element[0].clientHeight + element[0].scrollTop);
                        console.log(remaining);

                    //if we have reached the threshold and we scroll down
                    if (remaining < lengthThreshold && (remaining - lastRemaining) < 0) {

                        //if there is already a timer running which has no expired yet we have to cancel it and restart the timer
                        if (promise !== null) {
                          return;
                        }
                          promise = handler();
                          console.log(promise);
                          promise.then(function(){
                              promise = null;
                          });
                    }
                    lastRemaining = remaining;
                });
            }

        };
    }])
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
/*
      verticalScrollConfig: {
        theme: 'light',
        scrollButtons: {
          enable: false
        },
        mouseWheel:{ preventDefault: false },
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
          onTotalScrollOffset: 120,
          alwaysTriggerOffsets: false,

        }

      }, // verticalScrollConfig
*/
      initEventHandlers: function(){
        $scope.$on('$locationChangeSuccess',function($event,newUrl,oldUrl,newState,oldState){
          console.log(arguments);
        });

        $scope.$on('picture.click', function($event,picture){
    //      $scope.picture=picture;
        });

      },

      init: function() {
        $scope.initEventHandlers();

        // load unprocessed segments list
        $scope.loading=true;
        $scope.loadingProgress=0;
        $scope.loadSegments()
          .then(function(segments){
            segments=loopbackFilters(segments,{
              order: 'created DESC'
            });
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
              status: {ne: 'published'}
            },
            limit: 10,
            fields: {
              id: true,
              previewId: true,
              timestamp: true,
              userId: true,
              status: true,
              status_timestamp: true,
              pointCloudId: true,
              created: true
            }
          }
        }).$promise;
      },

      // get segment data to be displayed
      getSegmentData: function(segment) {
        // format timestamp
        segment.timestamp_str=formatTimestampFilter(segment.timestamp,'ymdhm');

        // set status
        switch (segment.status) {
          case undefined:
            segment.status="new";
            break;
        }

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
        // use cached user info when available
        if (global.usersCache[userId]) {
          segment.user=global.usersCache[userId];
          return $q.resolve();
        }
        return User.findById({id: userId},function(user){
          // store user info in cache
          global.usersCache[userId]==user;
          segment.user=user;

          // prepend char to anonymous username (id) for sorting
          if (user.username.length==32 && user.username.match(/^[a-z0-9]+$/)) {
            segment._username='||'+user.username;
          } else {
            segment._username=user.username;
          }

        }, function(err){
          console.log(err);
        }).$promise;
      },

      // display segment pictures
      viewSegment: function(segment){
        if (!segment.pictures) {

          // load picture ids
          segment.pictures_promise=Segment.pictures({
            id: segment.id,
            fields: {
              id: true
            }

          }, function(pictures){

            segment.pictures=pictures;

            // initialize picture ids pool
            $scope.picturesPool=pictures;

            // initialize visible pictures
            $scope.picturesVisible=pictures.slice(0,$scope.itemsPerPage);

            // set picture label
            pictures.some(function(picture){
              picture.label=picture.timestamp;
            });

            $scope.fillScrollableContainer();

          }, function(err){
            console.log(err);

          }).$promise;
        }

        $rootScope.params.s=segment.id;
        $location.search($rootScope.params);
        $scope.segment=segment;

      },

      viewCloud: function(segment) {
        $rootScope.params.s=segment.id;;
        delete $rootScope.params.pose;
        $location.search($rootScope.params);
        $scope.$state.transitionTo('gallery.view.cloud');
      },

      fillScrollableContainer: function() {
        function loop() {
          if ($scope.picturesVisible.length<$scope.picturesPool.length && !$scope.isScrollbarVisible()){
            $scope.getPictures();
          }
          $timeout(loop,2000);
        }
        loop();
      },

      isScrollbarVisible: function(){
        return $('.thumbs').height>$('.pictures').height();

      //  return ($('#processing .pictures .mCSB_scrollTools_vertical:visible').length != 0);
      },

/*
      onTotalScroll: function() {
        $scope.getPictures();
      },
*/

      // Add pictures to visible pictures
      getPictures: function(tableState){
        if (!$scope.segment) return $q.resolve();
        var q=$q.defer();
        $scope.segment.pictures_promise.then(function(){
          $scope.picturesVisible=$scope.picturesVisible.concat($scope.picturesPool.slice($scope.picturesVisible.length, $scope.picturesVisible.length+$scope.itemsPerPage/2));
          $timeout(q.resolve());
        });
        return q.promise;
      },

      proceed: function(segment, direction){
        return Segment.proceed({
          id: segment.id,
          status: segment.status||'new',
          status_timestamp: segment.status_timestamp||Date.now(),
          direction: direction

        }).$promise.then(function(res){
          segment.status=(res.status&&res.status.length)?res.status:'new';
          segment.status_timestamp=(res.status_timestamp!==undefined)?res.status_timestamp:segment.status_timestamp;
        })
        .catch(function(err){
          console.log(err);
          $scope.error=err;
        });
      },

      proceedFurther: function(segment){
        $scope.lock();
        $scope.proceed(segment,'forward').finally($scope.unlock);
      },

      cancel: function(segment){
        $scope.lock();
        $scope.proceed(segment,'backward').finally($scope.unlock);
      },

      // lock gui, ie display overlay
      lock: function(){
        $scope.locked=true;
      },

      unlock: function(){
        $scope.locked=false;
      },

      isCheckButtonDisabled: function(segment){
        return [
          'processing',
          'queued',
          'published'

        ].indexOf(segment.status)>=0;
      },

      checkButtonTitle: function(segment){
        switch(segment.status) {
          default:
            return '';

          case 'new':
            return 'Queue for processing';

          case 'processed':
            return 'Publish segment';

          case 'cancel_pending':
            return 'Resume processing';

          case 'discarded':
            if (segment.pointCloudId) {
              return 'Publish segment';

            } else {
              return 'Approve segment';
            }
            break;
        }
      },

      isCancelButtonDisabled: function(segment){
        return [
          'discarded',
          'cancel_pending'

        ].indexOf(segment.status)>=0;
      },

      cancelButtonTitle: function(segment){
        switch(segment.status) {
          case 'discarded':
          default:
            return '';

          case 'new':
          case 'processed':
          case 'published':
            return 'Discard this segment';

          case 'queued':
            return 'Remove from queue';

          case 'pending':
            return 'Back in queue';

          case 'processing':
            return 'Cancel processing';

          case 'cancel_pending':
              return 'Resume processing'
        }
      }
    });

    $scope.init();
  }

]);

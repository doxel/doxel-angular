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
  '$state',
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
    $state,
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
      $state: $state,
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

      },

      init: function() {
        $scope.initEventHandlers();

        // load unprocessed segments list
        $scope.loading=true;
        $scope.loadingProgress=0;
        $scope.segmentsPromise=$scope.loadSegments()
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
            return segments;
          });
      },

      loadSegments: function(){
        return Segment.find({
          filter: {
            where: {
              status: {ne: 'published'}
            },
        //    limit: 10,
            fields: {
              id: true,
              previewId: true,
              timestamp: true,
              userId: true,
              status: true,
              status_timestamp: true,
              pointCloudId: true,
              created: true
            },
            include: {
              relation: 'jobs',
              scope: {
                fields: ['id'],
              }
            }
          },
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

      viewHistory: function(segment){
        $state.transitionTo('processing.joblogs',{
          segmentId: segment.id
        });
      },

      // display segment pictures
      viewSegment: function(segment){
        $scope.segment=segment;
        $state.transitionTo('processing.pictures',{segmentId: segment.id});

      },

      viewCloud: function(segment) {
        $state.transitionTo('gallery.view.cloud',{
          pose: 0,
          segmentId: segment.id
        });
      },


      proceed: function(segment, operation){
        return Segment.proceed({
          id: segment.id,
          status: segment.status||'new',
          status_timestamp: segment.status_timestamp||Date.now(),
          operation: operation

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
          'processed',
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
            return 'Waiting for pointcloud injection';

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
          'discarded'

        ].indexOf(segment.status)>=0;
      },

      cancelButtonTitle: function(segment){
        switch(segment.status) {
          case 'discarded':
          default:
            return '';

          case 'new':
          case 'processed':
          case 'publishable':
          case 'published':
            return 'Discard this segment';

          case 'queued':
            return 'Remove from queue';

          case 'pending':
            return 'Back in queue';

          case 'processing':
            return 'Back in queue';

        }
      },

      restoreScroll: function(){
        $timeout(function(){
          $('#processing').scrollTop(localStorage.processing_scrollTop);
        });
      },

      saveScrollTop: function(e){
        localStorage.processing_scrollTop=$(e.target).scrollTop();
        console.log(localStorage.processing_scrollTop);
      }

    });

    $scope.init();
  }

])
// source: http://plnkr.co/edit/q6w0sOR8eKGc83fUnhFZ?p=preview
.directive('stPersist', function () {
        return {
            require: '^stTable',
            link: function (scope, element, attr, ctrl) {
                var nameSpace = attr.stPersist;

                //save the table state every time it changes
                scope.$watch(function () {
                    return ctrl.tableState();
                }, function (newValue, oldValue) {
                  if (newValue.pagination.start2) {
                    if (newValue.pagination.start2 < newValue.pagination.totalItemCount) {
                      // consume start2
                      newValue.pagination.start = newValue.pagination.start2;
                      newValue.pagination.start2 = undefined;
                      ctrl.pipe();
                      scope.restoreScroll();
                    }
                  }
                  if (newValue !== oldValue) {
                      localStorage.setItem(nameSpace, JSON.stringify(newValue));
                  }
                }, true);

                //fetch the table state when the directive is loaded
                if (localStorage.getItem(nameSpace)) {
                    var savedState = JSON.parse(localStorage.getItem(nameSpace));
                    var tableState = ctrl.tableState();

                    angular.extend(tableState, savedState);
                    tableState.pagination.start2 = tableState.pagination.start;
                    ctrl.pipe();
                    scope.restoreScroll();

                }

            }
        };
    })
    .directive("scroll", function ($window) {
   return {
      scope: {
         scrollEvent: '&'
      },
      link : function(scope, element, attrs) {
        $(element).scroll(function(e) { scope.scrollEvent ?  scope.scrollEvent()(e) : null })
      }
   }
})

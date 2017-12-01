'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentPicturesCtrl
 * @description
 * # SegmentPicturesCtrl
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

.controller('SegmentPicturesCtrl', [
  '$scope',
  '$rootScope',
  '$q',
  'Segment',
  'formatTimestampFilter',
  '$timeout',
  '$location',
  '$stateParams',
  function (
    $scope,
    $rootScope,
    $q,
    Segment,
    formatTimestampFilter,
    $timeout,
    $location,
    $stateParams

  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
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
        console.log($stateParams)
        $scope.initEventHandlers();
        var q;
        var segmentId=$stateParams.segmentId;
        if (!$scope.segment){
          if (!$scope.segmentsPromise) {
            $scope.segmentsPromise=Segment.findById({id: segmentId}).$promise
            .then(function(segment){
              return [segment];
            });
          }
          q=$scope.segmentsPromise.then(function(segments){
            var segment;
            segments.some(function(s){
              if (s.id=segmentId){
                segment=s;
                return true;
              }
            });
            if (segment) {
              return segment;
            } else {
              return q.reject(new Error('no such segment: '+segmentId));
            }
          });

        } else {
          q=$q.resolve($scope.segment);
        }

        q.then(function(segment){
          $scope.viewSegment(segment);
        }).catch(console.log);
      },

      // display segment pictures
      viewSegment: function(segment){
        if (!segment.pictures) {

          // load picture ids
          segment.pictures_promise=Segment.pictures({
            id: segment.id,
            fields: {
              id: true,
              timestamp: true
            },
            order: "timestamp ASC"

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

        $scope.segment=segment;

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
          q.resolve();
        });
        return q.promise;
      },

    });

    $scope.init();
  }

]);

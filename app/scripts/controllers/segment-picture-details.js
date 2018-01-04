'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentPictureDetailsCtrl
 * @description
 * # SegmentPictureDetailsCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('SegmentPictureDetailsCtrl', [
  '$scope',
  '$rootScope',
  '$q',
  '$timeout',
  '$state',
  '$stateParams',
  function (
    $scope,
    $rootScope,
    $q,
    $timeout,
    $state,
    $stateParams

  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      initEventHandlers: function(){
        $scope.$on('$locationChangeSuccess',function($event,newUrl,oldUrl,newState,oldState){
          console.log(arguments);
        });

      },

      click: function($event){
        // display next or previous picture ?
        var width=$($event.target).closest('.picture').width();
        var incr=$event.pageX-width/2;
        incr=incr/Math.abs(incr);

        // show picture
        if ($scope.picturesPool[$scope.pictureIndex+incr]) {
          $state.transitionTo('segment-pictures.details',{
            segmentId: $scope.segment.id,
            timestamp: $scope.picturesPool[$scope.pictureIndex+incr].timestamp
          });
        }
      }, // click

      init: function() {
        console.log($stateParams)
        if (!$scope.picture || ($scope.picture && $scope.picture.timestamp!=$stateParams.timestamp)) {

          $scope.segmentsPromise.then(function(/*segment*/){
            // value returned by promise will never contain picture_promise !
            // use parent's $scope.segment instead
            (function loop(){
              if (!$scope.segment || !$scope.segment.pictures_promise) {
                console.log('loop');
                $timeout(loop,150);
                return;
              }
              $scope.segment.pictures_promise.then(function(){
                $scope.pictureIndex=$scope.segment.pictures.findIndex(function(picture){
                  return picture.timestamp==$stateParams.timestamp;
                });
                if ($scope.pictureIndex>=0) {
                  $scope.firstPicture=($scope.pictureIndex<=0)
                  $scope.lastPicture=($scope.segment.pictures.length-$scope.pictureIndex==1);
                  $scope.$parent.picture=$scope.segment.pictures[$scope.pictureIndex];
                } else {
                  $scope.lastPicture=true;
                  $scope.firstPicture=true
                }
              });
            })();

          });

        } else {
          $scope.pictureIndex=$scope.picturesPool.findIndex(function(picture){
            return picture.timestamp==$stateParams.timestamp;
          });
          $scope.firstPicture=($scope.pictureIndex<=0)
          if ($scope.pictureIndex<0) {
            throw(new Error('picture not found !'));
          }
          $scope.lastPicture=($scope.segment.pictures.length-$scope.pictureIndex==1);
        }
        $scope.initEventHandlers();

      } // init

    });

    $scope.init();
  }

]);

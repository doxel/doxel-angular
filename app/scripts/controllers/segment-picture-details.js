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
  function (
    $scope,
    $rootScope,
    $q,
    $timeout

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
                $scope.$parent.picture=$scope.segment.pictures.find(function(picture){
                  return picture.timestamp==$stateParams.timestamp;
                });
              });
            })();

          });
        }
        $scope.initEventHandlers();
      }

    });

    $scope.init();
  }

]);

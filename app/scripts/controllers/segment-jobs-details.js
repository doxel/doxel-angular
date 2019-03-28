'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentJobsDetailsCtrl
 * @description
 * # SegmentJobsDetailsCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('SegmentJobsDetailsCtrl', [
  '$scope',
  '$rootScope',
  '$q',
  '$timeout',
  '$state',
  '$stateParams',
  'Segment',
  function (
    $scope,
    $rootScope,
    $q,
    $timeout,
    $state,
    $stateParams,
    Segment

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
        $scope.visible=true;
        $scope.initEventHandlers();

      } // init

    });

    $scope.init();
  }

]);

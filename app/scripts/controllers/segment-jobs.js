'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentJobsCtrl
 * @description
 * # SegmentJobsCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('SegmentJobsCtrl', [
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

      click: function($event){
        $state.transitionTo('segment-job.details',{
          segmentId: $scope.segment.id,
          timestamp: $scope.picturesPool[$scope.pictureIndex+incr].timestamp
        });
      }, // click

      init: function() {
        console.log($stateParams)
        if (!$scope.segment || ($scope.segment && !$scope.segment.jobs)) {

          Segment.findById({
            id: $stateParams.segmentId,
            filter: {
              include: 'jobs'
            }
          }).$promise
          .then(function(segment){
            $scope.segment=segment;
            $scope.visible=true;
          });

        }
        $scope.initEventHandlers();

      } // init

    });

    $scope.init();
  }

]);

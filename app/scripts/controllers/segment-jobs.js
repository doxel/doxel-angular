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
      jobClick: function($event){
        $state.transitionTo('segment-job.details',{
          segmentId: $scope.segment.id,
          jobId: $($event.target).closest('tr').data('jobid')
        });
      }, // jobClick

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
      } // init

    });
    $scope.init();
  }

]);

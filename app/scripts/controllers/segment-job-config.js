'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentJobConfigCtrl
 * @description
 * # SegmentJobConfigCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('SegmentJobConfigCtrl', [
    '$scope',
    '$stateParams',
    'Segment',
    function(
      $scope,
      $stateParams,
      Segment
    ) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var self=this;

      angular.extend($scope, {
        showForm: true,
        segmentId: $stateParams.segmentId,
        init: function(){
          if (!$scope.segment) {
            Segment.findById({id: $scope.segmentId}).$promise.then(function(segment){
              $scope.segment=segment;
            })
            .catch(function(err){
              console.log(err);
            });
          }
        }
      });  // extend $scope

      $scope.init();

   }
 ]);

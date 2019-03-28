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
    function(
      $scope,
      $stateParams,
    ) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var self=this;

      angular.extend($scope, {
        showForm: true,
        segmentId: $stateParams.segmentId
      });  // extend $scope

      $scope.init();
   }
 ]);

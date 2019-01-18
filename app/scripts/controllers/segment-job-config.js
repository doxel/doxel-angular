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
    '$rootScope',
    'Segment',
    '$stateParams',
    '$q',
    function(
      $scope,
      $rootScope,
      Segment,
      $stateParams,
      $q
    ) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var self=this;
      self.config_promise=$q.defer();

      fetch('/job-config.json')
      .then(function(response) {
        return response.json()
      }).then(self.config_promise.resolve)
      .catch(function(ex) {
        self.config_promise.reject(ex);
        console.log('parsing failed', ex)
      })

      Segment.findById({
        id:$scope.$stateParams.segmentId,
        filter: {
          include: 'jobs'
        }
      },{
      }, function(segment){
        $scope.segment=segment;
        self.config_promise.promise.then(function(json){
          $scope.model=angular.merge({},json.defaults,segment.params.jobConfig||{});
          $scope.schema=json.schema;
          $scope.form=["*"];
          $scope.visible=true;
          $scope.$broadcast('schemaFormRedraw')

        });
      });

   }
 ]);

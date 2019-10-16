'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentJobConfigCtrl
 * @description
 * # SegmentJobConfigCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.directive('jobConfig', function () {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'views/job-config.html',
    scope: {
      segment: '=',
      segmentId: '<',
      jobId: '<',
      _save: '&save',
      _cancel: '&cancel',
      showForm: '=',
      showJSON: '='
    },
    controller: [
      '$scope',
      '$q',
      'errorMessage',
      'Job',
      function(
        $scope,
        $q,
        errorMessage,
        Job
      ) {

        this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];

        var self=this;

        angular.extend($scope, {
          init: function() {
            self.config_promise=$q.defer();

            fetch('/job-config.json')
            .then(function(response) {
              return response.json()
            }).then(self.config_promise.resolve)
            .catch(function(ex) {
              self.config_promise.reject(ex);
              console.log('parsing failed', ex);
              errorMessage('Unexpected error.');
            });

            if (!segment || !segment.jobs) {
              Segment.findById({
                id:$scope.$stateParams.segmentId,
                filter: {
                  include: 'jobs'
                }
              })
              .then(setSegment)
              .catch(function(err){
                console.log(err);
                errorMessage('Could not fetch segment '+segmentId+' details.');
              });
            } else {
              setSegment(segment);
            }

            function setSegment(segment){
              $scope.segment=segment;
              self.config_promise.promise.then(function(json){
                $scope.model=angular.merge({},json.defaults,segment.params.jobConfig||{});
                $scope.schema=json.schema;
                $scope.form=[
                  "*",
                  {
                    type: "actions",
                    items: [
                      { type: 'button', style: 'btn-success', title: 'Save', onClick: $scope.save },
                      { type: 'button', style: 'btn-info', title: 'Cancel', onClick: $scope.cancel }
                    ]
                  }
                ];
                $scope.visible=true;
                $scope.$broadcast('schemaFormRedraw')
              })
              .catch(function(err){
                console.log(err);
                errorMessage('An error occured.');
              });
            }
          },

          save: function() {
            $scope.segment.params.jobConfig=$scope.model;
            var promise=$scope.segment.$setJobConfig({jobConfig:$scope.model});
            promise.then(console.log).catch(function(err){
              window.alert("An error occured while trying to save the config");
              console.error(err);
            });
          },

          cancel: function() {
            if ($scope._cancel) $scope.cancel();
            else window.history.back();
          }

        });  // extend $scope

        $scope.init();
      }
    ]
  }
});

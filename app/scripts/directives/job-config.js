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
      segment: '&',
      job: '&',
      jobConfig: '&',
      jobId: '<',
      _save: '&save',
      _cancel: '&cancel',
      showForm: '='
    },
    link: function(scope, element, attrs) {
      scope.element=element;
    },
    controller: [
      '$scope',
      '$q',
      'errorMessage',
      'Job',
      '$timeout',
      function(
        $scope,
        $q,
        errorMessage,
        Job,
        $timeout
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
              errorMessage.show('Unexpected error.');
            });

            if (!$scope.segment && !$scope.jobConfig && !$scope.job) {
              Jobs.findById({
                id:$scope.jobId
              })
              .then(function(job){
                setJobConfig(job&&job.config);
              })
              .catch(function(err){
                console.log(err);
                errorMessage.show('Could not fetch job '+$scope.jobId+' details.');
              });
            } else {
              setJobConfig(($scope.segment&&$scope.segment.params&&$scope.params.jobConfig)||$scope.jobConfig||$scope.job.config||{});
            }

            function updateJson() {
              $scope.json=JSON.stringify(noNullProp($scope.model),false,4);
              $('textarea',$scope.element).val($scope.json);
            }

            $scope.$watch('showForm', function(newValue, oldValue) {
              if (newValue==oldValue) return;
              $scope.showForm=newValue;
              if ($scope.showForm) {
                $scope.json=$('textarea',$scope.element).val();
                try {
                  var jobConfig=JSON.parse($scope.json);
                  $timeout(function(){
                    setJobConfig(jobConfig);
                  });
                } catch(err){
                  $scope.showForm=0;
                  window.alert(err.message);
                }
              } else {
                $timeout(updateJson);
              }
            }, true);

            function setJobConfig(jobConfig){
              self.config_promise.promise.then(function(json){
                $scope.model=angular.merge({},json.defaults,jobConfig||{});
                if (!$scope.showForm) updateJson();

                $scope.schema=json.schema;
                $scope.form=[
                  { key: "openmvg" },
                  { key: "densification_method" },
                  { key: "cmvspmvs", condition: "model.densification_method=='pmvs'" },
                  { key: "smvs", condition: "model.densification_method=='smvs'" },
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
                errorMessage.show('An error occured.');
              });
            }
          },

          save: function() {
            if ($scope._save) {
              $scope._save($scope.model);
            } else {
              $scope.segment.params.jobConfig=$scope.model;
              var promise=$scope.segment.$setJobConfig({jobConfig:$scope.model});
              promise.then(console.log).catch(function(err){
                window.alert("An error occured while trying to save the config");
                console.error(err);
              });
            }
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

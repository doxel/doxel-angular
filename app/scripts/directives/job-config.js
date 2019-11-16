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
      segment: '=?',
      job: '=?',
      jobConfig: '=?',
      jobId: '<?',
      save: '&?',
      cancel: '&?',
      showForm: '=?'
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
          zeroValue: {},
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
              Job.findById($scope.jobId).$promise.then(function(job){
                setJobConfig(job&&job.config);
              })
              .catch(function(err){
                console.log(err);
                errorMessage.show('Could not fetch job '+$scope.jobId+' details.');
              });
            } else {
              setJobConfig(
                ($scope.segment && ($scope.segment.params&&$scope.segment.params.jobConfig || {}) )
                || $scope.jobConfig
                || $scope.job.config
                || {}
              );
            }

            function updateJson() {
              $scope.json=JSON.stringify(noNullProp($scope.model),false,4);
              $('textarea',$scope.element).val($scope.json);
            }

            function addWatcher() {
              var unwatch=$scope.$watch('model',function(newValue, oldValue){
                if (!angular.equals(oldValue, newValue)) {
                  if (oldValue) $scope.changed=true;
                  $('button.save').attr('disabled',!$scope.changed);
                  unwatch();
                  addWatcher();
                }
              }, true);
            }
            addWatcher();

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
                  { key: "cmvspmvs" },
                  { key: "smvs" },
                  {
                    type: "actions",
                    items: [
                      { type: 'button', style: 'btn-success save', title: 'Save', onClick: $scope._save },
                      { type: 'button', style: 'btn-info cancel', title: 'Cancel', onClick: $scope._cancel }
                    ]
                  }
                ];
                $scope.visible=true;
                $scope.$broadcast('schemaFormRedraw');
              })
              .catch(function(err){
                console.log(err);
                errorMessage.show('An error occured.');
              });
            }
          },

          _save: function() {
            if ($scope.save) {
              $scope.save($scope.model);
            } else {
              $scope.segment.params.jobConfig=$scope.model;
              var promise=$scope.segment.$setJobConfig({jobConfig:$scope.model});
              promise.then(function(segment){
                window.alert("Settings were saved successfuly.");
                $scope.zeroValue=angular.merge({},$scope.model);
                $scope.changed=false;
                $('button.save').attr('disabled',!$scope.changed);
              }).catch(function(err){
                window.alert("An error occured while trying to save the config");
                console.error(err);
              });
            }
          },

          _cancel: function() {
            if ($scope.cancel) $scope.cancel();
            else window.history.back();
          }

        });  // extend $scope

        $scope.init();
      }
    ]
  }
});

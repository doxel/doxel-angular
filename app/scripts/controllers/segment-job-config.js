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

      angular.extend($scope, {
        init: function() {
          self.config_promise=$q.defer();

          fetch('/job-config.json')
          .then(function(response) {
            return response.json()
          }).then(self.config_promise.resolve)
          .catch(function(ex) {
            self.config_promise.reject(ex);
            console.log('parsing failed', ex)
          });

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
              $scope.form=[
                { key: "openMVG" },
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

            });
          });
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
          window.history.back();
        }

      });  // extend $scope

      $scope.init();
   }
 ]);

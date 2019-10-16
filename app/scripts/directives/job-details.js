/*
 * job-details.js
 *
 * Copyright (c) 2015-2019 ALSENET SA - http://doxel.org
 * Please read <http://doxel.org/license> for more information.
 *
 * Author(s):
 *
 *      Luc Deschenaux <luc.deschenaux@freesurf.ch>
 *
 * This file is part of the DOXEL project <http://doxel.org>.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Additional Terms:
 *
 *      You are required to preserve legal notices and author attributions in
 *      that material or in the Appropriate Legal Notices displayed by works
 *      containing it.
 *
 *      You are required to attribute the work as explained in the "Usage and
 *      Attribution" section of <http://doxel.org/license>.
 */

 'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:jobDetails
 * @description
 * # segment-details
 */
angular.module('doxelApp')
  .directive('jobDetails', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        jobId: '=',
        job: '='
      },
      controller: ['$scope', '$q', '$http', 'errorMessage', 'Job', function($scope, $q, $http, errorMessage, Job) {
        if (!$scope.job) {
          Job.findById($scope.jobId)
          .then(function(job){
            $scope.job=job;
          })
          .catch(function(err){
            console.log(err);
            errorMessage.show('Could not fetch job '+jobId+' details.');
          });
        }
      }],
/*
      link: function(scope,element,attrs) {
        scope.$watch('job',function(newValue, oldValue){
          if (newValue) {
            scope.updateJobDetails();
          }
        });
      },
*/
      templateUrl: 'views/job-details.html'
    };
  });

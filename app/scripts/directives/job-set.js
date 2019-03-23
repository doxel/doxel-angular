/*
 * job-list.js
 *
 * Copyright (c) 2015-2018 ALSENET SA - http://doxel.org
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
 * @name doxelApp.directive:jobSet
 * @description
 * # job-list
 */
angular.module('doxelApp')
  .directive('jobSet', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        jobs: '=',
        jobClick: '&'
      },
      controller: [
        '$compile',
        '$scope',
        '$q',
        'errorMessage',
        'DTOptionsBuilder',
        'DTColumnDefBuilder',
        function(
          $compile,
          $scope,
          $q,
          errorMessage,
          DTOptionsBuilder,
          DTColumnDefBuilder
        ) {
          $scope.dtOptions=DTOptionsBuilder
          .newOptions()
          .withDOM('lfrti')
          .withScroller()
          .withOption('deferRender', true)
          .withOption('initComplete', function(elem) {
            $compile(angular.element(elem))($scope);
          })
          // Do not forget to add the scrollY option!!!
          .withOption('scrollY', 400);
//          .withPaginationType('full_numbers');
          $scope.dtColumnDefs=[
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6),
            DTColumnDefBuilder.newColumnDef(7)
          ];
          $scope.updateJobList=function(){
          }; // updateJobList

      }],
      link: function(scope,element,attrs) {
        scope.$watch('segment',function(newValue, oldValue){
          if (newValue) {
            scope.updateJoblist();
          }
        });

      },
      templateUrl: 'views/job-set.html'
    };
  });

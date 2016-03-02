/*
 * segment-set.js
 *
 * Copyright (c) 2015-2016 ALSENET SA - http://doxel.org
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
 * @name doxelApp.directive:segmentSet
 * @description
 * # segmentSet
 */
angular.module('doxelApp')
  .directive('segmentSet', function () {
    return {
      templateUrl: 'views/segment-set.html',
      restrict: 'E',
      replace: false,
      scope: {
        segments: '='
      },
      controller: function($scope,$window,layout,$timeout){
        $scope.window=angular.element($window);
        $scope.resize=function(e){
          $timeout(function(){
            layout.fitToContainer($scope.window,$scope.element,{v:64,h:0});
          },1000);
        }

      },

      link: function postLink(scope, element, attrs) {
    //    scope.window.bind('resize',scope.resize);
        scope.element=element;
        scope.container=element.closest('ui-layout-container');
    //    scope.resize();
      }
    };
  });

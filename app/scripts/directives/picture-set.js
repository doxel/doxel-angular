/*
 * picture-set.js
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
 * @name doxelApp.directive:pictureSet
 * @description
 * # pictureSet
 */
angular.module('doxelApp')
  .directive('pictureSet', function ($window) {
    return {
      templateUrl: 'views/picture-set.html',
      restrict: 'E',
      replace: false,
      scope: {
        pictures: '='
      },
      controller: function($scope){

        $scope.click=function($event,index){
          var picture=$scope.pictures[index]
          $scope.$parent.showPictureDetails(picture);

        }
/*        $scope.resize=function(){
          var window=$scope.window
          $scope.element.height(window.height()-$scope.element.offset().top+window.scrollTop()-64);
          $scope.element.width(window.width()-$scope.element.offset().left+window.scrollLeft());
        }
  */
    },
      link: function postLink(scope, element, attrs) {
//        scope.window=angular.element($window);
//        scope.window.bind('resize',scope.resize);
  //      scope.element=element;
  //      scope.resize();
      }
    };
  });
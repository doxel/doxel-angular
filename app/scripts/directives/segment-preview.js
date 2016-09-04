/*
 * segment-preview.js
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
 * @name doxelApp.directive:segment-preview
 * @description
 * # segmentPreview
 */
angular.module('doxelApp')
  .directive('segmentPreview', function (Picture, errorMessage) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,

      scope: {
        segment: '=',
        segmentPreviewClass: '@',
        watch: '@'
      },
      controller: function($scope){
        $scope.updateSegment=function(){
          var segment=$scope.segment;
          if (segment.picture) {
            $scope.picture=segment.picture;
            return;
          }
          Picture.findById({id: segment.previewId},function(picture){
            segment.picture=picture;
            $scope.picture=picture;
          }, errorMessage.show);

        }; // updateSegment
      },
      link: function(scope, element, attrs) {
        if (scope.watch!==false) {
          scope.$watch('segment', function(newValue, oldValue) {
            if (newValue) {
              scope.updateSegment();
            }
          }, false);
        } else {
          scope.updateSegment();
        }
      },

      template: '<picture ng-if="picture" picture="picture" picture-class="{{segmentPreviewClass + (segment.selected?\' selected\':\'\')}}" />'
    };
  });

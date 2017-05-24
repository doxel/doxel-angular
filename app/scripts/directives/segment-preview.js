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
  .directive('segmentPreview', ['Picture','errorMessage', function (Picture, errorMessage) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,

      scope: {
        segment: '=',
        segmentPreviewClass: '@',
        label: '@'
      },
      controller: function($scope, $rootScope){
        $scope.updateSegment=function(){
          var segment=$scope.segment;
          if (segment.picture && segment.picture.id==segment.previewId) {
            $scope.segment.loaded=true;
            return;
          }
          var listener=$rootScope.$on('picture.onload',function($event,picture){
            if (picture.segmentId==$scope.segment.id) {
              $scope.segment.loaded=true;
              listener();
            }
          });
          Picture.findById({id: segment.previewId},function(picture){
            segment.picture=picture;
          }, function(err){
            console.log(segment,err);
          });

        }; // updateSegment
      },
      link: function(scope, element, attrs) {
          scope.$watch('segment', function(newValue, oldValue) {
            if (newValue) {
              scope.updateSegment();
            }
          }, false);
      },

      template: '<picture picture="segment.picture" label="label" picture-class="{{segmentPreviewClass + (segment.picture.selected?\' selected\':\'\')}}"/>'
    };
  }]);

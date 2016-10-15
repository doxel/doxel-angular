/*
 * picture.js
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
 * @name doxelApp.directive:picture
 * @description
 * # picture
 */
angular.module('doxelApp')
  .directive('picture', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        picture: '=',
        pictureClass: '@',
        pictureOnload: '&',
        pictureError: '&',
        label: '@'
      },
      controller: function($scope, errorMessage, getPictureBlobAndExif) {
        $scope._class=$scope.pictureClass;
        $scope.pictureClass+=' loading';
        $scope.updatePicture=function() {
          var picture=$scope.picture;
          if (picture.blob) {
            $scope.style="background-image: url("+picture.blob+");";
            return;
          }
          var pictureClass=$scope.pictureClass;
          $scope.pictureClass+=' loading';
          picture.url='/api/Pictures/download/'+picture.sha256+'/'+picture.segmentId+'/'+picture.id+'/'+picture.timestamp+'.jpg';
          getPictureBlobAndExif(picture,((pictureClass=='thumb')?'thumb':undefined)).then(function(picture){
            $scope.pictureClass=pictureClass;
            $scope.style="background-image: url("+picture.blob+");";
            picture.loaded=true;
            if (typeof($scope.pictureOnload)=='function') {
              $scope.pictureOnload({
                $event: {
                  target: picture
                }
              });
            }

          }, function(err) {
            $scope.pictureClass=pictureClass+' load-error';
            if (typeof($scope.pictureOnError)=='function') {
              $scope.pictureOnError(err,$scope.picture);
            }
          });
        };
      },
      link: function(scope,element,attrs){
        scope.$watch('picture', function(newValue, oldValue) {
          if (newValue) {
            scope.updatePicture();
          }
        });
        if (scope.picture.selected) {
          scope.pictureClass+=' selected';
        }

      },
      template: '<div class="{{pictureClass}}" style="{{style}});"><div class="label">{{label}}</div></div>'
    };
  });

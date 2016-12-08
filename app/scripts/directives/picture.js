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

/* TODO: no reference to .thumb, style must be applied to element and scss updated accordingly */
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
        label: '=?'
      },
      controller: function($scope, errorMessage, getPictureBlobAndExif) {
        $scope._class=$scope.pictureClass;
        $scope.pictureClass+=' loading';
        $scope.updatePicture=function(element) {
          var thumb=element.find('.thumb');
          var picture=$scope.picture;
          /* TODO: debug this (picture.selected must be unset on segment deselection)
          if (picture.selected) {
           thumb.addClass('selected');
          } else {
            thumb.removeClass('selected');
          }
          */
          if (picture.blob) {
            $scope.style="background-image: url("+picture.blob+");";
            return;
          }
          var pictureClass=$scope.pictureClass;
          thumb.addClass('loading');
          picture.url='/api/Pictures/download/'+picture.sha256+'/'+picture.segmentId+'/'+picture.id+'/'+picture.timestamp+'.jpg';
          getPictureBlobAndExif(picture,((pictureClass=='thumb')?'thumb':undefined)).then(function(picture){
            $scope.pictureClass=pictureClass;

            var img=new Image();
            $(img).on('load',function(e){
              $scope.style="background-image: url("+picture.blob+");";
              picture.loaded=true;
              thumb.addClass('loaded').removeClass('loading');
              if (typeof($scope.pictureOnload)=='function') {
                $scope.pictureOnload({
                  $event: {
                    target: picture
                  }
                });
              }
              img=null;
            });
            img.src=picture.blob;

          }, function(err) {
            thumb.addClass('load-error').removeClass('loading');
            if (typeof($scope.pictureOnError)=='function') {
              $scope.pictureOnError(err,$scope.picture);
            }
          });
        };
      },
      link: function(scope,element,attrs){
        scope.$watch('picture', function(newValue, oldValue) {
          if (newValue) {
            scope.updatePicture(element);
          }
        });
        if (scope.picture && scope.picture.selected) {
          element.find('.thumb').addClass('selected');
        } else {
          element.find('.thumb').removeClass('selected');
        }

      },
      template: '<div class="{{pictureClass}}" style="{{style}});"><div class="label">{{label}}</div></div>'
    };
  });

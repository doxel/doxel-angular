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


/* TODO: no reference to .div, style must be applied to element and scss updated accordingly */
angular.module('doxelApp')
  .directive('picture', function () {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,

      scope: {
        picture: '=',
        useCanvas: '@',
        useImg: '@',
        pictureClass: '@',
        label: '=?'
      },

      controller: function($scope, $rootScope, errorMessage, getPictureBlobAndExif) {
        $scope.pictureClass=$scope.pictureClass || 'full';
        $scope._class='.'+$scope.pictureClass.split(' ').join('.');
        $scope.pictureClass+=' loading';
        var isThumb=($scope.pictureClass.search('thumb')>=0);

        $scope.updatePicture=function(element) {
          var div=element.find($scope._class);
          var picture=$scope.picture;
          var url='/api/Pictures/'+(isThumb?'thumb':'download')+'/'+picture.sha256+'/'+picture.segmentId+'/'+picture.id+'/'+picture.timestamp+'.jpg';

          function setPicture(url){
            if ($scope.useImg!==undefined || $scope.canvas) {
              var img=new Image();
              $(img).on('load',function(e){
                if ($scope.canvas) {
                  var ctx=$scope.ctx=$scope.canvas.getContext('2d');
                  if (!$scope.inav)
                  $scope.inav=$scope.inav||new $.image_navigator({
                    canvas: $scope.canvas,
                    target: $scope.canvas.parentElement,
                    img: [img],
                    view: 0,
                    color: true,
                    ctx: ctx,
                    zoomin_elem: $('.zoom-in'),
                    zoomout_elem: $('.zoom-out'),
                    scrollleft_elem: $('.scroll-left'),
                    scrollright_elem: $('.scroll-right'),
                    scrollup_elem: $('.scroll-up'),
                    scrolldown_elem: $('.scroll-down'),

                  });
                  else
                  $scope.inav.img[0]=img;
                } else {
                  $scope.src=img.src;
                }

                img=null;
                picture.loaded=true;
                div.removeClass('loading').addClass('loaded');
                $rootScope.$broadcast('picture.onload',picture);
                $scope.$apply();
              });
              img.src=url;

            } else {
              $scope.style="background-image: url("+url+");";
              picture.loaded=true;
              div.removeClass('loading').addClass('loaded');
              $rootScope.$broadcast('picture.onload',picture);
            }
          } // setPicture

          if (picture.selected) {
           div.addClass('selected');
          } else {
            div.removeClass('selected');
          }

          if (picture.blob && picture.url==url) {
            // picture already loaded
            // just set background image and return
            setPicture(picture.blob);
            return;
          }

          // load picture
//          var pictureClass=$scope.pictureClass;
          div.addClass('loading').removeClass('loaded');
//          console.log(pictureClass);
          picture.url=url;
          getPictureBlobAndExif(picture).then(function(picture){
//            $scope.pictureClass=pictureClass;

            setPicture(picture.blob);

          }, function(err) {
  //          div.addClass('load-error').removeClass('loading');
  //          $rootScope.$broadcast('picture.onerror',picture);

            // display placeholder on image load error
            var img=$rootScope.imgPlaceholder;
            if (!img) {
              img=$rootScope.imgPlaceholder=new Image();
              img.src='/images/img-placeholder-dark.jpg';
            }
            setPicture(img.src);

          });
        };
      },

      link: function(scope,element,attrs){
        scope.$watch('picture', function(newValue, oldValue) {
          if (newValue) {
            scope.updatePicture(element);
          }
        }, true);

        if (scope.picture && scope.picture.selected) {
          element.find(scope._class).addClass('selected');
        } else {
          element.find(scope._class).removeClass('selected');
        }

        if (scope.useCanvas===undefined) return;

        scope.canvas=$('canvas',element)[0];


      },

      template: function(tElement, tAttrs) {
        return  [
          '<div class="{{pictureClass}}" style="{{style}}">',
          ((tAttrs.useImg!==undefined)?'<img ng-if="src" img-fix-orientation="src" ng-src="{{src}}"></img>':''),
          ((tAttrs.useCanvas!==undefined)?[
            '<canvas></canvas>'
          ].join(''):''),
          '<div class="label">{{label}}</div></div>',
          ((tAttrs.useCanvas!==undefined)?[
            '<a class="button icon zoom zoom-in></a>',
            '<a class="button icon zoom zoom-out"></a>',
            '<a class="button icon scroll nav-right"></a>',
            '<a class="button icon scroll nav-left"></a>',
            '<a class="button icon scroll nav-up"></a>',
            '<a class="button icon scroll nav-down"></a>',
            '<a class="button icon relief zoom-in"></a>',
            '<a class="button icon relief zoom-out"></a>',
            '<a class="button icon relief nav-left"></a>',
            '<a class="button icon relief nav-right"></a>',
            '<a class="button icon relief nav-up"></a>',
            '<a class="button icon relief nav-down"></a>'
          ].join(''):'')

        ].join('');
      }

    };
  });

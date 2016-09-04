/*
 * gallery-earth.js
 *
 * Copyright (c) 2015-2016 ALSENET SA - http://doxel.org
 * Please read <http://doxel.org/license> for more information.
 *
 * Author(s):
 *
 *      Rurik Bogdanov <rurik.bugdanov@alsenet.com>
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
 * @ngdoc function
 * @name doxelApp.controller:GalleryEarthCtrl
 * @description
 * # GalleryEarthCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryEarthCtrl', function ($scope,$q) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.q=$q.defer();

    // yeah its ugly but we dont want to reload everything
    $scope.$on('$stateChangeStart',function(e, next, current){
        $('iframe.earth').hide(0);
    });

    $scope.$on('$routeChangeSuccess',function(e, next, current){
      var iframe=$('iframe.earth');
      if (!$('iframe.earth.visible').length && iframe.attr('src')=='about:blank') {
        iframe.attr('src','/earth/deploy/index1.html');
        iframe[0].contentWindow.parentScope=$scope;
        setTimeout(function(){
          iframe[0].contentWindow.parentScope=$scope;
        },1000);
      }
      var iframes=$('iframe.viewer, iframe.earth')
      iframes.show().height($('body').height()-64);
        $(window).off('resize.viewer').on('resize.viewer',function(){
          iframes.height($('body').height()-64);
        });
    });

    $scope.q=$q.defer();
    $scope.iframe_earth=$('iframe.earth')[0];
    // when switching back to the view, 'webglearth2.loaded' is not fired and contentWindow.earth is already set
    $scope.earth=$scope.iframe_earth.contentWindow.earth;
    if ($scope.earth) {
      $scope.q.resolve();

    } else {
      $scope.$on('webglearth2.loaded',function($event){
        $scope.webglearth2_loaded=true;
        $scope.earth=$scope.iframe_earth.contentWindow.earth;
        $scope.q.resolve();
      });
    }



  });

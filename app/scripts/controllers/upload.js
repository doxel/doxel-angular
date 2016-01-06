/*
 * upload.js
 *
 * Copyright (c) 2015 ALSENET SA - http://doxel.org
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
 * @ngdoc function
 * @name doxelApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('UploadCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isHashUnique=function(options){
      options.success({result: true});
    };

    // yeah its ugly but faster than rewriting the uploader
    $scope.$on('$routeChangeStart',function(e, next, current){
        $('iframe.upload').hide();
    });

    $scope.$on('$routeChangeSuccess',function(e, next, current){
        $('iframe.upload').show().height($('body').height()-102);
        $(window).off('resize.upload').on('resize.upload',function(){
          $('iframe.upload').height($('body').height()-102);
        });
    });
  });

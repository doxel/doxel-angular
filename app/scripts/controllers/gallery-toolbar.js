/*
 * gallery-toolbar.js
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
 * @name doxelApp.controller:GalleryToolbarCtrl
 * @description
 * # GalleryToolbarCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryToolbarCtrl', function ($scope,$rootScope,$state,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      rootState: 'gallery.view',

      buttons: {
        info: {},
        map: {},
        earth: {},
        thumbs: {},
        cloud: {}
      },

      init: function() {
        for (var state in $scope.buttons){
          if (!$scope.buttons.hasOwnProperty(state)) {
            return;
          }
          $scope[state]=(function(state,rootState){
            return function() {
              var stateName=$scope.buttons[state].toState||($scope.rootState+'.'+state);
              if ($state.current.name!=stateName) {
                $state.go(stateName,$rootScope.params);
              }
            }
          })(state);
        }
      },

      getClass: function(what) {
        var name=$state.current.name.split('.');
        if (what=='viewer') {
          if ($location.search().s) {
            return '';
          } else {
            return 'disabled';
          }
        }
        if (name[0]=='gallery') {
          if (!$scope.visible) $scope.visible=true;
          if (name[2]==what) {
            if ($scope.currentView!=what) $scope.currentView=what;
            return "current";
          }
        } else {
          if ($scope.visible) $scope.visible=false;
          return (what==$scope.currentView)?'current':'';
        }
      }

    });

    $scope.init();

  });

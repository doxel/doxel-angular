/*
 * segment-map.js
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
 * @name doxelApp.directive:segmentMap
 * @description
 * # segmentMap
 */
angular.module('doxelApp')
  .directive('segmentMap', function (leafletData) {
    return {
      scope: {
        segment: '=',
        options: '=?'
      },
      template: '<leaflet ng-if="defaults" id="{{mapId}}" defaults="defaults" lf-center="center" height="{{height}}" width="{{width}}"></leaflet>',
      restrict: 'E',
      controller: function($scope){
        $scope.mapId=String(Date.now())+Math.random();
      },
      link: function postLink(scope, element, attrs) {
        var $scope=scope;
        $scope.options=$scope.options||{};
        $scope.center=$scope.options.center||angular.extend({
          lat: 51.505,
          lng: 4.6,
          zoom:  8
        },$scope.segment);
        $scope.height=$scope.options.height||'192px';
        $scope.width=$scope.options.width||'256px';
        $scope.defaults=angular.extend({
          tileLayer: '//{s}.tiles.mapbox.com/v3/dennisl.4e2aab76/{z}/{x}/{y}.png',
          maxZoom: 14,
          path: {
              weight: 10,
              color: '#800000',
              opacity: 1
          }
        }, $scope.options.defaults);
        scope.$watch('segment',function(newValue, oldValue){
          leafletData.getMap($scope.mapId).then(function(map){
          });
        });
      }
    };
  });

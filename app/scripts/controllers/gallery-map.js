/*
 * gallery-map.js
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
 * @name doxelApp.controller:GalleryMapCtrl
 * @description
 * # GalleryMapCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryMapCtrl', function ($scope,$rootScope,$q,$location,$window,$timeout,leafletData,leafletBoundsHelpers,Segment,$state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    angular.extend($scope,{

      getMap: function(){
        // opbtain a reference for the leaflet map
        var q=$q.defer();
        $rootScope.map_promise=q.promise;
        $rootScope.gotmap=true;
        $timeout(function(){
          q.resolve(leafletData.getMap('main'))
        },500);
      },

      init: function(){

        $scope.map_visible=false;

        if (!$rootScope.gotmap) $scope.getMap();

        $timeout(function(){
          $scope.map_visible=($state.current.name=='gallery.view.map');
        },1);

        // show location on segment.clicked
        $scope.$on('segment.clicked',function($event,args){
          $rootScope.map_promise.then(function(map){
            var segment=args.segment;
            $scope.setView(segment);
            if ($scope.currentMarker) {
              map.removeLayer($scope.currentMarker);
            }
            $scope.currentMarker=L.marker([segment.lat,segment.lng]);
            map.addLayer($scope.currentMarker);
          });
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          $scope.map_visible=(toState.name=='gallery.view.map');

          // needed so that ui-leflet behave properly,
          // when switching views in gallery
          if ($scope.map_visible) {
            if (!$rootScope.gotmap) {
              $scope.getMap();
            }
          } else {
            $rootScope.gotmap=false;
          }

        });

        $scope.$on('centerUrlHash',function(event,hash){
          console.log(hash);
          $rootScope.params.c=hash;
          $location.search($rootScope.params);
        });

        $scope.$on('leafletDirectiveMap.moveend',function(){

/*
TODO: use geopoint and using the smallest map dimension
 compute distance from the center to the border,
 then filter according to center and radius
        // update segments list on moveend
          if (!$scope._map) return;
          Segment.find({
            filter: {
              where: {
              }
            }
          },
          function(segments){
            $scope.segments=segments;
            $rootScope.$broadcast('segments',segments);
          },
          function(err) {
            console.log(err);

          })
*/
        });

      },

      events: {
        map: {
          enable:  ['moveend', 'click'],
          login: 'emit'
        }
      },

      controls: {
        scale: true
      },

      defaults: {
        zoomControlPosition: 'topright',
        minZoom: 3
      },
/*
      // initial map bounds
      bounds: leafletBoundsHelpers.createBoundsFromArray([
        [ -40, -40 ],
        [ 40, 40 ]
      ]),
*/
      // pan and zoom
      setView: function(segment){
        $rootScope.map_promise.then(function(map){
          map.setView({
            lat: segment.lat,
            lng: segment.lng
          },
          segment.zoom||map._zoom, {
            pan: {}
          });
        });
      }
    });

    $scope.init();

  });

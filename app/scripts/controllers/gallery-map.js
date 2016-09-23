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
      defaults: {
          worldCopyJump: true,
          inertia: false,
          zoomControlPosition: 'topright',
          minZoom: 2
      },
      layers: {
        baselayers: {
          blue_marble: {
            name: 'Blue-Marble',
            url: '//{s}.tileserver:3000/blue-marble/{z}/{x}/{y}.png',
            type: 'xyz',
            layerOptions: {
              tms: true
            }
          },
          osm: {
              name: 'OpenStreetMap',
              url: '//{s}.tileserver:3000/osm/{z}/{x}/{y}.png',
              type: 'xyz'

          }
        },
        overlays: {
          osm: {
              name: 'OpenStreetMap',
              url: '//{s}.tileserver:3000/osm/{z}/{x}/{y}.png?layers=T',
              type: 'xyz',
              layerOptions: {
                transparent: true,
                transparentColor: 'white',
                opacity: 0.2
              }

          },

          labels: {
              visible: true,
              name: 'Stamen toner-labels',
              url: '//{s}.tileserver:3000/stamen/toner/{z}/{x}/{y}.png',
              type: 'xyz',
              layerOptions: {
                opacity: 0.2
              }
          },
          lines: {
              name: 'Stamen toner-lines',
              url: '//{s}.tileserver:3000/stamen/toner-lines/{z}/{x}/{y}.png',
              type: 'xyz',
              layerOptions: {
                opacity: 1
              }
          }
        }

      },

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

        $scope.map_promise.then(function(map){
          map.options.inertia=false;
        });

        $timeout(function(){
          $scope.map_visible=($state.current.name=='gallery.view.map');
        },1);

        // show location on segment.clicked
        $scope.$on('segment.clicked',function($event,args){
          if (!$scope.map_visible) {
            return;
          }
          var segment=args.segment;
          $scope.setView(segment);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          var visible=(toState.name=='gallery.view.map');

          // needed so that ui-leflet behave properly,
          // when switching views in gallery
          if (visible) {
            if (!$scope.map_visible) {
              $scope.map_visible=true;
              if (!$rootScope.gotmap) {
                $scope.getMap();
              }
              $scope.map_promise.then(function(map){
                map.options.inertia=false;
                if ($scope.params.s) {
                  $scope.getSegment($scope.params.s,function(segment){
                    $scope.setView(segment);
                  });
                }
              });
            }
          } else {
            $scope.map_visible=false;
            $rootScope.gotmap=false;
          }

        });

        $scope.$on('centerUrlHash',function(event,hash){
          console.log(hash);
          $rootScope.params.c=hash;
          $location.search($rootScope.params).replace();
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

      // pan and zoom
      setView: function(segment){
       console.log('setView');
       $rootScope.map_promise.then(function(map){
          map.setView({
            lat: segment.lat,
            lng: segment.lng
          },
          segment.zoom||map._zoom, {
            pan: {}
          });

          if ($scope.currentMarker) {
            var m=$scope.currentMarker._latlng;
            if (m.lat!=segment.lat || m.lng!=segment.lng) {
              if (map.hasLayer($scope.currentMarker)) {
                map.removeLayer($scope.currentMarker)
              }
              $scope.currentMarker=L.marker([segment.lat,segment.lng]);
              map.addLayer($scope.currentMarker);

            } else {
              if (!map.hasLayer($scope.currentMarker)) {
                // it was on another map instance, we must reinstantiate it
                $scope.currentMarker=L.marker([segment.lat,segment.lng]);
                map.addLayer($scope.currentMarker);
              }
            }
          } else {
            $scope.currentMarker=L.marker([segment.lat,segment.lng]);
            map.addLayer($scope.currentMarker);
          }

        });
      }
    });

    $scope.init();

  });

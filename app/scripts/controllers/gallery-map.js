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
  .controller('GalleryMapCtrl', function ($scope,$rootScope,$q,$location,$window,$timeout,leafletData,leafletBoundsHelpers,Segment,$state,appConfig) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    angular.extend($scope,{
      markers: {},
      defaults: {
          // display the markers again after scrolling n times 360 degrees laterally
          worldCopyJump: true,
          // disable inertia because of weird behaviour when using map.worldCopyJump
          // (must be done manually below on init and state change
          inertia: false,
          zoomControlPosition: 'topright',
          minZoom: 2,
          maxBoundsViscosity: 1.0 // not working
      },
      maxbounds: {
        southWest: {
          lat: 89,
          lng: -1800000
        },
        northEast: {
          lat: -89,
          lng: 1800000
        }
      },
      markerURL: undefined,

      layers: {
        baselayers: {
          osm: {
              name: 'OpenStreetMap',
              url: '//{s}.'+appConfig.tileServer+'/osm/{z}/{x}/{y}.png',
              type: 'xyz',
              layerOptions: {
              opacity: 1,
              minZoom: 9,
              maxZoom: 19,
              "showOnSelector": false
          }

          }
        },
        overlays: {
          blue_marble: {
            visible: true,
            name: 'Blue-Marble',
            url: '//{s}.'+appConfig.tileServer+'/blue-marble/{z}/{x}/{y}.png',
            type: 'xyz',
            layerOptions: {
              maxZoom: 8,
              opacity: 0.9,
              tms: true
            },
            layerParams: {
              "showOnSelector": false
            }
          },
          /*
        osm: {
              name: 'OpenStreetMap',
              url: '//{s}.'+appConfig.tileServer+'/osm/{z}/{x}/{y}.png?layers=T',
              type: 'xyz',
              layerOptions: {
                transparent: true,
                transparentColor: 'white',
                opacity: 0.2
              }

          },
*/
          labels: {
              visible: true,
              name: 'Stamen toner-labels',
              url: '//{s}.'+appConfig.tileServer+'/stamen/toner/{z}/{x}/{y}.png',
              type: 'xyz',
              showOnSelector: false,
              layerOptions: {
                maxZoom: 8,
                opacity: 0.2,
              },
              layerParams: {
                "showOnSelector": false
              }
          },
          lines: {
              visible: true,
              name: 'Stamen toner-lines',
              url: '//{s}.'+appConfig.tileServer+'/stamen/toner-lines/{z}/{x}/{y}.png',
              type: 'xyz',
              layerOptions: {
                maxZoom: 8,
                opacity: 0.9
              },
              layerParams: {
                showOnSelector: false

              }
          },
          markercluster: {
            name: 'Markers',
            type: 'markercluster',
            visible: true
          }
        }

      },

      /**
      * @function GalleryMapCtrl.getMap
      * @desc Set and/or get the leaflet map object promise ($rootScope.map_promise)
      * @param callback {function} Optional "then" callback
      * @return promise {object}
      */
      getMap: function(callback){
        if ($rootScope.map_promise) {
          if (callback) {
            return $rootScope.map_promise.then(callback);
          } else {
            return $rootScope.map_promise;
          }
        }
        // obtain a reference for the leaflet map
        var q=$q.defer();
        $rootScope.map_promise=q.promise;

        $timeout(function(){
          q.resolve(leafletData.getMap('main'))
        },500);

        if (callback) {
          return q.promise.then(callback);
        } else {
          return q.promise;
        }

      },

      updateVisibility: function(state){
        var visible=(state.name=='gallery.view.map');

        // needed so that ui-leflet behave properly,
        // when switching views in gallery
        if (visible) {
          if (!$scope.map_visible) {
            console.log('map was not visible');
            $scope.map_visible=true;
            $scope.getMap(function(map){
              map.options.inertia=false;
              // select and show current segment
              if ($scope.params.s) {
                $scope.getSegment($scope.params.s).then(function(segment){
                  $scope.setView(segment);
                });
              }
              $scope.updateMarkers(map);
              console.log('updateMarkers');
            });
          }
        } else {
          $scope.map_visible=false;
          $rootScope.map_promise=null;
        }

      },
/*
      marker: L.icon({
        iconUrl: 'marker-icon-selected.png',
        iconRetinaUrl: 'marker-icon-selected-2x.png'
      }),
*/
      init: function(){

        // map must be visible first so that leaflet initialize properly
        $scope.map_visible=false;

        // get map object and disable inertia
        $scope.getMap(function(map){
          map.options.inertia=false;
        });

        // update visibility
        $timeout(function(){
          $scope.map_visible=($state.current.name=='gallery.view.map');
        },1);

        // update markers when more segments are loaded
        $scope.$on('segments-loaded',function(event,segments){
          $scope.getMap($scope.updateMarkers);
        });


        // show location on segment.setview event
        $scope.$on('segment.setview',function($event,args){
          if (!$scope.map_visible) {
            return;
          }
          var segment=args.segment;
          $scope.setView(segment);
        });

        // update
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          $scope.updateVisibility(toState);
        });
        $scope.updateVisibility($rootScope.$state.current);

        // update query string on centerUrlHash change
        $scope.$on('centerUrlHash',function(event,hash){
          $rootScope.params.c=hash;
          $location.search($rootScope.params).replace();
        });

        $scope.$on('leafletDirectiveMarker.click', function(event, args){
          console.log(args.model.segmentId);
          $scope.getSegment(args.model.segmentId).then(function(segment){
            if ($scope.selected[segment.id]) {
              $scope.$state.transitionTo('gallery.view.cloud');
            } else {
              $rootScope.$broadcast('segment.click',segment,{show:true});
            }

          });
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

        $scope.$on('window.resize',function(){
          $scope.invalidateSize();
        });

        $scope.$on('orientationchange',function(){
          $scope.invalidateSize();
        });

        $('.thumbs-handle').on('click',function(){
          $scope.invalidateSize();
        });

        $('.navbar .menu-handle').on('click',function(){
          $scope.invalidateSize();
        });

      }, // init

      invalidateSize: function(){
        $scope.getMap(function(map){
          clearTimeout($scope.invalidateTimeout);
          $scope.invalidateTimeout=setTimeout(function(){
            map.invalidateSize();
          },1000);
        });
      }, // invalidateSize

			watchOptions: {
			},
      events: {
        map: {
          enable:  ['moveend', 'click'],
          logic: 'emit'
        },
        marker: {
          enable: ['click'],
          logic: 'emit'
        }
      },

      controls: {
        scale: true
      },

      // pan and zoom
      setView: function(segment){
       console.log('setView');
       if (!segment.geo) return;
       $scope.getMap(function(map){
          map.setView({
            lat: segment.geo.lat,
            lng: segment.geo.lng
          },
          segment.zoom||map._zoom, {
            pan: {}
          });

          if ($scope.markers.current) {
            // there is already a current marker
            var m=$scope.markers.current;
            if (m.lat!=segment.geo.lat || m.lng!=segment.geo.lng) {
              m.lat=segment.geo.lat;
              m.lng=segment.geo.lng;
              m.segmentId=segment.id;
            }

          } else {
            $scope.markers.current={
              lat: segment.geo.lat,
              lng: segment.geo.lng,
              zIndexOffset: 9999999999,
              segmentId: segment.id

            }
          }

        });
      }, // setView

      updateMarkers: function(map){
        var cluster=$scope.cluster||L.markerClusterGroup();

        $scope.segments.some(function(segment,idx){
          if (!segment.geo) return;

          if (!segment.marker) {
              segment.marker=L.marker(
                new L.LatLng( segment.geo.lat, segment.geo.lng, 0),
                {
                  layer: 'markercluster',
                  segmentId: segment.id
                }
              );
          }

          if (!cluster.hasLayer(segment.marker)) {
            cluster.addLayer(segment.marker);
          }

        });

        if (!map.hasLayer(cluster)) {
          map.addLayer(cluster);
        }

      } // updateMarkers

    });

    $scope.init();

  });

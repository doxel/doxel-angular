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
.controller('GalleryMapCtrl', [
  '$scope',
  '$rootScope',
  '$q',
  '$location',
  '$window',
  '$timeout',
  'leafletData',
  'leafletBoundsHelpers',
  'Segment',
  '$state',
  '$stateParams',
  'appConfig',
  'errorMessage',
  '$http',
  'elementSelection',
  function (
    $scope,
    $rootScope,
    $q,
    $location,
    $window,
    $timeout,
    leafletData,
    leafletBoundsHelpers,
    Segment,
    $state,
    $stateParams,
    appConfig,
    errorMessage,
    $http,
    elementSelection
  ) {
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

      bounds: leafletBoundsHelpers.createBoundsFromArray([
         [45.817995,5.9559113], [47.8084648,10.4922941]
      ]),

      _center: {
        lng: 0,
        lat: 0
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
              if ($stateParams.segmentId) {
                $scope.getSegment($stateParams.segmentId).then(function(segment){
                  $scope.setView(segment);
                });
              }
              $scope.updateMarkers(map);
              console.log('updateMarkers');
            });
          }

        } else {
          if ($scope.map_visible) {
            $scope.map_visible=false;

          }
          /*
          if ($scope.gallery.map_wasvisible) {
            if (state.name=='gallery.view.thumbs' || state.name=='gallery.view.home') {
              var segmentId;
              $scope.gallery.map_wasvisible=false;

              // get selected segmentId or TODO: top-screen segment id
              segmentId=$stateParams.segmentId;
              if (segmentId===undefined && $scope.segments.length) {
                segmentId=$scope.segments[$scope.segments.length>>1];
              }

              // rebuild thumbs list
              $scope.clearThumbsList().finally(function(){
                if (segmentId) {
                  $scope.loadSegmentsAround(segmentId);

                } else {
                  $scope.loadSegments();
                }
              });

            } else {
              // lock thumbs when leaving map for viewer
              $scope._end[state.name]=angular.merge({},$scope._end['gallery.view.map']);
            }
          }
          */

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
        $scope.$on('segments-loaded',function(event,args){
          if ($scope.galleryMode!='segment-thumbs-onmap') {
            return;
          }
          var segments=args.segments;
          $scope.updateShownSegments(args).then(function(){
            $scope.getMap($scope.updateMarkers);
            console.log('skip',$scope.skip,'loaded', segments.length, 'inpool',$scope.loaded.length)
            if (segments.length) {
              $scope.skip+=segments.length;
              console.log('loadmore');
              $timeout($scope.loadSegments);
            }
          });

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
          console.log(toState);
          $scope.updateVisibility(toState);
        });
        $scope.updateVisibility($state.current);

        // update query string on centerUrlHash change
        $scope.$on('centerUrlHash',function(event,hash){
          $rootScope.params.c=hash;
          $location.search($rootScope.params).replace();
        });

        $scope.cluster.on('click',function(a){
          console.log('marker',a.layer);
          $scope.markerClick(a.layer.options.segmentId);
        });

        $scope.$on('leafletDirectiveMarker.click', function(event, args){
            console.log(args.model.segmentId);
            $scope.markerClick(args.model.segmentId);
        });

       $scope.markerClick=function(segmentId){
          $scope.getSegment(segmentId).then(function(segment){
            if (elementSelection.isSelected('segment',segment)) {
              if (segment.pointCloudId) {
                $state.transitionTo('gallery.view.cloud',{segmentId:segment.id});
              }
            } else {
              $rootScope.$broadcast('segment.click',segment,{show:true});
            }

          });
        }

        $scope.$on('leafletDirectiveMap.moveend',function(){
          $scope.updateShownSegments().then(function(){
            // if map center moved, reset filter.skip
            if ($scope.center.lat-$scope._center.lat>0.001||$scope.center.lng-$scope._center.lng>0.001) {
              $scope.skip=0;
            }
            $scope.end('forward',false);
            $scope.end('backward',false);
            $scope.loadSegments();
          }).catch(function(err){
            console.log(err);
          });


        });

        $scope.$on('options.gallery.my-segments',function(event){
            $scope.updateShownSegments().then(function(){
              $scope.skip=0;
              $scope.end('forward',false);
              $scope.end('backward',false);
              $scope.loadSegments();
            }).catch(function(err){
              console.log(err);
            });
        });

        $scope._galleryFilter['segment-thumbs-onmap']=$scope.galleryFilter;

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

      center: {},

      /**
       * Add or remove segment thumbs given the map bounds and the scroll position
       * args comes from segment-loaded and is missing on leaflet moveend
       */
      updateShownSegments: function(args) {
        var q=$q.defer();
        var filter=args && args.filter;
        if (filter) $scope.filter=filter;

        $scope.getMap(function(map){

          // get map center
          var center=map.getCenter();
          center=new L.latLng(((center.lat+90)%180-90), ((center.lng+180)%360-180));

          // get map bounds
          var bounds=map.getBounds();


          if (!$scope.filter) {
            return q.resolve();
          }

          var segments;
          if (args && args.segments) {
            segments=loopbackFilters(args.segments,{
              where: $scope.filter.where,
              order: $scope.filter.order

            });

          } else {
            // called on map move
            $scope.skip=0;
            segments=loopbackFilters($scope.loaded,{
              where: $scope.filter.where,
              order: $scope.filter.order
            });
            angular.forEach($scope.loaded,function(segment){
              if (segments.indexOf(segment)<0){
                var alreadyDisplayed;
                var index;

                alreadyDisplayed=false;
                // is the segment already displayed ?
                $scope.segments.some(function(_segment,i){
                  if (_segment.id==segment.id) {
                    index=i;
                    return alreadyDisplayed=true;
                  }
                });
                if (alreadyDisplayed) {
                  // segment not geolocated and already displayed  ?
                  // remove from thumbs list
                  $scope.segments.splice(index,1);
                  // remove from map
                  if (segment.marker) $scope.cluster.removeLayer(segment.marker);
                }
              }
            });
          }

          // for each segment loaded
          function iter(segment) {
              var index;
              var alreadyDisplayed;
              alreadyDisplayed=false;


              // is the segment already displayed ?
              $scope.segments.some(function(_segment,i){
                if (_segment.id==segment.id) {
                  index=i;
                  return alreadyDisplayed=true;
                }
              });

              if (!segment.geo) {
                if (alreadyDisplayed) {
                  // segment not geolocated and already displayed  ?
                  // remove from thumbs list
                  $scope.segments.splice(index,1);
                  // remove from map
                  if (segment.marker) $scope.cluster.removeLayer(segment.marker);
                }

              } else {
                // segment location in map bounds ?
                segment.latLng=new L.latLng(segment.geo.lat,segment.geo.lng);
          /*      if (filter && center.distanceTo(segment.latLng)<=filter.where.geo.maxDistance) {
                  ++$scope.skip;
                }
          */
                segment.showMarker=bounds.contains(segment.latLng);
                if (segment.showMarker) {
                  // display in bound segment unless limit is not reached
                  if (!alreadyDisplayed) {
                    if (!$scope.scrollBufferFull('forward')) {
                      $scope.segments.push(segment);
                    }
                  }

                } else {
                  // remove out of bounds segment from display
                  if (alreadyDisplayed) {
                    // remove from thumbs list
                    $scope.segments.splice(index,1);
                    // remove from map
                    if (segment.marker) $scope.cluster.removeLayer(segment.marker);
                  }
                }
              }
          }

          var segment;
          var si=0;
          for(var si=0; si<segments.length; ++si) {
              segment=segments[si];
              iter(segment);
          }
          $scope.getPicturesCount(segments)
          .finally(q.resolve);

        });

        return q.promise;

      }, // updateShownSegments

      galleryFilter: function() {
        var q=$q.defer();

        $scope.getMap(function(map){
          var center=map.getCenter();
          var bounds=map.getBounds();
/*          // maxDistance must be in bounds (
          var d1=center.distanceTo(L.latLng(center.lat,bounds._northEast.lng),{type:'meters'});
          var d2=center.distanceTo(L.latLng(bounds._northEast.lat,center.lng),{type:'meters'});
          var meters=Math.min(d1,d2);
  */
          var meters=center.distanceTo(bounds._northEast,{type: 'meters'});

          q.resolve({
            where: {
              geo: {
                near: [ ((center.lat+90)%180-90), ((center.lng+180)%360-180) ],
                maxDistance: meters
              }
            },
            skip: $scope.skip
          });
        });
        return q.promise;
      },

      skip: 0,

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

      cluster: L.markerClusterGroup(),

      updateMarkers: function(map){
        var cluster=$scope.cluster;
        if ($scope.filter && $scope.filter.where) {
        var segments=loopbackFilters($scope.loaded,{where:$scope.filter.where});
        }
        for(var i in $scope.loaded) {
          var segment=$scope.loaded[i];
          if (!segment.geo) continue;

          var has;
          has=true;
          if (segments.length) {
            has=false;
            segments.some(function(_segment){
              return has=(segment.id==_segment.id);
            });
          }
          if (!has) {
            if (segment.marker && cluster.hasLayer(segment.marker)) {
              cluster.removeLayer(segment.marker);
            }
            continue;
          }

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

        }

        if (!map.hasLayer(cluster)) {
          map.addLayer(cluster);
        }

      }, // updateMarkers

      getCurrentPosition: function(){
        // try to get geolocation from navigator
        if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
          var q=$q.defer();

          try {
            navigator.geolocation.getCurrentPosition(function(position) {
              console.log(position);
              q.resolve({position: position});

            },function(){
              // on error, try to get ip location
              $scope.getGeoIp()
              .then(function(args){
                console.log(args.geoIp);
                if (args.geoIp && args.geoIp.country_code) {
                  args.country_code=args.geoip.country_code;
                }
                if (args.geoIp && args.geoIp.longitude!==undefined) {
                  args.position={
                    longitude: args.geoIp.longitude,
                    latitude: args.geoIp.latitude
                  }
                }
                q.resolve(args);
              })
              .catch(q.reject);
            });

          } catch(e) {
            q.reject(e);
          }

          return q.promise

        } else {
          return $q.reject();
        }

      }, // getCurrentPosition

      getGeoIp: function(args){
        return $http({
          method: 'GET',
          cache: true,
          responseType: 'json',
          url: '/geoip'
        })
        .then(function(response){
          args=args||{};
          args.geoIp=response.data;
          args.country_code=response.data.countryCode;
          args.position={
            coords: {
              longitude: response.data.lon,
              latitude: response.data.lat
            }
          };
          return args;

        })

      }, // getGeoIp

      getCountryCode: function(args){
        if (args.country_code) return $q.resolve(args);
        if (!args.position) return $q.reject(new Error('could not get country code'));

        return $scope.getReverseGeoRef(args);

      }, // getCountryCode

      getReverseGeoRef: function(args){
        var position=args.position;

        return $http({
          method: 'GET',
          cache: true,
          responseType: 'json',
          url: '//nominatim.openstreetmap.org/reverse?osm_type=N&format=json&lat='+position.coords.latitude+'&lon='+position.coords.longitude

        })
        .then(function(response){
          args.nominatim=response.data;
          args.country_code=response.data.address.country_code;
          return args;
        })

      }, // getReverseGeoRef

      getCountryBBox: function(args){
        var countryCode=args.country_code.toLowerCase();

        return $http({
          method: 'GET',
          cache: true,
          responseType: 'json',
          url: '//raw.githubusercontent.com/doxel/country-bounding-boxes/master/dataset/'+countryCode+'.json'

        });

      }, // getCountryBBox

      setBounds: function(response){
        var bbox=response.data.bbox[0]
        $scope.bounds.southWest.lat=bbox[1];
        $scope.bounds.southWest.lng=bbox[0];
        $scope.bounds.northEast.lat=bbox[3];
        $scope.bounds.northEast.lng=bbox[2];
      } // setBounds;

    });

    $scope.getCurrentPosition()
    .then($scope.getCountryCode)
    .then($scope.getCountryBBox)
    .then($scope.setBounds)
    .catch(console.log)
    .finally($scope.init);;

  }]);

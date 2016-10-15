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
  .controller('GalleryEarthCtrl', function ($scope,$q,$state,$rootScope,$timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.scope=$scope;
    var mousewheelTimeout;
    var mousemoveTimeout;

    angular.extend($scope,{
      earth_getClass: function(){
        return $scope.earth_reallyvisible?'visiblity: visible':'visiblity: hidden;';
      },

      init: function() {
        $scope.$on('$stateChangeSuccess',function(e, toState){
          $scope.update(toState);
        });

        // show location on segment.clicked
        $scope.$on('segment.clicked',function($event,args){
          if (!$scope.earth_visible) {
            return;
          }
          var segment=args.segment;
          $scope.we2.setView(segment);
        });


        $scope.update($state.current);
      },

      update: function(state) {

        if (state.name=='gallery.view.earth') {
          if ($scope.earth_visible) {
            return;
          }

          $(window).on('mousewheel.earth', function(e){
              if (mousewheelTimeout) {
                  clearTimeout(mousewheelTimeout);

              } else {
                  $('.we-pm-icon').css('pointer-events','none');
              }
              mousewheelTimeout=setTimeout(function(){
                  $('.we-pm-icon').css('pointer-events','');
                  mousewheelTimeout=null;
              },150);

          }).on('mousemove.earth', function(){
              if (mousemoveTimeout) {
                  clearTimeout(mousemoveTimeout);
              }
              mousemoveTimeout=setTimeout(function(){
                 $('.we-pm-icon').css('pointer-events','');
                 mousemoveTimeout=null;
              },150);

          });

          $scope.earth_reallyvisible=false;
          $scope.earth_visible=true;
          $timeout(function(){
            $scope.we2.ready.then(function(){
              $scope.show();
            });
          },1);
        } else {
          if ($scope.earth_visible) {
            clearTimeout($scope.layerOpacityInterval);
            $rootScope.earth=$scope.earth=earth=null;
            $scope.earth_visible=false;
            $scope.earth_reallyvisible=false;
            $(window).off('.earth');
          }
        }
      },

      show: function() {

        //WE_init();

        var c;
        if (false && $scope.params.c) {
          c=$scope.params.c.split(':');
          c[0]=Number(c[0]);
          c[1]=Number(c[1]);
          c[2]=Number(c[2]);
          while (c[0]<0) c[0]+=360;
          while (c[1]<0) c[1]+=180;
        } else {
          c=[8,47,3];
        }

//        if (!$scope.alreadyShown) {
        $scope.we2.earth.setView([-172,-47],-4);
        $scope.earth_reallyvisible=true;

//        $timeout(function(){


            $scope.we2.zoomAndPan({
                to: {
                    lon: c[0],
                    lat: c[1],
                    zoom: 3
                },
                steps: 90,
                noConstraints: true,
                forceStayTheCourse: true,
                firstPan: true,
                callback: loaded
            });
            $scope.alreadyShown=true;
 /*       } else {
        $scope.we2.earth.setView([c[0],c[1]]);
            $scope.earth_reallyvisible=true;
        $scope.earth_reallyvisible=true;
        loaded();
        }


 //       }, 2000);

      /*
        var iframe=$('iframe.earth');
        if (iframe.attr('src')=='about:blank') {
          iframe.attr('src','/earth/deploy/index1.html');
          iframe[0].contentWindow.parentScope=$scope;
          setTimeout(function(){
            iframe[0].contentWindow.parentScope=$scope;
          },1000);
        }
        iframe.height($('body').height()-64);
        $(window).off('resize.earth').on('resize.earth',function(){
          iframe.height($('body').height()-64);
        });

        $scope.iframe_earth=iframe[0];
        // when switching back to the view without reloading the iframe,
        // 'webglearth2.loaded' is not fired and contentWindow.earth is already set
        $scope.earth=$scope.iframe_earth.contentWindow.earth;
        if ($scope.earth) {
          $scope.$emit('webglearth2.ready');

        } else {
          $scope.$on('webglearth2.loaded',function($event){
            $scope.webglearth2_loaded=true;
            $scope.earth=$scope.iframe_earth.contentWindow.earth;
            $scope.$emit('webglearth2.ready');
          });
        }
*/
      }

    });
    var origin='localhost:3000';
    var place_list=[];
    var earth;

    function WE_init() {
      var options = {
        sky: true,
        atmosphere: true,
        dragging: true,
        tilting: true,
        zooming: true,
        center: [8, 47],
        zoom: 3
      };
      earth=$rootScope.earth=$scope.earth= new WE.map('earth_div', options);

      var blueMarble=WE.tileLayer('//{s}.'+appConfig.tileServer+'/blue-marble/{z}/{x}/{y}.png',{
          attribution: 'Blue-Marble imagery is (c) 2004 NASA',
          tilesize: 256,
          tms: true,
          subdomains: ['a','b','c']
      });
      blueMarble.addTo(earth);

      var osm=WE.tileLayer('//{s}.'+appConfig.tileServer+'/osm/{z}/{x}/{y}.png',{
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
         subdomains: ['a','b','c'],
         opacity: 0
      });
      osm.addTo(earth);

      var toner = WE.tileLayer('//{s}.'+appConfig.tileServer+'/stamen/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
        opacity:0
      });
      toner.addTo(earth);

      var prevZoom=earth.getZoom();
      $scope.layerOpacityInterval=setInterval(function(){
        var newZoom=earth.getZoom();
        if (newZoom!=prevZoom) {
          prevZoom=newZoom;
          console.log(newZoom,Math.min(1,Math.max((newZoom-9)/4,0.0)));
          osm.setOpacity(newZoom<9?0:Math.min(1,Math.max((newZoom-9)/4,0.2)));
          toner.setOpacity(newZoom>9?0:0.2);
          blueMarble.setOpacity(newZoom>13?0:1);
        }
      },300);

    } // WE_init

//    $scope.we2.zoomandpanForceStayTheCourse=true;
    function loaded() {
      return;
          $rootScope.$broadcast('webglearth2.loaded');

          if ($scope.params.c) {
            var c=$scope.params.c.split(':');
            $scope.we2.setView(c,c[2]);
          } else if ($scope.params.s) {
            $scope.getSegment($scope.params.s).then(function(segment){
              $scope.we2.setView(segment);
            });
          }

          loadMarkers();


    }

    function loadMarkers(){
      return;
        $.ajax({
            url: "../../markers.json",
            dataType: 'json',
            success: function(json){
                if (json.error) {
                    console.log(error);
                    alert(error.message);
                    return;
                }
                addMarkers(json);
            },
            error: function(){
                console.log(arguments);
                alert("Could not load markers");
            }
        });

    } // loadMarkers

   // for standalone viewer
   function addMarkers(json) {
       place_list=json;
       for(var uri in place_list) {
           if (place_list[uri].error) {
               console.log(uri,place_list[uri].error);
               delete place_list[uri];
               continue;
           }
           var place=place_list[uri];
           var timestamp=new String(uri).substring(uri.lastIndexOf('/') + 1);
           var thumb='/doxel-viewer/thumbs/'+timestamp+'.jpeg';
           var marker=WE.marker([place.lat, place.lon], 'logo_doxel_24.png',24,24);
           marker.bindPopup('<div data-thumb="'+thumb+'"><a></a>'+place.display_name+'</div>');
           place_list[uri].marker=marker;
           marker.addTo(earth);
           (function(uri,thumb,timestamp,place){
               marker.on('click',function(e){
                   var popup=$(e.target.element).find('.we-pp');
                   $('.we-pp').not(popup).css('visibility','hidden');
                   if (!$('.thumb',popup).length) {
                      var div=$('[data-thumb]',popup);
                      var thumb=div.data('thumb');
                      getLocalTime(Number(timestamp.split('_')[0]),place.lat,place.lon,function(date){
                          var div=$('[data-thumb="'+thumb+'"]');
                          $(div).prepend(date);
                      });
                      $('a',div).replaceWith('<a class="thumb" href="/doxel-viewer/viewer.html?src='+uri+'" target="_viewer" style="background-image: url('+thumb+');"></a>');
                   }
               });
           })(uri,thumb,timestamp,place);
       }

   } // addMarkers

   function removeMarkers() {
       for(var idx in place_list) {
         var marker=place_list[idx].marker;
         if (marker) marker.removeFrom(earth);
       }
   }

   // for viewer using doxel-loopback api
   function setMarkers(json) {
       removeMarkers();
       place_list=json;
       for(var idx in place_list) {
           if (place_list[idx].error) {
               console.log(idx,place_list[idx].error);
               delete place_list[idx];
               continue;
           }
           var place=place_list[idx];
           var marker=WE.marker([place.lat, place.lon], 'logo_doxel_24.png',24,24);
           marker.bindPopup('<div data-thumb="'+place.thumb+'"><a></a>'+place.display_name+'</div>');
           place.marker=marker;
           marker.addTo(earth);
           (function(place){
               marker.on('click',function(e){
                   var popup=$(e.target.element).find('.we-pp');
                   $('.we-pp').not(popup).css('visibility','hidden');
                   if (!$('.thumb',popup).length) {
                      var div=$('[data-thumb]',popup);
                      var thumb=div.data('thumb');
                      getLocalTime(Number(place.timestamp.split('_')[0]),place.lat,place.lon,function(date){
                          var div=$('[data-thumb="'+thumb+'"]');
                          $(div).prepend(date);
                      });
//                        $('a',div).replaceWith('<a class="thumb" href="/api/segments/viewer/'+place.segmentId+'/'+place.timestamp+'/viewer.html" target="_viewer" style="background-image: url('+thumb+');"></a>');
                      $('a',div).replaceWith('<a class="thumb" style="background-image: url('+thumb+');"></a>');
                      $('a',div).on('click',function(){
                        window.parentScope.$emit('webglearth2.viewer',place);
                      });
                   }
               });
           })(place);
       }

   } // addMarkers

    $scope.init();

  });

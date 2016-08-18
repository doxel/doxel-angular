/*
 * viewer.js
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
 * @ngdoc function
 * @name doxelApp.controller:ViewerCtrl
 * @description
 * # ViewerCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('ViewerCtrl', function ($scope,errorMessage,Segment,$q) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // yeah its ugly but we dont want to reload everything
    $scope.$on('$routeChangeStart',function(e, next, current){
        $('iframe.viewer, iframe.earth').hide(0);
    });

    $scope.$on('$routeChangeSuccess',function(e, next, current){
      var iframe=$('iframe.earth');
      if (!$('iframe.viewer.visible').length && iframe.attr('src')=='about:blank') {
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

    $scope.segmentClick=function(segment) {

      if ($('iframe.viewer.visible').length) {
        $('iframe.viewer').attr('src','/api/segments/viewer/'+segment.id+'/'+segment.timestamp+'/viewer.html');
        return;

      }

      var center=$scope.earth.getCenter();
      var zoom=$scope.earth.getZoom();
      var options={
        to: {
          lon: segment.lng,
          lat: segment.lat
        },
        steps: 25
      };
      if (zoom<18 && Math.abs(center[1]-segment.lng)<1e-6 && Math.abs(center[0]-segment.lat)<1e-6) {
        options.to.zoom=Math.min(18,zoom+1);
      }

      $scope.iframe_earth.contentWindow.zoomandpan(options);

    };

    $scope.$on('segment.click',function($event,segment){
      $scope.segmentClick(segment);
    });

    $scope.visible=true;

    Segment.find({
      filter: {
        where: {
          lat: {exists: true}
        }
      }
    }, function(segments){
      $scope.segments=segments;
      var place_list={};
      segments.forEach(function(segment){
        place_list[segment.id]={
          segmentId: segment.id,
          lon: segment.lng,
          lat: segment.lat,
          timestamp: segment.timestamp,
          thumb: '/api/segments/preview/'+segment.id+'/'+segment.timestamp+'/'+segment.previewId
        };
      });

      $scope.q.promise.then(function(){
        $scope.iframe_earth.contentWindow.setMarkers(place_list);
      });


    }, function(err){
      errorMessage.show('Could not load segments');
    });

    $scope.$on('webglearth2.viewer',function($event,place){
      $('iframe.earth').attr('src','about:blank');
      $('iframe.viewer').attr('src','/api/segments/viewer/'+place.segmentId+'/'+place.timestamp+'/viewer.html')
      .addClass('visible');
    });

  });

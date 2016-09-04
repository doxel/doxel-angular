/*
 * gallery.js
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
 * @name doxelApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryCtrl', function ($scope,$rootScope,$state,errorMessage,Segment,$timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      selected: {},
      center: [0,0]
    });

    $scope.$on('segments',function(event,segments){
      $scope.segments=segments;
    })

    //// on state change success
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      // scope is visible when beginning with 'gallery'
      $scope.visible=(toState.name.substr(0,7)=='gallery');
      if (!$scope.visible) return;

      var params=$rootScope.params;

      // when state is literal "gallery", switch to saved child view name,
      // if any, else switch to gallery.view.thumbs
      if (toState.name!='gallery') {
        params.v=toState.name.split('.').pop();
      }

      // timeout is needed so that ui-leaflet display and behave properly,
      // when returning to gallery from other tabs
      $timeout(function(){
        $state.go('gallery.view.'+(params.v||'thumbs'));
      },1)

    });

    //// onload
    // scope is visible when beginning with 'gallery'
    $scope.visible=($state.current.name.substr(0,7)=='gallery');
    if ($state.current.name=='gallery') {
      // when state is literal "gallery", switch to gallery.view.thumbs
      $state.go('gallery.view.thumbs');
    }


    // load segments
    // TODO: load chunks
    $scope.segmentFind=Segment.find({
      filter: {
        where: {
          lat: {exists: true}
        }
      }
    }, function(segments){
      $scope.segments=segments;

/*
      $scope.place_list={};
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
*/
    }, function(err){
      errorMessage.show('Could not load segments');
    });

  });

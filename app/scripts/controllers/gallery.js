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
  .controller('GalleryCtrl', function ($scope,$rootScope,$state,errorMessage,Segment,$timeout,$location,$q,appConfig) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      segments: [],
      selected: {},  // unloaded segment could be selected because of paging or page reload. TODO: restore selection on load
      center: [0,0],
      init: function(){

        //// on state change success
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          // scope is visible when beginning with 'gallery'
          $scope.visible=(toState.name.substr(0,7)=='gallery');
          if (!$scope.visible) return;

          var params=$rootScope.params;

          // when state is "gallery", switch gallery.view.thumbs

          // timeout is needed so that ui-leaflet display and behave properly,
          // when returning to gallery from other tabs
          if (toState.name=='gallery')
          $timeout(function(){
            $state.go('gallery.view.thumbs',{},{
              location: 'replace'
            });
          },1)

        });

        //// onload
        // scope is visible when beginning with 'gallery'
        $scope.visible=($state.current.name.substr(0,7)=='gallery');
        if ($state.current.name=='gallery') {
          // when state is literal "gallery", switch to gallery.view.thumbs
          var view=$location.search().v||$rootScope.params.v||'thumbs';
          $state.go('gallery.view.'+view,{
            location: 'replace'
          });
        }

        $scope.loadSegments();

      }, // init

      loadSegments: function(direction) {
        if ($scope.loadingSegments) {
          return;
        }
        $scope.loadingSegments=true;

        var filter={
          where: {
              lat: {exists: true},
              status: 'R'
          },
          limit: appConfig.segmentsChunkSize
        }

        direction=direction||'forward';

        if (direction=='forward') {
          if ($scope.segments.length) {
            var segment=$scope.segments[$scope.segments.length-1];
            filter.where.timestamp={
              lte: segment.timestamp
            };
            filter.where.id={
              neq: segment.id
            };
          }
          filter.order='timestamp DESC';
        } else {
          // backward
          if ($scope.segments.length) {
            var segment=$scope.segments[0];
            filter.where.timestamp={
              gte: segment.timestamp
            };
            filter.where.id={
              neq: segment.id
            };
            filter.order='timestamp ASC';
          }
        }

        // load segments
        $scope.segmentFind=Segment.find({
          filter: filter
        }, function(segments){
          if (segments && segments.length) {
            if (direction=='backward') {
              // prepend segments
              segments.reverse();
              angular.forEach(segments,function(segment){
                $scope.segments.unshift(segment);
              });
            } else { // direction==forward
              // append segments
              $scope.segments=($scope.segments||[]).concat(segments);
            }
          }
          $scope.loadingSegments=false;
          $rootScope.$broadcast('segments-loaded',segments);

          return $scope.segments;

        }, function(err){
          $scope.loadingSegments=false;
          errorMessage.show('Could not load segments');
        });

      }, // loadSegments

      getSegment: function(segmentId){
          var q=$q.defer();
          var found;
          // search in loaded segments
          $scope.segments.some(function(segment){
            if (segment.id==segmentId) {
              found=true;
              q.resolve(segment);
              return true;
            }
          });
          if (!found || $scope.segmentFind.$resolved===false) {
            // search in segment being loaded
            $scope.segmentFind.$promise.then(function(_segments){
              _segments.some(function(segment){
                if (segment.id==segmentId) {
                  found=true;
                  q.resolve(segment);
                  return true;
                }
              });
              if (!found) {
                // or finally load the required segment
                // TODO: "scroll" to this segment and load segments around
                Segment.findById({id: segmentId},function(segment){
                    q.resolve(segment);
                },q.reject);
              }
            });
          }
          return q.promise;
      } // getSegment
    });

    $scope.init();

  });

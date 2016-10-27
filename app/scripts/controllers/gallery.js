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
      end: {},
      loaded: {},
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
          $state.go('gallery.view.thumbs',{
            location: 'replace'
          });
        }

        var segmentId=$rootScope.params.s||$location.search().s;
        if (segmentId) {
        /*  $scope.getSegment(segmentId).then(function(segment){
            $timeout(function(){
              segment.selected=true;
              $scope.broadcast('showThumb',segmentId);
            },1000);
          });
*/
        } else {
          $scope.loadSegments();
        }

      }, // init

      loadSegments: function(direction) {
        console.trace('loadseg');
        if ($scope._loadSegments) {
          return $scope._loadSegments;
        }
        $scope._loadSegments=$q.defer();
        $scope._loadSegments.promise.finally(function(){
          $scope._loadSegments=null;
        });

        direction=direction||'forward';

        if ($scope.end[direction]) {
          // end reached
          $scope._loadSegments.resolve([]);
          return;
        }

        var filter={
          where: {
              lat: {exists: true},
              status: 'R'
          },
          limit: appConfig.segmentsChunkSize
        }

        if (direction=='forward') {
          // load chunk after last segment in $scope.segments
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
          // load chunk before first segment in $scope.segments
          if ($scope.segments.length) {
            var segment=$scope.segments[0];
            filter.where.timestamp={
              gte: segment.timestamp
            };
            filter.where.id={
              neq: segment.id
            };
          }
          filter.order='timestamp ASC';
        }

        // do load segments
        Segment.find({
          filter: filter

        }, function(segments){
          if (!segments || !segments.length) {
            // end reached
            $scope.end[direction]=true;

          } else {
            if (direction=='backward') {
              // prepend segments
              segments.reverse();
              angular.forEach(segments,function(segment){
                if (!$scope.loaded[segment.id]) {
                  $scope.segments.unshift(segment);
                  $scope.loaded[segment.id]=true;
                }
              });

            } else { // direction==forward
              // append segments
              angular.forEach(segments,function(segment){
                if (!$scope.loaded[segment.id]) {
                  $scope.segments.push(segment);
                  $scope.loaded[segment.id]=true;
                }
              });
            }
          }
          $scope._loadSegments.resolve(segments);
//          $rootScope.$broadcast('segments-loaded',segments);

        }, function(err){
          console.log(err);
          errorMessage.show('Could not load segments');
          $scope._loadSegments.reject(err);
        });

        return $scope._loadSegments;

      }, // loadSegments

      getSegment: function(segmentId){
        console.trace('getseg');
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
          if (!found) {
            // currently loading segments ?
            if ($scope._loadSegments && $scope._loadSegments.promise.$$state.pending) {
              // search in segment being loaded
              $scope._loadSegments.promise.then(function(_segments){
                _segments.some(function(segment){
                  if (segment.id==segmentId) {
                    found=true;
                    q.resolve(segment);
                    return true;
                  }
                });
                if (!found) {
                  // or finally load the required segment
                  $scope.loadSegmentsAround(segmentId,function(segment){
                    q.resolve(segment);
                  },q.reject);
                }
              });
            } else {
              // or finally load the required segment
              $scope.loadSegmentsAround(segmentId,function(segment){
                q.resolve(segment);
              },q.reject);
            }
          }
          return q.promise;
      }, // getSegment

      loadSegmentsAround: function(segmentId,_then,_catch) {
        console.trace('around');
        Segment.findById({id: segmentId},function(segment){
          if (segment) {
            Array.prototype.splice.apply($scope.segments,[0,$scope.segments.length,segment]);
            $scope.loadSegments('backward').promise.then(function(){
              $timeout(function(){
                $scope.loadSegments('forward').promise.then(function(){
                  _then(segment);
                },_catch);
              });
            },_catch);
          } else {
            _catch(new Error('Segment not found !'));
          }
        },_catch);

      } // loadSegmentsAround

    });

    $scope.init();

  });

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
  .controller('GalleryCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'errorMessage',
    'Segment',
    '$timeout',
    '$location',
    '$q',
    'appConfig',
    'segmentsService',
    function ($scope,$rootScope,$state,errorMessage,Segment,$timeout,$location,$q,appConfig,segmentsService) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      this.thumbsWidth=200;

      angular.extend($scope,{
        end: {},
        loaded: segmentsService.loaded,
        segments: segmentsService.segments,
        center: [0,0],
        init: function(){

          $scope.updateMetrics();

          //// on state change success
          $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            console.log(toState)
            // scope is visible when beginning with 'gallery'
            $scope.visible=(toState.name.substr(0,7)=='gallery');
            if (!$scope.visible) return;

            $scope.updateMetrics(toState);

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

        updateMetrics: function(state){
          $scope.thumbsH=Math.floor($('#gallery').width()/200);
          $scope.thumbsV=Math.round(($('#gallery .mCustomScrollbar').height()||$('body').height())/150);
          switch($scope.thumbsPosition) {
            case 'thumbs-left': $scope.thumbsH=1; break;
            case 'thumbs-bottom': $scope.thumbsV=1; break;
          }
          $scope.maxThumbs=Math.floor($scope.thumbsH * $scope.thumbsV ) || 8;
          while($scope.maxThumbs<8) $scope.maxThumbs*=2;
        },

        getLimit: function(){
          return Math.min(16,Math.round($scope.thumbsH*$scope.thumbsV*1.5)||12);
        },

        _galleryFilter: {
          default: function(){
            return $q.when({
              where: {
                 pointCloudId: {exists: true}
              },
              include: 'pointCloud'
            });
          }
        },

        getGalleryFilter: function() {
          var q=$q.defer();

          // get default filter
          $scope._galleryFilter.default().then(function(filter0){

            // get current state filter
            var stateFilter=$scope._galleryFilter[$state.current.name];
            if (stateFilter) {
              stateFilter().then(function(filter1){
                var filter=angular.merge({},filter0,filter1);
                q.resolve(filter);
              });

            } else {
              // or return vanilla default filter
              q.resolve(filter0);
            }
          });

          return q.promise;
        }, // getGalleryFilter

        loadSegments: function(direction,count) {
          $scope.updateMetrics();
          if ($scope._loadSegments) {
            return $scope._loadSegments;
          }
          var segments;
          $scope._loadSegments=$q.defer();
          $scope._loadSegments.promise.then(function(_segments){
            segments=_segments;
          }).finally(function(){
            $scope._loadSegments=null;
            $scope.$broadcast('segments-loaded',segments);
          });

          direction=direction||'forward';

          if ($scope.end[direction]) {
            // end reached
            $scope._loadSegments.resolve([]);
            return $scope._loadSegments;
          }

          $scope.getGalleryFilter().then(function(filter){

            filter.limit=count||$scope.getLimit();
            filter.limit+=$scope.thumbsH-((($scope.segments.length + filter.limit) % $scope.thumbsH ));

            //console.log('limit',filter.limit)

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
            Segment._find({
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
                      $scope.loaded[segment.id]=segment;
                    }
                    if (segment.pointCloudId && !segment.pointCloud) {
                      console.log('no pointcloud '+segment.pointCloudId+' for segment '+segment.id);
                      return;
                    }
                    var alreadyDisplayed=false;
                    $scope.segments.some(function(_segment,i){
                      return alreadyDisplayed=(_segment.id==segment.id);
                    });
                    if (!alreadyDisplayed) {
                      if (!$scope.gallery.map_wasvisible && $state.current.name!='gallery.view.map') {
                        $scope.segments.some(function(_segment,i){
                          if (segment.timestamp>_segment.timestamp) {
                            $scope.segments.splice(i,0,segment);
                            return true;
                          }
                        });
                      }
                    }
                  });

                } else { // direction==forward
                  // append segments
                  angular.forEach(segments,function(segment){
                    if (!$scope.loaded[segment.id]) {
                      $scope.loaded[segment.id]=segment;
                    }
                    if (!segment.pointCloud) {
                      console.log('no pointcloud '+segment.pointCloudId+' for segment '+segment.id);
                      return;
                    }
                    var found;
                    $scope.segments.some(function(_segment,i){
                      return found=(_segment.id==segment.id);
                    });
                    if (!found) {
                      if (!$scope.gallery.map_wasvisible && $state.current.name!='gallery.view.map') {
                        $scope.segments.push(segment);
                      }
                    }
                  });
                }
              }
              $('#segments .mCustomScrollbar').mCustomScrollbar('update');
              $scope._loadSegments.resolve(segments);
    //            $rootScope.$broadcast('segments-loaded',segments);
    //          });

            }, function(err){
              console.log(err);
              errorMessage.show('Could not load segments');
              $scope._loadSegments.reject(err);
            });

          });

          return $scope._loadSegments;

        }, // loadSegments

        getSegment: function(segmentId){
            var q=$q.defer();
            var found;
            // search in loaded segments
            for (var id in $scope.loaded) {
              if (id==segmentId) {
                found=true;
                q.resolve($scope.loaded[id]);
                return q.promise;
              }
            }
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
          _then=_then||function(){};
          _catch=_catch||function(){};

          var q=$q.defer();

          if ($scope.loaded[segmentId]) {
            // dont reload segment (preserve attributes)
            q.resolve();

          } else {
            Segment.findById({
              id: segmentId,
              filter: {
                include: 'pointCloud'
              }
            }, function(segment){
              if (segment) {
                $scope.loaded[segment.id]=segment;
                q.resolve();

              } else {
                _catch(new Error('Segment not found !'));
              }

            },_catch);
          }

          q.promise.then(function(){
            var segment=$scope.loaded[segmentId];

            // reduce segments displayed to loaded segment
            Array.prototype.splice.apply($scope.segments,[0,$scope.segments.length,segment]);

            // load segments backward
            $scope.loadSegments('backward').promise.then(function(){

              // load segments forward
              $timeout(function(){
                $scope.loadSegments('forward').promise.then(function(){
                  _then(segment);
                },_catch);
              });

            },_catch);
          });

        } // loadSegmentsAround

      });

      $scope.init();

    }]);

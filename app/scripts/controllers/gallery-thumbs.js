/*
 * gallery-thumbs.js
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
 * @name doxelApp.controller:GalleryThumbsCtrl
 * @description
 * # GalleryThumbsCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryThumbsCtrl', function ($scope,$rootScope,errorMessage,Segment,$q,$location,$state,$timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    // we inherit $scope.visible from GalleryCtrl
    $scope.thumbs_visible=false;
    $scope.segmentFind.$promise.then(function(){
      $scope.thumbs_visible=($state.current.name.substr(0,7)=='gallery');
    });

      $scope.updateButtons=function(){
        var selection=$scope.getSelection();
        if (selection.length) {
        }
      }

      $scope.segmentClick=function(segment) {

  //      $scope.$root.$broadcast('segment.show',segment);
  //      $state.go('gallery',{segmentId: segment.id},{notify: false, reload:' gallery.details'});
          $scope.select(segment);
          $rootScope.params.s=segment.id;;
          $location.search($rootScope.params);
          $rootScope.$broadcast('segment.clicked',{segment: segment});
          $scope.$emit('updateButtons');

  /*
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
        */

      };

      $scope.getSelection=function(){
        var result=[];
        for (var segmentId in $scope.selected) {
          if ($scope.selected.hasOwnProperty(segmentId)) {
            result.push(segmentId);
          }
        }
        return result;
      }

      // TODO: find a way to preserve $scope.selected when switching states
      // eg between home and gallery
      // in the meanwhile, rebuild $scope.selected:
      for (var s in $scope.segments) {
        if (s.selected) {
          $scope.selected[s.id]=true;
        }
      }

      $scope.$on('segment.click',function($event,segment){
        $event.stopPropagation();
        $event.preventDefault();
        $scope.segmentClick(segment);
      });

      // select segment in thumb list
      $scope.select=function(segment,options) {
        if (!options) {
          options={
            selected: true,
            unique: true
          };

        }
        if (options.selected) {
          if (options.unique) {
            // unselect other tree paths
            for (var segmentId in $scope.selected) {
              if ($scope.selected.hasOwnProperty(segmentId)){
                delete $scope.selected[segmentId].selected;
                delete $scope.selected[segmentId];
              }
            };
          }

          segment.selected=true;
          $scope.selected[segment.id]=segment;

        } else {
          var index;
          for (var segmentId in $scope.selected) {
            if (segmentId==segment.id) {
              delete $scope.selected[segmentId].selected;
              delete $scope.selected[segmentId];
            }
          };
        }

        if (options.show) {
          // clicked in other view
          // get thumbnail
          var thumb;
          thumb=$('#gallery-thumbs a[data-sid='+segment.id+'] .thumb');

          if (options.selected) {
            // scroll to selected item
            $scope.showThumb(thumb);
          }
        }

      }

      $scope.showThumb=function(thumb){
        if (thumb && thumb.length) {
          var itemTop=thumb.position().top;
          var nicescroll=thumb.closest('[ng-nicescroll]');
          var offset=(nicescroll.height()-thumb.height())/2;
          nicescroll.scrollTop(nicescroll.scrollTop()+itemTop-(offset>0?offset:0));
        }
      }

      $scope.getClass=function(){
        return ($state.name=='gallery.view.thumbs')?'':'_bottom';
      }

      $scope.updateVisibility=function(state){
        $scope.thumbs_visible=(state.name.substr(0,7)=='gallery');

        if ($scope.thumbs_visible) {

          // restore (single) thumb selection
          var params=$rootScope.params;
          if (params.s) {
            var thumb=$('#gallery-thumbs a[data-sid='+params.s+']');
            if (!thumb.hasClass('selected')) {
              $scope.$parent.segmentFind.$promise.then(function(segments){
                for (var i in segments) {
                  if (segments[i].id==params.s) {
                    $timeout(function(){
                      $scope.segmentClick(segments[i]);
                    },100);
                    return;
                  }
                }
              });
            }
          }

          if (state.name=="gallery.view.thumbs") {
            // full screen for thumbs view
            $('#gallery-thumbs #segments').removeClass('_bottom');
          } else {
            // one row or column of thumbs for map and earth view
            $('#gallery-thumbs #segments').addClass('_bottom');
          }
        }

      };

      $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $scope.updateVisibility(toState);
      });

      $scope.updateVisibility($state.current);

  /*
      $scope.$on('webglearth2.viewer',function($event,place){
        $('iframe.earth').attr('src','about:blank');
        $('iframe.viewer').attr('src','/api/segments/viewer/'+place.segmentId+'/'+place.timestamp+'/viewer.html')
        .addClass('visible');
      });
  */
    });

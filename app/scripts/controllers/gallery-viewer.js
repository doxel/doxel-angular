/*
 * gallery-viewer.js
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
 * @name doxelApp.controller:GalleryViewerCtrl
 * @description
 * # GalleryViewerCtrl
 * Controller of the doxelApp
 */

angular.module('doxelApp')
  .controller('GalleryViewerCtrl', function ($timeout,$scope,$rootScope,$location,$q,Segment,$state,$http,LoopBackAuth,errorMessage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      viewer_state: 'gallery.view.cloud',

      updateViewerVisibility: function(state) {
         console.log(state)
        if (state==$scope.viewer_state) {
          if (!$scope.viewer_visible) {
            $scope.viewer_visible=true;
            $scope.show();
          }
        } else {
          if ($scope.viewer_visible) {
            $scope.viewer_visible=false;
            $scope.hide();
          }
        }
      },

      init: function(){
        $scope.updateViewerVisibility($state.current.name);

        $rootScope.$on('$stateChangeSuccess',function(event,toState){
          $scope.updateViewerVisibility(toState.name);
        });

        $scope.$on('segment.setview',function(event,segment){
          if ($scope.$state.current.name==$scope.viewer_state) {
            $scope.show();
          }
        });
      },

      show: function(){
        var segmentId=$location.search().s || $scope.params.s || ($scope.segments && $scope.segments[0] && $scope.segments[0].id);
        if (!segmentId) {
          $scope.segmentFind.$promise.then(function(_segments) {
            $rootScope.$broadcast('segment.click',_segments[0]);
          });
          return;
        }

        var q=$q.defer();

        // get segment details
        $scope.getSegment(segmentId).then(function(segment){
          q.resolve(segment);
        },q.reject);

        q.promise.then(function(segment){
          var src=$('iframe.viewer').attr('src');
          var toSrc='/api/segments/viewer/'+segment.id+'/'+segment.timestamp+'/viewer.html';
          if (src!=toSrc) {
            $http.head(toSrc,{
              headers: {
                authorization: LoopBackAuth.accessTokenId
              }
            }).then(function(res){
              if (Math.floor(res.status/100)!=2) {
                errorMessage.show('Could not open viewer: '+res.statusText);
              } else {
                $('iframe.viewer').attr('src',toSrc);
                $timeout(function(){
                  $rootScope.$broadcast('showThumb',segment.id);
                },500);
            }
            }, function(err){
              console.log(err);
              errorMessage.show('Could not open viewer: '+err.statusText);
            });

          }
        });

      },

      hide: function(){
      }

    });

    $scope.init();


  });

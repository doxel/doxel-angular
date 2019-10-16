/*
 * gallery-viewer.js
 *
 * Copyright (c) 2015-2019 ALSENET SA - http://doxel.org
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
.controller('GalleryViewerCtrl', [
  '$timeout',
  '$scope',
  '$rootScope',
  '$location',
  '$q',
  'Segment',
  '$state',
  '$stateParams',
  '$http',
  'LoopBackAuth',
  'errorMessage',
  function (
    $timeout,
    $scope,
    $rootScope,
    $location,
    $q,
    Segment,
    $state,
    $stateParams,
    $http,
    LoopBackAuth,
    errorMessage
  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      viewer_state: 'gallery.view.cloud',

      updateViewerVisibility: function(state) {
         console.log(state)
        if (state.substr(0,$scope.viewer_state.length)==$scope.viewer_state) {
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
        if ($state.current && $state.current.name) $scope.updateViewerVisibility($state.current.name);

        $rootScope.$on('$stateChangeSuccess',function(event,toState){
          console.log(toState)
          $scope.updateViewerVisibility(toState.name);
        });

        $scope.$on('hashChange',function(event){
          if ($state.current.name.substr(0,$scope.viewer_state.length)==$scope.viewer_state) {
            $scope.show();
          }
        });

        $scope.$on('segment.setview',function(event,segment){
          if ($state.current.name.substr(0,$scope.viewer_state.length)==$scope.viewer_state) {
            $scope.show();
          }
        });
      },

      show: function(){
        var segmentId=$state.params.segmentId || $location.search().s || $scope.params.s || ($scope.segments && $scope.segments[0] && $scope.segments[0].id);
        $stateParams.segmentId=segmentId;
        if (!segmentId) {
          // when no segment is specified, wait for loaded segments and
          // open the first with a pointcloud
          // TODO: maybe theres no pointcloud in this segments chunk
          $scope.loadSegments().promise.then(function(_segments) {
            var segment=null;
            _segments.some(function(_segment){
              if (_segment.pointCloudId) {
                segment=_segment;
                return true;
              }
            });
            if (segment) {
              $rootScope.$broadcast('segment.click',segment);
            }
          });
          return;
        }

        var q=$q.defer();

        // get segment details
        $scope.getSegment(segmentId).then(function(segment){
          if (segment.pointCloudId) {
            q.resolve(segment);
          }
        },q.reject);

        q.promise.then(function(segment){
          // set viewer parameters
          var params=[];
          ($location.$$search.pose!==undefined) && params.push('pose='+$location.$$search.pose);
          ($state.params.pose!==undefined) && params.push('pose='+$state.params.pose);
          var search=(params.length)?'?'+params.join('&'):'';

          var src=$('iframe.viewer').attr('src');
          var toSrc='/api/segments/viewer/'+segment.id+'/'+segment.timestamp+(isNaN($state.params.id)?'':'/'+$state.params.id)+'/viewer.html'+search;
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
      },

      getPlyUrl: function(){
        return '/api/segments/'+$stateParams.segmentId+'/ply';
      },



    });

    $scope.init();


  }]);

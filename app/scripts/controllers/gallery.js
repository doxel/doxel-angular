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
    'Segment',
    '$timeout',
    '$location',
    '$q',
    'appConfig',
    'segmentsService',
    'ngNotify',
    'Tag',
    function ($scope,$rootScope,$state,Segment,$timeout,$location,$q,appConfig,segmentsService,ngNotify,Tag) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      this.thumbsWidth=200;

      angular.extend($scope,{
        _end: {},
        galleryMode: null,
        loaded: segmentsService.loaded,
        segments: segmentsService.segments,
        center: [0,0],
        end: function(direction,value){
          var mode=$scope.galleryMode;
          if (value===undefined) {
            return $scope._end[mode] && $scope._end[mode][direction];
          } else {
             var end=$scope._end[mode];
             if (!end) {
               end=$scope._end[mode]={};
            }
            end[direction]=value;
          }
        },

        dropdownInit: function(){
          var options=$scope.params;
          // based on code shared by bseth99 https://codepen.io/bseth99/pen/fboKH
          $('#gallery-dropdown').parent().on('click.dropdown', 'a', function(event) {
            var target=$(event.currentTarget);
            var name=target.attr('data-name');
            var input=target.find('input');

            if (name) {
              options[name]=!options[name];
              if (!options[name]) {
                delete options[name];
              }
              setTimeout(function(){
                input.prop('checked', options[name]);
              });
  //            $scope.$broadcast('options.gallery.'+name);
              console.log(options);
              $timeout(function(){
                $location.search($rootScope.params).replace();
              },1);

            }
            $(event.target).blur();
            return false;
          });

        }, // dropdownInit

        getPicturesCount: function(segments) {
          return segments.reduce(function(promise,segment){
            return promise.then(function(){
              if (segment.id && !segment.pointCloud) {
                // get image count
                if (!segment.picturesCount) {
                  return Segment.pictures.count({id: segment.id},function(res){
                    segment.picturesCount=res.count;

                  },function(err){
                    console.log(err);
                  });
                }
              }
            });
          },$q.resolve())
          .catch(console.log)

        }, // getPicturesCount


        sortField: 'created',
        sortASC: false,

        updateSortField: function(sort){
          if (sort) {
            sort=sort.split(' ');
            if (sort[0].length){
              $scope.sortField=sort[0];
            }
            if (sort[1]) {
              $scope.sortASC=(sort[1]=='ASC');
            } else {
              $scope.sortASC=true;
            }
          }

        },

        init: function(){

          $scope.updateSortField($scope.params.sort);
          $scope.updateMetrics();
          $scope.dropdownInit()

          //// on state change success
          $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            console.log(toState)
            // scope is visible when beginning with 'gallery'
            $scope.visible=(toState.name.substr(0,7)=='gallery');
            if (!$scope.visible) return;

            $scope.updateMetrics();

            var params=$scope.params;

            // when state is "gallery", switch gallery.view.thumbs

            // timeout is needed so that ui-leaflet display and behave properly,
            // when returning to gallery from other tabs
            if (toState.name=='gallery')
            $timeout(function(){
              $state.go('gallery.view.thumbs',{},{
                location: 'replace'
              });
            },1);
            $scope.updateGalleryMode(toState);
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
          $scope.updateGalleryMode($state.current);
          if (segmentId) {
          /*  $scope.getSegment(segmentId).then(function(segment){
              $timeout(function(){
                segment.selected=true;
                $scope.broadcast('showThumb',segmentId);
              },1000);
            });
  */
          } else {
            if ($state.current.name=='gallery.view.thumbs') $scope.loadSegments();
          }

        }, // init

        _galleryMode: {
          'gallery.view.thumbs': 'segment-thumbs',
          'gallery.view.map': 'segment-thumbs-onmap',
          'gallery.view.classifiers': 'segment-thumbs-tagged'
        },

        galleryMode: 'segment-thumbs',

        getGalleryMode: function(state){
          return $scope._galleryMode[state.name]||$scope.galleryMode;
        },

        updateGalleryMode: function(state) {
          var galleryMode=$scope.getGalleryMode(state);
          if ($scope.galleryMode!=galleryMode) {
            var from=$scope.galleryMode;
            $scope.galleryMode=galleryMode;
            $scope.$broadcast('gallery-mode-change',from,galleryMode);
          }
        },

        // compute thumb dimensions and number of thumbs displayed (>=8) used as
        // threshold for infinite scroll
        updateMetrics: function(){
          $scope.thumbsH=Math.floor($('#gallery').width()/200);
          $scope.thumbsV=Math.round(($('#gallery .mCustomScrollbar').height()||$('body').height())/150);
          switch($scope.thumbsPosition) {
            case 'thumbs-left': $scope.thumbsH=1; break;
            case 'thumbs-bottom': $scope.thumbsV=1; break;
          }
          $scope.maxThumbs=Math.floor($scope.thumbsH * $scope.thumbsV ) || 8;
          while($scope.maxThumbs<8) $scope.maxThumbs*=2;
        },

       // return number of segments to fetch from database at once,
       // max 16, default 12
        getLimit: function(){
          return Math.min(16,Math.round($scope.thumbsH*$scope.thumbsV*1.5)||12);
        },

        // storage for gallery views filters functions
        // (returning the filter a promise)
        _galleryFilter: {
          // the default filter
          default: function(){
            var filter={
              where: {
              },
              include: 'pointCloud'
            };

            var q=$q.defer();

            if ($scope.params['my-segments'] && localStorage.$LoopBack$currentUserId) {
              filter.where.userId=localStorage.$LoopBack$currentUserId;
            }
            if (!$scope.params['all-segments'])  {
              filter.where.pointCloudId={exists: true};
            }
            if ($scope.params.search && $scope.params.search.trim().length>=3) {
              Tag.find({
                filter: {
                  where: {
                    value: {
                      regexp: $scope.params.search.trim()
                    }
                  }
                }

              },function(tags){
                if (tags.length) {
                  var or=[];
                  tags.forEach(function(tag){
                    if (tag.id) {
                      var elemMatch={
                        tagId: {'$eq': tag.id},
                        score: {'$gte': 0.5}
                      };
                      or.push({tag:{elemMatch: elemMatch}});
                    }
                  });
                  filter.where.or=or;
                  return q.resolve(filter);

                } else {
                  return q.reject('no tag');
                }

              },function(err){
                console.log(err);
                q.reject(err);
              });

            } else {
              q.resolve(filter);
            }

            return q.promise;;
          },
        },

        // get the current filter as a promise (_galleryFilter.default + current state).
        getGalleryFilter: function(direction,from) {
          var q=$q.defer();

          // get default filter
          $scope._galleryFilter.default(direction,from).then(function(filter0){

            // get current state filter
            var stateFilter=$scope._galleryFilter[$scope.galleryMode];
            if (stateFilter) {
              stateFilter(direction,from).then(function(filter1){
                var filter=angular.merge({},filter0,filter1);
                q.resolve(filter);
              })
              .catch(q.reject);

            } else {
              // or return vanilla default filter
              q.resolve(filter0);
            }
          });

          return q.promise;
        }, // getGalleryFilter

        loadSegments: function(direction,from,count) {
          if (typeof(from)=='number') {
            if (count!=undefined) {
             throw new Error('wrong parameters');
            }
            count=from;
            from=undefined;
          }
          console.trace('loadSegments');
          $scope.updateMetrics();
          if ($scope._loadSegments) {
            return $scope._loadSegments;
          }
          var segments;
          var _filter;
          $scope._loadSegments=$q.defer();
          $scope._loadSegments.promise.then(function(_segments){
            segments=_segments;
            $scope.$broadcast('segments-loaded',{
              segments: segments,
              direction: direction,
              filter: _filter
            });
          })
          .catch(console.log)
          .finally(function(){
            $scope._loadSegments=null;
          });

          direction=direction||'forward';

          if ($scope.end(direction)) {
            // end reached
            $scope._loadSegments.resolve([]);
            return $scope._loadSegments;
          }

          $scope.getGalleryFilter(direction,from).then(function(filter){
            console.log(filter);
            _filter=filter;

            filter.limit=count||$scope.getLimit();
            filter.limit+=$scope.thumbsH-((($scope.segments.length + filter.limit) % $scope.thumbsH ));

            // do load segments
            Segment._find({
              filter: filter

            }, function(segments){
              if (!segments || !segments.length || (filter.limit && segments.length!=filter.limit)) {
                // end reached
                $scope.end(direction,true);
              }

              if (from) {
                 if (!segments) {
                   segments=[];
                 }
//                 if (direction=='backward') {
//                   segments.push(from);
//                 } else {
/* always unshift since array is reversed afterhand
 in updateShownSegments when direction=="backward" !!
*/
                   segments.unshift(from);
//                 }
              }
              if (segments && segments.length) {
                segments.forEach(function(segment, si){
                  var _segment=$scope.loaded.has(segment.id);
                  if (!_segment) {
                    $scope.loaded.push(segment);
                  } else {
                    segments[si]=_segment;
                    segment=_segment;
                  }
                });
              }

              $('#segments .mCustomScrollbar').mCustomScrollbar('update');
              $scope._loadSegments.resolve(segments);

            }, function(err){
              console.log(err);
              ngNotify.set('Segments data could not be loaded !');
              $scope._loadSegments.reject(err);
            });

          })
          .catch(function(err){
            console.log(err);
            if (err=='cancel') {
              $scope._loadSegments.resolve([]);
            }
          });

          return $scope._loadSegments;

        }, // loadSegments

        getSegment: function getSegment(segmentId){
            // search in loaded segments
            var segment=$scope.loaded.has(segmentId);
            if (segment) {
              return $q.resolve(segment);
            }
            if (getSegment[segmentId]) {
              return getSegment[segmentId];
            }

            var q=$q.defer();
            getSegment[segmentId]=q.promise;

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
            return q.promise.finally(function(){
              delete getSegment[segmentId];
            });
        }, // getSegment

        loadSegmentsAround: function(segmentId,_then,_catch) {
          _then=_then||function(){};
          _catch=_catch||function(){};

          var q=$q.defer();

          var segment=$scope.loaded.has(segmentId);
          if (segment) {
            // dont reload segment (preserve attributes)
            q.resolve(segment);

          } else {
            Segment.findById({
              id: segmentId,
              filter: {
                include: 'pointCloud'
              }
            }, function(segment){
              if (segment) {
                $scope.loaded.push(segment);
                q.resolve(segment);

              } else {
                _catch(new Error('Segment not found !'));
              }

            },_catch);
          }

          q.promise.then(function(segment){
            // reduce segments displayed to loaded segment
  //          Array.prototype.splice.apply($scope.segments,[0,$scope.segments.length,segment]);

console.log('back');
            // load segments backward
            $scope.loadSegments('backward',segment).promise.then(function(){
              // load segments forward
              $timeout(function(){
                console.log('forw');
                $scope.loadSegments('forward').promise.then(function(){
                  _then(segment);
                },_catch);
              },150);

            },_catch);
          });

        } // loadSegmentsAround

      });

      $scope.init();

    }]);

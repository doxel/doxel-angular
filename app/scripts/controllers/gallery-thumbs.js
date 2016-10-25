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
  .controller('GalleryThumbsCtrl', function ($scope,$rootScope,errorMessage,Segment,$q,$location,$state,$timeout,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      scrollPos: [],
      loadThreshold: 16,
      verticalScrollConfig: {
        axis: 'y',
        theme: 'light',
        scrollButtons: {
          enable: false
        },
        scrollbarPosition: "outside",
        mouseWheel:{ preventDefault: true },
        advanced: {
          updateOnContentResize: true
        },
        callbacks: {
          onInit: function() {
            $scope.mcs=this.mcs;
          },
          /*
          onTotalScrollOffset: 320,
          onTotalScroll: function(){
            return $scope.onTotalScroll.apply(this,Array.prototype.slice.call(arguments));
          },
          onScroll: function vsb_onscroll(){
            console.log(arguments);
          },
          */
          whileScrolling: function vsb_whileScrolling(){
            var count=$scope.segments.length;
            var pos=$scope.scrollPos;
            pos.push((count-1)*this.mcs.topPct/100);
            if (pos.length==2) {
              if (pos[0]<pos[1]) {
                // forward
                if (Math.abs(count-pos[1])<$scope.loadThreshold) {
                  $scope.loadSegments();
                }
              } else if (pos[0]>pos[1]) {
                // backward
              }
              $scope.scrollPos.shift();
            }
          }

        }

      }, // verticalScrollConfig

      horizontalScrollConfig: {
        axis: 'x',
        theme: 'light',
        scrollButtons: {
          enable: false
        },
        mouseWheel:{ preventDefault: true },
        advanced: {
          updateOnContentResize: true
        },
        callbacks: {
          onInit: function() {
            $scope.mcs=this.mcs;
          },
        /*
          onTotalScrollOffset: 320,
          onTotalScroll: function(){
            return $scope.onTotalScroll.apply(this,Array.prototype.slice.call(arguments));
          },
          onScroll: function vsb_onscroll(){
            console.log(arguments);
          },
          */
          whileScrolling: function vsb_whileScrolling(){
            var count=$scope.segments.length;
            var pos=$scope.scrollPos;
            pos.push((count-1)*this.mcs.leftPct/100);
            if (pos.length==2) {
              if (pos[0]<pos[1]) {
                // forward
                if (Math.abs(count-pos[1])<$scope.loadThreshold) {
                  $scope.loadSegments();
                }
              } else if (pos[0]>pos[1]) {
                // backward
              }
              $scope.scrollPos.shift();
            }
          }

        }


      }, // horizontalScrollConfig

      initEventHandlers: function() {

        $scope.$on('segment.click',function($event,segment,options){
          console.log('segment.click');
          $event.stopPropagation && $event.stopPropagation();
          $event.preventDefault();
          if (options) {
            // probably clicked on marker
            $scope.segmentClick(angular.extend({},options,{segment:segment}));

          } else {
            // was probably sent by segment-set
            $scope.segmentClick({
              segment: segment,
              setView: true
            });
          }
        });

        $scope.$on('showThumb', function(event,segmentId) {
          $scope.showThumb(segmentId);
        });

        $scope.$on('$stateChangeSuccess', function (event, toState) {
          $scope.update(toState);
        });

        $scope.$on('location.search',function(event,value){
          if (value[0].s!=value[1].s) {
            // update selection for history back here
            console.log('TODO: update selection on history back without messing with click');
            $scope.updateSelection(value[0].s);
          }
        });

        $scope.$on('segments-loaded',function(event,segments){
          if ($scope.thumbs_visible && $scope.galleryShown() && !$scope.scrollBarVisible()) {
            $timeout(function(){
              console.log('more');
              $scope.loadSegments();
            });
          }
        });

        $scope.$on('window.resize',function(){
          $scope.updateThumbsStyle($rootScope.$state.current);
          // allow loading more thumbs
          $scope.updateVisibility($rootScope.$state.current);
        });

        $scope.$on('orientationchange',function(){
          $scope.updateThumbsStyle($rootScope.$state.current);
          // allow loading more thumbs
          $scope.updateVisibility($rootScope.$state.current);
        });

        $('.thumbs-handle').on('click',function(){
          $('body').toggleClass('thumbs-hidden');
        });

      }, // initEventHandlers

      init: function() {
        $scope.initEventHandlers();
        $scope.thumbs_visible=false;
        $scope.segmentFind.$promise.then(function(){
          $scope.thumbs_visible=($state.current.name.substr(0,7)=='gallery');
          $scope.update($state.current);
        });
        $scope.update($state.current);

      }, // init

      segmentClick: function(options) {
        console.log('segment click',options.segment,$scope.selected);
         var segment=options.segment;
         var justRestoringSelection=options.justRestoringSelection;
         var show=options.show;
         var setView=options.setView;

console.trace();



  //      $scope.$root.$broadcast('segment.show',segment);
  //      $state.go('gallery',{segmentId: segment.id},{notify: false, reload:' gallery.details'});
          $scope.select(segment,{
            selected: true,
            unique: true,
            show: show
          });
          $rootScope.params.s=segment.id;;

          // user clicked ?
          if (!justRestoringSelection) {
            // update query string
            $location.search($rootScope.params);
            // open viewer
            if ($scope.$state.current.name=='gallery.view.thumbs') {
              $scope.$state.transitionTo('gallery.view.cloud');
              return;
            }
          }

          if (setView) {
            // show segment on map
            $rootScope.$broadcast('segment.setview',{segment: segment});
          }

          $rootScope.$broadcast('updateButtons');

      }, // segmentClick

      // select segment in thumb list
      select: function(segment,options) {
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
              if ($scope.selected.hasOwnProperty(segmentId) && segmentId!=segment.id){
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
          $scope.$emit('showThumb',segment.id);
        }

      }, // select

      getSelection: function(){
        var result=[];
        for (var segmentId in $scope.selected) {
          if ($scope.selected.hasOwnProperty(segmentId)) {
            result.push(segmentId);
          }
        }
        return result;
      }, // getSelection

      updateButtons: function(){
  /*      var selection=$scope.getSelection();
        if (selection.length) {
        }
  */
      },

      showThumb: function(segmentId){
        return;
        var thumb=$('[data-sid='+segmentId+']');
        if (thumb && thumb.length) {
          var container=thumb.closest('.mCSB_container');
          if ($scope.thumbsVerticalScroll) {
            var itemTop=thumb.position().top;
            var offset=(container.height()-thumb.height())/2;
            $scope.scrollTo=Math.abs($scope.mcs.top)+itemTop-(offset>0?offset:0);
          } else {
            var itemLeft=thumb.position().left;
            var offset=(nicescroll.width()-thumb.width())/2;
            nicescroll.scrollLeft(nicescroll.scrollLeft()+itemLeft-(offset>0?offset:0));
          }
        }
      },

      isWide: function(){
        var w=$(window).width();
        var h=$(window).height();
        return (w>h);
      },

      getThumbsStyle: function(){
        return $scope.isWide()?'thumbs-left':'thumbs-bottom';
      },

      updateVisibility: function(state){
        $scope.thumbs_visible=(state.name.substr(0,7)=='gallery');
        $timeout(function(){
          if ($scope.thumbs_visible && $scope.galleryShown() && !$scope.scrollBarVisible()) {
            console.log('more');
            $scope.loadSegments();
          }
        },1000);
      },

      updateThumbsStyle: function(state){
        if (state.name=="gallery.view.thumbs") {
          // full screen for thumbs view
          $scope.thumbsVerticalScroll=true;
          $timeout(function(){
            $rootScope.thumbsPosition='';
            $('body').removeClass('thumbs-hidden'); // TODO: restore state when leaving
          });
        } else {
          // one row or column of thumbs for map and earth view
          $timeout(function(){
            $rootScope.thumbsPosition=$scope.getThumbsStyle();
            $scope.thumbsVerticalScroll=($rootScope.thumbsPosition!='thumbs-bottom');
          });
        }
      },

      galleryShown: function(){
        return $('#gallery-thumbs:visible').length;
      },

      scrollBarVisible: function(){
        return $('#gallery-thumbs .mCSB_draggerContainer:visible').length>0;
      },

      isSelected: function(segmentId){
        return $scope.selected.segmentId!==undefined;
      },

      updateSelection: function(segmentId){
        if ($scope.thumbs_visible) {
          // restore (single) thumb selection
          if (segmentId) {
            if ($scope.isSelected(segmentId)) {
              $timeout(function(){
                $scope.showThumb(segmentId);
              },150);
            } else {
              $scope.getSegment(segmentId).then(function(segment){
                $timeout(function(){
                  $scope.segmentClick({
                    segment: segment,
                    justRestoringSelection: true,
                    show: true
                  });
                },150);
              });
            }
          }
        }
      },

      scrollEnd: function(e){
        if ($scope.loadingSegments) {
          return;
        }
        $scope.loadSegments();

      },

      update: function(state){
        $scope.updateVisibility(state);
        $scope.updateThumbsStyle(state);
        $scope.updateSelection($rootScope.params.s);
      },

    });

    $scope.init();
  /*
      $scope.$on('webglearth2.viewer',function($event,place){
        $('iframe.earth').attr('src','about:blank');
        $('iframe.viewer').attr('src','/api/segments/viewer/'+place.segmentId+'/'+place.timestamp+'/viewer.html')
        .addClass('visible');
      });
  */
    });

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

      },
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


      },
      segmentClick: function(options) {
        console.log('segment click',options.segment,$scope.selected);
         var segment=options.segment;
         var dontUpdateQuery=options.dontUpdateQuery;
         var show=options.show;
         var setView=options.setView;

console.trace();
        /*
         if ($scope.$state.current.name=='gallery.view.thumbs') {
           $scope.$state.transitionTo('gallery.view.cloud');
         }
        */

  //      $scope.$root.$broadcast('segment.show',segment);
  //      $state.go('gallery',{segmentId: segment.id},{notify: false, reload:' gallery.details'});
          $scope.select(segment,{
            selected: true,
            unique: true,
            show: show
          });
          $rootScope.params.s=segment.id;;
          if (!dontUpdateQuery) {
            $location.search($rootScope.params);
          }
          if (setView) {
            $rootScope.$broadcast('segment.setview',{segment: segment});
          }
          $rootScope.$broadcast('updateButtons');

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

      },


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
            $scope.$emit('showThumb',thumb);
          }
        }
      },


    });

    $scope.thumbs_visible=false;
    $scope.segmentFind.$promise.then(function(){
      $scope.thumbs_visible=($state.current.name.substr(0,7)=='gallery');
    });



      $scope.updateButtons=function(){
        var selection=$scope.getSelection();
        if (selection.length) {
        }
      }


      $scope.getSelection=function(){
        var result=[];
        for (var segmentId in $scope.selected) {
          if ($scope.selected.hasOwnProperty(segmentId)) {
            result.push(segmentId);
          }
        }
        return result;
      }
/*
      // TODO: find a way to preserve $scope.selected when switching states
      // eg between home and gallery
      // in the meanwhile, rebuild $scope.selected:
      for (var s in $scope.segments) {
        if (s.selected) {
          $scope.selected[s.id]=true;
        }
      }
*/
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


      $scope.showThumb=function(thumb){
        if (thumb && thumb.length) {
          var nicescroll=thumb.closest('[ng-nicescroll]');
          if ($scope.thumbsVerticalScroll) {
            var itemTop=thumb.position().top;
            var offset=(nicescroll.height()-thumb.height())/2;
            nicescroll.scrollTop(nicescroll.scrollTop()+itemTop-(offset>0?offset:0));
          } else {
            var itemLeft=thumb.position().left;
            var offset=(nicescroll.width()-thumb.width())/2;
            nicescroll.scrollLeft(nicescroll.scrollLeft()+itemLeft-(offset>0?offset:0));
          }
        }
      }

      $scope.isWide=function(){
        var w=$(window).width();
        var h=$(window).height();
        return (w>h);
      }

      $scope.getThumbsStyle=function(){
        return $scope.isWide()?'thumbs-left':'thumbs-bottom';
      }

      $scope.updateVisibility=function(state){
        $scope.thumbs_visible=(state.name.substr(0,7)=='gallery');
        $timeout(function(){
          if ($scope.thumbs_visible && !$scope.scrollBarVisible()) {
            console.log('more');
            $scope.loadSegments();
          }
        },1000);
      }

      $scope.updateThumbsStyle=function(state){
        if (state.name=="gallery.view.thumbs") {
          // full screen for thumbs view
          $scope.thumbsVerticalScroll=true;
          $rootScope.thumbsPosition='';
        } else {
          // one row or column of thumbs for map and earth view
          $rootScope.thumbsPosition=$scope.getThumbsStyle();
          $scope.thumbsVerticalScroll=($rootScope.thumbsPosition!='thumbs-bottom');
        }
      }

      $scope.scrollBarVisible=function(){
        return $('#gallery-thumbs .mCSB_draggerContainer:visible').length>0;
      }

      $scope.$on('segments-loaded',function(event,segments){
        if (!$scope.scrollBarVisible()) {
          $timeout(function(){
            console.log('more');
            $scope.loadSegments();
          });
        }
      });

      $scope.$on('window.resize',function(){
        $scope.updateThumbsStyle($rootScope.$state.current);
      });

      $scope.$on('orientationchange',function(){
        $scope.updateThumbsStyle($rootScope.$state.current);
      });

      $scope.updateSelection=function(segmentId,dontUpdateQuery){
        if ($scope.thumbs_visible) {
          // restore (single) thumb selection
          if (segmentId) {
            var thumb=$('#gallery-thumbs a[data-sid='+segmentId+'] .thumb');
            if (thumb.hasClass('selected')) {
              console.log('showthumb');
              $timeout(function(){
                $scope.showThumb(thumb);
              },150);
            } else {
              $scope.getSegment(segmentId).then(function(segment){
                $timeout(function(){
                  $scope.segmentClick({
                    segment: segment,
                    dontUpdateQuery: true,
                    show: true
                  });
                },150);
              });
            }
          }
        }
      }

      $scope.scrollEnd=function(e){
        if ($scope.loadingSegments) {
          return;
        }
        $scope.loadSegments();

      }

      $scope.$on('showthumb', function(thumb) {
        $scope.showThumb(thumb);
      });

      $scope.update=function(state){
        $scope.updateVisibility(state);
        $scope.updateThumbsStyle(state);
        $scope.updateSelection($rootScope.params.s);
      }

      $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $scope.update(toState);
      });

      $scope.update($state.current);

      $scope.$on('location.search',function(event,value){
        if (value[0].s!=value[1].s) {
          // update selection for history back here
          console.log('TODO: update selection on history back without messing with click');
    //      $scope.updateSelection(value[0].s,true);
        }
      });

  /*
      $scope.$on('webglearth2.viewer',function($event,place){
        $('iframe.earth').attr('src','about:blank');
        $('iframe.viewer').attr('src','/api/segments/viewer/'+place.segmentId+'/'+place.timestamp+'/viewer.html')
        .addClass('visible');
      });
  */
    });

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
  .controller('GalleryThumbsCtrl', [
    '$scope',
    '$rootScope',
    'errorMessage',
    'Pose',
    'Segment',
    'Picture',
    '$q',
    '$location',
    '$state',
    '$timeout',
    '$window',
    'elementSelection',
    function (
      $scope,
      $rootScope,
      errorMessage,
      Pose,
      Segment,
      Picture,
      $q,
      $location,
      $state,
      $timeout,
      $window,
      elementSelection

    ) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      angular.extend($scope,{
        whileScrolling: function whileScrolling(data){
          var delta=data.delta;

          if ($scope._loadSegments) {
            return;
          }
          var count=$scope.segments.length;

          // get scrollpos in thumbs unit
          var side={x: 'left', y: 'top'};
          var pos=((count||1)-1)*this.mcs[side[this.mcs.direction]+'Pct']/100;

          var remain;
          var direction;

          if (delta>0) {
            direction='forward';
            // how many thumbs remain after scrollpos
            remain=Math.floor(count-pos);

          } else if (delta<0) {
            direction='backward';
            // how many thumbs remain before scrollpos
            remain=Math.floor(pos);
          }

          // scrollbar moving and thumbs remaining is less than threshold
          if (direction && remain<$scope.maxThumbs/2) {
            console.log('remain',count,pos,remain,$scope.maxThumbs/2)
            $scope.loadSegments(direction).promise.then(function(){
              $timeout(function(){
                $scope.fillScrollableContainer(direction,$scope.maxThumbs/2);
              });
            });
          }
        },
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
              $scope.gallery.axis='vertical';
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
            whileScrolling: function(data){
              var that=this;
              $timeout(function(){
                $scope.whileScrolling.apply(that,[data]);
              });
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
            updateOnContentResize: true,
            autoExpandHorizontalScroll: true
          },
          callbacks: {
            onInit: function() {
              $scope.mcs=this.mcs;
              $scope.gallery.axis='horizontal';
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
            whileScrolling: function(data){
              var that=this;
              $timeout(function(){
                $scope.whileScrolling.apply(that,[data]);
              });
            }
          }


        }, // horizontalScrollConfig

        showNextPreview: function(options) {
          var segmentId=options.segmentId;
          var element=options.element;

          if (segmentId && segmentId==$scope.nextThumb_segmentId) {
            $scope.getSegment(segmentId).then(function(segment){
              function getNextPreview(previewId,callback){
                if (!segment.pointCloud._poses) {
                  segment._poses=Pose.find({
                    filter: {
                      fields: "pictureId",
                      where: { pointCloudId: segment.pointCloudId }
                    }
                  });
                }
                segment._poses.$promise.then(function(poses){
                  segment.poses=poses;
                  var previewId=(segment.picture && segment.picture.id)||segment.previewId;
                  var curPose=segment.poses.findIndex(function(pose){
                    return pose.pictureId==previewId;
                  });
                  //var nextPose=(curPose+1)%segment.poses.length;

                  var nextPose=Math.round(segment.poses.length*element.data('mouse').x/element.width());
                  if (nextPose!=curPose) {
                    Picture.findById({id: segment.poses[nextPose].pictureId},function(picture){
                      if ($scope.nextThumb_timeout && $scope.nextThumb_segmentId==segmentId) {
                        segment.picture=picture;
                        segment.picture.selected=segment.selected;
                        $scope.nextThumb_timeout=$timeout($scope.showNextPreview,100,true,options);
                      }
                    });
                  } else {
                    if ($scope.nextThumb_timeout && $scope.nextThumb_segmentId==segmentId) {
                      $scope.nextThumb_timeout=$timeout($scope.showNextPreview,100,true,options);
                    }
                  }
                });
              } // getNextPreview
              // TODO: should be segment.pointCloud.getNextPreview()
              getNextPreview(segment.previewId,function(previewId){
                segment.previewId=previewId;
              });
            });
          }
        }, // showNextPreview

        initEventHandlers: function() {

          window.jQuery('#segments').on('mcswheel','.mCustomScrollbar',function(e,delta){
            $scope.whileScrolling.apply(this,[{delta: -delta}]);
          });

          window.jQuery('body').on('mousemove','.thumb',updateMousePosition);
          function updateMousePosition(e){
            var element=window.jQuery(e.target);
            var offset=element.offset();
            element.data('mouse',{
              x:e.pageX-offset.left,
              y:e.pageY-offset.top
            });
          }

          window.jQuery('body').on('mouseenter','.thumb',function(e){
            updateMousePosition(e);
            $timeout.cancel($scope.nextThumb_timeout);
            $scope.nextThumb_segmentId=$(e.target).closest('a').data('sid');
            $scope.getSegment($scope.nextThumb_segmentId).then(function(segment){
              if (elementSelection.isSelected('segment',segment)) {
                $scope.nextThumb_timeout=$timeout($scope.showNextPreview,100,true,{
                  element: window.jQuery(e.target),
                  segmentId: $scope.nextThumb_segmentId
                });
              }
            });
          });

          window.jQuery('body').on('mouseleave', '.thumb', function(e){
            console.log('leave');
            $timeout.cancel($scope.nextThumb_timeout);
            $scope.nextThumb_timeout=null;
            $scope.nextThumb_segmentId=null;
          });

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
            $scope.fillScrollableContainer();
          });

          $scope.$on('window.resize',function(){
            $scope.updateThumbsStyle($rootScope.$state.current);
            $scope.updateMetrics($rootScope.$state.current);
            // allow loading more thumbs
            $scope.updateVisibility($rootScope.$state.current);
          });

          $scope.$on('orientationchange',function(){
            $scope.updateThumbsStyle($rootScope.$state.current);
            $scope.updateMetrics($rootScope.$state.current);
            // allow loading more thumbs
            $scope.updateVisibility($rootScope.$state.current);
          });

          $('.thumbs-handle').on('click',function(){
            $('body').toggleClass('thumbs-hidden');
          });

          $scope.$on('segment.selection.change',function(event,segment){
            segment.picture.selected=segment.selected;
          });

        }, // initEventHandlers

        init: function() {
          $scope.initEventHandlers();
          $scope.thumbs_visible=false;
        }, // init

        segmentClick: function(options) {
          console.log('segment click',options.segment,$scope.selected);
           var segment=options.segment;
           var justRestoringSelection=options.justRestoringSelection;
           var show=options.show;
           var setView=options.setView;

          // in map view, switch to cloud on second click
          if ($scope.$state.current.name=='gallery.view.map' && !justRestoringSelection && elementSelection.isSelected('segment',segment)) {
            if (segment.pointCloud) {
              $scope.$state.transitionTo('gallery.view.cloud');
            }
            return;
          }

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
              delete $rootScope.params.pose;
              $location.search($rootScope.params);
              // open viewer
              if ($scope.$state.current.name=='gallery.view.thumbs' || $scope.$state.current.name=='gallery.view.home') {
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
              var count=0;
              // unselect other tree paths
              elementSelection.replace('segment',segment);
              /*
              for (var segmentId in $scope.selected) {
                if ($scope.selected.hasOwnProperty(segmentId) && segmentId!=segment.id){
                  ++count;
                  delete $scope.selected[segmentId].selected;
                  $scope.selected[segmentId].picture && delete $scope.selected[segmentId].picture.selected;
                  delete $scope.selected[segmentId];
                }
              };
              if (!count && $scope.selected[segment.id]) {
                return;
              }
              */
            } else {
              elementSelection.add('segment',segment);
            }

          } else {
            var index;
            elementSelection.remove('segment',segment);
          }

          if (options.show) {
            $scope.$emit('showThumb',segment.id);
          }

        }, // select

        getSelection: function(){
          return elementSelection.list('segment');
        }, // getSelection

        updateButtons: function(){
    /*      var selection=$scope.getSelection();
          if (selection.length) {
          }
    */
        },

        showThumb: function showThumb(segmentId){
          var thumb=$('[data-sid='+segmentId+']');

          if (thumb && thumb.length) {
            var scrollOptions={scrollInertia: 0};
            var container=thumb.closest('.mCustomScrollbar');

            if ($scope.thumbsVerticalScroll) {
              var pos=thumb.position().top;
              var offset=(container.height()-thumb.height())/2;

            } else {
              var pos=thumb.position().left;
              var offset=(container.width()-thumb.width())/2;
            }

            container.mCustomScrollbar('scrollTo',Math.max(0,pos-(offset>0?offset:0)),scrollOptions);
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

        fillScrollableContainer: function(direction) {

          $timeout.cancel($scope.fillTimeout);
          if (!$scope.end[direction||'forward'])
          $scope.fillTimeout=$timeout(function(){
  /*
          // check if the last row is complete
          var _top;
          var _count=[0,0];
          var line=0;
          var diff;
          $($('segment-set > span').get().reverse()).each(function(i,span){
            var top=$(span).position().top;
            console.log('top',top);
            if (!i) {
              _top=top;

            } else {
              if (top!=_top) {
                _top=top;
                ++line;
                if (line==2) {
                  diff=_count[1]-_count[0];
                  return false;
                }
              }
            }
            ++_count[line];
          });

          if (line==2) {
            console.log('count',_count,'width',$scope.thumbsH);
          }
          */

     if (false)     if ($scope.segments && $scope.segments.length > $scope.maxThumbs) {
            console.log($scope.segments.length,$scope.maxThumbs);
            if (direction == undefined || direction=='forward') {
              var count=Math.max($scope.thumbsH,Math.floor(($scope.segments.length - $scope.maxThumbs)/$scope.thumbsH)*$scope.thumbsH)
              $scope.segments.splice(0,count);
              $scope.$apply();

              var $mcs=$('#gallery-thumbs .mCustomScrollbar');

              if ($mcs[0].mcs.direction=='y') {
                $mcs.mCustomScrollbar('scrollTo','+='+(150*(count/$scope.thumbsH)),{
                  scrollInertia: 0
                });

              } else {
                $mcs.mCustomScrollbar('scrollTo','+=200',{
                  scrollInertia: 0
                });
              }

            } else {
              $scope.segments.splice($scope.maxThumbs,$scope.segments.length - $scope.maxThumbs);
            }
          }

          if ($scope.thumbs_visible && $scope.galleryShown() && !$scope.scrollBarVisible()) {
            console.log('more');
            $scope.loadSegments(direction||'forward',$scope.thumbsH).promise.then(function(segments){
              if(segments.length){
                $timeout(function(){
                  $scope.fillScrollableContainer();
                });
              }
            });
          } else {
            /*
            if (line==2 && diff) {
              $scope.loadSegments(direction||'forward',diff).promise.then(function(segments){
                if(segments.length){
                  $scope.fillScrollableContainer(direction);
                }
              });
            }
            */
          }
          },1000);
        },

        updateVisibility: function(state){
          $scope.thumbs_visible=(state.name.substr(0,7)=='gallery');
          $scope.fillScrollableContainer();
        },

        updateThumbsStyle: function(state){
          if (state.name=="gallery.view.thumbs") {
            // full window for thumbs view

            $scope.thumbsVerticalScroll=true;
            $timeout(function(){
              $rootScope.thumbsPosition='';
              $('body').removeClass('thumbs-hidden'); // TODO: remove this and modiy scss to dont hide when only thumbs-hidden and not thumbs-left or bottom
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

        updateSelection: function(segmentId){
          if ($scope.thumbs_visible) {
            // restore (single) thumb selection
            if (segmentId) {
              $scope.getSegment(segmentId).then(function(segment){
                if (elementSelection.isSelected('segment',segment)) {
                  $timeout(function(){
                    $scope.showThumb(segmentId);
                  },150);
                } else {
                  $timeout(function(){
                    $scope.segmentClick({
                      segment: segment,
                      justRestoringSelection: true,
                      show: true
                    });
                  },1500);
                }
              });
            }
          }
        },

        update: function(state){
          $scope.updateVisibility(state);
          $scope.updateThumbsStyle(state);
          $scope.updateMetrics($state);
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
    }]);

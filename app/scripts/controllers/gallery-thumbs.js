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
            if (!$scope.end(direction) && !$scope._loadSegments) {
              console.log('remain',count,pos,remain,$scope.maxThumbs/2)
              $scope.loadSegments(direction).promise.then(function(){
                $timeout(function(){
                  $scope.fillScrollableContainer(direction,$scope.maxThumbs/2);
                });
              });
            }
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

        getSortOrder: function(options){
          var order;
          if (options && options.inverse) {
            order=$scope.sortField+' '+(($scope.sortASC)?'DESC':'ASC');
          } else {
            order=$scope.sortField+' '+(($scope.sortASC)?'ASC':'DESC');
          }
          console.log(order);
          return order;
        },

        galleryFilter: function(direction,segment) {
          var filter={
            where:{
            }
          };

          // load chunk after specified segment or, by default,
          // after last segment in $scope.segments
          if (direction=='forward'){
            if (segment || $scope.segments.length) {
              if (!segment) {
                segment=$scope.segments[$scope.segments.length-1];
              }
              filter.where.id={
                neq: segment.id
              };
              var comp=($scope.sortASC)?'gte':'lte';
              filter.where[$scope.sortField]=filter.where[$scope.sortField]||{};
              filter.where[$scope.sortField][comp]=segment[$scope.sortField];
            }
            filter.order=$scope.getSortOrder();

          } else {
              // load chunk before specified segment or, by default,
              // before first segment in $scope.segments
            if (segment || $scope.segments.length) {
              if (!segment) {
                segment=$scope.segments[0];
              }
              filter.where.id={
                neq: segment.id
              };
              var comp=($scope.sortASC)?'lte':'gte';
              filter.where[$scope.sortField]=filter.where[$scope.sortField]||{};
              filter.where[$scope.sortField][comp]=segment[$scope.sortField];
            }
            filter.order=$scope.getSortOrder({inverse:true});
          }

          return $q.resolve(filter);
        }, // galleryFilter

        updateShownSegments: function(args){
          if ($scope.galleryMode!='segment-thumbs') {
            return;
          }
          var segments=args.segments;
          var direction=args.direction;
          var filter=args.filter;

          if (direction=='backward') {
            // prepend segments
            segments.reverse();
            $scope.segments.splice.apply($scope.segments,[0,0].concat(segments));
if (false) // TODO: make it work without flickering -> dig into malihu
            if ($scope.segments.length>segments.length+1) {
              // update scrollbar
              if ($scope.thumbsVerticalScroll) {
                var offset=Math.round(segments.length/$scope.thumbsH)*150;
              } else {
                var offset=segments.length*200;
              }
              var container=$('#gallery .mCustomScrollbar');
              var scrollOptions={scrollInertia: 0};

              // get scrollpos
              var side={x: 'left', y: 'top'};
              var mcs=container[0].mcs;
              var pos=mcs[side[mcs.direction]];
              container.mCustomScrollbar('scrollTo',pos-offset,scrollOptions);
            }

          } else {
            // append segments
            $scope.segments.splice.apply($scope.segments,[$scope.segments.length,0].concat(segments));

          }

          $scope.getPicturesCount(segments);

        }, // updateShownSegments

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
                  nextPose=Math.min(segment.poses.length-1,nextPose);
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
            console.log(toState)
            $scope.update(toState);
          });

          $scope.$on('location.search',function(event,value){
            console.log('location.search');

            var reload=false;
            var newValue=value[0];
            var oldValue=value[1];

            $scope.locationSearch.forEach(function(option){
              var name;
              var handler;
              var _reload;

              if (typeof(option)=='string') {
                name=option;
                handler=null;
                _reload=true;

              } else {
                name=option.name;
                handler=option.handler;
                _reload=option.reload;
              }

              if (oldValue[name]!=newValue[name]) {
                $scope.params[name]=newValue[name];
                if (handler) {
                  handler(newValue[name],oldValue[name]);
                }
                reload|=_reload;
              }
            });

            if (reload) {
              $scope.clearThumbsList().finally(function(){
                $scope.update($scope.$state.current);
              });

            } else {
              if (oldValue.s!=newValue.s) {
                $scope.params.s=value[0].s;
                $scope.updateSelection(value[0].s);
              }
            }

          });

          $scope.$on('segments-loaded',function(event,args){
            if ($scope.galleryMode=='segment-thumbs') {
              $scope.updateShownSegments(args);
              $scope.fillScrollableContainer();
            }
          });

          $scope.$on('gallery-mode-change',function(event,from,to){
            if (to=='segment-thumbs') {
              $scope.clearThumbsList();
            }
          });

          $scope.$on('window.resize',function(){
            $scope.updateThumbsStyle($rootScope.$state.current);
            $scope.updateMetrics();
            // allow loading more thumbs
            $scope.updateVisibility($rootScope.$state.current);
          });

          $scope.$on('orientationchange',function(){
            $scope.updateThumbsStyle($rootScope.$state.current);
            $scope.updateMetrics();
            // allow loading more thumbs
            $scope.updateVisibility($rootScope.$state.current);
          });

          $('.thumbs-handle').on('click',function(){
            $('body').toggleClass('thumbs-hidden');
          });

          $scope.$on('segment.selection.change',function(event,segment){
            if (segment && segment.picture) {
              segment.picture.selected=segment.selected;
              $timeout(function(){segment.picture.selected=segment.selected},1000);
            }
          });

          $scope.$on('options.gallery.my-segments',function(event){
            $scope.clearThumbsList().finally(function(){
              $scope.update($scope.$state.current);
            });

          });

          $scope.$on('options.gallery.all-segments',function(event){
            $scope.clearThumbsList().finally(function(){
              $scope.update($scope.$state.current);
            });

          });

        }, // initEventHandlers

        locationSearch: [
          {
            name: 'sort',
            handler:  function(newValue){
              $scope.updateSortField(newValue);
            }
          },
          'search',
          'all-segments',
          'my-segments',
          'dropdown'

        ],

        init: function() {
          angular.extend($scope.$parent,{
            scrollBufferFull: $scope.scrollBufferFull,
            clearThumbsList: $scope.clearThumbsList
          });
          $scope._galleryFilter['segment-thumbs']=$scope.galleryFilter;
          $scope.initEventHandlers();
          $scope.thumbs_visible=false;
        }, // init

        segmentClick: function(options) {
          console.log('segment click',options.segment,$scope.selected);
           var segment=options.segment;
           var justRestoringSelection=options.justRestoringSelection;
           var show=options.show;
           var setView=options.setView;

          // in map view, switch to cloud on second click TODO: put it in gallery-map
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
                if (segment.pointCloud) {
                  $scope.$state.transitionTo('gallery.view.cloud');
                }
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
        }, // showThumb

        isWide: function(){
          var w=$(window).width();
          var h=$(window).height();
          return (w>h);
        },

        getThumbsStyle: function(){
          return $scope.isWide()?'thumbs-left':'thumbs-bottom';
        },

        fillScrollableContainer: function(direction) {
          console.log('fillScrollableContainer');

          $timeout.cancel($scope.fillTimeout);
          if (!$scope.end(direction||'forward'))
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

            /*
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
     */

          if ($scope.thumbs_visible && $scope.galleryShown() && !$scope.scrollBufferFull(direction||'forward')) {
            console.log('more');
            $scope.loadSegments(direction||'forward',$scope.thumbsH).promise.then(function(segments){
if (false)              if(segments.length){
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

        }, // fillScrollableContainer

        clearThumbsList: function clearThumbsList(){
          var q=$q.defer();

          // maybe we are loading content already
          if ($scope._loadSegments) {
            $scope._loadSegments.promise.catch(function(){
              console.log('catch');
                clearThumbsList().then(q.resolve);
            });
            $scope._loadSegments.reject('abort');

          } else {
            q.resolve();
          }

          return q.promise.then(function(){
            $scope.segments.splice(0,$scope.segments.length);
            $scope.end('forward',false);
            $scope.end('backward',false);
          }).catch(console.log);

        }, // clearThumbsList

        updateVisibility: function(state){
          $scope.thumbs_visible=(state.name.substr(0,7)=='gallery');
          $scope.updateGalleryMode(state);
          $scope.fillScrollableContainer();
        },

        updateThumbsStyle: function(state){
          if (
            // full window for thumbs view
            state.name=="gallery.view.thumbs"
            // full window for classifiers view
            || state.name=="gallery.view.classifiers"
          ) {
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
        }, // updateThumbsStyle

        galleryShown: function(){
          return $('#gallery-thumbs:visible').length;
        },

        scrollBufferFull: function(direction){
          var mcsElem=$('#gallery-thumbs .mCustomScrollbar');
          var mcs=mcsElem[0].mcs;
          if (!mcs) return false;
          var spanlist=mcs.content[0].children[0].children;
          if (!spanlist.length) {
            return false;
          }

          var offset;
          var multiplier=1;
          if (spanlist.length==$scope.segments.length) {
            offset=$(spanlist[spanlist.length-1]).offset();

          } else {
            // compute last thumb offsets when display is out of sync with $scope.segments
            if (spanlist.length<1) {
              return false;
            }
            offset=$(spanlist[0]).offset();
            var offset1=$(spanlist[1]).offset();
            offset.top+=(offset1.top-offset.top)*$scope.segments.length;
            offset.left+=(offset1.left-offset.left)*$scope.segments.length;

          }

          if (direction=='forward') {
            if (mcs.direction=='x') {
                return (offset.left > mcsElem.offset().left+(mcsElem.width()*1.5));
            }
            if (mcs.direction=='y') {
                return (offset.top > mcsElem.offset().top+(mcsElem.height()*1.5));
            }
          } else {
            if (mcs.direction=='x') {
                return (offset.left < mcsElem.offset().left-(mcsElem.width()*1.5));
            }
            if (mcs.direction=='y') {
                return (offset.top < mcsElem.offset().top-(mcsElem.height()*1.5));
            }
          }
        }, // scrollBufferFull

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
        }, // updateSelection

        update: function(state){
          $scope.updateVisibility(state);
          $scope.updateThumbsStyle(state);
          $scope.updateMetrics();
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

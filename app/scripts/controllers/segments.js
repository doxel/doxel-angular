/*
 * segments.js
 *
 * Copyright (c) 2015-2016 ALSENET SA - http://doxel.org
 * Please read <http://doxel.org/license> for more information.
 *
 * Author(s):
 *
 *      Luc Deschenaux <luc.deschenaux@freesurf.ch>
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
 * @name doxelApp.controller:SegmentsCtrl
 * @description
 * # SegmentsCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('SegmentsCtrl', function ($location, $q, $rootScope, $scope, ngTableParams, errorMessage, getPictureBlobAndExif, Segment, Picture, $filter, User) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    window.alert=errorMessage.show;

    $scope.getClass=function(what,y,m,d,t,s){
      switch(what) {
        case 'y':
        return ($scope.tree[y].expanded) ? 'fa fa-caret-down' : 'fa fa-caret-right';

        case 'm':
        return ($scope.expanded)
      }

    }

    $scope.selected={};

    // restore tree state
    if (localStorage) {
      if (localStorage.expanded) {
        try {
          $scope.expanded=JSON.parse(localStorage.expanded);
        } catch(e) {
          $scope.expanded={}
        }

      } else {
        $scope.expanded={}
      }

    } else {
      $scope.expanded={};
    }

    $scope.data=[];
    $scope.dataFilter={
      filter: {
        where: {
          userId: User.getCurrentId()
        }
      }
    };

    var queryString=$location.search();
    $scope.viewMode=queryString.mode||'tree';

    if ($scope.viewMode=='list') {
      $scope.dataFilter.filter.include=['preview'];
    }

    // expand or shrink tree node
    $scope.expand=function(path,yes){
      var index=path.replace(/\./g,'');
      if (yes) {
        $scope.expanded[index]=true;
      } else {
        delete $scope.expanded[index];
      }
      $scope.saveTreeState();

    }

    $scope.isexpanded=function(path){
      var index=path.replace(/\./g,'');
      return $scope.expanded[index];
    }

    $scope.refresh=function(){
      $scope.loading=true;
      $scope.tree={};
      $scope.treeDepth=6;
      $scope.list=[];

      return Segment.find($scope.dataFilter, function(segments) {
        $scope.segments=segments;
        var formatTimestamp=$filter('formatTimestamp');

        angular.forEach(segments, function(_segment){
          switch($scope.viewMode) {
            case 'tree':
              var unixTimestamp=Number(_segment.timestamp.substr(0,10)+'000');
              var date=new Date(unixTimestamp);
              var yyyy=date.getFullYear();
              var mm=date.getMonth()+1;
              var dd=date.getDate();
              var formatter={
                month: new Intl.DateTimeFormat(navigator.language, {
                  month: 'long'
                }),
                day:  new Intl.DateTimeFormat(navigator.language, {
                  weekday: 'long'
                })
              }

              if (mm<10) mm='0'+mm;
      //        if (dd<10) dd='0'+dd;
              var mm=formatter.month.format(date);
              var dd=formatter.day.format(date) +' '+ dd;

              if (!$scope.tree[yyyy]) {
                $scope.tree[yyyy]={};
              }
              var month=$scope.tree[yyyy];

              if (!month[mm]) {
                month[mm]={};
              }
              var day=month[mm];

              if (!day[dd]) {
                day[dd]={};
              }
              var timestamp=day[dd];

              if (!timestamp[_segment.timestamp]) {
                timestamp[_segment.timestamp]={};
              }
              var segment=timestamp[_segment.timestamp];

              segment[_segment.id]=_segment;

              // TODO: getSegmentPath() & getPicturePath() instead
              _segment.path=[yyyy,mm,dd,_segment.timestamp,_segment.id].join('.');
              break;

            case 'list':
              _segment._timestamp=formatTimestamp(_segment.timestamp, 'locale');
              _segment._pictures={};
              $scope.list.push(_segment);
              //$scope.list[yyyy+mm+dd+_segment.timestamp+_segment.id]=_segment;

              break;
          }

        });

        $scope.loading=false;

      }, function(err) {
        console.log(err);
        errorMessage.show('Could not load segments');
        $scope.loading=false;

      });
    }; // scope.refresh

    $scope.saveTreeState=function(){
      if (localStorage) {
        localStorage.expanded=JSON.stringify($scope.expanded);
      }

    } // saveTreeState

    $scope.select=function(path,$event) {
      if ($event && $event.target.tagName.toLowerCase()!='span') {
        return;
      }
      $scope.selected[path]=true;
      for(var key in $scope.selected) {
        if ($scope.selected.hasOwnProperty(key) && key!=path) {
          delete $scope.selected[key];
        }
      }
    }

    $scope.showSpinner=function($event,text){
      if (!$event) return; // TODO: remove workaround for relatedSegment expandAllFromPath
      $scope.loading=true;
      return $('span',$($event.target).closest('li')).
      html(((text)?text:'Loading...')+' <i class="fa fa-cog fa-spin"></i>');
    }

    $scope.hideSpinner=function(span,text){
      if (!span) return; // TODO: remove workaround for relatedSegment expandAllFromPath
      $scope.loading=false;
      span.html(text);
    }

    $scope.segmentById=function(segmentId) {
      var segment;
      $scope.segments.some(function(_segment){
        if (_segment.id==segmentId) {
          segment=_segment;
          return true;
        }
      });
      return segment;
    }

    function getSegments(path) {
      function loop(level,depth){
        var result=[];
        if (depth<$scope.treeDepth-2) {
          for(var elem in level) {
            if (level.hasOwnProperty(elem)) {
              result=result.concat(loop(level[elem],depth+1));
            }
          }

        } else {
          for (var segment in level) {
            result.push(level[segment]);
          }

        }
        return result;
      }

      var p=path.split('.');
      var level=$scope.tree;
      for(var i=0; i<p.length; ++i) {
        level=level[p[i]];
      }

      return loop(level,p.length);
    }
/*
    $scope.expandAllFromPath=function expandAllFromPath(path,expand) {
      function loop(level,depth,path){
        if (depth<$scope.treeDepth-2) {
          for(var elem in level) {
            if (level.hasOwnProperty(elem)) {
              $scope.expanded[path+'.'+elem]=expand;
              loop(level[elem],depth+1,path);
            }
          }

        } else {
          for (var segment in level) {
            $scope.expanded[path+'.'+segment.id]=expand;
          }

        }
      }

      var p=path.split('.');
      var level=$scope.tree;
      for(var i=0; i<p.length; ++i) {
        level=level[p[i]];
      }

      return loop(level,p.length,path);
    }
*/
    $scope.showRelatedSegments=function(path) {
      var relatedSegments=getSegments(path);
      //if (relatedSegments.length>1) {
        $scope.relatedSegments=getSegments(path);
        $scope.view='relatedSegments';
/*      } else {
        var leafPath=$scope.expandAllFromPath(path,true);
        $scope.expandSegment(relatedSegments[0].path);
      }
*/
    }

    $scope.showSegmentDetails=function(segment) {
      // trigger segment-details directive
      $scope.segment=segment;
      console.log(segment.pictures);
      // show segment view
      $scope.view='segment';
    }

    $scope.expandSegment=function(path,$event) {
      var p=splitPath(path);
      var segment=$scope.tree[p.yyyy][p.mm][p.dd][p.segmentTimestamp][p.segmentId];

      // check whether picture list is already loaded
      if (segment.pictures) {
        $scope.showSegmentDetails(segment);
        $scope.select(path,$event);

      } else {
        var span=$scope.showSpinner($event);

        // load segment pictures data
        Picture.find({
          filter: {
            where: {
              segmentId: p.segmentId
            }
          }

        }).$promise.then(function(pictures){
          segment.pictures=pictures;

          $scope.hideSpinner(span,p.segmentId);
          $scope.showSegmentDetails(segment);
          $scope.select(path,$event);

        }, function(err) {
          errorMessage.show('Could not load the segment picture list');
          $scope.hideSpinner(span,p.segmentId);
          $scope.expand(path,false);

        });
      }
    }

    var imgloading={};
    // load and show picture details
    $scope.showPictureDetails=function(expand,$event, path, index) {
      var p=splitPath(path);

      var pictures=$scope.tree[p.yyyy][p.mm][p.dd][p.segmentTimestamp][p.segmentId].pictures;
      var picture=pictures[index];

      $scope.select(path,$event);

      // check whether picture details are already loaded
      if (picture.loaded) {
        // trigger picture directive
        $scope.picture=picture;
        // show picture view
        $scope.view='picture';

      } else {
        // already loading something
        if (imgloading.picture) {
          // not this picture, restore tree leaf
          if (imgloading.picture.timestamp!=picture.timestamp) {
            imgloading.span.text($filter('formatTimestamp')(imgloading.picture.timestamp, 'hms'));

          } else {
            // already loading
            return;
          }
        }

        var span=$scope.showSpinner($event);
        imgloading.span=span;
        imgloading.picture=picture;

        // trigger picture directive
        $scope.picture=picture;
        // show picture view
        $scope.view='picture';

      }


    } // showPictureDetails

    // restore tree leaf text
    $scope.imgloaded=function($event) {
      console.log('loaded')
      var picture=imgloading.picture;
      if (!picture) {
        return;
      }
      console.log(picture)
      var blob=picture.blob;
      var src=$event.target.src||$event.target.blob;

      $scope.loading=false;

      if (blob==src) {
        imgloading.span.text($filter('formatTimestamp')(picture.timestamp, 'hms'));
        imgloading.picture=null;
      }
    }

    // toggle tree node state
    function splitPath(path) {
      var s=path.split('.');
      return {
        yyyy: s[0], //path.substr(0,4),
        mm: s[1], //path.substr(4,2),
        dd: s[2], //path.substr(6,2),
        segmentTimestamp: s[3], //path.substr(8,17),
        segmentId: s[4], // path.substr(25,24),
        pictureTimestamp: s[5] // path.substr(49)
      }
    }

    // toggle tree node state
    $scope.toggle=function($event, path, index) {
      var p=splitPath(path);

      // get toggled node state
      var expand=!$scope.isexpanded(path);

      // dont shrink unselected node when clicking on name
      var target=$($event.target);
      expand|=!$scope.selected[path] && target[0].tagName.toLowerCase()=='span';

      if (!expand) {
        // shrink node
        $scope.expand(path,false);

      } else {
        if (!p.pictureTimestamp) {
          // expand everything but leaf
          $scope.expand(path,true);
          $scope.select(path,$event);
        }

        if (p.segmentId) {
          if (!p.pictureTimestamp) {
            // user clicked on segmentId
            $scope.expandSegment(path,$event);

          } else {
            // user clicked on picture timestamp
            $scope.showPictureDetails(expand,$event,path,index);
          }

        } else {
            $scope.showRelatedSegments(path);
        }
      }

    } // toggle

    $scope.$on('ui.layout.resize', function(e, beforeContainer, afterContainer) {
      var container=beforeContainer.element;
      container.find('.ui-layout-resize')
        .height(container.height())
        .width(container.width());

      container=afterContainer.element;
      container.find('.ui-layout-resize')
        .height(container.height())
        .width(container.width());

    });

    $scope.refresh().$promise.then(function(){
      $scope.tableParams=new ngTableParams({
        sorting:  {
          timestamp: 'desc'
        },
        page: 1,
        count: 5

      },{
        groupBy: '_timestamp',
        getData: function($defer,params){
          console.log('params',params);
          console.log('parameters',params.parameters());
          console.log('settings',params.settings());
          console.log('sorting',params.sorting());
          console.log('orderBy',params.orderBy());
          console.log('filter',params.filter());

          $scope.data=params.sorting ? $filter('orderBy')($scope.list, params.orderBy()) : $scope.list;
          $scope.data=params.filter ? $filter('filter')($scope.data, params.filter()) : $scope.data;
          $scope.data=$scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());;
      //    params.settings().total=$scope.data.length;
          $defer.resolve($scope.data);
        },
        total: $scope.list.length
      });
    });


  })

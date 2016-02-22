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
  .controller('SegmentsCtrl', function ($scope, ngTableParams, errorMessage, getPictureBlobAndExif, Segment, Picture, $filter, User) {
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

    $scope.viewMode='tree';

    if ($scope.viewMode=='list') {
      $scope.dataFilter.filter.include=['preview'];
    }

    $scope.refresh=function(){
      $scope.loading=true;
      $scope.tree={};
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
              var segmentId=timestamp[_segment.timestamp];

              segmentId[_segment.id]=_segment.pictures;
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

    } // saveTreeStatae

    $scope.select=function($event, path) {
      if ($event.target.tagName.toLowerCase()!='span') {
        return;
      }
      var elem=$($event.target).addClass('selected');
      $('#segments span.selected').not(elem).removeClass('selected');
    }

    // load and show the list of picture timestamps
    $scope.clickOnSegmentId=function($event, path) {
      var p=splitPath(path);

      // check whether picture list is already loaded
      if ($scope.tree[p.yyyy][p.mm][p.dd][p.segmentTimestamp][p.segmentId]) {
        $scope.expanded[path.replace(/\./g,'')]=true;
        $scope.select($event);

      } else {
        // else load segment pictures list first
        var span=$('span',$($event.target).closest('li'));
        span.html('Loading... <i class="fa fa-cog fa-spin"></i>');
        $scope.expanded[path.replace(/\./g,'')]=true;
        $scope.loading=true;
        Picture.find({
          filter: {
            where: {
              segmentId: p.segmentId
            }
          }

        }, function(pictures){
          $scope.tree[p.yyyy][p.mm][p.dd][p.segmentTimestamp][p.segmentId]=pictures;

        }, function(err) {
          errorMessage.show('Could not load the segment picture list');
          $scope.loading=false;
          $scope.expanded[path.replace(/\./g,'')]=false;
          span.text(p.segmentId);

        }).$promise.then(function(){
          $scope.loading=false;
          span.text(p.segmentId);
          $scope.view='segment';
          $scope.saveTreeState();
          $scope.select($event);

        });

        return;
      }

    } // clickOnSegmentId

    var imgloading={};
    // load and show picture details
    $scope.clickOnPictureTimestamp=function($event, path, index) {
      var p=splitPath(path);

      var pictures=$scope.tree[p.yyyy][p.mm][p.dd][p.segmentTimestamp][p.segmentId];
      var picture=pictures[index];


      // check whether picture details are already loaded
      if (picture.loaded) {
        $scope.picture=picture;
        $scope.blob=picture.blob;
        $scope.view='picture';
        $scope.select($event);
        $scope.saveTreeState();

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

        var span=$('span',$($event.target).closest('li'));
        span.html('Loading... <i class="fa fa-cog fa-spin"></i>');
        imgloading.span=span;
        imgloading.picture=picture;
        $scope.loading=true;

        picture.url='/api/Pictures/download/'+picture.sha256+'/'+picture.segmentId+'/'+picture.id+'/'+picture.timestamp+'.jpg';
        getPictureBlobAndExif(picture,'thumb').then(function(picture){
            $scope.blob=picture.blob;
            $scope.picture=picture;
            $scope.view='picture';
            $scope.select($event);
            $scope.saveTreeState();

        }, function(err) {
            console.log(err);
            errorMessage.show(err);
            span.text($filter('formatTimestamp')(picture.timestamp, 'hms'));
        });

        return;
      }


    } // clickOnPictureTimestamp

    // restore tree leaf text
    $scope.imgloaded=function($event) {
      var picture=imgloading.picture;
      if (!picture) {
        return;
      }
      console.log(picture)
      var blob=picture.blob;
      var src=$event.target.src;

      $scope.loading=false;

      if (blob==src) {
        imgloading.span.text($filter('formatTimestamp')(picture.timestamp, 'hms'));
        picture.loaded=true;
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

      // toggle tree node state
      if ($scope.expanded[path.replace(/\./g,'')]) {
        delete $scope.expanded[path.replace(/\./g,'')];

      } else {
        var p=splitPath(path);
        if (!p.segmentId) {
          // usr clicked on a level below segmentId, nothing to load
          $scope.expanded[path.replace(/\./g,'')]=true;
          $scope.select($event);

        } else {
          if (!p.pictureTimestamp) {
            $scope.clickOnSegmentId($event,path);

          } else {
            $scope.clickOnPictureTimestamp($event,path,index);

          }
        }
      }

      $scope.saveTreeState();

    } // toggle

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

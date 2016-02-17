'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentsCtrl
 * @description
 * # SegmentsCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('SegmentsCtrl', function ($scope, ngTableParams, errorMessage, Segment, Picture, $filter, User) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.dataFilter={
      filter: {
        where: {
          userId: User.getCurrentId()
        }
      }
    };

    $scope.data=[];
    window.Picture=Picture;
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

    $scope.viewMode='tree';

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

              if (mm<10) mm='0'+mm;
              if (dd<10) dd='0'+dd;

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
              _segment._timestamp=formatTimestamp(_segment.timestamp);
              _segment._pictures={};
              $scope.list.push(_segment);
              //$scope.list[yyyy+mm+dd+_segment.timestamp+_segment.id]=_segment;

              break;
          }

        });

        console.log($scope.list,$scope.tree);
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
        $scope.expanded[path]=true;
        $scope.select($event);

      } else {
        // else load segment pictures list first
        var span=$('span',$($event.target).closest('li'));
        span.html('Loading... <i class="fa fa-cog fa-spin"></i>');
        $scope.expanded[path]=true;
        $scope.loading=true;
        var segmentId
        Picture.find({
          filter: {
            where: {
              segmentId: segmentId
            }
          }

        }, function(pictures){
          $scope.tree[p.yyyy][p.mm][p.dd][p.segmentTimestamp][p.segmentId]=pictures;

        }, function(err) {
          errorMessage.show('Could not load the segment picture list');
          $scope.loading=false;
          $scope.expanded[path]=false;
          span.text(p.segmentId);

        }).$promise.then(function(){
          $scope.loading=false;
          span.text(p.segmentId);
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
        picture.url='/api/Pictures/download/'+picture.sha256+'/'+picture.segmentId+'/'+picture.id+'/'+picture.timestamp+'.jpg?thumb=1';
        $scope.picture=picture;

      }
      $scope.view='picture';
      $scope.select($event);
      $scope.saveTreeState();

    } // clickOnPictureTimestamp

    $scope.imgloaded=function($event) {
      $scope.loading=false;
      var src=$event.target.src;
      if (document.location.origin+imgloading.picture.url==src) {
        imgloading.span.text($filter('formatTimestamp')(imgloading.picture.timestamp, 'hms'));
        imgloading.picture=null;
      }
    }

    // toggle tree node state
    function splitPath(path) {
      return {
        yyyy: path.substr(0,4),
        mm: path.substr(4,2),
        dd: path.substr(6,2),
        segmentTimestamp: path.substr(8,17),
        segmentId: path.substr(25,24),
        pictureTimestamp: path.substr(49)
      }
    }

    // toggle tree node state
    $scope.toggle=function($event, path, index) {

      // toggle tree node state
      if ($scope.expanded[path]) {
        delete $scope.expanded[path];

      } else {
        var p=splitPath(path);
        if (!p.segmentId) {
          // usr clicked on a level below segmentId, nothing to load
          $scope.expanded[path]=true;
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
          _timestamp: 'asc',
          timestamp: 'asc'
        },
        page: 1,
        count: 5

      },{
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

  });

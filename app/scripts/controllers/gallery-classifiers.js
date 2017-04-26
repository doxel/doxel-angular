'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:GalleryClassifiersCtrl
 * @description
 * # GalleryClassifiersCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('GalleryClassifiersCtrl', [
  '$scope',
  '$rootScope',
  'Tag',
  'SegmentTag',
  'Segment',
  'PictureTag',
  'Pose',
  '$q',
  '$state',
  function ($scope,$rootScope,Tag,SegmentTag,Segment,PictureTag,Pose,$q,$state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      minScore: 0.7,
      // tags in input
      tags: [],
      // loaded tags
      tagPool: [],
      // loaded tags ids
      inPool: [],

      getSegmentTags: function(){
        if (!$scope.getSegmentTags_promise) {
          $scope.getSegmentTags_promise=SegmentTag.find({
            filter: {
              where: {
                score: {gt: $scope.minScore}
              },
              include: 'tag'
            }
          }).$promise;
        }
        return $scope.getSegmentTags_promise;

      }, // getSegmentTags

      updateTags: function(){
        $scope.getSegmentTags()
        .then(function(segmentTags){
          console.log('segment tags:',segmentTags.length);

          var pool=$scope.tagPool;

          // create tagPool
          angular.forEach(segmentTags,function(t){
            if ($scope.inPool.indexOf(t.tagId)<0) {
              $scope.inPool.push(t.tagId);
              t.tag.text=t.tag.value;
              pool.push(t.tag);
            }
          });

          // sort by tag text
          pool.sort(function(a,b){
            var v1=a.value.toLowerCase();
            var v2=b.value.toLowerCase();
            return v2>v1?-1:v1>v2?1:0;
          })
          console.log('tag pool: ',pool.length);

        }).catch(function(err){
          console.log(err);
        });

      }, // updateTags

      loadTags: function(query){
        return $scope.tagPool.filter(function(tag){
          return tag.value.match(query);
        });
      },

      tagAdded: function(tag){
        console.log($scope.tags);
        var segmentsToShow=[];
        var tagsProcessed=[];

        $scope.tags.reduce(function(promise,tag){
          var q=$q.defer();

          promise.then(function(){
            var where={
              id: tag.id,
              filter: $scope.filter

            }
            return Tag.segments(where).$promise.then(function(segments){
              console.log('tag: '+tag.value,'segments: ',segments.length)
              var result=[];
              // logical and
              if (segmentsToShow.length) {
                segmentsToShow.forEach(function(segment,i){
                  var found=segments.some(function(_segment){
                    return segment.id==_segment.id;
                  });
                  if (found) {
                    result.push(segment);
                  }
                });
                segmentsToShow=result

              } else {
                segmentsToShow=segments;
              }
            });
          }).then(q.resolve)
          .catch(q.reject);

          return q.promise;

        },$scope.setFilter())
        .catch(function(err){
          console.log(err);
        })
        .then(function(){
          $scope.segments.splice(0,$scope.segments.length);
          $rootScope.$broadcast('segments-loaded',segmentsToShow);
        });
      
      }, // tagAdded

      setFilter: function() {
        return $scope.getGalleryFilter().then(function(filter){
          $scope.filter=filter;
        });
      }, // setFilter

      init: function(){
        $scope.$on('$stateChangeStart', function (event, next, current) {
          console.log('next',next.name);
          $scope.update(next);
        });
        $scope.$on('$stateChangeSuccess', function (event, toState) {
          $scope.update(toState);
        });


        $scope.$watch(function(){return $scope.tags.length},function(after,before){
          if (after>before) {
            $scope.tagAdded($scope.tags[$scope.tags.length-1]);
          } else {
            $scope.tagAdded();
          }

        });

        $scope.$on('picture.click',function($event,picture){
         
          Pose.find({
            filter: {
              where: {
                pictureId: picture.id
              },
              limit: 1
            }

          }, function(pose){
            if (pose.length) {
              $rootScope.params.pose=pose[0].index;

            } else {
              $rootScope.params.pose=0;
            }

            $rootScope.params.s=picture.segmentId;
            $scope.$state.transitionTo('gallery.view.cloud');

          }, function(err){
            console.log(err);
          });

        });

        $scope.updateTags();

        $scope.update($scope.$state.current);

      }, // init

      update: function(toState){
        console.log(toState.name);
        $scope.classifiers_visible=(toState.name.split('.').pop()=='classifiers');
      },

    });

    $scope.init();

  }

]);

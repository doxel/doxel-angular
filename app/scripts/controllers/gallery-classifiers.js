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
      skip: 0,

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

      loadTags: function(query){
        return $scope.tagPool.filter(function(tag){
          return tag.value.match(query);
        });
      },

      tagLoaded: [],

      updateTags: function(){
        $scope.getSegmentTags()
        .then(function(segmentTags){
          console.log('segment tags:',segmentTags.length);

          var tags=$scope.tagPool;
          if (tags.length) return;

          angular.forEach(segmentTags,function(t){
            // copy value in text field for tag input
            if (!$scope.tagLoaded[t.tag.id]) {
              t.tag.text=t.tag.value;
              tags.push(t.tag);
              $scope.tagLoaded[t.tag.id]=true;
            }
          });

          // sort by tag text
          tags.sort(function(a,b){
            var v1=a.value.toLowerCase();
            var v2=b.value.toLowerCase();
            return v2>v1?-1:v1>v2?1:0;
          })
          console.log('tag pool: ',tags.length);

        }).catch(function(err){
          console.log(err);
        });

      }, // updateTags

      tagAdded: function(tag){
        $scope.loadSegments();

      }, // tagAdded

      updateShownSegments: function(){
        console.log('updateShownSegments');
        $scope.skip=0;

        // Why zero ?...
        if (false && !$scope.tags.length) {
          $scope.segments.splice(0,$scope.segments.length);
          return;
        }

        var segpool=Object.keys($scope.loaded);
        $scope.loadedCount=segpool.length;

        // for each segment loaded
        segpool.reduce(function(promise,segmentId){
          return promise.then(function(){
            var segment=$scope.loaded[segmentId];
            var index;
            var alreadyDisplayed;
            alreadyDisplayed=false;

            // is the segment already displayed ?
            $scope.segments.some(function(_segment,i){
              if (_segment.id==segmentId) {
                index=i;
                return alreadyDisplayed=true;
              }
            });

            if (segment.tag && segment.tag.length) {
              // check if the segment has all the tags
              var count=0;
              var hasAll=$scope.tags.some(function(tag){
                var found=segment.tag.some(function(_tag){
                  return (tag.id==_tag.tagId);
                });
                if (found) {
                  ++count;
                  return (count==$scope.tags.length);
                }
              });
              if (alreadyDisplayed && !hasAll) {
                // remove from display
                $scope.segments.splice(index,1);

              } else if (!alreadyDisplayed && hasAll) {
                // add to display
                $scope.segments.push(segment);
              }

            } else {
              if (alreadyDisplayed) {
                $scope.segments.splice(index,1);
              }
            }

            $scope.skip=$scope.segments.length;
            return $q.resolve();

          });
        },$q.resolve())
        .catch(console.log);

      },

      operator: 'and',

      galleryFilter: function(){
        /// {"tag": {"elemMatch":  {"tagId": "58e40dc0a15b4e3907a1717e"}}, "tag.score": {"gte" : 0.9}}
//{"where":{"tag":{"elemMatch":{"score":{"$gt":0.6},"tagId":{"$eq":"58e40dbea15b4e3907a16e2c"}}}}}
        var where={};
        var tagCond=[];
        $scope.tags.forEach(function(tag){
          if (tag.id) {
            var elemMatch={
              tagId: {'$eq': tag.id},
              score: {'$gt': $scope.minScore}
            };
            tagCond.push({tag:{elemMatch: elemMatch}});
          }
        });
        if (tagCond.length>1) where[$scope.operator]=tagCond;
        else if (tagCond.length==1) {
          where=tagCond[0];
        }
        return $q.resolve({
          skip: $scope.skip,
          where: where
        });

      }, // galleryFilter

      init: function(){
        $scope.$on('$stateChangeStart', function (event, next, current) {
          console.log('next',next.name);
          $scope.update(next);
        });
        $scope.$on('$stateChangeSuccess', function (event, toState) {
          $scope.update(toState);
        });

        $scope._galleryFilter['gallery.view.classifiers']=$scope.galleryFilter;

        $scope.$on('segments-loaded',function(event,segments){
          if ($scope.classifiers_visible) $scope.updateShownSegments()
        });

        $scope.$watch(function(){return $scope.tags.length},function(after,before){
          if (after>before) {
            $scope.tagAdded($scope.tags[$scope.tags.length-1]);
          } else {
            $scope.tagAdded();
          }

        });

        $scope.update($scope.$state.current);

      }, // init

      update: function(toState){
        console.log(toState.name);
        $scope.classifiers_visible=(toState.name.split('.').pop()=='classifiers');
        if ($scope.classifiers_visible) {
          $scope.updateTags();
        }
      },

    });

    $scope.init();

  }

]);

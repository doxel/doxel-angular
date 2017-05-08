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
  '$timeout',
  function ($scope,$rootScope,Tag,SegmentTag,Segment,PictureTag,Pose,$q,$state,$timeout) {
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
        $scope.end('forward',false);
        $scope.skip=0;
        $scope.loadSegments();

      }, // tagAdded

      updateShownSegments: function(args){
        if (!args) {
          $scope.skip=0;
          var segments=$scope.loaded;

        } else {
          var segments=args.segments;
        }

        if (!$scope.tags.length || $scope.skip==0) {
          $scope.segments.splice(0,$scope.segments.length);
          if (!$scope.tags.length) {
            return $q.resolve();
          }
        }

        // for each segment loaded
        return Object.keys(segments).reduce(function(promise,segmentId){
          return promise.then(function(){
            var segment=segments[segmentId];
            var index;
            var alreadyDisplayed;

            if (!segment.id) {
              return;
            }

            alreadyDisplayed=false;

            // is the segment already displayed ?
            $scope.segments.some(function(_segment,i){
              if (_segment.id==segmentId) {
                index=i;
                return alreadyDisplayed=true;
              }
            });

            if (segment.tag && segment.tag.length) {
              var count=0;
              var show;

              switch ($scope.operator) {
              case 'and':
                var hasAll=false;
                if ($scope.tags.length) {
                  hasAll=$scope.tags.some(function(tag){
                    var found=segment.tag.some(function(_tag){
                      return (tag.id==_tag.tagId && _tag.score>=$scope.minScore);
                    });
                    if (found) {
                      ++count;
                      return (count==$scope.tags.length);
                    }
                  });

                } else {
                  hasAll=true;
                }
                show=hasAll;
                break;

              case 'or':
                var hasOne=false;
                if ($scope.tags.length) {
                  hasOne=$scope.tags.some(function(tag){
                    return segment.tag.some(function(_tag){
                      return (tag.id==_tag.tagId && _tag.score>=$scope.minScore);
                    });
                  });

                } else {
                  hasOne=true;
                }
                show=hasOne;
                break;
              }

              if (alreadyDisplayed && !show) {
                // remove from display
                $scope.segments.splice(index,1);

              } else if (!alreadyDisplayed && show) {
                // add to display
                if (!$scope.scrollBufferFull('forward')) {
                  $scope.segments.push(segment);
                  // get image count
                  if (!segment.picturesCount) {
                    Segment.pictures.count({id: segment.id},function(res){
                      segment.picturesCount=res.count;

                    },function(err){
                      console.log(err);
                    });
                  }
                }
              }

            } else {
              if (alreadyDisplayed) {
                $scope.segments.splice(index,1);
              }
            }
          });
        },$q.resolve())
        .then(function(){
          if (args) {
            $scope.skip+=args.segments.length;
          }
        })
        .catch(console.log)

      }, // updateShownSegments

      operator: 'or',

      galleryFilter: function(){
        /// {"tag": {"elemMatch":  {"tagId": "58e40dc0a15b4e3907a1717e"}}, "tag.score": {"gte" : 0.9}}
//{"where":{"tag":{"elemMatch":{"score":{"$gt":0.6},"tagId":{"$eq":"58e40dbea15b4e3907a16e2c"}}}}}
        var where={};
        var tagCond=[];
        $scope.tags.forEach(function(tag){
          if (tag.id) {
            var elemMatch={
              tagId: {'$eq': tag.id},
              score: {'$gte': $scope.minScore}
            };
            tagCond.push({tag:{elemMatch: elemMatch}});
          }
        });
        switch(tagCond.length) {
          case 0: //where={'tag.score': {'gte': $scope.minScore}};
                  return $q.reject('cancel');
                  break;
          case 1: where=tagCond[0];
                  break;
          default: where[$scope.operator]=tagCond;
                   break;
        }

        return $q.resolve({
          skip: $scope.skip,
          where: where
        });

      }, // galleryFilter

      init: function(){
        $scope._galleryFilter['segment-thumbs-tagged']=$scope.galleryFilter;

        $scope.$on('$stateChangeStart', function (event, next, current) {
          console.log('next',next.name);
          $scope.update(next);
        });

        $scope.$on('$stateChangeSuccess', function (event, toState) {
          $scope.update(toState);
        });

        $scope.$on('segments-loaded',function(event,args){
          if ($scope.galleryMode=='segment-thumbs-tagged') {
            var segments=args.segments;
            var length=$scope.segments.length;
            $scope.updateShownSegments(args).finally(function(){
              if (segments.length && !$scope.scrollBufferFull('forward')) {
                $scope.end('forward',false);
                $timeout($scope.loadSegments);
              }
            })
          }
        });

        $scope.$watch(function(){return $scope.tags.length},function(after,before){
          if (after>before) {
            $scope.tagAdded($scope.tags[$scope.tags.length-1]);
          } else if (after<before) {
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

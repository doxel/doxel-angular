'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:ClassifiersCtrl
 * @description
 * # ClassifiersCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('ClassifiersCtrl', [
  '$scope',
  '$rootScope',
  'SegmentTag',
  'PictureTag',
  'Pose',
  '$q',
  function ($scope,$rootScope,SegmentTag,PictureTag,Pose,$q) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var tags=$scope.tagbank=[];
    $scope.tags=[];
    $scope.pictures=[];

    angular.extend($scope,{
      minScore: 0.7,
      tags: [],
      updateTags: function(){
        SegmentTag.find({
          filter: {
            where: {
              score: {gt: $scope.minScore}
            },
            include: 'tag'
          }

        }).$promise.then(function(segmentTags){
          $scope.segmentTags=segmentTags;
          console.log(segmentTags.length);
          var done=[];
          angular.forEach(segmentTags,function(t){
            if (done.indexOf(t.tagId)<0) {
              done.push(t.tagId);
              t.tag.text=t.tag.value;
              tags.push(t.tag);
            }
          });
          tags=tags.sort(function(a,b){
            var v1=a.value.toLowerCase();
            var v2=b.value.toLowerCase();
            return v2>v1?-1:v1>v2?1:0;
          })
          console.log(tags.length);
        }).catch(function(err){
          console.log(err);
        });
      },

      loadTags: function(query){
        return tags.filter(function(tag){
          return tag.value.match(query);
        });
      },
      tagRemoved: function(tag){
        console.log(tag);
      },
      tagAdded: function(tag){

        console.log($scope.tags);
        var and=[];
        angular.forEach($scope.tags,function(_tag){
          and.push({tagId:_tag.id});
        });

        if (tag)
          and.push({tagId: tag.id});

        if (!and.length) {
          $scope.pictures.splice(0,$scope.pictures.length);
          return;
        }

        and.push({score: {gt: $scope.minScore}});

        PictureTag.find({
          filter: {
            where: {
              and: and
            },
            include: ['picture', {picture: 'tags'} ]
          }
        }).$promise.then(function(pictureTags){
          $scope.result=pictureTags;
          if (!pictureTags.length) {
            $scope.pictures.splice(0,$scope.pictures.length);
            return;
          }

          // remove pictures from $scope.pictures that are not in pictureTags
          var offset=0;
          angular.forEach($scope.pictures,function(picture,i){
            var count=0;
            var found=pictureTags.some(function(_pictureTag){
              return (_pictureTag.pictureId==picture.id);
            });
            if (!found) {
              $scope.pictures.splice(i-offset,1);
              ++offset;
            }
          });

          // add pictures from pictureTag to $scope.pictures
          angular.forEach(pictureTags,function(pictureTag){
            var found=$scope.pictures.some(function(picture){
              return (pictureTag.pictureId==picture.id);
            });
            if (!found) {
              $scope.pictures.push(pictureTag.picture);
            }
          });
          console.log(tags.length);
        }).catch(function(err){
          console.log(err);
        });
      
      }, // tagAdded

      init: function(){
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
      }

    });

    $scope.init();

  }

]);

/*
 * search-tag.js
 *
 * Copyright (c) 2015-2017 ALSENET SA - http://doxel.org
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
 * @ngdoc directive
 * @name doxelApp.directive:searchTag
 * @description
 * # searchTag
 */
angular.module('doxelApp')
  .directive('searchTag', [ 'Tag', 'SegmentTag', function (Tag, SegmentTag) {
    return {
      templateUrl: 'views/search-tag.html',
      restrict: 'E',
      replace: false,
      scope: {
        search: '='
      },
      controller: [
        '$scope',
        '$rootScope',
        '$q',
        '$location',
        function($scope, $rootScope, $q, $location) {

          angular.extend($scope,{
            click: function(tagId) {
              angular.forEach($scope.tags,function(tagList,_tagId){
                if (tagId==_tagId) {
                  $scope.search=tagList[0].tag.value;
    //              $rootScope.params.search=tagList[0].value;
                  $location.search('search',$scope.search);
                  $rootScope.$broadcast('location.search',[$location.search(),$rootScope.params]);
                }
              });
            }
          });
        }
      ],
      link: function postLink(scope, element, attrs) {
        angular.extend(scope,{
          minScore: 0.5,
          tags: {},
          color: [],
          style: [],
          limit: 50,
          filter: function() {
            return {
              where: {
                score: {gte: scope.minScore}
              },
              order: 'score DESC',
              limit: scope.limit,
              include: ['segment','tag']
            }
          },
          newRandomColor: function(options){
            var among=(options && options.among ) || 36;
            var mult=360/among;
            var hue;
            do {
              hue=Math.round(Math.random()*among);
            } while(scope.color.indexOf(hue)>=0 && scope.color.length+1<among);
            scope.color.push(hue);
            var color='hsl('
            +Math.floor(hue*mult)
            +', 100%, 70%);';
            return color;
          },
          getStyle: function(tagId) {
//            var score=(scope.score[tagId]+1)/(scope.maxScore+1);
            var len=(scope.tags[tagId].length+1)/(scope.maxLen+1);
//            console.log(score);
            scope.style[tagId]={
              'font-size': 'large',
              'text-transform': 'capitalize',
//              'font-size': (2*(score))+'em',
              color: scope.newRandomColor({among: 120})
            }
          },
          init: function(){
            var filter=scope.filter();
            console.log(filter);
            SegmentTag.find(
              {
                filter: filter
              },
              function(segmentTags){
                scope.maxLen=0;
                var tags=scope.tags;
                segmentTags.forEach(function(tag){
                  if (!tags[tag.tagId]) {
                    tags[tag.tagId]=[tag];
                    scope.getStyle(tag.tagId);
                  } else {
                    tags[tag.tagId].push(tag);
                  }
                  scope.maxLen=Math.max(scope.maxLen,tags[tag.tagId].length);
                });

                scope.score=[];
                scope.maxScore=0;
                angular.forEach(tags,function(tagList,tagId){
                  scope.score[tagId]=0;
                  tagList.forEach(function(segmentTag){
                    scope.score[tagId]+=segmentTag.score;
                  });
                  scope.maxScore=Math.max(scope.maxScore,scope.score[tagId]);
                });

                console.log(segmentTags.length);

              }, function(err) {
                console.log(err);
                ngNotify.set('Could not load classifiers list from server');
              }
            );
          },
        });
        console.log('scopeinit');
        scope.init();
      }
    };

  }]);

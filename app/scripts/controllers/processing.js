'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:ProcessingCtrl
 * @description
 * # ProcessingCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('ProcessingCtrl', [
  '$scope',
  '$q',
  'Segment',
  'formatTimestampFilter',
  function (
    $scope,
    $q,
    Segment,
    formatTimestampFilter
  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      segmentsPool: [],
      segmentsVisible: [],

      init: function() {
        // load unprocessed segments list
        $scope.loading=true;
        $scope.loadingProgress=0;
        $scope.loadSegments()
          .then(function(segments){
            $scope.segments=segments;
            // load and format segments data (must all be done at once for sortiing)
            segments.reduce(function(promise, segment){
              return $scope.getSegmentData(segment).then(function(){
                ++$scope.loadingProgress;
                $scope.progressStyle={
                  width: ($scope.loadingProgress / segments.length * 100) + '%'
                };
              });
            }, $q.resolve())
            .then(function(){
              Array.prototype.splice.apply($scope.segmentsPool,[0,$scope.segmentsPool.length].concat(segments));
              $scope.loading=false;
            });
          });
      },

      loadSegments: function(){
        return Segment.find({
          filter: {
            where: {
              pointCloudId: {exists: false}
            },
            fields: {
              id: true,
              previewId: true,
              timestamp: true,
              userId: true,
              status: true,
              pointCloudId: true,
              created: true
            }
          }
        }).$promise;
      },

      getSegmentData: function(segment) {
        segment.timestamp_str=formatTimestampFilter(segment.timestamp,'ymdhms');
        return $scope.getPicturesCount(segment);
      },

      getPicturesCount: function(segment){
        return Segment.pictures.count(segment).$promise.then(function(result){
          segment.picturesCount=result.count;
        });
      }

    });

    $scope.init();
  }

]);

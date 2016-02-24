'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:segmentDetails
 * @description
 * # segmentDetails
 */
angular.module('doxelApp')
  .directive('segmentDetails', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        segmentDetails: '<',
        segmentDetailsClass: '@'
      },
      controller: ['$scope', '$q', '$http', 'errorMessage', 'Picture', function($scope, $q, $http, errorMessage, Picture) {
        $scope.updateSegmentDetails=function(){
          var segment=$scope.segment=$scope.segmentDetails;
          Picture.count({
              where: {
                segmentId: segment.id
              }
          },function(result){
            $scope.count=result && result.count;
          });
        }; // updateSegmentDetails
        
      }],
      link: function(scope,element,attrs) {
        scope.$watch('segmentDetails',function(newValue, oldValue){
          scope.updateSegmentDetails();
        });
      },
      templateUrl: 'views/segment-details.html'
    };
  });

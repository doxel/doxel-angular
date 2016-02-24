'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:segment-preview
 * @description
 * # segment-preview
 */
angular.module('doxelApp')
  .directive('segmentPreview', function (Picture, errorMessage) {
    return {
      restrict: 'A',
      replace: false,

      scope: {
        segmentPreview: '=',
        segmentPreviewClass: '@'
      },
      controller: function($scope){
        $scope.updateSegment=function(){
          var segment=$scope.segmentPreview;
          if (segment.picture) {
            $scope.picture=segment.picture;
            return;
          }
          Picture.findById({id: segment.previewId},function(picture){
            segment.picture=picture;
            $scope.picture=picture;
          }, errorMessage.show);

        }; // updateSegment
      },
      link: function(scope, element, attrs) {
        scope.$watch('segmentPreview', function(newValue, oldValue) {
          if (newValue) {
            scope.updateSegment();
          }
        }, false);
      },

      template: '<div ng-if="picture" picture="picture" picture-class="{{segmentPreviewClass}}"></div>'
    };
  });

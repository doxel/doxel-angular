'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:segment-preview
 * @description
 * # segment-preview
 */
angular.module('doxelApp')
  .directive('segmentPreview', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      scope: {
        segmentPreview: '=',
        segmentPreviewClass: '@'
      },
      controller: ['$scope', 'errorMessage', 'Picture', function($scope, errorMessage, Picture) {
        var segment=$scope.segmentPreview;
        if (segment.picture) {
          $scope.picture=segment.picture;
          return;
        }
        Picture.findById({id: segment.previewId},function(picture){
          segment.picture=picture;
          $scope.picture=picture;
        }, errorMessage.show);
      }],
      template: '<div ng-if="picture" picture="picture" picture-class="{{segmentPreviewClass}}"></div>'
    };
  });

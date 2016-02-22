'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:picture
 * @description
 * # picture
 */
angular.module('doxelApp')
  .directive('picture', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      scope: {
        picture: '=',
        pictureClass: '@'
      },
      controller: ['$scope', '$q', '$http', 'errorMessage', 'getPictureBlobAndExif', function($scope, $q, $http, errorMessage, getPictureBlobAndExif) {
        var picture=$scope.picture;
        if (picture.blob) {
          $scope.blob=picture.blob;
          return;
        }
        $scope.blob='';
        picture.url='/api/Pictures/download/'+picture.sha256+'/'+picture.segmentId+'/'+picture.id+'/'+picture.timestamp+'.jpg';
        getPictureBlobAndExif(picture,(($scope.pictureClass=='thumb')?'thumb':undefined)).then(function(picture){
          $scope.blob=picture.blob;
        }, function(err) {
          errorMessage.show(err);
        });
      }],
      template: '<div class="{{pictureClass}}" style="background-image: url({{blob}});"></div>'
    };
  });

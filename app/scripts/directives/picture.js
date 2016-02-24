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
      scope: {
        picture: '=',
        pictureClass: '@',
        pictureOnload: '&'
      },
      controller: function($scope, errorMessage, getPictureBlobAndExif) {
        $scope.updatePicture=function() {
          var picture=$scope.picture;
          if (picture.blob) {
            $scope.blob=picture.blob;
            return;
          }
          $scope.blob=''; //TODO: eg animated gif or font-awesome spinner
          picture.url='/api/Pictures/download/'+picture.sha256+'/'+picture.segmentId+'/'+picture.id+'/'+picture.timestamp+'.jpg';
          getPictureBlobAndExif(picture,(($scope.pictureClass=='thumb')?'thumb':undefined)).then(function(picture){
            $scope.blob=picture.blob;
            if (typeof($scope.pictureOnload)=='function') {
              $scope.pictureOnload({
                $event: {
                  target: picture
                }
              });
            }

          }, function(err) {
            errorMessage.show(err);
          });
        };
      },
      link: function(scope,element,attrs){
        scope.$watch('picture', function(newValue, oldValue) {
          if (newValue) {
            scope.updatePicture();
          }
        });

      },
      template: '<div class="{{pictureClass}}" style="background-image: url({{blob}});"></div>'
    };
  });

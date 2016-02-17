'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:imgonload
 * @description
 * # imgonload
 */
angular.module('doxelApp')
  .directive('imgonload', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.bind('load', function(e){
          scope.$event=e;
          scope.$apply(attrs.imgonload);
        });
      }
    };
  });

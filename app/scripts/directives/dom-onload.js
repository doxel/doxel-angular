'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:domOnload
 * @description
 * # dom-onload
 */
angular.module('doxelApp')
  .directive('domOnload', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs) {
        var domOnload=$parse(attrs.domOnload);
        element.bind('load', function(e){
          domOnload(scope,{$event: e});
        });
      }
    };
  }]);

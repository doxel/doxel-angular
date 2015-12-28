'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:NavBarCtrl
 * @description
 * # NavBarCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('NavBarCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.getClass = function (path) {
      console.log($location.path());
      if ($location.path() === path) {
          return 'active';
      } else {
          return '';
      }
    };

    $scope.goto=function(dest){
      $location.path(dest);
    };

  });

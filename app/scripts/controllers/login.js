'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('LoginCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.visible=true;
  });

'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('MainCtrl', [ '$scope', '$location', 'Member', function ($scope,$location,Member) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if (!Member.isAuthenticated()) {
        $location.path('/login');
        return;
    }

  }]);

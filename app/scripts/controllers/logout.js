'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('LogoutCtrl', function ($scope, $location, User, LoopBackAuth) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    User.logout({
      accessToken: LoopBackAuth.accessTokenId

    }, function(resource){
      LoopBackAuth.clearUser();
      LoopBackAuth.clearStorage();
      $location.path('/main');

    }, function(err){
      console.log('logout failed',err)
    });

    $location.path('/main');

});

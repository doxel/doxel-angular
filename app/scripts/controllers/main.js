'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('MainCtrl', function ($scope,$location,Member,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Whenever the route changes we see if either the user is logged in or is                                        
    // trying to access a public route. Otherwise she will be redirected to
    // login.    
    $rootScope.$on('$routeChangeStart', function (event, next) {
      $scope.authenticated=Member.isAuthenticated();
      var path=$location.path();

      if (Member.isAuthenticated()) {
        if (path=='/login') {
          event.preventDefault();
          return;
        } 

      } else {
        switch(path) {
          case '/upload':
          case '/account':
            $location.nextAfterLogin=path;
            event.preventDefault();
            $location.path('/login');
            return;

          case '/logout':
            event.preventDefault();
            return;
        }
      }        
    });          

  });

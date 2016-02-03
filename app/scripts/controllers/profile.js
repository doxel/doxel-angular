'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('ProfileCtrl', function ($rootScope,$scope,User,errorMessage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loading=true;
    $scope.user={};
    User.findById({
      id: User.getCurrentId(),
      filter: {
        include: 'identities'
      }

    }, function(user){
      $scope.user=user;
      $scope.username=user.username;
      $scope.email=user.email;
      $scope.oldPassword='';
      $scope.newPassword='';

      $scope.loading=false;
      if (!$scope.visible) {
        $scope.visible=true;
        angular.element('#username').focus();
      }

    }, function(error){
      console.log(error);
      $scope.loading=false;
      errorMessage.show(error);

    });

    $scope.serverErrors={};
    $scope.error={
      invalidEmail: {
        field: 'email',
        msg: 'Enter a valid email address.'
      },
      emailExists: {
        field: 'username',
        msg: 'This email address is already registered.'
      },
      usernameExists: {
        field: 'username',
        msg: 'This username is already registered.'
      },
      noPassword: {
        field: 'password',
        msg: 'Please enter your password.'
      },
      noUsername: {
        field: 'username',
        msg: 'Please enter a username.'
      },
      loginFailed: {
        field: 'password',
        msg: 'Login Failed !<br>Maybe you mispelled the password.'
      }
    };

    $scope.facebook=function($event){
      $event.preventDefault();
      document.location.assign('/auth/facebook');
    };

    $scope.twitter=function($event){
      $event.preventDefault();
      document.location.assign('/auth/twitter');
    };

    $scope.google=function($event){
      $event.preventDefault();
      document.location.assign('/auth/google');
    };

  });

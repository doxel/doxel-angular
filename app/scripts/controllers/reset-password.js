'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:ResetPasswordCtrl
 * @description
 * # ResetPasswordCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('ResetPasswordCtrl', [
  '$scope',
  '$cookies',
  'errorMessage',
  'LoopBackAuth',
  '$routeParams',
  'User',
  '$rootScope',
  '$location',
  '$state',
  function (
    $scope,
    $cookies,
    errorMessage,
    LoopBackAuth,
    $routeParams,
    User,
    $rootScope,
    $location,
    $state
  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    LoopBackAuth.setUser($routeParams.access_token, null, null);

    $scope.visible=true;

    $scope.newpassword=$scope.confirmpassword='';

    $scope.serverErrors={};
    $scope.error={
      noPassword: {
        field: 'newpassword',
        msg: 'Please enter the new password.'
      },
      noPassword2: {
        field: 'confirmpassword',
        msg: 'Please confirm the new password.'
      },
      passwordsDontMatch: {
        field: 'confirmpassword',
        msg: 'The passwords are not matching.'
      },
      invalidPassword: {
        field: 'newpassword',
        msg: 'The password is invalid.'
      }
    };

    $scope.errorMessage=function(err){
      errorMessage.show({
        scope: $scope,
        form: $scope.resetPasswordForm,
        err: err
      });
    }

    $scope.changePassword=function($event){
      console.log($scope.newpassword,$scope.confirmpassword);
      $scope.errorMessage(null);
      if (!$scope.newpassword.length) {
        $scope.errorMessage('noPassword');
      } else if ($scope.newpassword.length<8) {
        $scope.errorMessage('invalidPassword');
      } else if (!$scope.confirmpassword.length) {
        $scope.errorMessage('noPassword2');
      } else if ($scope.newpassword!=$scope.confirmpassword) {
        $scope.errorMessage('passwordsDontMatch');

      } else {
        User.changePassword({
            password: $scope.newpassword

          }, function(res){
            if (res.result.error) {
              return $scope.errorMessage(res.result.error);
            }
            User.logout({
              accessToken: LoopBackAuth.accessTokenId

            }, function(resource){
              $rootScope.authenticated=false;
              $cookies.remove('access_token',{path:'/'});
              $cookies.remove('userId',{path:'/'});
              $cookies.remove('pp-access_token',{path:'/'});
              $cookies.remove('pp-userId',{path:'/'});
              $state.transitionTo('login');

            }, function(err){
              console.log('logout failed',err)
              $cookies.remove('access_token',{path:'/'});
              $cookies.remove('userId',{path:'/'});
              $cookies.remove('pp-access_token',{path:'/'});
              $cookies.remove('pp-userId',{path:'/'});
              $state.transitionTo('login');
            });

          }, function(err){
            console.log(err.message, err.stack);
            return errorMessage.show('Internal server error');
          }
        );
      }
    }

  }]);

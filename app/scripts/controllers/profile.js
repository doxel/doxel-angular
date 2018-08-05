/*
 * profile.js
 *
 * Copyright (c) 2015-2018 ALSENET SA - http://doxel.org
 * Please read <http://doxel.org/license> for more information.
 *
 * Author(s):
 *
 *      Luc Deschenaux <luc.deschenaux@freesurf.ch>
 *
 * This file is part of the DOXEL project <http://doxel.org>.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Additional Terms:
 *
 *      You are required to preserve legal notices and author attributions in
 *      that material or in the Appropriate Legal Notices displayed by works
 *      containing it.
 *
 *      You are required to attribute the work as explained in the "Usage and
 *      Attribution" section of <http://doxel.org/license>.
 */


'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('ProfileCtrl', [
  '$rootScope',
  '$scope',
  'User',
  'errorMessage',
  function (
    $rootScope,
    $scope,
    User,
    errorMessage
  ) {
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
      document.location.assign('/link/facebook');
    };

    $scope.twitter=function($event){
      $event.preventDefault();
      document.location.assign('/link/twitter');
    };

    $scope.google=function($event){
      $event.preventDefault();
      document.location.assign('/link/google');
    };

  }]);

/*
 * login.js
 *
 * Copyright (c) 2015 ALSENET SA - http://doxel.org
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
* @name doxelApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Controller of the doxelApp
*/
angular.module('doxelApp')
.controller('LoginCtrl', function ($scope, User, LoopBackAuth, $location) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  var loginScope=$scope;
  loginScope.visible=true;
  loginScope.serverErrors={};
  loginScope.error={
    invalidEmail: {
      field: 'email',
      msg: 'Enter a valid email address.'
    },
    emailExists: {
      field: 'username',
      msg: "This email address is already registered."
    },
    usernameExists: {
      field: 'username',
      msg: "This username is already registered."
    },
    noPassword: {
      field: 'password',
      msg: "Please enter your password."
    },
    noUsername: {
      field: 'username',
      msg: "Please enter a username."
    }
  };

  /**
  * @method getBrowserFingerprint
  *
  * generate browser fingerprint
  *
  */
  loginScope.getBrowserFingerprint=function getBrowserFingerprint(callback) {
    new Fingerprint2().get(function(result){
      callback(result);
    });
  }, // getBrowserFingerprint


  /**
  * @method loginScope.errorMessage
  */
  loginScope.errorMessage=function(err){
    if (!err) {
      for(err in loginScope.error) {
        if (!loginScope.error.hasOwnProperty(err)) {
          continue;
        }
        loginScope.loginForm[loginScope.error[err].field].$setValidity(err,true);
      }
      return;
    }

    var field=loginScope.error[err].field;
    if (field) {
      loginScope.loginForm[field].$setValidity(err,false);
      loginScope.hideMessages=false;
      setTimeout(function(){
        loginScope.hideMessages=true;
        $scope.$apply();
      },3000);

    } else {
      alert(loginScope.errmsg[err]||err);
    }

  };

  loginScope.signup=function(e){
    e.preventDefault();
    loginScope.errorMessage(null);
    loginScope.getBrowserFingerprint(function(fingerprint){
      loginScope.fingerprint=fingerprint;
      User.signup({
        email: loginScope.email,
        username: loginScope.username,
        password: loginScope.password,
        fingerprint: loginScope.fingerprint
      },
      function(res) {
        if (res.result.error) {
          loginScope.errorMessage(res.result.error);
          return;
        }
        LoopBackAuth.setUser(res.result.session.id, res.result.session.userId, null);
        LoopBackAuth.rememberMe=true;
        LoopBackAuth.save();
        $location.path($location.pathAfterSignin||'/upload');
      },
      function(err){
        alert('Signup failed !');
        console.log(err);

      });
    });
  };

  loginScope.signin=function($event){
    if ($event) {
      $event.preventDefault();
    }

    loginScope.errorMessage(null);
    if (!loginScope.password || !loginScope.password.length) {
      loginScope.errorMessage('noPassword');
      return;
    }
    if (!loginScope.username || !loginScope.username.trim().length) {
      loginScope.errorMessage('noUsername');
      return;
    }

    User.signin({
      email: loginScope.email,
      username: loginScope.username,
      password: loginScope.password
    },
    function(res) {
      if (res.result.error) {
        loginScope.errorMessage(res.result.error);
        return;
      }
      console.log(session);
      $location.path($location.pathAfterSignin||'/');
    },
    function(err){
      console.log(err);
      alert('Login failed !');
    });
  };

  loginScope.submit=function(){
    loginScope.signin();
  };

  loginScope.facebook=function($event){
    $event.preventDefault();
    document.location.assign('/auth/facebook');
  }

  loginScope.twitter=function($event){
    $event.preventDefault();
    document.location.assign('/auth/twitter');
  }

  loginScope.google=function($event){
    $event.preventDefault();
    document.location.assign('/auth/google');
  }

});

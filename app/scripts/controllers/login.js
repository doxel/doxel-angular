/*
 * login.js
 *
 * Copyright (c) 2015-2016 ALSENET SA - http://doxel.org
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
.controller('LoginCtrl', function ($scope, User, LoopBackAuth, $location, $sce, errorMessage, socketService, $q, $timeout) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  if (!$scope.visible) {
    $scope.visible=true;
    angular.element('#username').focus();
  }

  $scope.serverErrors={};
  $scope.error={
    emailInvalid: {
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
      msg: 'No matching user or password.'
    }
  };

  /**
  * @method getBrowserFingerprint
  *
  * generate browser fingerprint
  *
  */
  $scope.getBrowserFingerprint=function getBrowserFingerprint(callback) {
    new Fingerprint2().get(function(result){
      callback(result);
    });
  }, // getBrowserFingerprint


  /**
  * @method $scope.errorMessage
  */
  $scope.errorMessage=function(err){
    errorMessage.show({
      scope: $scope,
      form: $scope.loginForm,
      err: err
    });
  }

  var loginMessage={
    nopassword: '<p class="list">If you do not specify a password, you will not be able to reconnect to your account with another device or if your browser cookies are cleared.</p>',
    nomail: '<p class="list">If you do not specify an email address, you will not be able to recover your account if you forget your password.</p>',
    nocredentials: '<p class="list">If you do not specify a username and a password, you will not be able to reconnect to your account with another device or once your browser cookies are cleared.</p>',
    conditions: '<div><p style="width: 80%; margin-left: 10%;"><input type="checkbox">By checking this box and clicking "I Agree" below, you confirm that you have read, fully understand, will observe and further agree to be bound by all the statements of the document above, from time to time updated.</p></div>'
  }

  $scope.disclaimer=function(callback){
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-info-sign" style="margin-right: 10px;"></span>DISCLAIMER',
        message: function(dialog) {
          var $content=$(loginMessage.conditions);

          // disable button "I Agree"
          var button_agree=dialog.$modalFooter.find('button:last');
          button_agree[0].disabled=true;

          // disable checkbox
          var checkbox=$content.find('input');
          checkbox[0].disabled=true;
          checkbox.bind('change',function(e){
            button_agree[0].disabled=!e.target.checked;
          });

          // load Terms of Services
          $('<div></div>').load('views/tos.html',function(html){
            if (html.search('--marker--')) {
              // enable checkbox
              checkbox[0].disabled=false;
            }
          }).prependTo($content);

          return $content;
        },

        buttons: [{
            label: 'Cancel',
            action: function(dialog) {
                dialog.close();
                callback(false);
            }
          }, {
              label: 'I Agree',
              action: function(dialog) {
                dialog.close();
                callback(true);
              }
        }]
    });
  };

  $scope.doSignup=function(really){
    if (!really) {
      return;
    }
    $scope.getBrowserFingerprint(function(fingerprint){
      $scope.fingerprint=fingerprint;
      User.signup({
        email: $scope.email,
        username: $scope.username,
        password: $scope.password,
        fingerprint: $scope.fingerprint
      },
      function(res) {
        if (res.result.error) {
          $timeout(function(){
            $scope.errorMessage(res.result.error);
          });
          return;
        }
        LoopBackAuth.setUser(res.result.session.id, res.result.session.userId, null);
        LoopBackAuth.rememberMe=true;
        LoopBackAuth.save();
        $location.path($location.pathAfterSignin||'/upload');
      },
      function(err){
        $timeout(function(){
          $scope.errorMessage(err && err.data && err.data.error && err.data.error.message || 'Signup failed !');
        });
        console.log(err);

      });
    });

  };

  $scope.warned={};

  $scope.signup=function(e){
    e.preventDefault();
    $scope.errorMessage(null);

    var message='';
    if ((!$scope.username || !$scope.username.trim().length) && (!$scope.password || !$scope.password.trim().length)) {
      message+=loginMessage.nocredentials;

    } else if (!$scope.password || !$scope.password.trim().length) {
      message+=loginMessage.nopassword;
    }

    if (!$scope.email || !$scope.email.trim().length) {
      message+=loginMessage.nomail;
    }

    if (message.length) {
      BootstrapDialog.show({
          title: '<span class="glyphicon glyphicon-info-sign" style="margin-right: 10px;"></span><span>WARNING</span>',
          message: message,
          buttons: [{
              label: 'Cancel',
              action: function(dialog) {
                  dialog.close();
              }
          }, {
              label: 'Continue',
              action: function(dialog) {
                dialog.close();
                $scope.disclaimer($scope.doSignup);
              }
          }]
      });

    } else {
      $scope.disclaimer($scope.doSignup);
    }

  };

  $scope.signin=function($event){
    if ($event) {
      $event.preventDefault();
    }

    $scope.errorMessage(null);
    if (!$scope.username || !$scope.username.trim().length) {
      $scope.errorMessage('noUsername');
      return;
    }
    if (!$scope.password || !$scope.password.length) {
      $scope.errorMessage('noPassword');
      return;
    }

    User.signin({
      email: $scope.email,
      username: $scope.username,
      password: $scope.password
    },
    function(res) {
      if (res.result.error) {
        $timeout(function(){
          $scope.errorMessage(res.result.error);
        });
        return;
      }
      console.log(res.result.session);
      LoopBackAuth.setUser(res.result.session.id, res.result.session.userId, null);
      LoopBackAuth.rememberMe=true;
      LoopBackAuth.save();
      socketService.connect();
      $location.path($location.pathAfterSignin||'/');
    },
    function(err){
      console.log(err);
      alert('Login failed !');
    });
  };

  $scope.submit=function($event){
    $scope.signin($event);
  };

  $scope.facebook=function($event){
    $event.preventDefault();
    $scope.disclaimer(function(agree){
      if (agree) document.location.assign('/auth/facebook');
    });
  }

  $scope.twitter=function($event){
    $event.preventDefault();
    $scope.disclaimer(function(agree){
      if (agree) {
        document.location.assign('/auth/twitter');
      }
    });
  }

  $scope.google=function($event){
    $event.preventDefault();
    $scope.disclaimer(function(agree){
      if (agree) {
        document.location.assign('/auth/google');
      }
    });
  }

  $scope.resetPassword=function(){
    //send an email with instructions to reset an existing user's password
    if ($scope.mailSent) {
      errorMessage.show("An email has already been sent.");
      return;
    }

    if (!$scope.email || !$scope.email.trim().length) {
      $scope.errorMessage('emailInvalid');
      return;
    }

    User.resetPassword({
      email: $scope.email

    }, function(res) {
      console.log(res);

      $scope.emailSent=true;
      errorMessage.show("Check your email and follow the instructions.");

    }, function(err) {
      console.log(err);
      errorMessage.show(err && err.data && err.data.error && err.data.error.message || 'Unable to reset password.');

    });
  };


});

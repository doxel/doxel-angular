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


    $scope.visible=true;

    $scope.button_signup_click=function(){
        $scope.getBrowserFingerprint(function(fingerprint){
            $scope.fingerprint=fingerprint;
            User.signup({
                fingerprint: $scope.fingerprint

            },function(res) {
                LoopBackAuth.setUser(res.result.session.id, res.result.session.userId, null);
                LoopBackAuth.rememberMe=true;
                LoopBackAuth.save();
                $location.path($location.path_after_login||'/upload');

            },function(err){
                alert('Signup failed !');
                console.log(err);

            });
        });

    }

    $scope.button_login_click=function(){
        User.login({
            email: $scope.username,
            password: $scope.password
        },
        function(session) {
            $location.path($location.path_after_login||'/');
        },
        function(err){
            console.log(err);
            alert('Login failed !');
        });
    }

  });

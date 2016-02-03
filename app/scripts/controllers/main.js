/*
 * main.js
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
 * @name doxelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('MainCtrl', function ($scope, $location, $q, User, $rootScope, $cookies, LoopBackAuth, errorMessage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Whenever the route changes we see if either the user is logged in or is
    // trying to access a public route. Otherwise she will be redirected to
    // login.
    $rootScope.$on('$routeChangeStart', function (event, next) {
      $rootScope.authenticated=User.isAuthenticated();
      var path=$location.path();

      // When the user just logged in with passport,
      // bind and switch to parent user if any
      var cookies=$cookies.getAll();
      if (cookies && cookies['pp-access_token']) {

        var q=$q.defer();

        if (User.isAuthenticated()) {
          User.addThirdPartyAccount({
            access_token: cookies['pp-access_token']

          }, function(result){
            if (result.error) {
              q.reject(error);

            } else {
              q.resolve();
            }

          }, function(error) {
            q.reject(error);

          });

        } else {
          LoopBackAuth.setUser(cookies['pp-access_token'], cookies['pp-userId'], null);
          LoopBackAuth.save();

          // if parent account is known, switch to it
          User.getParent(function(result){
            if (result.error) {
              q.reject(error);

            } else {
              if (result.accessToken) {
                LoopBackAuth.setUser(result.accessToken.id, result.accessToken.userId, null);
                LoopBackAuth.save();
              }
              q.resolve();
            }

          },function(error){
            q.reject(error);

          });
        }

        q.promise.then(function(){
          $location.path($location.pathAfterSignin||'/upload');

        }).catch(function(error){
            errorMessage.show(error);

        }).finally(function(){
          console.log('finally')
          $cookies.remove('pp-access_token',{path:'/'});
          $cookies.remove('pp-userId',{path:'/'});
        });

        return;
      }

      if (User.isAuthenticated()) {
        if (path=='/login') {
          event.preventDefault();
          return;
        }

      } else {
        switch(path) {
          case '/upload':
          case '/profile':
            $location.pathAfterSignin=path;
            event.preventDefault();
            $location.path('/login');
            return;

          case '/logout':
            event.preventDefault();
            return;
        }
      }
    });

    $rootScope.$on('$routeChangeSuccess', function (event, next) {
      if (next.$$route) {
        $scope.view=next.$$route.controllerAs;
        $scope.$broadcast('rebuild:scrollbar');
        
      } else {
        $scope.view=null;
      }
    });

  });

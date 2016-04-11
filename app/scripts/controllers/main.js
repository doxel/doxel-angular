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
  .controller('MainCtrl', function ($scope, $location, $q, User, $rootScope, $cookies, LoopBackAuth, errorMessage,socketService) {
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
        $cookies.remove('pp-access_token',{path:'/'});
        $cookies.remove('pp-userId',{path:'/'});

        if ($rootScope.authenticated && cookies['pp-userId']=='undefined') {
          $location.path('/profile');
          // user linked a third-party account
          return;

        }
        if (cookies['pp-userId']!='undefined') {
          // user logged in with third-party account (returned credentials may be for main account)
          LoopBackAuth.setUser(cookies['pp-access_token'], cookies['pp-userId'], null);
          LoopBackAuth.save();
          $location.path($location.pathAfterSignin||'/upload');
          return;

        }
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
      $rootScope.path=$location.path();
      if (next.$$route) {
        $scope.view=next.$$route.controllerAs;
        $scope.$broadcast('rebuild:scrollbar');

      } else {
        $scope.view=null;
      }
    });

  });

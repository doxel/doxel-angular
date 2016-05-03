/*
 * app.js
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
 * @ngdoc overview
 * @name doxelApp
 * @description
 * # doxelApp
 *
 * Main module of the application.
 */
angular
  .module('doxelApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'lbServices',
    'ui.router',
    'ui.bootstrap',
    'ui-leaflet',
    'ngScrollbar',
    'ngTable',
    'angular-nicescroll',
    'btford.socket-io',
    'ui.layout',
    'ngTagsInput'


  ])
  .config(function ($httpProvider, $routeProvider, $stateProvider,$locationProvider) {

    // enable getting query string object with $location.search()
    // (base href must be set in index.html)
/*    $locationProvider.html5Mode({
      enabled: true,
      // TODO: in production requireBase must be set to true and base href must be set in index.html
      requireBase: true
    });
*/
    var bLazy = new Blazy({
        src: 'data-blazy' // Default is data-src
    });

    // Inside app config block
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          if (rejection.status == 401) {
            //Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            if ($location.path()!='/logout') {
               $location.pathAfterSignin = $location.path();
            }
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/reset-password', {
        templateUrl: 'views/reset-password.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'resetPassword'
      })
     .when('/viewer', {
        templateUrl: 'views/viewer.html',
        controller: 'ViewerCtrl',
        controllerAs: 'viewer'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload'
      })
      .when('/segments', {
        templateUrl: 'views/segments.html',
        controller: 'SegmentsCtrl',
        controllerAs: 'segments'
      })
      .when('/tos', {
        templateUrl: 'views/tos.html',
        controller: 'TosCtrl',
        controllerAs: 'tos'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

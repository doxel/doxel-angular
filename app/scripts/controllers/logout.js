/*
 * logout.js
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
 * @name doxelApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('LogoutCtrl', [
  '$scope',
  '$rootScope',
  '$location',
  'User',
  'LoopBackAuth',
  '$cookies',
  'socketService',
  'appConfig',
  function (
    $scope,
    $rootScope,
    $location,
    User,
    LoopBackAuth,
    $cookies,
    socketService,
    appConfig
  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    User.signout({removeAllAccessTokens: true},function(result){
      if (result && result.error) {
        console.log(result.error);
      }

    }, function(err){
      console.log(err);
    });

    User.logout({
      accessToken: LoopBackAuth.accessTokenId

    }, function(resource){
      $rootScope.authenticated=false;
      $cookies.remove('access_token',{path:'/'});
      $cookies.remove('userId',{path:'/'});
      $cookies.remove('pp-access_token',{path:'/'});
      $cookies.remove('pp-userId',{path:'/'});
      $state.transitionTo(appConfig.stateAfterSignout);

    }, function(err){
      console.log('logout failed',err)
      $cookies.remove('access_token',{path:'/'});
      $cookies.remove('userId',{path:'/'});
      $cookies.remove('pp-access_token',{path:'/'});
      $cookies.remove('pp-userId',{path:'/'});
      $state.transitionTo(appConfig.stateAfterSignout);
    });

    $scope.$on('unauthorized',function(){
      $state.transitionTo('gallery.view.home');
    });

    if (socketService.ioSocket && socketService.ioSocket.connected) {
      socketService.ioSocket.close();
    }

}]);

/*
 * navbar.js
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
 * @name doxelApp.controller:NavBarCtrl
 * @description
 * # NavBarCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('NavBarCtrl', [
  '$scope',
  '$location',
  '$rootScope',
  '$state',
  '$stateParams',
  function (
    $scope,
    $location,
    $rootScope,
    $state,
    $stateParams
  ) {
    this.awesomeThings=[
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope, {

      githubHref: 'https://github.com/doxel/doxel-angular',

      getClass:function (path) {
        if (path.split(',').indexOf($state.current.name)>=0) {
            return 'active';
        } else {
            return '';
        }
      },

      autoHide: function() {
        clearTimeout($scope.timeout);
        $scope.timeout=setTimeout(function(){
          if ($('.navbar-toggle').attr('aria-expanded')=='true') {
            setTimeout(function(){
              $('.navbar-toggle').click();
            });
          }
          $('body').addClass('navbar-hidden');
        },3000);
      },

      isNavbarExpandedVertically: function(){
        return !$('#js-navbar-collapse').hasClass('collapsed') && $('#js-navbar-collapse').position().top > $('#main-navbar').position().top
      },

      getshref: function(name){
        return '/app/'+$state.href(name,{segmentId: $state.params.segmentId})
      },

      init: function() {
        $scope.test=localStorage && localStorage.test;
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          if ($scope.autoHide_enabled || $scope.isNavbarExpandedVertically()){
            // close navbar
            var expanded=$('.navbar-toggle').attr('aria-expanded')=='true';
            if (expanded) {
              setTimeout(function(){
                $('.navbar .menu-handle').click();
              });
            }
          }
        });

        $('.header').on('mouseenter',function(){
          clearTimeout($scope.timeout);
          if ($scope.autoHide_enabled) {
            $('body').removeClass('navbar-hidden');
          }
        });

        $('.header').on('mouseleave',function(){
          if ($scope.autoHide_enabled) {
            $scope.autoHide();
          }
        });

        $('.navbar .menu-handle').on('click',function(){
          clearTimeout($scope.timeout);
          var hidden=$('body').hasClass('navbar-hidden');
          var expanded=$('.navbar-toggle').attr('aria-expanded')=='true';

          if ((!hidden && expanded) || (hidden && !expanded)) {
            setTimeout(function(){
              $('.navbar-toggle').click();
            });
          }

          $('body').toggleClass('navbar-hidden');
          if ($('body').hasClass('navbar-hidden')) {
            $rootScope.tagsInputCollapsed=true;
          } else {
            var collapsed = !$('tags-input ti-tag-item').length || expanded;  
            $rootScope.tagsInputCollapsed=collapsed;

          }

        });

    //    $scope.autoHide();

      }
    });

    $scope.init();

  }]);

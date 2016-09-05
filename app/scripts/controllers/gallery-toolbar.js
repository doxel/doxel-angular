'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:GalleryToolbarCtrl
 * @description
 * # GalleryToolbarCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryToolbarCtrl', function ($scope,$rootScope,$state,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      rootState: 'gallery.view',

      buttons: {
        info: {},
        map: {},
        earth: {},
        thumbs: {},
        cloud: {}
      },

      init: function() {
        for (var state in $scope.buttons){
          if (!$scope.buttons.hasOwnProperty(state)) {
            return;
          }
          $scope[state]=(function(state,rootState){
            return function() {
              var stateName=$scope.buttons[state].toState||($scope.rootState+'.'+state);
              if ($state.current.name!=stateName) {
                $state.go(stateName,$rootScope.params);
              }
            }
          })(state);
        }
      },

      getClass: function(what) {
        var name=$state.current.name.split('.');
        if (what=='viewer') {
          if ($location.search().s) {
            return '';
          } else {
            return 'disabled';
          }
        }
        if (name[0]=='gallery') {
          if (!$scope.visible) $scope.visible=true;
          if (name[2]==what) {
            if ($scope.currentView!=what) $scope.currentView=what;
            return "current";
          }
        } else {
          if ($scope.visible) $scope.visible=false;
          return (what==$scope.currentView)?'current':'';
        }
      }

    });

    $scope.init();

  });

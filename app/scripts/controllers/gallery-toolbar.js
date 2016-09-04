'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:GalleryToolbarCtrl
 * @description
 * # GalleryToolbarCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryToolbarCtrl', function ($scope,$rootScope,$state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if (!$scope.currentView) {
      $scope.currentView='thumbs';
    }

/*
    $scope.$on('segment.clicked',function(event,args){
      console.log(event,args);
    });
*/
    $scope.getClass=function(what) {
      var name=$state.current.name.split('.');
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

    var states=['info','map','earth','thumbs','eye'];
    states.forEach(function(name){
      $scope[name]=(function(name){
        return function() {
          var stateName='gallery.view.'+name;
          if ($state.current.name!=stateName) {
            $state.go(stateName,$rootScope.params);
          }
        }
      })(name);
    });

  });

'use strict';

/**
 * @ngdoc service
 * @name doxelApp.appConfig
 * @description
 * # appConfig
 * Service in the doxelApp.
 */
angular.module('doxelApp')
.service('appConfig', [
  '$state',
  function (
    $state
  ) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var appConfig=this;
  $.extend(this,{
    hostname: 'www.doxel.org',
    tileServer: 'doxel.org',
    stateAfterSignin: {state: 'upload'},
    stateAfterSignout: 'gallery.view.thumbs',
    transitionToStateAfterSignin: function(){
      var toState=appConfig.stateAfterSignin;
      $state.transitionTo(toState.state, toState.params);
    }
  });
}]);

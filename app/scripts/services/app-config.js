'use strict';

/**
 * @ngdoc service
 * @name doxelApp.appConfig
 * @description
 * # appConfig
 * Service in the doxelApp.
 */
angular.module('doxelApp')
.service('appConfig', function () {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var appConfig=this;
  $.extend(this,{
    hostname: 'ww3.doxel.org',
    tileServer: 'doxel.org',
    segmentsChunkSize: 9
  });
});

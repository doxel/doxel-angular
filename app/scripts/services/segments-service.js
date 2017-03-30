'use strict';

/**
 * @ngdoc service
 * @name doxelApp.segmentsService
 * @description
 * # segmentsService
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('segmentsService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var segmentsService=this;
    angular.extend(segmentsService,{
      segments: [],
      loaded: {}
    });

  });

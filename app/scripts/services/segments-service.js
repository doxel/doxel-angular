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
      loaded: []
    });

    Object.defineProperty(segmentsService.segments,'has',{
      value: function(segmentId){
        return this.find(function(segment){
          return segment.id==segmentId;
        });
      }
    });

    Object.defineProperty(segmentsService.loaded,'has',{
      value: function(segmentId){
        return this.find(function(segment){
          return segment.id==segmentId;
        });
      }
    });

  });

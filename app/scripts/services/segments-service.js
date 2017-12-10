'use strict';

/**
 * @ngdoc service
 * @name doxelApp.segmentsService
 * @description
 * # segmentsService
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('segmentsService', [
    '$rootScope',
    function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var segmentsService=this;
    angular.extend(segmentsService,{
      processing: {
        segments: [],
        segmentsPool: [],
        segmentsVisible: []
      },
      segments: [],
      loaded: [],
      tagLoaded: []
    });

    segmentsService.segments._push=segmentsService.segments.push
    segmentsService.segments.push=function(){
      return this._push.apply(this,Array.prototype.slice.apply(arguments));
    }

    segmentsService.segments._unshift=segmentsService.segments.unshift
    segmentsService.segments.unshift=function(){
      return this._unshift.apply(this,Array.prototype.slice.apply(arguments));
    }

    segmentsService.segments._slice=segmentsService.segments.slice
    segmentsService.segments.slice=function(){
      return this._slice.apply(this,Array.prototype.slice.apply(arguments));
    }

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

    $rootScope.$on('serverEvent.Segments',function(e,args){
      var segment=JSON.parse(args.data).data;
      segmentsService.segments.some(function(seg){
        if (seg.id==segment.id) {
          seg.status=segment.status;
          seg.status_timestamp=segment.status_timestamp;
        }
      });
      segmentsService.processing.segments.some(function(seg){
        if (seg.id==segment.id) {
          seg.status=segment.status;
          seg.status_timestamp=segment.status_timestamp;
        }
      });
    });


  }]);

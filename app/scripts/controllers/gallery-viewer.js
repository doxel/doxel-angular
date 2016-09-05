'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:GalleryViewerCtrl
 * @description
 * # GalleryViewerCtrl
 * Controller of the doxelApp
 */

angular.module('doxelApp')
  .controller('GalleryViewerCtrl', function ($scope,$rootScope,$location,$q,Segment,$state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      viewer_state: 'gallery.view.cloud',

      updateViewerState: function(state) {
         console.log(state)
        if (state==$scope.viewer_state) {
          $scope.viewer_visible=true;
          $scope.show();
        } else {
          $scope.viewer_visible=false;
          $scope.hide();
        }
      },

      init: function(){
        $scope.updateViewerState($state.current.name);

        $rootScope.$on('$stateChangeSuccess',function(event,toState){
          $scope.updateViewerState(toState.name);
        });

        $scope.$on('segment.clicked',function(event,segment){
          if ($scope.$state.current.name==$scope.viewer_state) {
            $scope.show();
          }
        });
      },

      show: function(){
        var segmentId=$location.search().s;
        if (!segmentId) {
          return;
        }

        var q=$q.defer();

        // get segment details
        $scope.segmentFind.$promise.then(function(_segments){
          var found;
          _segments.some(function(segment){
            if (segment.id==segmentId) {
              found=true;
              q.resolve(segment);
              return true;
            }
          });
          if (!found) {
            Segment.findById({id: segmentId},function(segment){
                q.resolve(segment);
            },q.reject);
          }
        });

        q.promise.then(function(segment){
          var src=$('iframe.viewer').attr('src');
          var toSrc='/api/segments/viewer/'+segment.id+'/'+segment.timestamp+'/viewer.html';
          if (src!=toSrc) {
            $('iframe.viewer').attr('src',toSrc);
          }
        });

      },

      hide: function(){
      }

    });

    $scope.init();


  });

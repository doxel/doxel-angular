'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:GalleryMapCtrl
 * @description
 * # GalleryMapCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('GalleryMapCtrl', function ($scope,$rootScope,$q,$location,$window,$timeout,leafletData,leafletBoundsHelpers,Segment,$state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      init: function(){

        $scope.map_visible=true;

        $timeout(function(){
          $scope.map_visible=($state.current.name=='gallery.view.map');
        },1);


        // opbtain a reference for the leaflet map
        var q=$q.defer();
        $scope.map_promise=q.promise;
        $timeout(function(){
          leafletData.getMap('main').then(function(map){
            q.resolve(map);
          });
        },1000);

        // show location on segment.clicked
        $scope.$on('segment.clicked',function($event,args){
          $scope.map_promise.then(function(map){
            var segment=args.segment;
            $scope.setView(segment);
            if ($scope.currentMarker) {
              map.removeLayer($scope.currentMarker);
            }
            $scope.currentMarker=L.marker([segment.lat,segment.lng]);
            map.addLayer($scope.currentMarker);
          });
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          $scope.map_visible=(toState.name=='gallery.view.map');
        });

        $scope.$on('centerUrlHash',function(event,hash){
          console.log(hash);
          $rootScope.params.c=hash;
          $location.search($rootScope.params);
        });

        $scope.$on('leafletDirectiveMap.moveend',function(){

/*
TODO: use geopoint and using the smallest map dimension
 compute distance from the center to the border,
 then filter according to center and radius
        // update segments list on moveend
          if (!$scope._map) return;
          Segment.find({
            filter: {
              where: {
              }
            }
          },
          function(segments){
            $scope.segments=segments;
            $rootScope.$broadcast('segments',segments);
          },
          function(err) {
            console.log(err);

          })
*/
        });

      },

      events: {
        map: {
          enable:  ['moveend', 'click'],
          login: 'emit'
        }
      },

      controls: {
        scale: true
      },

      defaults: {
        zoomControlPosition: 'topright',
        minZoom: 3
      },
/*
      // initial map bounds
      bounds: leafletBoundsHelpers.createBoundsFromArray([
        [ -40, -40 ],
        [ 40, 40 ]
      ]),
*/
      // pan and zoom
      setView: function(segment){
        $scope.map_promise.then(function(map){
          map.setView({
            lat: segment.lat,
            lng: segment.lng
          },
          segment.zoom||map._zoom, {
            pan: {}
          });
        });
      }
    });

    $scope.init();

  });

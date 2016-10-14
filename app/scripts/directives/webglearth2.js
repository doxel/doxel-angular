'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:webglearth2
 * @description
 * # webglearth2
 */
angular.module('doxelApp')
  .directive('webglearth2', function ($timeout) {
    return {
      template: '<div class="webglearth2" ng-attr-id="{{div_id}}"></div>',
      restrict: 'E',
      scope: {
        scope: '=',
        layers: '=',
        markers: '=',
        options: '=',
        center: '='
      },
      link: function postLink(scope, element, attrs, ctrl) {
        scope.div_id=Date.now();
        $timeout(scope.init,0);
        element.on('$destroy',function(){
          scope.earth.getCesiumScene().destroy();
        });
      },
      controller: function($scope,appConfig,$q){
				$scope.scope.we2=$scope;
				$scope.q=$q.defer();
				$scope.ready=$scope.q.promise;
        angular.extend($scope,{
          defaults: {
            sky: true,
            atmosphere: true,
            dragging: true,
            tilting: true,
            zooming: true,
            center: [8, 47],
            zoom: 3
          },
          layers: $scope.layers || {
            blueMarble: {
              title: 'Blue Marble',
              url: '//{s}.'+appConfig.tileServer+'/blue-marble/{z}/{x}/{y}.png',
              options: {
                attribution: 'Blue-Marble imagery is (c) 2004 NASA',
                tilesize: 256,
                tms: true,
                subdomains: ['a','b','c']
              }
            }
          },
          init: function(){
            $scope.earth=new WE.map($('#'+$scope.div_id)[0], $scope.options || $scope.defaults);
            $scope.initLayers();
						$scope.q.resolve();
          },
          initLayers: function(){
            for (var i in $scope.layers) {
              var l=$scope.layers[i];
              var layer=WE.tileLayer(l.url,l.options);
              layer.addTo($scope.earth);
            }
          },
					setView: function(lnglat,z){
						$scope.zoomAndPan({
							to: {
								lon: lnglat.lng,
								lat: lnglat.lat,
								zoom: z
							},
							steps: 15,
							fixedZoom: z===undefined,
							noConstraints: true,
							forceStayTheCourse: true
					
						});
					},
				  zoomAndPan: function(options) {
						 var earth=$scope.earth;
						 var from=options.from||{};
						 var to=options.to;
									
						 if ($scope.zoomandpanForceStayTheCourse===true && options.firstPan!==true) {
							 return;
						 }
						 $scope.zoomandpanForceStayTheCourse=options.forceStayTheCourse;
									
						 Math.easeOutCubic = function (time, base, delta, duration) {
								 time /= duration;
								 --time;
								 return base+delta*(time*time*time+1);
						 };
									
						 if (from.lat===undefined) {
							 var center=earth.getCenter();
							 from.lat=center[0];
							 from.lon=center[1];
						 }
									
						 if (from.zoom===undefined) {
								 from.zoom=earth.getZoom();
						 }
									
						 if (to.zoom===undefined) {
							 to.zoom=earth.getZoom();
						 }
									
						 if (!options.callback) {
							 options.callback=function(){};
						 }
									
						 if (!options.steps) {
							 options.steps=1;
						 }
									
						 var cur={
								 lat: from.lat,
								 lon: from.lon,
								 zoom: from.zoom
						 }
									
						 var delta={
								 lat: (to.lat-from.lat)%180,
								 lon: (to.lon-from.lon)%360,
								 zoom: (to.zoom-from.zoom)
						 }
									
						 if (!options.noConstraints) {
							 if (delta.lon>180) {
								 delta.lon=delta.lon-360;
							 } else if (delta.lon<-180) {
								 delta.lon=360+delta.lon;
							 }
									
							 if (delta.lat>90) {
								 delta.lat=delta.lat-180;
							 } else if (delta.lat<-90) {
								 delta.lat=180+delta.lat;
							 }
						 }
									
						 var i=0;
						 var now=Date.now();
						 $scope.zoomandpanId=now;
									
						 function loop() {
								 if ($scope.zoomandpanId!=now) return;
								 earth.setView([cur.lat,cur.lon],options.fixedZoom?undefined:cur.zoom);
								 if (++i>options.steps) {
									 $scope.zoomandpanForceStayTheCourse=false;
									 options.callback();
									 return;
								 }
								 requestAnimationFrame(loop);
								 cur.lon=Math.easeOutCubic(i,from.lon,delta.lon,options.steps);
								 cur.lat=Math.easeOutCubic(i,from.lat,delta.lat,options.steps);
								 if (!options.fixedZoom) {
									 cur.zoom=Math.easeOutCubic(i,from.zoom,delta.zoom,options.steps);
								 }
						 }
						 loop();
    			}


        });

//        $scope.init();

      } // controller
    };
  });

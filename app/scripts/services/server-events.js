'use strict';

/**
 * @ngdoc service
 * @name doxelApp.serverEvents
 * @description
 * # serverEvents
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('serverEvents', [
    '$rootScope',
    '$timeout',
    function (
      $rootScope,
      $timeout
    ) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      var serverEvents=this;

      angular.extend(serverEvents,{
        eventSource: {},
        init: function(modelName){
          if (!serverEvents.eventSource[modelName]) {
            var urlToChangeStream = '/api/'+modelName+'/change-stream?_format=event-stream';
            var src = serverEvents.eventSource[modelName] = new EventSource(urlToChangeStream);
            src.addEventListener('data', function(msg) {
              $timeout(function(){
                console.log('serverEvent.'+modelName)
                $rootScope.$broadcast('serverEvent.'+modelName,msg);
                var data = JSON.parse(msg.data,false,4);
                console.log(data); // the change object
              });
            });
            src.addEventListener('error', function(err){
              console.log('EventSource Failed',err);
            });
            src.addEventListener('open', function(){
              console.log('EventSource open');
            });
          }
        }

      });
      console.log('INIT');
      serverEvents.init('Segments');
    }
  ]);

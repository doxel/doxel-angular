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
    function (
      $rootScope
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
              $rootScope.$broadcast('serverEvent.'+modelName,msg);
              var data = JSON.parse(msg.data,false,4);
              console.log(data); // the change object
            });
          }
        }

      });
      console.log('INIT');
      serverEvents.init('Segments');
    }
  ]);

'use strict';

/**
 * @ngdoc service
 * @name doxelApp.getPictureBlobAndExif
 * @description
 * # getPictureBlobAndExif
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('getPictureBlobAndExif', [ '$q', '$http', function ($q, $http) {
    return function(picture,format) {
      var q=$q.defer();

      // load thumbnail as blob
      $http({
        method: 'GET',
        cache: true,
        responseType: 'blob',
        url: picture.url+(format ? '?what='+format : '')

      }).then(function successCallback(response) {
        if (response.status==200) {

          // show thumbnail
          picture.blob=window.URL.createObjectURL(response.data);

          // extract exif
          var reader=new FileReader();
          reader.addEventListener('loadend',function(){
            if (reader.error) {
              console.log(reader.error);
              q.reject(new Error('Could not read image'));

            } else {
              try {
                picture.exif=piexif.load(reader.result);

              } catch(e) {
                console.log(e);
                q.reject(new Error('Could not parse EXIF'));
              }

              q.resolve(picture);
            }

          });
          reader.readAsBinaryString(response.data);

        } else {
          q.reject(new Error('Could not load image'));
        }

      }, function errorCallback(response) {
        console.log(response);
        q.reject(new Error('Internal server error'));
      });

      return q.promise;

    }

  }]);

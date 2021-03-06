/*
 * get-picture-blob-and-exif.js
 *
 * Copyright (c) 2015-2019 ALSENET SA - http://doxel.org
 * Please read <http://doxel.org/license> for more information.
 *
 * Author(s):
 *
 *      Luc Deschenaux <luc.deschenaux@freesurf.ch>
 *
 * This file is part of the DOXEL project <http://doxel.org>.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Additional Terms:
 *
 *      You are required to preserve legal notices and author attributions in
 *      that material or in the Appropriate Legal Notices displayed by works
 *      containing it.
 *
 *      You are required to attribute the work as explained in the "Usage and
 *      Attribution" section of <http://doxel.org/license>.
 */

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
    return function(picture) {
      var q=$q.defer();

      function blobToText(blob){
        var q=$q.defer();
        var reader=new FileReader();
        reader.addEventListener('loadend',function(){
          if (reader.error) {
            console.log(reader);
            q.reject(new Error('Internal server error'));

          } else {
            q.resolve(reader.result);
          }
        });
        reader.readAsText(blob);
        return q.promise;

      } // blobToText

      function errorMessageFromBlob(blob){
        blobToText(blob)
        .then(function(text){
          console.log(text);
          q.reject(new Error(text));
        })
        .catch(function(err){
          q.reject(err);
        });

      } // errorErrorMessageFromBlob


      // load thumbnail as blob
      $http({
        method: 'GET',
        cache: true,
        responseType: 'blob',
        url: picture.url

      }).then(function successCallback(response) {
        if (response.status!=200) {
          console.log(response);
          q.reject(new Error('Could not load image'));
          return;
        }

        if (response.data.type.split('/')[0]=='text') {
          errorMessageFromBlob(response.data);
          return;
        }

        // show thumbnail
        picture.blob=window.URL.createObjectURL(response.data);

        // extract exif
        var reader=new FileReader();
        reader.addEventListener('loadend',function(){
          if (reader.error) {
            console.log(response,reader);
            q.reject(new Error('Could not read image'));

          } else {
            try {
              picture.exif=piexif.load(reader.result);

            } catch(e) {
              console.log(response,e);
              q.reject(new Error('Could not parse EXIF'));
            }

            q.resolve(picture);
          }

        });
        reader.readAsBinaryString(response.data);

      }, function errorCallback(response) {
        console.log(response);

        if (response.data.type.split('/')[0]=='text') {
          errorMessageFromBlob(response.data);
          return;

        } else {
          q.reject(new Error('Internal server error'));
        }

      });

      return q.promise;

    }

  }]);

/*
 * uploader-service.js
 *
 * Copyright (c) 2017 ALSENET SA - http://doxel.org
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
 * @name doxelApp.uploaderService
 * @description
 * # uploaderService
 * Service in the doxelApp.
 */
angular.module('doxelApp')
  .service('uploaderService', [
    '$q',
     'FileUploader',
     'jpegFile',
     'Picture',
     '$state',
     'LoopBackAuth',
     'ngNotify',
     function ($q, FileUploader, jpegFile, Picture, $state, LoopBackAuth, ngNotify) {
      // AngularJS will instantiate a singleton by calling "new" on this function

      var uploaderService=this;

      function stringToBinary(str){
        var bin=new Uint8Array(str.length);
        var i=str.length
        while(i--) bin[i]=str.charCodeAt(i);
        return bin.buffer;
      } // stringToBinary

      angular.extend(uploaderService,{
        initUploader: function() {
          var uploader=uploaderService.uploader=new FileUploader({
            url: 'sendfile'
          });
          // FILTERS

          uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
              console.log('syncFilter');
              return this.queue.length < 10000;
            }
          });
          // an async filter
          uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item, options, deferred) {
              if ($state.current.name!='upload2') {
                $state.transitionTo('upload2');
                setTimeout(deferred.resolve, 1e3);
              } else {
                deferred.resolve();
              }
            }
          });

          // CALLBACKS

          uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
          };
          uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
          };
          uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
          };
          uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
            var q=$q.defer();

            jpegFile.getEXIF({
							item: item,
              file: item._file
            })
            .then(jpegFile.getHash)
            .then(uploaderService.isHashUnique)
            .then(jpegFile.updateEXIF)
            .then(jpegFile.getTimestamp)
            .then(jpegFile.getGPSCoords)
            .then(function(data){
              console.log(data);
              var jpeg=data.jpeg_new||data.jpeg;
              var blob=new Blob([stringToBinary(jpeg)],{type: 'image/jpeg'});
              blob.name=data.file.name;
              blob.lastModifiedDate=data.file.lastModifiedDate;
              blob.lastModified=data.file.lastModified;
              item._file=blob;

              item.headers.Authorization=LoopBackAuth.accessTokenId;
              item.formData.push({
                sha256: data.sha256,
                timestamp: data.timestamp,
                chunks: 1,
                chunk: 0,
                name: blob.name
              });
              q.resolve();
            })
            .catch(function(err){
              if (err=='skip') {
								uploader.cancelItem(item);
								q.reject();

							} else {
								ngNotify.set(err.message);
								q.reject(err);
							}
            });
            return q.promise;
          };

          uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
          };
          uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
          };
          uploader.onSuccessItem = function(fileItem, response, status, headers) {
            if (response.error) {
              if (response.error.original && response.error.original.message) {
                ngNotify.set(response.error.original.message);
              }
            }
            fileItem.remove();
            console.info('onSuccessItem', fileItem, response, status, headers);
          };
          uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
          };
          uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
          };
          uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
          };
          uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
          };

          console.info('uploader', uploader);
          return uploader;

        }, // initUploader

        isHashUnique: function(data){
          var q=$q.defer();

          Picture.isHashUnique({
            sha256: data.sha256

          }, function(res) {
            // exists already
            if (res && res.result && res.result.unique) {
              q.resolve(data);

            } else if (res && res.result) {
						  ngNotify.set('Duplicate File: '+data.file.name);
              q.reject('skip');

            }
            return;

          }, function(err) {
            q.reject(err);

            if (err.status==401) {
              // authentication needed
              $state.transitionTo('login');
            }
          });

          return q.promise;

        } // isHashUnique

      }); // extend uploaderService

    }]);

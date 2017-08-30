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
     '$timeout',
     '$rootScope',
     function (
       $q,
       FileUploader,
       jpegFile,
       Picture,
       $state,
       LoopBackAuth,
       ngNotify,
       $timeout,
       $rootScope
     ) {
      // AngularJS will instantiate a singleton by calling "new" on this function

//      console.info=console.log=function(){};

      var uploaderService=this;

      function stringToBinary(str){
        var bin=new Uint8Array(str.length);
        var i=str.length
        while(i--) bin[i]=str.charCodeAt(i);
        return bin.buffer;
      } // stringToBinary

      angular.extend(uploaderService,{
        maxQueueLength: 10000,
        maxFileSize: 100*1024*1024,

        alreadyQueued: function(file) {
          return uploaderService.uploader.queue.some(function(item){
            return (item.file.name==file.name && item.file.size==file.size && item.file.lastModifiedDate.getTime()==file.lastModified);
          });
        },

        initUploader: function(options) {
          angular.extend(uploaderService,options);
          var uploader=uploaderService.uploader=new FileUploader(uploaderService.fileUploaderOptions);
          uploader.isPaused=true;
          // FILTERS

          // an async filter
          uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item, options, deferred) {
              if ($state.current.name!='upload') {
                $state.transitionTo('upload').then(deferred.resolve);
              } else {
                deferred.resolve();
              }
            }
          });

          uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
              if (item.type!='image/jpeg') {
                ngNotify.set('Not a JPEG file: '+item.name);
                return false;
              }
              if (item.size>uploaderService.maxFileSize) {
                ngNotify.set('File is too big: '+item.name);
                return false;
              }
              if (this.queue.length>uploaderService.maxQueueLength) {
                if (this.queue.length==uploaderService.maxQueueLength+1) {
                  ngNotify.set('You cannot queue more than '+uploaderService.maxQueueLength+' files at once.')
                }
                return false;
              }
              if (uploaderService.alreadyQueued(item)) {
                ngNotify.set('Already queued: '+item.name);
                return false;
              }
              return true;
            }
          });

          // CALLBACKS

          uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
//            console.info('onWhenAddingFileFailed', item, filter, options);
          };
          uploader.onAfterAddingFile = function(fileItem) {
            // console.info('onAfterAddingFile', fileItem);
          };
          uploader.onAfterAddingAll = function(addedFileItems) {
//            console.info('onAfterAddingAll', addedFileItems);
          };
          uploader.onBeforeUploadItem = function(item) {
//            console.info('onBeforeUploadItem', item);
            if (uploader.isPaused) {
              return $q.reject('paused');
            }

            uploaderService.currentItem=item;

            var promise;
            var q=$q.defer();
            var data={
							item: item,
              file: item._file_orig || item._file
            };

            if (uploaderService.showThumb) {
              promise= jpegFile.getFileDataURL(data)
              .then(jpegFile.preloadImage)
              .then(jpegFile.getThumb)
              .then(function(data){
                if (jpegFile.canvas) {
                  try {
                    uploader.thumbDataURL=jpegFile.canvas.toDataURL();
                  } catch(e) {
                    console.log(e);
                  }
                  uploader.thumbStyle={
                    'background-image': 'url('+uploader.thumbDataURL+')'
                  };
                }
                return $q.resolve(data);
              })

            } else {
              promise=$q.resolve(data);
            }

            promise.finally(function(){
              jpegFile.getBinaryString(data)
              .then(jpegFile.getEXIF)
              .then(jpegFile.getHash)
              .then(uploaderService.isHashUnique)
              .then(jpegFile.updateEXIF)
              .then(jpegFile.getTimestamp)
              .then(jpegFile.getGPSCoords)
              .then(function(data){
                var jpeg=data.jpeg_new||data.jpeg;
                var blob=new Blob([stringToBinary(jpeg)],{type: 'image/jpeg'});
                blob.name=data.file.name;
                blob.lastModifiedDate=data.file.lastModifiedDate;
                blob.lastModified=data.file.lastModified;
                item._file_orig=item._file_orig||item._file;
                item._file=blob;

                if (!data.timestamp) {
                  var lastModified=String(blob.lastModified);
                  data.timestamp=lastModified.substr(0,10)+'_'+lastModified.substr(10,3)+'000';
                }

                item.headers.Authorization=LoopBackAuth.accessTokenId;
                item.formData[0]={
                  sha256: data.sha256,
                  timestamp: data.timestamp,
                  lat: data.lat,
                  lon: data.lon,
                  chunks: 1,
                  chunk: 0,
                  name: blob.name
                };
                $timeout(q.resolve);
              })
              .catch(function(err){
                if (err=='skip') {
                  uploader.cancelItem(item);
                  item.isCancel=false;
                  item.isError=false;
                  item.isSkip=true;
                  q.reject();

                } else {
                  ngNotify.set(err.message||err||'Unexpected error');
                  q.reject(err);
                }
              });
            });
            return q.promise;
          };

          uploader.onProgressItem = function(fileItem, progress) {
            var value=progress+'%';
            uploader.isUploading=true;
            uploaderService.currentItem=fileItem;
            uploaderService.progressBar && uploaderService.progressBar.width && uploaderService.progressBar.width(value);
            uploaderService.progress && uploaderService.progress.text && uploaderService.progress.text(value);
            var totalPercent=(uploaderService.completed+(progress/100))*100/uploaderService.total;
            uploaderService.totalProgressBar && uploaderService.totalProgressBar.width && uploaderService.totalProgressBar.width(totalPercent+'%');
            uploaderService.totalProgress && uploaderService.totalProgress.text && uploaderService.totalProgress.text(Math.round(totalPercent)+'%');
//            console.info('onProgressItem', fileItem, progress);
          };
          uploader.onProgressAll = function(progress) {
 //           console.info('onProgressAll', progress);
          };
          uploader.onSuccessItem = function(fileItem, response, status, headers) {
            if (response.error) {
              try { console.log(JSON.stringify(response.error)); } catch(e){}
              if (response.error.original && response.error.original.message) {
                var message=response.error.original.message;
                try {
                  var json=JSON.parse(message);
                  ngNotify.set(json.error.message);
                } catch(e) {
                  ngNotify.set(message);
                }
              } else {
                if (response.error.message) {
                  ngNotify.set(response.error.message);
                } else {
                  ngNotify.set(response.error);
                }
              }
            }
            fileItem.remove();
//            console.info('onSuccessItem', fileItem, response, status, headers);
          };
          uploader.onErrorItem = function(fileItem, response, status, headers) {
//            console.info('onErrorItem', fileItem, response, status, headers);
          };
          uploader.onCancelItem = function(fileItem, response, status, headers) {
//            console.info('onCancelItem', fileItem, response, status, headers);
          };
          uploader.onCompleteItem = function(fileItem, response, status, headers) {
            if (fileItem.isError) {
              fileItem.isUploaded=false;
              fileItem.isError=false;
            }
            fileItem._xhr=null;
            fileItem._file=fileItem._file_orig;
            fileItem._file_orig=null;
            uploaderService.currentItem=null;
            ++uploaderService.completed;
            uploaderService.progressBar && uploaderService.progressBar.width && uploaderService.progressBar.width(0);
            uploaderService.progress && uploaderService.progress.text && uploaderService.progress.text('');
            var totalPercent=Math.min(100,uploaderService.completed*100/uploaderService.total);
            uploaderService.totalProgressBar && uploaderService.totalProgressBar.width && uploaderService.totalProgressBar.width(totalPercent+'%');
            uploaderService.totalProgress && uploaderService.totalProgress.text && uploaderService.totalProgress.text(Math.round(totalPercent)+'%');
//            console.info('onCompleteItem', fileItem, response, status, headers);
            uploader.isUploading=false;
            if (fileItem.isSkip) {
              $timeout(function(){
                var file=fileItem._file||fileItem.file;
                fileItem.remove();
              });
            }
          };
          uploader.onCompleteAll = function() {
//            console.info('onCompleteAll');
            uploader.thumbStyle=null;
            uploader.isPaused=true;
          };

//          console.info('uploader', uploader);
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

        }, // isHashUnique

        startUpload: function() {
          var uploader=uploaderService.uploader;
          if (!uploader.isPaused) {
            return;
          }
          uploader.isPaused=false;
          uploader.uploadAll();
          var items=uploader.getNotUploadedItems();
          uploaderService.total=(items && items.length) || 0;
          uploaderService.completed=0;
        },
        stopUpload: function(){
          var uploader=uploaderService.uploader;
          if (uploader.isPaused) {
            return;
          }
          uploader.isPaused=true;
          if (uploaderService.currentItem && uploaderService.currentItem.isUploading) {
            var prop=uploader.isHTML5 ? '_xhr' : '_form';
            uploaderService.currentItem[prop].abort();
          }
        }

      }); // extend uploaderService

      $rootScope.$on('unauthorized',function(){
        uploaderService.stopUpload();
      });

    }]);

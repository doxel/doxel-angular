'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.controller('UploadCtrl',[
  '$scope',
  '$rootScope',
  'LoopBackAuth',
  '$state',
  'uploaderService',
  '$window',
  function (
    $scope,
    $rootScope,
    LoopBackAuth,
    $state,
    uploaderService,
    $window
  ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      showFileList: true,
      uploaderService: uploaderService,
      itemsByPage: 10,
      init: function() {
        angular.extend(uploaderService, {
          progressBar: $('#doxel-upload .uploader-progress-bar'),
          progress: $('#doxel-upload .uploader-progress'),
          totalProgressBar: $('#doxel-upload .uploader-total-progress-bar'),
          totalProgress: $('#doxel-upload .uploader-total-progress')
        });
      }, // init

      removeAll: function(){
        if ($window.confirm('Are you sure ?')) {
          var uploader=uploaderService.uploader;
          uploader.thumbStyle=null;
          uploader.clearQueue();
          uploaderService.queued={};
        }
      }

    });

    $scope.init();

  }

]);

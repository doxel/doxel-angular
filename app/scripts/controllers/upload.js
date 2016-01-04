'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('UploadCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isHashUnique=function(options){
      options.success({result: true});
    };

    // yeah its ugly but faster than rewriting the uploader
    $scope.$on('$routeChangeStart',function(e, next, current){
        $('iframe.upload').hide();
    });

    $scope.$on('$routeChangeSuccess',function(e, next, current){
        $('iframe.upload').show().height($('body').height()-102);
        $(window).off('resize.upload').on('resize.upload',function(){
          $('iframe.upload').height($('body').height()-102);
        });
    });
  });

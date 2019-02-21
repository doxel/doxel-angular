'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:SegmentFilesCtrl
 * @description
 * # SegmentFilesCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
  .controller('SegmentFilesCtrl', [
    '$scope',
    '$stateParams',
    'Segment',
    'ngNotify',
    function (
      $scope,
      $stateParams,
      Segment,
      ngNotify
    ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope,{
      tree: {'.': ''},
      init: function() {
        $scope.getFileList($stateParams.segmentId)
        .then($scope.buildTree)
        .catch(function(err){
          console.log(err);
          ngNotify('Cannot display file list for segment '+$stateParams.segmentId);
        });

      },
      getFileList: function(){
        if ($scope.getFileList_promise) {
          return $scope.getFileList_promise;
        }
        return $scope.getFileList_promise=Segment.files({id:$stateParams.segmentId}).$promise;
      },
      buildTree: function(args){
        $scope.segmentId=$stateParams.segmentId;
        var tree=$scope.tree;
        angular.forEach(args.files,function(file){
          var path=file.path.split('/');
          var curdir=tree;
          var curpath=[];
          while(path.length>1){
            var dir=path.shift();
            curpath.push(dir);
            if (!curdir[dir]) {
              curdir[dir]={'.':curpath.join('/')};
            }
            curdir=curdir[dir];
          }
          var filename=path[0];
          curdir[filename]=file;
        });
        console.log(tree);
      }

    });

    $scope.init();

  }])
  .directive('fileTree', ['$parse', function($parse) {
    return {
      restrict: 'A',
      scope: true,
      template:
        '<li ng-repeat="(key, value) in obj" ' +
        "ng-if=\"key!='.'\">"+
    //    '<input type="checkbox">'+
        "<a target=\"{{value['.']?'_self':'_blank'}}\" ng-href=\"/api/segments/{{segmentId}}/{{value['.']?'download':'open'}}/{{(obj['.'].length?obj['.']+'/':'')+key | encodeURIComponent}}\">"+
        '<span><i ng-class="{fa: true, \'fa-fw\': true, \'fa-folder-open\': value[\'.\'], \'fa-file\': !value[\'.\']}"></i>{{key}}</span> ' +
        '</a>'+
        '<ul ng-if="value[\'.\']" file-tree file-tree-obj="value"></ul>' +
        '</li>',
      link: function(scope,element,attrs){
        //this List will be scope invariant so if you do multiple directive
        //menus all of them wil now what list to use
        scope.obj = $parse(attrs.fileTreeObj)(scope);

      }
    }
  }])
.filter('encodeURIComponent', [ '$window', function($window) {
    return $window.encodeURIComponent;
}]);

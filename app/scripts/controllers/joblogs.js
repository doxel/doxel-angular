'use strict';

/**
 * @ngdoc function
 * @name doxelApp.controller:JoblogsCtrl
 * @description
 * # JoblogsCtrl
 * Controller of the doxelApp
 */
angular.module('doxelApp')
.directive('compile', ['$compile', function ($compile) {
  return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
          var html = $scope.$eval($attrs.compile),
              toCompile = angular.element(html);
          $element.append($compile(toCompile)($scope));
      }
  };
}])
  .controller('JoblogsCtrl', [
    '$scope',
    '$rootScope',
    'Segment',
    '$sce',
    '$compile',
    '$timeout',
    function(
      $scope,
      $rootScope,
      Segment,
      $sce,
      $compile,
      $timeout
    ) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.trust=$sce.trustAsHtml;
      $scope.segmentId=$rootScope.params.s;
      console.log('segment',$scope.segmentId)
      Segment.findById({
        id:$scope.segmentId,
        filter: {
          include: 'jobs'
        }
      },{
      }, function(segment){
        $scope.segment=segment;
      });

      $scope.formatField=function(jobId, key, value){
        switch(key){
          case 'assigned':
          case 'started':
          case 'progressed':
          case 'completed':
            return '<span>'+new Date(value).toString()+'</span>';
          case 'userId':
            console.log(value);
            return '<userinfo user-id="\''+value+'\'"></userinfo>';
          case 'history':
            var html=['<table>'];
            value.some(function(entry){
              var obj=JSON.parse(entry);
              var t=obj.t;
              console.log(t);
              delete obj.t;
              html.push([
                '<tr>',
                '<td>',
                new Date(Number(t)).toString(),
                '</td>',
                '<td>',
                obj.msg,
                '</td>',
                '</tr>'
              ].join(''));
            });
            html.push('</table>');
            return html.join('');


          default:
            return '<span>'+value+'</span>';
          }
      }

   }
 ]);

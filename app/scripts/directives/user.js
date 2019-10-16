'use strict';

/**
 * @ngdoc directive
 * @name doxelApp.directive:user
 * @description
 * # user
 */
angular.module('doxelApp')
  .directive('userinfo', [
    'User',
    function (User) {
    return {
      templateUrl: 'views/user.html',
      restrict: 'E',
      replace: false,
      scope: {
        usersCache: '=?',
        userId: '=?',
        user: '=?',
        options: '=?'
      },
      controller: [
        '$scope',
        'User',
        'global',
        function($scope,User,global){
          angular.extend($scope, {
            updateUser: function(element){
              var usersCache=$scope.usersCache||global.usersCache||{};
              var userId=$scope.userId;
              if (usersCache && userId && usersCache[userId] && (!$scope.user || $scope.user.id!=userId)) {
                $scope.user=usersCache[userId];
                return;
              }
              if ((userId && !$scope.user) || (userId && $scope.user!=userId)) {
                User.findById({id: userId}, {
                  filter: {
                    fields: {
                      username: true,
                      email: true,
                      lastSeen: true,
                      created: true
                    }
                  }
                }, function(user){
                  if (usersCache) usersCache[userId]=user;
                  $scope.user=user;
                }, function(err){
                  console.log(userId,err);
                });
              }
            }
          });
        }
      ],
      link: function postLink(scope, element, attrs) {
        scope.$watch('userId', function(newValue, oldValue) {
          if (newValue) {
            scope.updateUser(element);
          }
        });
      }
    };
  }]);

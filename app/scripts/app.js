/*
 * app.js
 *
 * Copyright (c) 2015-2016 ALSENET SA - http://doxel.org
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
 * @ngdoc overview
 * @name doxelApp
 * @description
 * # doxelApp
 *
 * Main module of the application.
 */
var app=angular
  .module('doxelApp', [
    'ngHttpCache',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'lbServices',
    'ui.router',
    'ct.ui.router.extras.core',
    'ct.ui.router.extras.sticky',
    'ui.bootstrap',
    'ui-leaflet',
    'btford.socket-io',
    'ngTagsInput',
    'ngScrollbars',
    'FBAngular',
    'angularFileUpload',
    'ngNotify',
    'smart-table',
    'cp.ng.fix-image-orientation'

  ])
  .config([
    '$httpProvider',
    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider',
    'ngHttpCacheConfigProvider',
    function (
      $httpProvider,
      $urlRouterProvider,
      $stateProvider,
      $locationProvider,
      ngHttpCacheConfigProvider
    ) {

    ngHttpCacheConfigProvider.urls = ['/api'];

    // enable getting query string object with $location.search()
    // (base href must be set in index.html)
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: true
    });

    var params={
    }

    /*
    var bLazy = new Blazy({
        src: 'data-blazy' // Default is data-src
    });
    */

    // Inside app config block
    $httpProvider.interceptors.push(['$q', 'LoopBackAuth', '$rootScope', function($q, LoopBackAuth, $rootScope) {
      return {
        responseError: function(rejection) {
          if (rejection.status == 401) {
            //Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            console.log('unauthorized');
            $rootScope.$emit('unauthorized');
          }
          return $q.reject(rejection);
        }
      };
    }]);

    $urlRouterProvider.otherwise(function($injector){
      $injector.invoke(['$state', function($state) {
        $state.go('gallery.view.home', {}, { location: false } );
      }]);
    });

    $stateProvider
      .state('404',{
        templateUrl: 'views/404.html'
      })
/*      .state('classifiers', {
        url: '/classifiers',
        templateUrl: 'views/classifiers.html',
        controller: 'ClassifiersCtrl',
        controllerAs: 'classifiers'
      })
      */
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
  /*    .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
*/      .state('reset-password-form', {
        url: '/reset-password-form/:accessToken',
        templateUrl: 'views/reset-password.html',
        controller: 'ResetPasswordCtrl',
        controllerAs: 'resetPassword'
      })
      .state('upload', {
        url: '/upload',
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload'
      })
      .state('gallery', {
        url: '/doxel',
        views: {
          'gallery': {
            templateUrl: 'views/gallery.html',
            controller: 'GalleryCtrl',
            controllerAs: 'gallery'
          }
        }
      })
      .state('gallery.view', {
        abstract: true,
        views: {
/*          'gallery-toolbar': {
            templateUrl: 'views/gallery-toolbar.html',
            controller: 'GalleryToolbarCtrl',
            controllerAs: 'toolbar'
          },
  */
          'gallery-map': {
            templateUrl: 'views/gallery-map.html',
            controller: 'GalleryMapCtrl',
            controllerAs: 'map'
          },
          'gallery-earth': {
            templateUrl: 'views/gallery-earth.html',
            controller: 'GalleryEarthCtrl',
            controllerAs: 'earth'
          },
          'gallery-info': {
            templateUrl: 'views/gallery-info.html',
            controller: 'GalleryInfoCtrl',
            controllerAs: 'info'
          },
          'gallery-cloud': {
            templateUrl: 'views/gallery-viewer.html',
            controller: 'GalleryViewerCtrl',
            controllerAs: 'viewer'
          },
          'gallery-home': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          },
          'gallery-classifiers': {
            templateUrl: 'views/gallery-classifiers.html',
            controller: 'GalleryClassifiersCtrl',
            controllerAs: 'classifiers'
          },
          // must be the last one (z-index)
          'gallery-thumbs': {
            templateUrl: 'views/gallery-thumbs.html',
            controller: 'GalleryThumbsCtrl',
            controllerAs: 'thumbs',
          }
        }
      })

      .state('gallery.view.home', {
        url: '/home',
        controller: 'MainCtrl'
      })

      .state('gallery.view.thumbs', {
        url: '/gallery'

      })
/*
      .state('gallery.view.info', {
        url: '/info',
        controller: 'GalleryInfoCtrl'
      })
*/
      .state('gallery.view.map', {
        url: '/map',
        controller: 'GalleryMapCtrl'
      })

      .state('gallery.view.earth', {
        url: '/earth',
        controller: 'GalleryEarthCtrl'
      })

      .state('gallery.view.cloud', {
        url: '/viewer',
        controller: 'GalleryViewerCtrl'
      })

      .state('gallery.view.classifiers', {
        url: '/classifiers'
      })

      .state('tos', {
        url: '/tos',
        templateUrl: 'views/tos.html',
        controller: 'TosCtrl',
        controllerAs: 'tos'
      })
      .state('segments', {
        url: '/segments',
        templateUrl: 'views/segments-tree.html',
        controller: 'SegmentsCtrl',
        controllerAs: 'segments',
      })
      .state('processing', {
        url: '/processing',
        templateUrl: 'views/processing.html',
        controller: 'ProcessingCtrl',
        controllerAs: 'processing'
      })
      .state('joblogs', {
        url: '/joblogs',
        templateUrl: 'views/joblogs.html',
        controller: 'JoblogsCtrl',
        controllerAs: 'joblogs'
      })
      /*
      .state('map', {
        url: '/map',
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .state('earth', {
        url: '/earth',
        templateUrl: 'views/earth.html',
        controller: 'EarthCtrl',
        controllerAs: 'earth'
      })
      .state('browser', {
        url: '/browser',
        templateUrl: 'views/browser.html',
        controller: 'BrowserCtrl',
        controllerAs: 'browser'
      })
      .state('viewer', {
        url: '/viewer',
        templateUrl: 'views/viewer.html',
        controller: 'ViewerCtrl',
        controllerAs: 'viewer'
      })
      */
  }]) // config
  .run([
    '$rootScope',
    '$state',
    '$location',
    '$window',
    'User',
    '$cookies',
    'LoopBackAuth',
    'appConfig',
    '$timeout',
    'errorMessage',
    'uploaderService',

    function (
      $rootScope,
      $state,
      $location,
      $window,
      User,
      $cookies,
      LoopBackAuth,
      appConfig,
      $timeout,
      errorMessage,
      uploaderService
    ) {
    $rootScope.$state=$state;
    $rootScope.params=angular.merge({},$location.search());

    window.lba=LoopBackAuth;
    if (LoopBackAuth.currentUserData && LoopBackAuth.currentUserData.session) {
      var expiration=new Date(LoopBackAuth.currentUserData.session.created).getTime()+LoopBackAuth.currentUserData.session.ttl;
      var remain=expiration-Date.now();
      if (remain<=0) {
        LoopbackAuth.clearStorage();
        LoopbackAuth.clearUser();
        $rootScope.authenticated=false;
      }
    }

    $rootScope.$on('unauthorized',function() {
      $state.transitionTo('login');
    });

    $rootScope.uploader=uploaderService.initUploader({
      fileUploaderOptions: {
        url: '/sendfile'
      }
    });

    $rootScope.toggleFullscreen=function(){
      $rootScope.isFullscreen=true;
    }

    // broadcast location.search event on query string change
    $rootScope.$watch(function(){
      return $location.search();
    }, function(newValue,oldValue){
      /// TODO ? merge rootScope.params here ?
      $rootScope.$broadcast('location.search',arguments);
    });

    // return gallery thumbs style
    $rootScope.getClass=function(){
  // TODO: too many calls, find another way
//      console.log($state.current.name);
      if ($state.current.name.substr(0,7)=='gallery') {
        return $rootScope.thumbsPosition||'';
      } else {
        return '';
      }
    }

    angular.element($window).bind('resize',function(e){
      console.log('resize');
      $rootScope.$broadcast('window.resize',e);
    });

    angular.element($window).bind('orientationchange',function(e){
      console.log('orientationchange');
      $rootScope.$broadcast('orientationchange',e);
    });

    /*
    $rootScope.$on('viewer.show',function(event,segment){
      if (appConfig && appConfig.viewerInMainWindow) {
        // open viewer view
        $location.path('/viewer').search({
          sid: segment.id,
          sts: segment.timestamp
        });
      } else {
        // open viewer in another window
        segment.viewerWindow=$window.open('/api/segments/viewer/'+segment.id+'/'+segment.timestamp+'/viewer.html');
      }
    });
    */

    /*
    $rootScope.$on('segment.show',function(event,segment){
      $location.path('/segments').search({
        sid: segment.id,
        sts: segment.timestamp
      });
    });
    */
    $rootScope.isAdmin=function(){
      return (LoopBackAuth.currentUserData&&LoopBackAuth.currentUserData.roles&&LoopBackAuth.currentUserData.roles.admin);
    }

    // Whenever the route changes we see if either the user is logged in or is
    // trying to access a public route. Otherwise she will be redirected to
    // login.
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if ($rootScope.previousState!=$state.current.name) {
        $rootScope.previousState=$state.current.name;
      }
      $rootScope.authenticated=User.isAuthenticated();
      if (LoopBackAuth.currentUserData && LoopBackAuth.currentUserData.session) {
        var expiration=new Date(LoopBackAuth.currentUserData.session.created).getTime()+LoopBackAuth.currentUserData.session.ttl;
        var remain=expiration-Date.now();
        if (remain<=0) {
          $state.transitionTo('logout');
          alert('You have been logged out !');
        } else {
          $rootScope.authenticated=true;
        }
      }

      var state=next.name;

      // When the user just logged in with passport,
      // bind and switch to parent user if any
      var cookies=$cookies.getAll();

      if (cookies && cookies['pp-access_token']) {
        $cookies.remove('pp-access_token',{path:'/'});
        $cookies.remove('pp-userId',{path:'/'});

        if ($rootScope.authenticated && cookies['pp-userId']=='undefined') {
          $state.transitionTo('profile');
          // user linked a third-party account
          return;

        }
        if (cookies['pp-userId']!='undefined') {
          // user logged in with third-party account (returned credentials may be for main account)

          LoopBackAuth.setUser(cookies['pp-access_token'], cookies['pp-userId'], null /* TODO: populate user data (roles) */);
          LoopBackAuth.save();
          $state.transitionTo($location.stateAfterSignin||appConfig.stateAfterSignin);
          return;

        }
      }

      if (User.isAuthenticated()) {
        if (state=='login') {
          event.preventDefault();
          return;
        }

      } else {
        switch(state) {
          case 'upload':
          case 'profile':
            $location.stateAfterSignin=state;
            event.preventDefault();
            $state.transitionTo('login');
//            $location.path('/login');
            return;

          case 'logout':
            event.preventDefault();
            return;
        }
      }
    });

    // syncronize rootScope.params and location.search()
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      var search=$location.search();
      var params=$rootScope.params;

      // check for changed querystring param
      var changed=false;
      for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
          if (params[prop]!=search[prop]) {
            changed=true;
            break;
          }
        }
      }
      if (!changed) {
        for (var prop in search) {
          if (search.hasOwnProperty(prop)) {
            if (params[prop]!=search[prop]) {
              changed=true;
              break;
            }
          }
        }
      }

      if (changed) {
        angular.extend($rootScope.params,$location.search());
        $timeout(function(){
          $location.search($rootScope.params).replace();
        },1);
      }

      if (toState.name) {
        $rootScope.view=toState.name;
        $rootScope.$broadcast('rebuild:scrollbar');

      } else {
        $rootScope.view=null;
      }
    });

  }]);

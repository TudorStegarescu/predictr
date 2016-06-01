'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ngMaterial',
  'firebase',
  'myApp.betting',
  'myApp.dataservice',
  'myApp.frontPage',
  'myApp.menu',
  'myApp.teams',
  'myApp.userProfile'
])

.constant('FBURL', 'https://scorching-heat-8489.firebaseio.com')

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange') /* blue-grey*/
    .accentPalette('orange');
})
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/frontpage");
    $stateProvider
      .state('betting', {
        url: '/betting',
        templateUrl: 'betting/betting.html',
        controller: 'bettingCtrl as predict',
        resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
      })
      .state('frontpage', {
        url: '/frontpage',
        templateUrl: 'frontpage/frontpage.html',
        controller: 'frontPageCtrl as predict'
      })
      .state('user', {
        url: '/user',
        templateUrl: 'user/user.html',
        controller: 'userProfile',
        resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'auth/signinView.html',
        controller: 'AuthController as auth'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'auth/signupView.html',
        controller: 'AuthController as auth'
      })
      .state('status', {
        url: '/status',
        templateUrl: 'components/status/statusView.html',
        controller: 'StatusController as status'
      })
      .state('teams', {
        url: '/teams',
        templateUrl: 'teams/teams.html',
        controller: 'Teams'
      });
    })
    .run(['$rootScope', 'Auth', function($rootScope, Auth) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);

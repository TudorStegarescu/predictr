'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ngMaterial',
  'firebase',
  'myApp.betting',
  'myApp.frontPage',
  'myApp.userProfile'
])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('light-blue');
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('betting', {
        url: '/betting',
        templateUrl: 'betting/betting.html',
        controller: 'bettingCtrl as predict'
      })
      .state('frontpage', {
        url: '/frontpage',
        templateUrl: 'frontpage/frontpage.html',
        controller: 'frontPageCtrl as predict'
      })
      .state('user', {
        url: '/user',
        templateUrl: 'user/user.html',
        controller: 'userProfile as user'
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
      });
    })
    .run(function($rootScope, $state, User) {

          // Listen for changes to the state and run the code
          // in the callback when the change happens
          $rootScope.$on('$stateChangeStart', function() {

            // Use the User service to get the currently
            // logged-in user from local storage
            var loggedInUser = User.getLoggedInUser();

            // Check that we actually have a logged-in user
            // saved in local storage
            if(loggedInUser) {
              // Use the getUserData method on the User service
              // to grab the data from the /users endpoint in
              // Firebase for the logged-in user
              $rootScope.loggedInUserData = User.getUserData(loggedInUser.uid);

            }
          });
        });

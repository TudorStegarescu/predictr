(function () {
angular.module('myApp', [
  'ui.router',
  'ngMaterial',
  'firebase',
  'myApp.betting',
  'myApp.dataservice',
  'myApp.frontPage',
  'myApp.header',
  'myApp.teams',
  'myApp.userProfile'
])

.constant('FBURL', 'https://scorching-heat-8489.firebaseio.com')

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('light-green');
})
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/frontpage');
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
        controller: 'AuthController as vm'
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


    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('deep-orange') /* blue-grey*/
      .accentPalette('orange');
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  angular
    .module('myApp')
    .config(['$stateProvider', '$locationProvider', '$mdThemingProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.frontPage',
  'myApp.betting',
  'myApp.userProfile',
  'myApp.showDialog',  
  'myApp.detail',  
  'myApp.version'
])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue') 
    .accentPalette('light-blue');
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/contact/:contactId', {
        templateUrl: 'view1/detail.html',
        controller: 'DetailCtrl'
      })
  	.otherwise({redirectTo: '/view1'});
}]);

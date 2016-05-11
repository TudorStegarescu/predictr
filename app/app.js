'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.user',
  'myApp.detail',  
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/contact/:contactId', {
        templateUrl: 'view1/detail.html',
        controller: 'DetailCtrl'
      })
  	.otherwise({redirectTo: '/view1'});
}]);

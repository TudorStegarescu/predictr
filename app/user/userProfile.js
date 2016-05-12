'use strict';

angular.module('myApp.userProfile',['ngRoute', 'ngMaterial'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'user/user.html',
    controller: 'userProfile'
  });
}])

.controller('userProfile', function ($scope) {
  
});
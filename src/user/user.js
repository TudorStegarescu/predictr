'use strict';

angular.module('myApp.userProfile',['ngMaterial'])
.controller('userProfile', function ($scope, $rootScope) {
  $scope.userinfo = $rootScope.userInfo;
});

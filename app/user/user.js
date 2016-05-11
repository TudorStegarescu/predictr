'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'user/user.html',
    controller: 'GraphCtrl'
  });
}])

.controller("GraphCtrl", function ($scope, $http) {
	$http.get('/app/data.json').success(function(data) {

    $scope.data = data;

    $scope.width = 900;
    $scope.bheight = 400;
    $scope.yAxis = "Age";
    $scope.xAxis = "Contacte";

    $scope.max = 0;
    var arrLength = data.length;

    for (var i = 0; i < arrLength; i++) {
      // Find $scope.maximum X Axis Value
      if (data[i].age > $scope.max)
        $scope.max = data[i].age;
    }

  });
  
});
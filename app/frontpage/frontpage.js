'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngSanitize']).filter('iconify', function () { // My custom filter
    return function (value) {
        return value === 'male' ? '<i class="fa fa-male" aria-hidden="true"></i>' : '<i class="fa fa-female" aria-hidden="true"></i>';
    }
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/frontpage', {
    templateUrl: 'frontpage/frontpage.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function ($scope, $http, $q) {
  var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
      fixtures = $http.get('http://api.football-data.org/v1/soccerseasons/398/fixtures', tokenHeader),
      teams = $http.get('http://api.football-data.org/v1/soccerseasons/398/teams', tokenHeader);

  $q.all([fixtures, teams]).then(function(arrayOfResults) { 
    $scope.contacts = arrayOfResults[0].data.fixtures.slice(-40).reverse();
  });

  $scope.orderProp = 'index';

  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
});
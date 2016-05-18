'use strict';

angular.module('myApp.betting', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/betting', {
      templateUrl: 'betting/betting.html',
      controller: 'bettingCtrl'
    });
  }])

  .controller('bettingCtrl', function ($scope, $http, $q) {
    var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
        fixtures = $http.get('http://api.football-data.org/v1/soccerseasons/406/fixtures', tokenHeader),
        teams = $http.get('http://api.football-data.org/v1/soccerseasons/406/teams', tokenHeader);

    $q.all([fixtures, teams]).then(function(arrayOfResults) {
      $scope.contacts = arrayOfResults[0].data.fixtures.slice(-40).reverse();
    });
  });

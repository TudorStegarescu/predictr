'use strict';

angular.module('myApp.betting', [])

  .controller('bettingCtrl', function ($scope, $http, $q) {
    var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
        fixtures = $http.get('http://api.football-data.org/v1/soccerseasons/398/fixtures', tokenHeader),
        teams = $http.get('http://api.football-data.org/v1/soccerseasons/398/teams', tokenHeader);

    $q.all([fixtures, teams]).then(function(arrayOfResults) {
      $scope.predicts = arrayOfResults[0].data.fixtures.slice(-1).reverse();
    });

  });

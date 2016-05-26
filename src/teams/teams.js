 'use strict';

 angular.module('myApp.teams', [])

   .controller('Teams', function ($scope, $http, $q) {
     var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
         teams = $http.get('http://api.football-data.org/v1/soccerseasons/398/teams', tokenHeader);

     teams.then(function(arrayOfResults) {
       $scope.teams = arrayOfResults.data.teams;
       console.log($scope.teams);
     });

     $scope.send = function(team){
        console.log();
        $http.get(team._links.players.href, tokenHeader)
         .success(function(response) {$scope.players = response.players; });

    };

})

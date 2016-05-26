'use strict';

angular.module('myApp.teams', [])

.controller('Teams', function ($scope, $http, $q, $mdDialog) {
  var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
  teams = $http.get('http://api.football-data.org/v1/soccerseasons/398/teams', tokenHeader);

  teams.then(function(arrayOfResults) {
    $scope.teams = arrayOfResults.data.teams;
  });

  function showTabDialog() {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'teams/dialog.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.send = function(team){
    $http.get(team._links.players.href, tokenHeader)
    .success(function(response) {
      $scope.players = response.players;
      showTabDialog();
    });
  };
})

function DialogController($scope, $mdDialog) {
  $scope.test = 'test';
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

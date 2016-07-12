'use strict';

angular.module('myApp.teams', [])

.controller('Teams', function ($rootScope, $scope, $http, $q, $mdDialog, dataservice) {
  const tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}};

  activate();
  function activate() {
    return getTeams().then(function() {
      console.info('Activated Teams View');
    });
  }

  function getTeams() {
    return dataservice.getTeams()
    .then(function(data) {
      $scope.teams = data.teams;
      return $scope.teams;
    });
  }

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
  }

  $scope.send = function(team){
    $http.get(team._links.players.href, tokenHeader)
    .success(function(response) {
      $rootScope.players = response.players;
      showTabDialog();
    });
  };
});

function DialogController($rootScope, $scope, $mdDialog) {

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

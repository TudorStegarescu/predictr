'use strict';

angular.module('myApp.userProfile',['ngMaterial'])
.controller('userProfileCtrl',
function ($rootScope, $scope, $location, myAppData, dataservice) {

  var unbind, team, favouriteTeam, profile;
  var vm = this;

  activate();
  function activate() {
    return getTeams().then(function() {
      console.info('Activated Teams View');

      for (var prop in $scope.team) {
        $scope.favouriteTeam = $scope.team[prop];
        if ($scope.team[prop].shortName !== profile.teams) {
          return prop;
        }
      }

    });
  }

  function getTeams() {
    return dataservice.getTeams()
    .then(function(data) {
      $scope.team = data.teams;
      return $scope.team;
    });
  }

  vm.user = {};

  myAppData.getProfile()
  .success(function(data) {
    vm.user = data;
  })
  .error(function (e) {
    console.log(e);
  });

});

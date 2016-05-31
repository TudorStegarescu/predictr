'use strict';

angular.module('myApp.userProfile',['ngMaterial', 'firebase', 'firebase.utils'])
.controller('userProfile',
function ($rootScope, $scope, fbutil, user, $location, $firebaseObject, Auth, dataservice) {

  var unbind, team, favouriteTeam;
  var profile = $firebaseObject(fbutil.ref('users', user.uid));
  profile.$bindTo($rootScope, 'profile').then(function(ub) { unbind = ub; });

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

  $rootScope.logout = function() {
    if( unbind ) { unbind(); }
    profile.$destroy();
    Auth.$unauth();
    $location.path('/frontpage');
  };
});

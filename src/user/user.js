'use strict';

angular.module('myApp.userProfile',['ngMaterial', 'firebase', 'firebase.utils'])
.controller('userProfile', function ($scope, Auth, fbutil, user, $location, $firebaseObject) {
  var unbind;
  var profile = $firebaseObject(fbutil.ref('users', user.uid));
      profile.$bindTo($scope, 'profile').then(function(ub) { unbind = ub; });

  $scope.logout = function() {
          if( unbind ) { unbind(); }
          profile.$destroy();
          Auth.$unauth();
          $location.path('/frontpage');
        };
});

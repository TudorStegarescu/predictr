(function() {

  'use strict';

  angular
    .module('myApp')
    .factory('Auth', AuthService);

  function AuthService($firebaseAuth) {
    var ref = new Firebase('https://scorching-heat-8489.firebaseio.com');
    return $firebaseAuth(ref);
  }

})();

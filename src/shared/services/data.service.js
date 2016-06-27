(function() {

  angular
    .module('myApp')
    .service('myAppData', myAppData);

  myAppData.$inject = ['$http', 'authentication'];
  function myAppData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();

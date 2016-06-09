// dataservice factory
angular
.module('myApp.dataservice', [])
.factory('dataservice', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http) {
  var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}};
  return {
    getTeams: getTeams
  };

  function getTeams() {
    return $http.get('http://api.football-data.org/v1/soccerseasons/398/teams', tokenHeader)
    .then(function(response) {
      return response.data;
    })
    .catch(getTeamsFailed);

    function getTeamsFailed(error) {
      console.log.error('XHR Failed for getTeams.' + error.data);
    }
  }
}

// dataservice factory
angular
.module('myApp.dataservice', [])
.factory('dataservice', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http) {
  const tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}};
  return {
    getTeams: getTeams
  };

  function getTeams() {
    const season = 398,
          url = `http://api.football-data.org/v1/soccerseasons/${season}/teams`;
    return $http.get(url, tokenHeader)
    .then(function(response) {
      return response.data;
    })
  }
}

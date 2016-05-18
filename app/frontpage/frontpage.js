'use strict';

angular.module('myApp.frontPage', [])

  .controller('frontPageCtrl', function ($scope, $http, $q) {
    var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
        fixtures = $http.get('http://api.football-data.org/v1/soccerseasons/405/fixtures', tokenHeader),
        teams = $http.get('http://api.football-data.org/v1/soccerseasons/405/teams', tokenHeader);

    $q.all([fixtures, teams]).then(function(arrayOfResults) {
      $scope.contacts = arrayOfResults[0].data.fixtures.slice(-40).reverse();
    });

  })

  .filter('checkStatus', function() {

    // Create the return function and set the required parameter name to input
    return function(input, status) {

      var out = [];

      // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the language is statically or dynamically typed.
      angular.forEach(input, function(language) {

        if (language.status === status) {
          out.push(language)
        }

      })

      return out;
    }

  })

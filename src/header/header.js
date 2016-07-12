(function() {
  'use strict';

  var module = angular.module('myApp.header', []);

  function fetchWeather($http) {
    return $http.get('http://api.openweathermap.org/data/2.5/weather?q=Paris,fr&appid=cb22cd79c3affe31d72829086592bb80')
      .then(function(response) {
        return response.data;
      });
  }

  function controller($http) {
    var vm = this;

    vm.$onInit = function() {
      fetchWeather($http).then(function(weather) {
        vm.weather = weather.weather[0].main;
      });
    };
  }

  module.component('predictrHeader', {
    templateUrl:  'header/header.html',
    controllerAs: 'vm',
    controller: ['$http', controller]
  });

}());

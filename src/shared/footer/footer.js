
(function() {
  'use strict';

  var module = angular.module('myApp.footer', []);

  function controller($http) {
    var vm = this;

    vm.$onInit = function() {

    };
  }

  module.component('predictrFooter', {
    templateUrl:  'shared/footer/footer.html',
    controllerAs: 'vm',
    controller: ['$http', controller]
  });

}());

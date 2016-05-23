 (function() {
     'use strict';

     angular
       .module('myApp')
       .controller('Teams', Teams);

     Teams.$inject = ['$http', '$q'];

     /* @ngInject */
     function Teams($http, $q) {
         var vm = this;
         vm.teams = [];

         activate();

         function activate() {
           var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
               teams = $http.get('http://api.football-data.org/v1/soccerseasons/398/teams', tokenHeader);

               teams.then(function(arrayOfResults) {
                  vm.teams = arrayOfResults.data.teams;
               });
         }
     }
 })();

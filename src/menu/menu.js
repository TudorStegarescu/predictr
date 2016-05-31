'use strict';

angular.module('myApp.menu', [])

.directive('predictrMenu', function () {
   return {
     restrict: 'E',
     templateUrl: 'menu/menu.html'
   };
});

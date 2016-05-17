'use strict';

angular.module('myApp.detail', [])

.controller('DetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('/app/data.json').success(function(data) {

      function getById(arr, id) {
          for (var i = 0, len = arr.length; i < len; i++) {
              if (arr[i].index == id) {
                  return arr[i];  
              }
          }
      }

      $scope.contact = getById(data, $routeParams.contactId);

      $scope.show = 0;

      console.log(data[$routeParams.contactId].name);

      console.log($routeParams.contactId);
    });
  }]);


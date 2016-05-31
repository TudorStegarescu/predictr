'use strict';

angular.module('myApp.betting', ['firebase', 'firebase.utils'])

.controller('bettingCtrl', function ($scope, $http, $q, Auth, fbutil, user, $location, $firebaseObject) {
  var tokenHeader = {headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}},
  fixtures = $http.get('http://api.football-data.org/v1/soccerseasons/398/fixtures', tokenHeader),
  teams = $http.get('http://api.football-data.org/v1/soccerseasons/398/teams', tokenHeader);

  $q.all([fixtures, teams]).then(function(arrayOfResults) {
    $scope.predicts = arrayOfResults[0].data.fixtures.slice(-1).reverse();
  });

  var profile = $firebaseObject(fbutil.ref('users', user.uid));

  $scope.addBet = function(){
    var away = $scope.predicts.away;
    var home = $scope.predicts.home;

    var ref = new Firebase("https://scorching-heat-8489.firebaseio.com/bets");

    ref.push({ away: away,home: home,emailId: user}).then(function(ref) {
    }, function(error) {
      console.log("Error:", error);
    });
  }

  $scope.AddPost = function(){
    var title = $scope.article.title;
    var post = $scope.article.post;

    var ref = new Firebase("https://scorching-heat-8489.firebaseio.com/bets");

    ref.push({ title: title,post: post,emailId: user}).then(function(firebaseObj) {
      // $location.path('/frontpage');
    }, function(error) {
      console.log("Error:", error);
    });

  }

});

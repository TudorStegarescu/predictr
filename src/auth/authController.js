(function() {

	'use strict';

	angular
	.module('myApp.auth', ['ngMaterial'])
	.config(function($mdIconProvider) {
		$mdIconProvider.fontSet('md', 'material-icons');
	})
	.controller('listTeams', function ($scope, $http, $q) {
		var teams = $http.get('http://api.football-data.org/v1/soccerseasons/398/teams',
		{headers: {'X-Auth-Token': '822fca9c9da2416592e3e0a8ac86c239'}});
		teams.then(function(arrayOfResults) {
			$scope.teams = arrayOfResults.data.teams;
		});
	})
	.controller('AuthController', AuthController);

	function AuthController($rootScope, $state, $location, authentication) {

		var vm = this;

		vm.credentials = {
			name : "",
			email : "",
			password : ""
		};

		vm.onSubmit = function () {
			console.log('Submitting registration');
			authentication
			.register(vm.credentials)
			.error(function(err){
				alert(err);
			})
			.then(function(){
				$location.path('user');
			});
		};

	}

})();

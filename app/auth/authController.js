(function() {

	'use strict';

	angular
		.module('myApp')
		.config(function($mdIconProvider) {
		  $mdIconProvider.fontSet('md', 'material-icons');
		})
		.controller('listTeams', function ($scope, $http, $q) {
		  var teams = $http.get('data/teams.json');

		  teams.then(function(arrayOfResults) {
		    $scope.teams = arrayOfResults.data;
		  });
		})
		.controller('AuthController', AuthController);

	function AuthController($rootScope ,Auth, User, $state) {

		var vm = this;

		vm.createUser = createUser;
		vm.login = login;

		function createUser() {

			// If there is already a user logged in,
			// log them out before proceeding
			Auth.$unauth();

			Auth.$createUser({
				email: vm.email,
				password: vm.password
			}).then(function(userData) {
				saveUser(userData);
				login()
			}).catch(function(error) {
				vm.error = error;
			});
		}

		function saveUser(userData) {

			var user = User.newUserRef(userData);
					user.firstname = vm.firstname;
					user.lastname = vm.lastname;
					user.email = vm.email;
					user.team = vm.team;

					$rootScope.userInfo = user;

			user.$save().then(function(success) {
				vm.firstname = null;
				vm.lastname = null;
				vm.email = null;
				vm.password = null;
				$state.go('user');
			}, function(error) {
				console.log("there was an error! " + error);
			});
		}

		function login() {

			Auth.$authWithPassword({

				email: vm.email,
				password: vm.password
			}).then(function(data) {
				vm.email = null;
				vm.password = null;
				$state.go('user');
				// console.info("Authenticated successfully with payload:", data);
			}).catch(function(error) {
				console.log(error);
			});
		}
	}

})();

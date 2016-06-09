(function() {

	'use strict';

	angular
		.module('myApp')
		.factory('User', UserService);

	function UserService($firebaseObject) {

		function newUserRef(user) {
			var ref = new Firebase('https://scorching-heat-8489.firebaseio.com/users/' + user.uid);
			return $firebaseObject(ref);
		}

		function getUserData(user) {
			var ref = new Firebase('https://scorching-heat-8489.firebaseio.com/users/' + user);
			return $firebaseObject(ref);
		}

		function getLoggedInUser() {
			var user = localStorage.getItem('firebase:session::myApp');
			console.log(user);
			if(user) {
				return JSON.parse(user);
			}
		}

		return {
			newUserRef: newUserRef,
			getUserData: getUserData,
			getLoggedInUser: getLoggedInUser
		}
	}

})();

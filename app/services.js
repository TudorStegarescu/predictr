'use strict';

/* Services */

var contactService = angular.module('contactService', ['ngResource']);

contactService.factory('ContactService', function ($resource) {
    return $resource('/app/data.json',{user: "@user"});

$scope.users = UserService.query();
});

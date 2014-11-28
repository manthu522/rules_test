'use strict';
module.exports = angular.module('userService', [
  'ngResource'
])
  .factory('user', function ($resource) {
    return $resource('/auth/users/:id/', {id: '@_id'},
      {
        'update': {
          method:'PUT'
        }
      });
  });


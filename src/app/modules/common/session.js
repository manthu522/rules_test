"use strict";

module.exports = angular.module('session', [
  'ngRoute'
])
  .factory('session', function ($resource) {
    return $resource('/auth/session/');
  });

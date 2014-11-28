"use strict";

module.exports = angular.module('ruleServ',[
  'ngRoute'
])
  .factory('ruleServ', function ($resource) {
    return $resource('api/rule/:userId/:rid', {
      rid: '@_id',
      userId: '@userId'
    });
  })
;
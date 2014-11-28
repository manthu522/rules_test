"use strict";
var user = require('../user/user'),
    auth = require('../common/auth');

module.exports = angular.module('login', [
  'auth'
])
  .controller('loginController', function ($scope, $location, auth) {
    $scope.error = {};
    $scope.user = {};

    $scope.login = function(form) {
      auth.login('password', {
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/myRules');
          } else {
            console.log(err);
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
        });
    };
  });

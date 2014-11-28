'use strict';
require('../common/auth');

module.exports = angular.module('signUp', [
  'auth'
])
  .controller('signUpController', function ($scope, $log, $location, auth) {
    $scope.errors = {};

    $scope.signUp = function(form, user) {
      auth.createUser(user,
        function(err) {
          if (!err) {
            $log.debug('Account created');
            $location.path('/myRules');
          } else {
            $log.debug('Err');
            $log.debug(err);
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.errors.other = err.message;
          }
        }
      );
    };

  });

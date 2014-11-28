"use strict";
var user = require('../user/user'),
    session = require('./session');

module.exports = angular.module('auth', [
  'userService',
  'session'
])
  .factory('auth', function ($location, $rootScope, session, user) {

    return {
      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        session.save({
          provider: provider,
          email: user.email,
          password: user.password,
          rememberMe: user.rememberMe
        }, function(user) {
          $rootScope.currentUser = user;
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        session.delete(function(res) {
            $rootScope.currentUser = null;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      createUser: function(userInfo, callback) {
        var cb = callback || angular.noop;
        user.save(userInfo,
          function(user) {
            $rootScope.currentUser = user;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      currentUser: function() {
       return session.get(function(user) {
          $rootScope.currentUser = user;
        });
      },

      changePassword: function(email, oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        user.update({
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      },

      removeUser: function(email, password, callback) {
        var cb = callback || angular.noop;
        user.delete({
          email: email,
          password: password
        }, function(user) {
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      }
    };
  })

  .factory('authHttpResponseInterceptor', function($q, $location){
    return {
      response: function(response){
        if (response.status === 401) {
        }
        return response || $q.when(response);
      },
      responseError: function(rejection) {
        if (rejection.status === 401) {
          $location.path('/');
        }
        return $q.reject(rejection);
      }
    }
  })
  .factory('authorize', function ($q, $location) {

  })
;

"use strict";
var rule = require('../rule/rule'),
    ruleServ = require('../common/ruleServ'),
    mockData = require('../common/mockData');

module.exports = angular.module('myRules',[
  'rule',
  'ruleServ',
  'ngAnimate'
])
  .controller('myRulesController', function ($log, $scope, rules, ruleServ) {
    $scope.currentUser.displayName = $scope.currentUser.name || $scope.currentUser.username;
    !rules? $scope.rules = mockData.rules: $scope.rules = rules;

    $scope.$on('updateRules', function () {
      var userId = $scope.currentUser._id;
      console.log(userId);
      ruleServ.query({userId: userId})
        .$promise
        .then(function (rules) {
          $scope.rules = rules;
        })
        .catch(function (err) {
          console.log(err);
        })
      ;
    });
  })
  .directive('thisUser', function () {
    return {
      restrict: 'A',
      templateUrl: 'myRules/thisUser.html'
    }
  })
  .filter('capitalize', function() {
    return function(input) {
      if (input!=null)
        return input = input.toUpperCase();
    }
  })
  .directive('circle', function () {
    return {
      restrict: "A",
      link: function (scope, element) {
        scope.getHeight= function () {
          return $(element).height();
        };
        scope.$watch(scope.getHeight, function (height) {
          $(element).width(1 * height);
        });
      }
    }
  })
;

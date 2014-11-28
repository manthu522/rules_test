'use strict';
var _ = require('lodash'),
    mocks    = require('../common/mockData'),
    provisionList = mocks.possibleProvisions
;

require('../common/ruleServ');

module.exports = angular.module('cuRule', [
  'ruleServ',
  'provisions',
  'mm.foundation.buttons',
  'mm.foundation.modal',
  'foundationTemplates'
])
  .controller('cuRuleController', function ($scope, $log, $state, $modal, rule, ruleServ) {
    $log.debug('rule: ' + JSON.stringify(rule || {}));
    $scope.provisions = provisionList;
    $scope.rule = rule || {};
    $scope.isNew = $state.is('newRule');
    $scope.openTitle = $scope.isNew;

    if (!$scope.isNew) {
      $scope.phTitle = $scope.rule.title;
      $scope.phDesc = $scope.rule.description;
    } else {
      $scope.phTitle = $scope.rule.title;
      $scope.phDesc = $scope.rule.description;
      $scope.rule.userId = $scope.currentUser._id;
    }

    $scope.editTitle = function () {
      $scope.openTitle = !$scope.openTitle;
    };

    $scope.cuRule = function () { //create/update rule
      if ($scope.isNew) {
        $log.debug('Creating a new rule on the db');
        ruleServ.save($scope.rule)
          .$promise
          .then(function () {
            $state.go('myRules');
          })
          .catch(function (err) {
            $log.debug(err);
          });
      } else {
        rule.schedule.ran = false;
        /**
         * Expects a model to be returned, but recieves a message,
         * which seems to wipe out the model instance. Needs to be fixed in
         * ruleController.update()
         */
        rule.$save({}, function (message) {
          $log.debug(message);
          $state.go('myRules');
        }, function (err) {
          $log.debug(err);
        });
      }
    };

    $scope.addProvision = function (type) {
      $scope.type = type;
      var modalInstance = $modal.open({
        templateUrl: 'provisions/provisions.html',
        controller: 'provisionsController',
        windowClass: 'provision_modal',
        resolve: {
          provisions: function () {
            return $scope.provisions;
          },
          type: function () {
            return $scope.type;
          }
        }
      });

      modalInstance.result.then(function (newProvisions) {
        $scope.rule.newProvisions = _.union(newProvisions, $scope.rule.newProvisions);
        $scope.rule.newProvisions.sort();
      }, function (dis) {
        $log.debug(dis);
      });
    };
  })
;

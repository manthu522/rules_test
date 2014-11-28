"use strict";
var _ = require('lodash');

module.exports = angular.module('provisions', [
  'mm.foundation.modal',
  'mm.foundation.accordion',
  'foundationTemplates'
])
  .controller('provisionsController', function ($scope, $modalInstance, provisions, type) {
    $scope.provisions = provisions;
    $scope.type = type.type;

    var newProvisions = [];

    $scope.addProvision = function (newPro) {
      newProvisions.push(newPro);
    };

    $scope.ok= function () {
      var uniqProvisions = _.uniq(newProvisions, 'key');
      $modalInstance.close(uniqProvisions);
    };
  })
;
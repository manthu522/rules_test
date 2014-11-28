module.exports = function ($rootScope, $log, $scope, $state, $cookieStore, $http, session, user) {
 'use strict';

  $scope.enrolled = false;

  window.getScepResponse = function (data) {
    $log.debug('scep');
    $log.debug(data);
    $log.debug('--------------');
    $scope.scepRes = data;
    $scope.enrolled = true;
    user.get({id: $rootScope.currentUser._id}).$promise.catch($log.debug)
      .then(function (userIns) {
        $log.debug('user');
        $log.debug(userIns);
        $log.debug('uuid');
        $log.debug($scope.scepRes.uuid);
        $log.debug('|/|/|/|');
        if (userIns.did) {
          if (userIns.did === $scope.scepRes.uuid) {
            return $log.debug('this device is currently registered');
          } else {
            return $log.debug('this device is registered to a different user');
          }
        } else {
          userIns.did = $scope.scepRes.uuid;
          $log.debug(userIns);
          userIns.$update({}, function () {
            $log.debug('This device is has been assigned to this user');
          }, $log.debug);
        }
      })
    ;
  };

  $scope.newRule = function () {
    $state.go('newRule');
  };

  $scope.myRules = function () {
    $state.go('myRules');
  };

  $scope.logout = function () {
    session.delete()
      .$promise
      .then(function () {
        $rootScope.currentUser = false;
        $cookieStore.remove('user');
        $state.go('login');
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  };

  $scope.enrollDevice = function () {
    if ($scope.scepRes) {
      $log.debug($scope.scepRes);
      $log.debug('device already registerd');
    } else {
      $log.debug('registering device');
      var url = window.location.origin + '/phoneRulesMDM.mobileconfig';
      window.open(url);
      setTimeout(function () {
        window.reload();
      }, 5000);
    }
  };
};

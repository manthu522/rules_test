/* globals $ */
'use strict';
require('../common/ruleServ');

module.exports = angular.module('schedule', [
  'mm.foundation.buttons',
  'ps.inputTime',
  'ruleServ'
])
  .controller('scheduleController', function ($scope, $log, $state, $filter, $modal, ruleServ, rule) {
    $scope.disclaimer = false;
    $scope.rule = rule;

    (function initIt() {
      $scope.newStart = $filter('date')(new Date($scope.rule.schedule.startTime), 'HH:mm');
      $scope.newEnd = $filter('date')(new Date($scope.rule.schedule.endTime ), 'HH:mm');
    }());

    $scope.setTimeModels = function () {
      //start
      $scope.start = {};
      var startTime = new Date($scope.rule.schedule.startTime);
      var endTime = new Date($scope.rule.schedule.endTime);
      var hh = startTime.getHours();
      var mm =  startTime.getMinutes();
      var ampm = hh > 12? 'PM': 'AM';
      hh = hh % 12;
      $scope.start.hh = hh? hh: 12; //0's should be 12
      $scope.start.mm = mm < 10? '0'+ mm: mm;
      $scope.start.ampm = ampm;
      startTime = hh = mm= '';
      //end
      $scope.end = {};
      hh = endTime.getHours();
      mm =  endTime.getMinutes();
      ampm = hh > 12? 'PM': 'AM';
      hh = hh % 12;
      $scope.end.hh = hh? hh: 12; //0's should be 12
      $scope.end.mm = mm < 10? '0'+ mm: mm;
      $scope.end.ampm = ampm;
      endTime = hh = mm= '';
    };

    $scope.setTimeModels();

    $scope.setStart = function () {
      var hour = $scope.newStart.split(':')[0] || 10;
      var min = $scope.newStart.split(':')[1] || 15;
      $scope.rule.schedule.startTime = new Date(2014, 3, 15, hour, min);
      $scope.setTimeModels();
    };

    $scope.$on('setStart', function (event, newStart) {
      $scope.newStart = newStart;
      $scope.setStart();
    });

    $scope.setEnd = function () {
      var hour = $scope.newEnd.split(':')[0] || 10;
      var min = $scope.newEnd.split(':')[1] || 15;
      $scope.rule.schedule.endTime = new Date(2014, 3, 15, hour, min);
      $scope.setTimeModels();
    };

    $scope.$on('setEnd', function (event, newEnd) {
      $log.debug('receiving');
      $scope.newEnd = newEnd;
      $scope.setEnd();
    });


    $scope.setSchedule = function () {
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
        $log.error(err);
      });
    };
    $log.debug($scope.iPhone);
    if (!$scope.iPhone) {
      $scope.openStartTimeModal = function () {
        $modal.open({
          scope: $scope,
          template: '<input type="time" ng-model="thing.start" ng-change="emitStart()">',
          resolve: {
            start: function () {
              return $scope.newStart;
            }
          },
          controller: function ($scope, start) {
            $scope.thing = {};
            $scope.thing.start = start;
            $scope.emitStart = function () {
              $scope.$emit('setStart', $scope.thing.start);
            };
          }
        });
      };
      $scope.openEndTimeModal = function () {
        $modal.open({ // Returns a modal instance
          scope: $scope,
          template: '<input type="time" ng-model="thing.end" ng-change="emitEnd()">',
          controller: function ($scope, endTime) {
            $scope.thing = {}; //ng-transclude workaround
            $scope.thing.end = endTime;
            $scope.emitEnd = function () {
              $log.debug('emitting');
              $scope.$emit('setEnd', $scope.thing.end);
            };
          },
          resolve: {
            endTime: function () {
              return $scope.newEnd;
            }
          }
        });
      };
    } else {
      $scope.openStartTimeModal = function () {};
      $scope.openEndTimeModal = function () {};
    }
  })
  .directive('daySelector', function ($log) {
    function link (scope) {
      $log.debug(scope);
      scope.dayKey = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
      ];
    }

    return {
      restrict: 'AE',
      link: link,
      templateUrl: 'schedule/daySelector.html',
      scope: {
       days: '='
      }
    };
  })
  .filter('firstLetter', function () {
    return function (input) {
      return input.charAt(0).toUpperCase();
    };
  })
  .directive('focusTime', function () {
    function focus (scope, element) {
      if (scope.iPhone) {
        element.bind('click', function() {
          $(element).parent().find('input')[0].focus();
        });
      }
    }
    return {
      restrict: 'AE',
      link: focus
    };
  })
  .directive('addClickAttr', function ($rootScope, $log, $compile) {
    var compile;
    $log.debug('iPhone true?');
    if (!$rootScope.iPhone) {
      compile = function (el, attr) {
        var func = attr.func;
        el.removeAttr('add-click-attr');    // necessary to avoid infinite compile loop
        el.attr('ng-click', func);
        var fn = $compile(el);
        return function(scope){
          fn(scope);
        };
      };
    } else {
      compile = function (el) {
        el.removeAttr('add-click-attr');
        $log.debug('compile');
        var fn = $compile(el);
        return function(scope){
          fn(scope);
        };
      };
    }
    return {
      priority:1001,
      terminal:true,                // prevent lower priority directives to compile after it
      compile: compile
    };
  })
;

'use strict';
require('../common/ruleServ');

module.exports = angular.module('rule', [
  'ruleServ',
  'ngAnimate',
  'mm.foundation.modal'
])
  .controller('ruleController', function () {
  })
  .directive('rule', function ($filter, $state, $animate, $modal, $log, ruleServ ) {
    function link(scope, element) {
      var colors = [
        '#00ECE9',//cyan
        '#2C17D4',//blue
        '#E80010',//red
        '#E16922',//orange
        '#DFC541',//yellow
        '#00E043'//green
      ];
      var color = colors[Math.floor(scope.index % 5)];
      var id = 'rule' + scope.index;
      var style = '<style> .' + id + '::before {border-top-color: ' + color + '; border-bottom-color: ' + color +';}';
      var ruleFront = angular.element(element.children()[0]);
      ruleFront.addClass(id);
      ruleFront.append(style);
      /**
       * Open menu transition
       */
      scope.openMenu = function () {
        if(ruleFront.hasClass('clicked')) {
          $animate.removeClass(ruleFront, 'clicked');
        } else {
          $animate.addClass(ruleFront, 'clicked');
        }
      };

      scope.hh = null;
      scope.mm = null;
      scope.ss= null;

      scope.start = function () {
        resetTimeout();
        tick();
      };

      function resetTimeout() {
        if (scope.timeoutId) {
          clearTimeout(scope.timeoutId);
        }
      }

      function calculateTimeUnits () {
        if (scope.millis > 0) {
          scope.seconds = Math.floor((scope.millis / 1000) % 60);
          scope.minutes = Math.floor(((scope.millis / (60000)) % 60));
          scope.hours = Math.floor(scope.millis / 3600000);
          scope.days = 0;
          scope.months = 0;
          scope.years = 0;

          scope.ss = scope.seconds < 10 ? '0' + scope.seconds : scope.seconds;
          scope.mm = scope.minutes < 10 ? '0' + scope.minutes : scope.minutes;
          scope.hh = scope.hours < 10 ? '0' + scope.hours : scope.hours;
        } else {
          scope.seconds = 0;
          scope.minutes = 0;
          scope.hours = 0;
          scope.ss = 0;
          scope.mm = 0;
          scope.hh= 0;
        }
      }


      var tick = function () {
        var now = new Date();
        var d = new Date(scope.rule.schedule.endTime);
        var day = now.getDate();
        var year = now.getFullYear();
        var month = now.getMonth();
        var endTime = new Date(year, month, day, d.getHours(), d.getMinutes());
        scope.endTime = endTime.getTime();
        scope.millis = scope.endTime - now;
        var adjustment = scope.interval - scope.millis % 1000;
        calculateTimeUnits();

        scope.timeoutId = setTimeout(function () {
          tick();
          scope.$digest();
        }, scope.interval - adjustment);

        if (scope.millis < 0) {
          resetTimeout();
          calculateTimeUnits();
        }
      };

      scope.start();

      scope.buttons = [ //Vestigial?
        {'enable': false, name: 'enable'},
        {'schedule': true, name: 'schedule'},
        {'modify': false, name: 'modify'},
        {'delete': false, name: 'delete'}
      ];


      scope.enableRule = function () {
        scope.rule.enabled? scope.rule.enabled = false: scope.rule.enabled = true;
        var params = {
          rid: scope.rule._id,
          userId: scope.rule.userId
        };
        ruleServ.save(params, {enabled: scope.rule.enabled})
          .$promise
          .then(function () {
          })
          .catch(function (err) {
            $log.debug(err);
          })
        ;
      };

      scope.modifyRule = function () {
        $state.go('editRule', {rid: scope.rule._id});
      };

      scope.deleteRule = function () {
        $log.debug('Opening delete modal');
        var modalInstance = $modal.open({
          templateUrl: 'rule/deleteRule.html',
          controller: 'deleteRule',
          windowClass: 'medium deleteRule_modal'
        });

        modalInstance.result.then(function () {
          var params = {
            rid: scope.rule._id,
            userId: scope.rule.userId
          };
          ruleServ.remove(params)
            .$promise
            .then(function() {
              scope.$emit('updateRules');
            })
            .catch(function (err) {
              $log.log(err);
            })
          ;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      scope.scheduleRule = function () {
        $state.go('schedule', {rid: scope.rule._id});
      };

    }

    return {
      restrict: 'E',
      templateUrl: 'rule/rule.html',
      link: link,
      controller: function ($scope) {
        $scope.setColor = function (index) {
          var color = [
            'cyan',
            'blue',
            'red',
            'orange',
            'yellow',
            'green'
          ];
          var whichColor = Math.floor(index % 5);
          return color[whichColor];
        };
      },
      scope: {
        rule: '=',
        updateRules: '&',
        index: '='
      }
    };
  })
  .controller('deleteRule', function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close(true);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss(false);
    };
  })
;

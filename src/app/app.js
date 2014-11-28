/* globals Modernizr*/
'use strict';
require('./modules/login/login');
require('./modules/signup/signup');
require('./modules/myRules/myRules');
require('./modules/rule/rule');
require('./modules/common/ruleServ');
require('./modules/schedule/schedule');
require('./modules/cuRule/cuRule');
require('./modules/common/auth');
require('./modules/common/session');
require('./modules/provisions/provisions');
var appController = require('./appController');

var phoneRules = angular.module('phoneRules', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'angular-loading-bar',
  'ui.router',
  'ngCookies',
  'templates',
  'auth',
  'session',
  'login',
  'signUp',
  'myRules',
  'rule',
  'ruleServ',
  'schedule',
  'cuRule',
  'mm.foundation.offcanvas'
]);
phoneRules.controller('appController', appController);

phoneRules.config(function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $logProvider) {
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authHttpResponseInterceptor');//Can be found in Auth module

  function getRule ($rootScope, $stateParams, ruleServ) {
    var params = {
      rid: $stateParams.rid,
      userId: $rootScope.currentUser._id
    };
    return ruleServ.get(params)
            .$promise
            .catch(function (err) {
              console.log(err);
            })
    ;
  }

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'loginController',
      auth: false
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'signUpController',
      auth: false
    })
    .state('myRules', {
      url: '/myRules',
      templateUrl: 'myRules/myRules.html',
      controller: 'myRulesController',
      resolve: {
        rules: function ($rootScope, ruleServ) {
          var user = {userId: $rootScope.currentUser._id};
          //console.log(user);
          return ruleServ.query(user);
        }
      },
      auth: true
    })
    .state('schedule', {
      url: '/schedule/:rid',
      templateUrl: 'schedule/schedule.html',
      controller: 'scheduleController',
      resolve: {
        rule: getRule
      },
      auth: true
    })
    .state('newRule', {
      url: '/newRule',
      templateUrl: 'cuRule/cuRule.html',
      controller: 'cuRuleController',
      resolve: {
        rule: function () {
          return {};
        }
      },
      onEnter: function ($rootScope) {
        $rootScope.atNewRules = true;
      },
      onExit:function ($rootScope) {
        $rootScope.atNewRules = false;
      },
      auth: true
    })
    .state('editRule', {
      url: '/editRule/:rid',
      templateUrl: 'cuRule/cuRule.html',
      controller: 'cuRuleController',
      resolve: {
        rule: getRule
      },
      auth: true
    })
  ;
  $urlRouterProvider.otherwise('/login');
});

phoneRules.run(function ($rootScope, $state, $window, $cookieStore) {
  $rootScope.iPhone = /iphone/.test($window.navigator.userAgent.toLowerCase());
  $rootScope.iPad   = /ipad/.test($window.navigator.userAgent.toLowerCase());
  $rootScope.currentUser = $cookieStore.get('user') || null;
  $cookieStore.remove('user');

  $rootScope.atRules = false;
  $rootScope.atNewRules = false;

  $rootScope.Modernizr = Modernizr;//Modernizr should be on the global object;

  //attach ScepResponse from appblade to rootscope.
  //ScepResponse is attached to window in function in script tag in head element of index
  //$rootScope.scepResponce = JSON.stringify(scepResponce);

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    if (toState.auth) {
      $rootScope.atRules = false;
    } else {
      $rootScope.atRules = true;
    }

    if(toState.auth && !$rootScope.currentUser) {
      $state.transitionTo('login');
      event.preventDefault();
    } else if($rootScope.currentUser && toState.name === 'login') {
      $state.transitionTo('myRules');
      event.preventDefault();
    } else if(
      (toState.name === 'schedule' || toState.templateUrl === 'cuRule/cuRule.html') && fromState.name !== 'myRules' ) {
      $state.transitionTo('myRules');
      event.preventDefault();
    }
  });
});

module.exports = phoneRules;
window.phoneRules = phoneRules;

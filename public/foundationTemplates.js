(function(module) {
try {
  module = angular.module('foundationTemplates');
} catch (e) {
  module = angular.module('foundationTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/modal/backdrop.html',
    '<div class="reveal-modal-bg fade" ng-class="{in: animate}" ng-click="close($event)" style="display: block"></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('foundationTemplates');
} catch (e) {
  module = angular.module('foundationTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/modal/window.html',
    '<div tabindex="-1" class="reveal-modal fade {{ windowClass }}"\n' +
    '  ng-class="{in: animate}" ng-click="close($event)"\n' +
    '  style="display: block; position: fixed; visibility: visible">\n' +
    '  <div ng-transclude></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('foundationTemplates');
} catch (e) {
  module = angular.module('foundationTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/accordion/accordion-group.html',
    '<dd>\n' +
    '  <a ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a>\n' +
    '  <div class="content" ng-style="isOpen ? {display: \'block\'} : {}" ng-transclude></div>\n' +
    '</dd>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('foundationTemplates');
} catch (e) {
  module = angular.module('foundationTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/accordion/accordion.html',
    '<dl class="accordion" ng-transclude></dl>\n' +
    '');
}]);
})();

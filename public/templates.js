(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('cuRule/cuRule.html',
    '<div class="row cuRuleTitle">\n' +
    '    <div class="row collapse thisRuleTitle cyan" ng-click="editTitle()">\n' +
    '        <div class="small-3 column modifyIcon">\n' +
    '            <img src="assets/modifyActive.png" />\n' +
    '        </div>\n' +
    '        <div class="small-9 column cuTitle oneLine">\n' +
    '            <h1>{{rule.title || \'New Rule\' | capitalize}}</h1>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row closeEditBlock animate-show"\n' +
    '         ng-show="openTitle"\n' +
    '         ng-click="editTitle()">\n' +
    '        <div class="small-3 right">CLOSE</div>\n' +
    '    </div>\n' +
    '    <div class="row animate-show" ng-show="openTitle">\n' +
    '        <div class="small-10 small-centered column ruleEditBlock" >\n' +
    '            <div class="row ruleEdit">\n' +
    '                <div class="small-12 small-centered column ">\n' +
    '                    <label><b>Name of Rule</b><small>This will be displayed in <span>My Rules</span></small>\n' +
    '                        <input type="text" ng-model="rule.title"/>\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row ruleEdit">\n' +
    '                <div class="small-12 small-centered column ">\n' +
    '                    <label><b>Description</b><small>Will be displayed in <span>My Rules</span></small>\n' +
    '                        <input type="text" ng-model="rule.description"/>\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row settings" ng-click="addProvision({type: \'settings\'})">\n' +
    '    <div class="">\n' +
    '        <h2>PHONE SETTINGS</h2>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row restriction"\n' +
    '     ng-repeat="setting in rule.newProvisions | filter:\'settings\' track by $id(setting)">\n' +
    '    <div class="small-7 medium-9 column restrictTitle oneLine"><b>{{setting[setting.key].label | capitalize}}</b></div>\n' +
    '    <div class="small-2 right  column restrictionSlidePos">\n' +
    '        <div class="switchContainer">\n' +
    '            <div class="onoffswitch">\n' +
    '                <input  id="{{setting.key}}"\n' +
    '                        type="checkbox"\n' +
    '                        name="{{setting.key}}"\n' +
    '                        class="onoffswitch-checkbox"\n' +
    '                        ng-model="setting[setting.key].enabled"\n' +
    '                        ng-checked="setting[setting.key].enabled"\n' +
    '                        btn-checkbox />\n' +
    '                <label class="onoffswitch-label" for="{{setting.key}}">\n' +
    '                    <span class="onoffswitch-inner"></span>\n' +
    '                    <span class="onoffswitch-switch"></span>\n' +
    '                </label>\n' +
    '                <script>\n' +
    '                    document.getElementById("{{setting.key}}").onclick = function () {};\n' +
    '                </script>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row settings" ng-click="addProvision({type: \'application\'})">\n' +
    '    <div class="left">\n' +
    '        <h2>APPLICATIONS</h2>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row restriction"\n' +
    '     ng-repeat="apps in rule.newProvisions | filter:\'application\' track by $id(apps)">\n' +
    '    <div class="small-7 medium-9 column restrictTitle oneLine"><b>{{apps[apps.key].label}}</b></div>\n' +
    '    <div class="small-2 right column restrictionSlidePos">\n' +
    '        <div class="switchContainer">\n' +
    '            <div class="onoffswitch">\n' +
    '                <input type="checkbox"\n' +
    '                       name="{{apps.key}}"\n' +
    '                       class="onoffswitch-checkbox"\n' +
    '                       id="{{apps.key}}"\n' +
    '                       ng-model="apps[apps.key].enabled"\n' +
    '                       ng-checked="apps[apps.key].enabled"\n' +
    '                       btn-checkbox>\n' +
    '                <label class="onoffswitch-label" for="{{apps.key}}">\n' +
    '                    <span class="onoffswitch-inner"></span>\n' +
    '                    <span class="onoffswitch-switch"></span>\n' +
    '                </label>\n' +
    '                <script>\n' +
    '                    document.getElementById("{{setting.key}}").onclick = function () {};\n' +
    '                </script>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row disclaim">\n' +
    '    <div class="disclaimRadio"\n' +
    '         ng-model="disclaimer"\n' +
    '         ng-class="disclaimer? \'active\': \'disabled\';"\n' +
    '         btn-checkbox>\n' +
    '        <div class="innerCircle"></div>\n' +
    '    </div>\n' +
    '    <div class="right disclaimText">\n' +
    '        <p><b class="exclaim">!</b><b>IMPORTANT</b> By selecting this, you are agreeing to the terms and condit\n' +
    '            ions of\n' +
    '            this\n' +
    '            profile\n' +
    '            provisioning\n' +
    '            app contained in this <b>TERMS AND CONDITIONS</b> document</p>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row cuRule">\n' +
    '    <div  class="button ruleSubmit right"\n' +
    '          ng-click="disclaimer? cuRule():\'\';"\n' +
    '          ng-dissabled="disclaimer" >\n' +
    '            {{isNew? \'CREATE PHONE RULE\': \'SAVE CHANGES\'}}\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('login/login.html',
    '<div>\n' +
    '    <div class="row loginSignUp--landing">\n' +
    '        <form class="" name="loginForm" ng-submit="login(loginForm)">\n' +
    '            <div class="loginSignUp--Margin row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <label>Email\n' +
    '                        <input\n' +
    '                                type="email"\n' +
    '                                placeholder="Email"\n' +
    '                                ng-model="user.email"\n' +
    '                                required\n' +
    '                                autofocus\n' +
    '                                mongoose-error\n' +
    '                                />\n' +
    '                    </label>\n' +
    '                    <!--<label class="error text-center" ng-show="errors.email">-->\n' +
    '                        <!--<p>{{ errors.email}}</p>-->\n' +
    '                    <!--</label>-->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <label>Password\n' +
    '                        <input\n' +
    '                                type="password"\n' +
    '                                placeholder="password"\n' +
    '                                ng-model="user.password"\n' +
    '                                required\n' +
    '                                mongoose-error\n' +
    '                                />\n' +
    '                    </label>\n' +
    '                     <!--<label class="error" ng-show="form.password.$error.mongoose">-->\n' +
    '                         <!--<p>{{ errors.password}} </p>-->\n' +
    '                     <!--</label>-->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <button type="submit" class="button expand loginSignUp_button-style">SIGN IN</button>\n' +
    '                    <small><a href="/signup" class="text-center">Create an account </a></small>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <label class="error">\n' +
    '                        <p class="text-center">{{error.other}}</p>\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('myRules/myRules.html',
    '<div >\n' +
    '    <div class="row collapse thisUser" this-user></div>\n' +
    '    <div class="ruleRepeat row" ng-repeat="rule in rules">\n' +
    '        <rule class="ruleDir " rule="rule" updateRules="updateRules" index="$index"></rule>\n' +
    '    </div>\n' +
    '    <div class="row" style="height: 3em; background-color: #7496A4">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('myRules/thisUser.html',
    '<div class="circle circle--moveLeft" circle></div>\n' +
    '<div class="small-4 medium-7 column text-center userTextBox">\n' +
    '\n' +
    '    <div class="centerBox">\n' +
    '        <div class="userTitleBox"><h1 class="userTitle">{{currentUser.displayName | capitalize}} </h1></div>\n' +
    '        <div class="userDesc"><p>Has <b class="ruleNum">{{rules.length}}</b> Phone Rules</p></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="small-8 medium-5 column kid">\n' +
    '        <img src="assets/kid.png" class="" alt=""/>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('provisions/provisions.html',
    '<div class="row proModal">\n' +
    '    <button class="button expand provisions_button" type="button expand" ng-click="ok()">\n' +
    '        Add to rule\n' +
    '    </button>\n' +
    '    <ul class="no-bullet">\n' +
    '        <li class="row provision--styling" ng-repeat="provision in provisions | filter:type">\n' +
    '            <div class="small-2 column removePadding" ng-click="addProvision(provision)">\n' +
    '                <div class="button expand left provisions_button">Add</div>\n' +
    '            </div>\n' +
    '            <div class="small-9 column provisions_title text-center oneLine">\n' +
    '                {{provision[provision.key].label}}\n' +
    '            </div>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '    <!--<accordion close-others="true">-->\n' +
    '        <!--<accordion-group class="row"-->\n' +
    '                         <!--ng-repeat="provision in provisions | filter:type"-->\n' +
    '                         <!--heading="{{provision[provision.key].label}}" >-->\n' +
    '            <!--<div class="contain-to-grid addPro" ng-click="addProvision(provision)">-->\n' +
    '                <!--<button type="button" class="button expanded">{{provision[provision.key].label}}</button>-->\n' +
    '            <!--</div>-->\n' +
    '        <!--</accordion-group>-->\n' +
    '    <!--</accordion>-->\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('rule/deleteRule.html',
    '<div class="">\n' +
    '    <div class="button deleteRule_modal_button-style" ng-click="ok()">\n' +
    '        Delete Rule?\n' +
    '    </div>\n' +
    '    <div class="button deleteRule_modal_button-style" ng-click="cancel()">\n' +
    '        Cancel\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('rule/rule.html',
    '<div class="row collapse ruleFront"\n' +
    '     ng-click="openMenu()"\n' +
    '     ng-class="setColor(index)">\n' +
    '    <div class="small-7 medium-10 column ruleInfo">\n' +
    '        <h1 class="hide-for-small ruleTitle">{{rule.title | capitalize}}</h1>\n' +
    '        <h3 class="show-for-small ruleTitle paddingTop">{{rule.title | capitalize}}</h3>\n' +
    '        <small>{{rule.description}}</small>\n' +
    '    </div>\n' +
    '    <div class="small-5 medium-2 column infoBox">\n' +
    '        <div class="row ">\n' +
    '            <div class="infoEnabled right">\n' +
    '                <div>{{rule.enabled?\'ENABLED\': \'DISABLED\'}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row" ng-show="rule.enabled" >\n' +
    '            <div class="timeLeft">\n' +
    '                <div>\n' +
    '                    {{hh}}:{{mm}}:{{ss}}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row ruleBack">\n' +
    '    <div class="button-group ruleButtons" >\n' +
    '        <div id="enableRule"\n' +
    '                class="small-3 column ruleButton ruleButtonStructure ruleEnableButtonFix"\n' +
    '                ng-click="enableRule()"\n' +
    '                ng-class="rule.enabled?\'enabled\':\'disabled\';" >\n' +
    '        </div>\n' +
    '        <div id="scheduleRule"\n' +
    '                class="small-3 column ruleButton"\n' +
    '                ng-click="scheduleRule()">\n' +
    '        </div>\n' +
    '        <div id="modifyRule"\n' +
    '                class="small-3 column ruleButton"\n' +
    '                ng-click="modifyRule()">\n' +
    '        </div>\n' +
    '        <div id="deleteRule"\n' +
    '                class="small-3 column ruleButton ruleButtonStructure end"\n' +
    '                ng-click="deleteRule()">\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('schedule/daySelector.html',
    '<div class="button-group dayButtons">\n' +
    '    <div class="column day"\n' +
    '            ng-repeat="day in dayKey"\n' +
    '            ng-model="days[day]"\n' +
    '            ng-class="{\'disabled\': !days[day], \'end\': $last}"\n' +
    '            btn-checkbox>\n' +
    '        <b>{{day|firstLetter}}</b>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('schedule/schedule.html',
    '<div>\n' +
    '    <div class="schedule row cyan">\n' +
    '        <div class="small-3 column scheduleImg">\n' +
    '            <img src="assets/scheduleActive.png" />\n' +
    '        </div>\n' +
    '        <div class="small-9 column scheduleTitle oneLine">\n' +
    '            <b>{{rule.title | capitalize}}</b>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '        <div class="row input">\n' +
    '            <div class="small-4 column text-center clockEnd">\n' +
    '                <b>BEGIN:</b>\n' +
    '                <img src="assets/clock.png" />\n' +
    '            </div>\n' +
    '            <div class="small-8 column">\n' +
    '                <div class="timeGroup" func="openStartTimeModal()" focus-time add-click-attr>\n' +
    '                    <div class="hh timeBar column">\n' +
    '                        <span>{{start.hh}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="mm timeBar column">\n' +
    '                        <span>{{start.mm}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="ampm timeBar column" ng-class="start.ampm">\n' +
    '                        <span>{{start.ampm}}</span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <input type="time" class="hideThisFarAway"\n' +
    '                       ng-model="newStart" ng-change="setStart()">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row input">\n' +
    '            <div class="small-4 text-center column clockEnd">\n' +
    '                <b>END:</b>\n' +
    '                <img src="assets/clock.png" />\n' +
    '            </div>\n' +
    '            <div class="small-8 column" func="openEndTimeModal()" add-click-attr focus-time>\n' +
    '                <div class="timeGroup">\n' +
    '                    <div class="hh timeBar column">\n' +
    '                        <span>{{end.hh}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="mm timeBar column">\n' +
    '                        <span>{{end.mm}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="ampm timeBar column" ng-class="end.ampm">\n' +
    '                        <span>{{end.ampm}}</span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <input type="time"\n' +
    '                       ng-model="newEnd" ng-change="setEnd()"\n' +
    '                       class="hideThisFarAway">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row days"\n' +
    '             days="rule.schedule.days"\n' +
    '             day-selector></div>\n' +
    '        <div class="row weeklyRow">\n' +
    '                <div  class="left weekly"\n' +
    '                      ng-model="rule.schedule.weekly"\n' +
    '                      ng-class="rule.schedule.weekly? \'active\': \'disabled\';"\n' +
    '                      btn-checkbox>\n' +
    '                    <div class="innerCircle"></div>\n' +
    '                </div>\n' +
    '           <div class="weeklyText"> Repeat Weekly</div>\n' +
    '        </div>\n' +
    '        <div class="row disclaim">\n' +
    '            <div class="disclaimRadio"\n' +
    '                 ng-model="disclaimer"\n' +
    '                 ng-class="disclaimer? \'active\': \'disabled\';"\n' +
    '                 btn-checkbox>\n' +
    '                <div class="innerCircle"></div>\n' +
    '            </div>\n' +
    '            <div class="right disclaimText">\n' +
    '               <p><b class="exclaim">!</b><b>IMPORTANT</b> By selecting this, you are agreeing to the terms and conditions of this profile provisioning app contained in this <b>TERMS AND CONDITIONS</b> document</p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div class="large-12 expanded column">\n' +
    '                <div  class="ruleSubmit right button"\n' +
    '                      ng-click="disclaimer? setSchedule(): \'\'"\n' +
    '                      ng-dissabled="!disclaimer">\n' +
    '                    SET SCHEDULE\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signup/signup.html',
    '<div>\n' +
    '    <div class="row loginSignUp--landing">\n' +
    '        <form name="signUpForm" ng-submit="signUp(signUpForm, user)">\n' +
    '            <div class="loginSignUp--Margin row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <label> Email\n' +
    '                        <input\n' +
    '                                type="email"\n' +
    '                                name="email"\n' +
    '                                placeholder="email"\n' +
    '                                ng-model="user.email"\n' +
    '                                required\n' +
    '                                autofocus\n' +
    '                                mongoose-error\n' +
    '                                />\n' +
    '                    </label>\n' +
    '                    <small class="error" ng-show="errors.email">{{errors.email}}</small>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <label>Username\n' +
    '                        <input\n' +
    '                                type="text"\n' +
    '                                name="username"\n' +
    '                                placeholder="username"\n' +
    '                                ng-model="user.username"\n' +
    '                                required\n' +
    '                                mongoose-error\n' +
    '                                />\n' +
    '                    </label>\n' +
    '                    <small class="error" ng-show="errors.username">{{errors.username}}</small>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <label> Password\n' +
    '                        <input\n' +
    '                                type="password"\n' +
    '                                name="password"\n' +
    '                                placeholder="password"\n' +
    '                                ng-model="user.password"\n' +
    '                                ng-minlength="5"\n' +
    '                                required\n' +
    '                                mongoose-error\n' +
    '                                />\n' +
    '                    </label>\n' +
    '                    <small class="error" ng-show="errors.password">{{errors.password}}</small>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <button type="submit" class="button expand loginSignUp_button-style">Sign Up</button>\n' +
    '                    <small>Already have an account? <a href="/login" class="text-center">LOGIN</a><small>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="small-10 small-centered column">\n' +
    '                    <small class="error" ng-show="errors.other">{{errors.other}}</small>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

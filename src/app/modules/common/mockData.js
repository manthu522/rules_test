'use strict';
var defaults  = require('./AppBlade.json'),
    _         = require('lodash');

var possibleProvisions = [];

_.forOwn(defaults, function (value, key, object) {
  var thing = {};
  thing[key] = object[key];
  thing.key = key;
  object[key].enabled = thing[key].enabled = object[key].default_value;
  possibleProvisions.push(thing);
});

possibleProvisions = _.sortBy(possibleProvisions, 'key');

module.exports.possibleProvisions = possibleProvisions;


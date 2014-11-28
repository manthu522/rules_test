'use strict';
var _      = require('lodash'),
    Rest   = require('restler'),
    User   = require('../user/userModel.js'),
    debug  = require('debug')('phoneRules:mdmController'),
    url    = 'https://appblade.com/api/3/mdm/devices/'
;

/**
 * Creates the options object for each request;
 */
function createOpts(userDid, userRestrictions) {
  var options = {
    url: url + userDid,
    port: '443',
    headers: {
      'Authorization': 'Bearer aa02ad49be7eca06916393e0ca19b665a9fbbc3b74dcb6d3a8fc4cad8d3dc5db',
      'user-agent': 'PhoneRules Server/Heroku'
    },
    query: {
      'restrictions': userRestrictions
    }
  };
  return options;
}

/**
 * Takes in an array of provision objects
 * and returns and object to serialize in a query string
 */
function prepData(restrictions) {
  var prepped = {};
  _.forEach(restrictions, function (pro) {
    prepped[pro.key] = pro[pro.key].enabled?1:0;
  });
  debug('Restrictions: ' + JSON.stringify(prepped));
  return prepped;
}

function prepDefaults(restrictions) {
  var prepped = {};
  _.forEach(restrictions, function (pro) {
    prepped[pro.key] = pro[pro.key].default_value;
    prepped[pro.key] = prepped[pro.key]?1:0;
  });
  debug('Restrictions: ' + JSON.stringify(prepped));
  return prepped;
}

module.exports = {
  push: function (rule, cb) {
    debug('Starting push');
    User.findById(rule.userId).select({salt: 0, hash: 0}).exec(function (err, user) {
      if (err) {
        debug('No User Found');
        debug(err);
        return cb(err);
      } else if (!user.did) {
        return cb(new Error('No User Device registered'));
      } else if (!rule.newProvisions || rule.newProvisions.length === 0) {
        debug('No Provisions: ' + JSON.stringify(rule.newProvisions));
        return cb(null, {warn: 'No New Provisions'});
      } else {
        debug(JSON.stringify(user));
        var restrict = prepData(rule.newProvisions);
        var options = createOpts(user.did, restrict);
        debug('options: ' + JSON.stringify(options));
        Rest.put(options.url, options).on('success', function (data, res) {
          debug('Res: ' + res.statusCode);
          cb(null, res.statusCode);
        }).on('fail', function (data, res) {
          debug('fail!');
          debug('Status: ' + res.statusCode);
          debug('Headers: ' + JSON.stringify(res.headers));
          return cb(data, res);
        }).on('error', function (err, res) {
          debug('Err: ' + JSON.stringify(err));
          return cb(err, res);
        })
        ;
      }
    });
  },

  undoRule: function (rule, cb) {
    debug('Starting undo push');
    User.findById(rule.userId).select({salt: 0, hash: 0}).exec(function (err, user) {
      if (err) {
        debug('No User Found');
        debug(err);
        return cb(err);
      } else if (!user.did) {
        return cb(new Error('No User Device registered'));
      } else if (!rule.newProvisions || rule.newProvisions.length === 0) {
        debug('No Provisions: ' + JSON.stringify(rule.newProvisions));
        return cb(null, {warn: 'No Provisions to undo'});
      } else {
        debug(JSON.stringify(user));
        var restrict = prepDefaults(rule.newProvisions);
        var options = createOpts(user.did, restrict);
        debug('Undo options: ' + JSON.stringify(options));
        Rest.put(options.url, options).on('success', function (data, res) {
          debug('Res(undo): ' + res.statusCode);
          cb(null, res.statusCode);
        }).on('fail', function (data, res) {
          debug('fail!');
          debug('Status: ' + res.statusCode);
          debug('Headers: ' + JSON.stringify(res.headers));
          return cb(data, res);
        }).on('error', function (err, res) {
          debug('Err: ' + JSON.stringify(err));
          return cb(err, res);
        })
        ;
      }
    });
  }
};

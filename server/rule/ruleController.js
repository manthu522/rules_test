'use strict';
var
    mongoose  = require('mongoose'),
    Rule      = require('./ruleModel'),
    schedule  = require('../schedule/scheduleRule'),
    debug     = require('debug')('phoneRules:ruleController')
;

module.exports = {
  create: function (req, res) {
    Rule.create(req.body, function (err, rule) {
      if (!err) {
        res.json(200, rule);
        debug('Rule Created');
        debug('Scheduling Rule');
        schedule.schedule(rule);
      } else {
        debug('Rule Creation Failed: ' + JSON.stringify(err));
        return res.json(200, err);
      }
    });
  },

  read: function (req, res) {
    if (!req.params.userId) {return res.send(200, 'missing userId');}
    var userId = mongoose.Types.ObjectId(req.params.userId);
    if (!req.params.rid) {return res.send(200, 'missing ruleId');}
    Rule.findById(req.params.rid).where('userId').equals(userId)
      .exec(function (err, rule) {
        if (!err) {return res.json(200, rule);}
        debug(JSON.stringify(err));
        return res.send(200, err);
      })
    ;
  },

  update: function (req, res) {
    if (!req.params.userId) {return res.send(200, 'missing userId');}
    var userId = mongoose.Types.ObjectId(req.params.userId);
    if (!req.params.rid) {return res.send(200, 'missing ruleId');}
    delete req.body._id;
    Rule.findByIdAndUpdate(req.params.rid,req.body)
      .where('userId')
      .equals(userId)
      .exec(function (err, rule) {
        if(!err) {
          debug('Scheduling Rule');
          schedule.schedule(rule);
          return res.send(200, 'success');
        } else {
          debug('findAndModify Failed: ' + err);
        }
      })
    ;
  },

  del: function (req, res) {
    if (!req.params.userId) {return res.send(200, 'missing userId');}
    var userId = mongoose.Types.ObjectId(req.params.userId);
    if (!req.params.rid) {return res.send(200, 'missing ruleId');}
    Rule.remove({_id: req.params.rid}).where({userId: userId})
      .exec(function (err) {
        if (!err) {return res.send(200);}
        return res.send(200, err);
      })
    ;
  },

  list: function (req, res) {
    if (!req.params.userId) {return res.send(200, 'missing userId');}
    var userId = mongoose.Types.ObjectId(req.params.userId);
    Rule.find({userId: userId})
      .exec(function (err, rules) {
        if (!err) { return  res.json(200, rules);}
        debug(JSON.stringify(err));
        return res.send(200, err);
      })
    ;
  }
};

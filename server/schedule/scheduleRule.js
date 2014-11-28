var
    Q         = require('q'),
    Agenda    = require('agenda'),
    _         = require('lodash'),
    join      = require('path').join,
    Rule      = require('../rule/ruleModel'),
    mdm       = require('./mdmController'),
    debug     = require('debug')('phoneRules:schedule'),
    dbUrl     = require(join(process.cwd(), 'server/config/config')).mongoLabUrl
;

require('date-utils'); //Adds missing functions to date object;

if (process.env.NODE_ENV === 'development') {
  dbUrl = 'mongodb://localhost:27017/phonerules';
}

module.exports = (function () {
  'use strict';
  var agenda = new Agenda();
  agenda.database('' + dbUrl, 'scheduledRules');
  agenda.start();

  function createDate (day, time) {
    var
        curDate     = new Date(),
        wDay   = curDate.getDay(),                     // Day of the week
        d      = new Date(time),                  // Create Date Object from ISODate stamp
        dayNum = Date.getDayNumberFromName(day),  // Returns day of the week from word
        dayDiff
    ;


    if (dayNum > wDay) {
      dayDiff = dayNum - wDay;
      curDate.add({days: dayDiff});
    } else if (dayNum < wDay) {
      dayDiff = wDay - dayNum;
      curDate.add({days: dayDiff, weeks: 1});
    } else { //Today! Has the time pasted?
      if (curDate.getHours() <= d.getHours() && curDate.getMinutes() < d.getMinutes()) { // Not Passed yet
        curDate.add({
          hours: d.getHours() - d.getHours(),
          minutes: d.getMinutes() - curDate.getMinutes()
        });
      } else { // Passed
        curDate.add({weeks: 1});
      }
    }
    curDate.setHours(d.getHours());
    curDate.setMinutes(d.getMinutes());
    return curDate;
  }

  return {
    define: function (rule) {
      debug('Calling create');
      agenda.define(rule.id, function (job, done) {
        debug('Rule run ' + rule.id);
        mdm.push(rule, function (err, res) {
          if (err) {
            debug(err);
            job.fail(err);
            return done(err);
          }
          else {
            return done(null, res);
          }
        });
      });
      agenda.define(rule.id + ':undo', function (job, done) {
        debug('Running undo ' + rule.id);
        mdm.undoRule(rule, function (err, res) {
          if (err) {
            debug(err);
            job.fail(err);
            return done(err);
          }
          else {
            return done(null, res);
          }
        });
      });
      agenda.on('fail:' + rule.id, function (err) {
        debug('Rule push fail' + err.message);
      });
      agenda.on('fail:' + rule.id + ':undo', function (err) {
        debug('Rule undo push fail' + err.message);
      });
    },

    /**
     * Schedule the rule to run
     * defines the rule job if does not exist
     * @param Rule Object;
     */
    schedule: function (rule, done) {
      //Delete rule jobs if they exists
      var removeJobs = function () {
        debug('Cancelling old jobs');
        this.remove(rule.id).then(debug, debug);
        this.remove(rule.id + ':undo').then(debug, debug);
      }.bind(this);

      var fin = function () {
        if (!rule.enabled) {
          debug('Rule dissabled, no need to schedule job');
          return 'Rule Not enabled';
        } else {
          this.define(rule); //Define the rule and undo
          var days = rule.schedule.days.toObject();
          _.forEach(days, function (set, day) {
            if (set) {
              var sd = createDate(day, rule.schedule.startTime);
              debug('Setting ' + rule.id + ' job for ' + day);
              debug('Setting date string as: ' + sd);
              agenda.schedule(sd, '' + rule.id);
              sd = createDate(day, rule.schedule.endTime);
              debug('Setting rule undo job for: ' + sd);
              agenda.schedule(sd, rule.id + ':undo');
              if (done) {
                return done();
              }
              return 'Rule jobs defined and scheduled';
            }
          });
        }
      }.bind(this);

      if (rule.schedule.weekly && !rule.schedule.ran) {
        debug('Ran set');
        rule.schedule.ran = true;
        rule.save();
        this.weekly(rule.id);
        return 'Weekly job scheduled';
      } else {
        if (!rule.schedule.weekly) {
          this.remove(rule.id + ':weekly').then(debug, debug);
        }
        this.exists(rule.id)
          .then(removeJobs)
          .catch(debug)
          .fin(fin)
        ;
      }
    },

    /**
     * Checks it job exits
     * @param ruleId
     * @arg bool
     */
    exists: function (ruleId) {
      var defer = Q.defer();
      agenda.jobs({name: ruleId}, function (err) {
        if (err) {
          debug('Job does not exist: ' + JSON.stringify(err));
          defer.reject(false);
        } else {
          defer.resolve(true);
        }
      });
      return defer.promise;
    },

    weekly: function (ruleId) {
      var removeJobs = function () {
        debug(new Date().toLocaleDateString() + ' Cancelling old weekly job');
        this.remove(ruleId + ':weekly').then(debug, debug);
      }.bind(this);
      var schedThis = this;
      var defineWeekly = function (job, done) {
        debug('Rescheduling the rule for the next week');
        Rule.findById(ruleId, function (err, rule) {
          if (err) {done(err);}
          else {
            schedThis.schedule(rule, done);
          }
        });
      }.bind(this);
      var scheduleWeekly = function () {
        agenda.define(ruleId + ':weekly', defineWeekly);
        agenda.every('week', ruleId + ':weekly');
        agenda.on('fail:' + ruleId + ':weekly', function (err) {
          debug('weekly scheduleing fail: ' + err.message);
        });
      }.bind(this);
      this.exists(ruleId)
        .then(removeJobs)
        .catch(debug)
        .fin(scheduleWeekly)
      ;
    },

    remove: function (name) {
      var defer = Q.defer();
      agenda.cancel({name: name}, function (err) {
        if (err) {
          debug('Err canceling ' + name + ' : ' + err);
          defer.reject(err);
        } else {
          defer.resolve('Rule ' + name + ' removed');
        }
      });
      return defer.promise;
    }
  };
})();

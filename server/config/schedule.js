var Agenda = require('agenda'),
    debug  = require('debug')('phoneRules:schedular'),
    agenda = new Agenda()
;

module.exports = function(dbUrl) {
  'use strict';
  function graceful() {
    agenda.stop(function() {
      process.exit(0);
    });
  }
  agenda.database(dbUrl)
    .processEvery('5 minute')
    .maxConcurrency(100)
    .defaultConcurrency(5)
  ;
  agenda.on('start', function(job) {
    debug('Job %s starting', job.attrs.name);
  });
  agenda.start();
  process.on('SIGTERM', graceful);
  process.on('SIGINT' , graceful);
  return agenda;
};

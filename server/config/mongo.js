"use strict";
var mongoose    = require('mongoose'),
    mongoLabUrl = require('./config').mongoLabUrl,
    options     =  {};

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
  var url = 'mongodb://phonerules:Phonerules1!@ds033699.mongolab.com:33699/phonerulesdb';
} else {
  mongoose.set('debug', false);
  mongoose.set('autoIndex', false);
  var url = mongoLabUrl;
}
exports.db = mongoose.connect( url, options, function ( err) {
  if (err) {
    console.log ('ERROR connecting: ' + err);
  } else {
    console.log ('Successfully connected to: ' + url);
  }
});


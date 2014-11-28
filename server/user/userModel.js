var mongoose              = require('mongoose'),
    PassportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema,
    emailRE               = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var User = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: emailRE
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  name: String,
  did: String
});

User.virtual('userInfo')
  .get(function () {
    'use strict';
    return {
      '_id': this._id,
      'email': this.email,
      'username': this.username,
      'name': this.name,
      'displayName': this.displayName,
      'did': this.did
    };
  });


User.plugin(PassportLocalMongoose, { usernameField: 'email'});

module.exports = mongoose.model('User', User);

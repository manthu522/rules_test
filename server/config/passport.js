"use strict"
var User = require('../user/userModel');

module.exports = function (passport) {
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
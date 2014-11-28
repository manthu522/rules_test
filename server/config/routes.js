'use strict';
var User  = require('../user/userModel'),
    rule  = require('../rule/ruleController'),
    debug = require('debug')('phoneRules:routes')
;

module.exports = function(app, passport) {
  app.get('/auth/users/:userId', ensureAuthenticated, function (req, res) {
    var userId = req.params.userId;
    User.findById(userId).select({hash: 0, salt: 0}).exec(function (err, user) {
      if (err) {
        debug(err);
        return res.json(200, err);
      } else {
        res.json(200, user);
      }
    });
  });

  app.put('/auth/users/:userId', ensureAuthenticated, function (req, res) {
    User.findById(req.params.userId).select({hash: 0, salt: 0}).exec(function (err, user) {
      if (err) {
        debug(err);
        return res.json(200, err);
      }
      else {
        debug(JSON.stringify(user));
        debug(JSON.stringify(req.body));
        delete req.body._id;
        user.update(req.body, function (err) {
          if (err) {
            debug(err);
            return res.json(200,err);
          }
          else {
            return res.send(200);
          }
        });
      }
    });
  });

  app.post('/auth/users', function (req, res, next) {
    User.register(new User(req.body), req.body.password, function (err) {
      if (!err) {next();}
      else {
        debug(err);
        return res.json(200, err);
      }
    });
  }, passport.authenticate('local'), function (req, res) {
    res.json(req.user.userInfo);
  });


  app.get('/auth/session', ensureAuthenticated, session);
  app.post('/auth/session', userLogin);
  app.del('/auth/session', userLogout);

  app.all('/auth/*', function (req, res) {
    var message = '404 auth not found buddy';
    debug(message);
    debug(req.method + ' ' + req.url);
    res.send(404, req.url + " is Invalid API Request");
  });

  //:TODO Needs to be implamented
  //app.all('/myRules', ensureAuthenticated);

  //app.all('/schedule', ensureAuthenticated);


  app.get('/api/rule/:userId/:rid', ensureAuthenticated,rule.read); //Read Rule
  app.post('/api/rule/:userId/:rid', ensureAuthenticated, rule.update); //Update Rule
  app.delete('/api/rule/:userId/:rid', ensureAuthenticated, rule.del); //Delete Rule
  app.get('/api/rule/:userId', ensureAuthenticated, rule.list); //List Rules
  app.post('/api/rule/:userId', ensureAuthenticated, rule.create); //Create new Rule

  app.all('/api/*', function (req, res) {
    var message = '404 api not found buddy';
    console.log(message);
    console.log(req.method + ' ' + req.url);
    res.send(404, req.url);
  });

  function ensureAuthenticated (req, res, next) {
    console.log(req.method + ' ' + req.url);
    if (req.isAuthenticated()) {return next();}
    res.send(401);
  }

  function userLogin (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      var error = err || info;
      if(error) {
        return res.json(200, error);
      }
      if (!user) {
        console.log('\nno user: ' + err);//not sure what needs to be done here
      }
      req.login(user, function(err) {
        if (err) { return res.send(err); }
        res.json(req.user.userInfo);
      });
    })(req, res, next);
  }

  function userLogout (req, res) {
    if(req.user) {
      req.logout();
      res.send(200);
    } else {
      res.send(200, 'Not logged in');
    }
  }

  function session (req, res) {
   res.send( req.user.userInfo);
  }
};

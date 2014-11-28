'use strict';
var
    logger      = require('morgan'),
    express     = require('express'),
    passport    = require('passport'),
    join        = require('path').join,
    body        = require('body-parser'),
    serve       = require('serve-static'),
    cookies     = require('cookie-parser'),
    mo          = require('method-override'),
    session     = require('express-session'),
    mongoStore  = require('connect-mongo')(express),
    debug       = require('debug')('phoneRules:server'),
    dbUrl       = require(join(__dirname, '/config/config')).mongoLabUrl,

    app         = express(),
    port        = Number(process.env.PORT || 9000)
;

/**
 * Sets database url for connect-mongo session storage
 */
if (process.env.NODE_ENV === 'development') {
  dbUrl = 'mongodb://phonerules:Phonerules1!@ds033699.mongolab.com:33699/phonerulesdb';
  app.use(logger('dev'));
}

/**
 * Returns an instance of the mongodb connection
 */
require(join(__dirname, '/config/mongo')).db; //connect to mongo

/**
 * These are not needed when using Heroku
 * as they proxy through an ssl server by default.
 */
/* options = {
  key: fs.readFileSync(join(__dirname, '/ssl/server.key')),
  cert: fs.readFileSync(join(__dirname + '/ssl/server.crt'))
}; */

require(join(__dirname, '/config/passport'))(passport);

app.use(cookies());
app.use(body());//should be above mo
app.use(mo());
app.use(session({
  secret: 'war! what is it good for',
  store: new mongoStore({
    url: dbUrl
  }),
  maxAge: 7 * 24 * 3600 * 1000, //One week cookie
  cookie: {
    secure: false//true
  }
}));

/**
 * config and setup passport
 */
app.use(passport.initialize());
app.use(passport.session());



app.use(serve('public/', {'index': ['index.html']}));
/**
 * Add app routes
 */
require(join(__dirname, '/config/routes'))(app, passport);

/**
 * Must come last. Fixes html5mode redirect
 */
app.get('/*', function (req, res) {
  if(req.user) {
    res.cookie('user', JSON.stringify(req.user.userInfo));
  }
  res.sendfile('./public/index.html');
});

/**
 * Requires DEBUG=phonerules:* to be set
 */
app.use(function logError (err, req, res, next) {
  debug(err);
  next(err);
});
/**
 * handling 404 errors
 */
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
      return next();
  }
  res.send(err.message || '** no unicorns here **');
});

app.use(function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
});
app.use(function errorHandle(err, req, res, next) {
  debug('There be hackers here...');
  res.status(500);
  res.send('err', {error: err});
});

app.listen(port, function () {
  console.log('Listening on port: ' + port);
});

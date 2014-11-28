'use strict';
var gulp       = require('gulp'),
    watchify   = require('watchify'),
    browserSync= require('browser-sync'),
    fileName   = require('vinyl-source-stream'),
    g          = require('gulp-load-plugins')({lazy: false}),
    noop       = g.util.noop,
    log        = g.util.log,
    isWatching = false,
    reloadServer = g.livereload()
;



/**
 * Run Server and watch files
 */
gulp.task('default', ['express', 'templates', 'sass', 'index' ], function () {
  //reloadServer.liste;
  isWatching = true;
  gulp.start('browserify');
  gulp.watch('./src/app/index.html', ['index']).on('changed', function () {
    reloadServer.changed('./public/index.html');
  });
  gulp.watch(['./src/app/**/*.html', '!./src/app/index.html'], ['templates']).on('change', function () {
    reloadServer.changed('./public/templates.js');
  });
  gulp.watch(['./src/app/**/*.sass', './src/app/**/*.scss'], ['sass']);
  gulp.watch(['./public/stylesheet.css'])
    .on('change', function (e) {
      reloadServer.changed(e.path);
    })
  ;
  gulp.watch(['./public/app.js'])
    .on('change', function (e) {
      reloadServer.changed(e.path);
    })
  ;
});

gulp.task('express', function () {
  g.nodemon({
    script: 'server/server.js',
    ext: 'js',
    env: {'NODE_ENV': 'development', 'DEBUG': 'phoneRules:*,restler'},
    watch: './server'
  })
    //.on('restart', function (e) {
//      reloadServer.changed('/');
    //})
  ;
});

gulp.task('sync', function () {
  browserSync.init(null, {
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('index', ['sass'], function index () {
  //var opt = {read: false};
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(g.bowerFiles(), {
      ignorePath: '/public/',
      addRootSlash: false,
      starttag: '<!-- inject:vendor:{{ext}} -->'
    }))
    .pipe(g.inject(gulp.src([
      'public/templates.js',
      'public/foundationTemplates.js',
      'public/app.js',
      'public/foundation-icons.css',
      'public/stylesheet.css'
    ]), {
      ignorePath: ['public', 'src/app'],
      addRootSlash: false
    }))
    .pipe(gulp.dest('public/'))
    .pipe(gulp.dest('src/app/'))
  ;
});

gulp.task('templates', function () {
  var htmlOpts = {
      moduleName: 'templates',
      stripPrefix: 'modules/'
    },
    opt = {
      min: false
    };

  gulp.src(['./src/app/**/*.html', '!./src/app/index.html'])
    .pipe(opt && opt.min ? g.htmlmin(htmlOpts) : noop())
    .pipe(g.ngHtml2js(htmlOpts))
    .pipe(g.concat('templates.js'))
    .pipe(gulp.dest('./public'))
  ;
});
gulp.task('foundationTemplates', function () {
  var uri = './public/bower_components/angular-mm-foundation/';
  var htmlOpts = {
    moduleName: 'foundationTemplates',
    stripPrefix: 'public/bower_components/angular-mm-foundation'
    },
    opt = {
      min: false
    };

  gulp.src([uri + 'template/modal/**/*.html', uri + 'template/accordion/**/*.html'])
    .pipe(opt && opt.min ? g.htmlmin(htmlOpts) : noop())
    .pipe(g.ngHtml2js(htmlOpts))
    .pipe(g.concat('foundationTemplates.js'))
    .pipe(gulp.dest('./public'))
  ;
});
gulp.task('cleanCss' , function () {
  return gulp.src(['./public/stylesheet.css'], {read: false})
    .pipe(g.clean())
  ;
});
gulp.task('sass', function () {
  return gulp.src([
    './src/app/app.sass'
    ])
//    .pipe(g.cached('csslint'))
//    .pipe(g.scssLint())
    .pipe(g.rubySass({}))
    .pipe(g.autoprefixer('last 2 versions', 'last 2 iOS versions'))
    .pipe(g.concat('stylesheet.css'))
    .pipe(gulp.dest('./public'))
  ;
});

gulp.task('cssLint', ['sass'], function () {
  return gulp.src('public/stylesheet.css')
    .pipe(g.cached('csslint'))
    .pipe(g.csslint('./.csslintrc'))
    .pipe(g.csslint.reporter())
  ;
});

gulp.task('browserify',  function () {
  var bundler = watchify('./src/app/app.js');

  function rebundle() {
    log('Rebuilding application JS bundle');

    return bundler.bundle({ debug: true })
      .pipe(fileName('app.js'))
      .pipe(gulp.dest('public'))
      .on('error', log);
  }

  bundler.on('update', rebundle);
  bundler.on('error', log);
  rebundle();
  isWatching? noop(): bundler.close();
});

gulp.task('cleanAssets', function () {
  return gulp.src('public/assets').pipe(g.clean());
});

gulp.task('assets', function () {
  return gulp.src('./src/assets/**')
    .pipe(gulp.dest('./public/assets'));
});

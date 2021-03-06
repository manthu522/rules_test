
module.exports = function ( karma ) {
  process.env.PHANTOMJS_BIN = 'node_modules/karma-phantomjs-launcher/node_modules/.bin/phantomjs';

  karma.set({
    /**
     * From where to look for files, starting with the location of this file.
     */
    basePath: './',

    frameworks: [ 'browserify', 'mocha', 'chai' ],

    /**
     * Filled by the task `gulp karma-conf`
     */
    /**/files: [
                      'bower_components/angular/angular.js',
                      'bower_components/angular-route/angular-route.js',
                      'bower_components/angular-resource/angular-resource.js',
                      'bower_components/jquery/dist/jquery.js',
                      'bower_components/fastclick/lib/fastclick.js',
                      'bower_components/jquery.cookie/jquery.cookie.js',
                      'bower_components/jquery-placeholder/jquery.placeholder.js',
                      'bower_components/foundation/js/foundation.js',
                      'bower_components/angular-mocks/angular-mocks.js'
                    ],

    plugins: [ 'karma-mocha', 'karma-chai', 'karma-browserifast'],

    browserify: {
      files: [
        'src/app/app.test.js',
        'src/app/app.js'
      ]
    },

    preprocessors: {
      '/**/*.browserify': 'browserify'
    },


    /**
     * How to report, by default.
     */
    reporters: 'progress',

    /**
     * Show colors in output?
     */
    colors: true,

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9099,
    runnerPort: 9100,
    urlRoot: '/',

    /**
     * Disable file watching by default.
     */
    autoWatch: true,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9099/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Chrome'
    ]

  });
};

//_karma_config.js
/**
 * Created by <%= username %> on <%= dateTime %>.
 * Karma JS Config file
 * @file _karma_config.js
 * @author <%= username %>
 * @description
 * @module <%= moduleName %>
 */

module.exports = function (config) {

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // base path, that will be used to resolve files and exclude
        basePath: '<%= base_path %>',

        // testing framework
        frameworks: ['<%= frameworks %>'],

        // list of files / patterns to load in the browser


        files: [
            '<%= bowerComponentsPath %>/angular/angular.js',
            '<%= bowerComponentsPath %>/angular-mocks/angular-mocks.js',
            'js/*.js',
            'test/frontend/unit/*.spec.js'
        ],


        // list of files / patterns to exclude
        exclude: [],

        //reporter plugins
        reporters: ['progress','dots','coverage','junit'],
        // web server port
        port: '<%= port %>',

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        preprocessors: {
            '<%= preProcessor %>': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {
                    type: 'html',
                    dir: 'test/coverage/'
                },
                {
                    type: 'cobertura',
                    file: 'test/results/<%= moduleName %>-coverage.xml'
                }

            ]
        },
        //ngHtml2JsPreprocessor: {
        //    moduleName: 'templates',
        //    stripPrefix: 'aatdashboard'
        //},

        // Which plugins to enable
        plugins: [
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        junitReporter: {
            outputFile: 'test/results/<%= moduleName %>-results.xml',
            suite: 'unit'
        }
        // Uncomment the following lines if you are using grunt's server to run the tests
        //proxies: {
        //   '/': 'http://localhost:9999/'
        //},
        ////// URL root prevent conflicts with the site root
        //urlRoot: '_karma_'
    });

};
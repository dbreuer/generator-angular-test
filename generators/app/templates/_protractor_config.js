//_protrator_config.js
/**
 * Created by <%= username %> on <%= dateTime %>.
 *
 * @file _protrator_config.js
 * @description
 * @module <%= moduleName %>
 */

//<%= moduleName %>

var env = require('./environment.js');


exports.config = {

    seleniumAddress: env.seleniumAddress,
    allScriptsTimeout: 160000,
    // set to "custom" instead of cucumber.
    framework: 'custom',

    // path relative to the current config file
    frameworkPath: '<%= nodeModulesPath %>/protractor-cucumber-framework',

    // relevant cucumber command line options
    cucumberOpts: {
        require: 'e2e/features/step_definitions/**/*.js',
        tags: '@dev',
        format: 'pretty',
        profile: false,
        'no-source': true
    },
    capabilities: {
        browserName: 'firefox'
    },

    specs: [
        'e2e/features/*.feature'
    ],

    baseUrl: env.baseUrl + '/',
    onPrepare: function() {

        // you can also add properties to globals here
        global.VARS = {};
        global.protractor = protractor;
        global.browser = browser;
        global.$ = browser.$;
        global.$$ = browser.$$;
        global.element = browser.element;

        browser.driver.manage().window().maximize();

        //global.isAngularSite = function(flag){
        //    browser.ignoreSynchronization = !flag;
        //};
        browser.ignoreSynchronization = true;
    }
};
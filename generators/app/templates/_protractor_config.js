//_protrator_config.js
/**
 * Created by <%= username %> on <%= dateTime %>.
 *
 * @file _protrator_config.js
 * @description
 * @module <%= moduleName %>
 */

//<%= moduleName %>


exports.config = {

    seleniumAddress: '<%= protractor.seleniumAddress %>',
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },
    jasmineNodeOpts: {
        isVerbose: true
    },
    specs: [
        'e2e/*.e2e.js'
    ],
    onPrepare: function() {
        global.VARS = {};

        //@todo: WORKING version on stage
        //Careful with HTTP(S)
        VARS.domainpath = '<%= protractor.localAddress %>';

        global.protractor = protractor;
        global.browser = browser;
        global.$ = browser.$;
        global.$$ = browser.$$;
        global.element = browser.element;

        browser.driver.manage().window().maximize();

        global.isAngularSite = function(flag){
            browser.ignoreSynchronization = !flag;
        };
        require('<%= nodeModulesPath%>/jasmine-reporters/src/load_reporters');
        //HTML reporter
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('xmloutput', true, true)
        )

    }
};
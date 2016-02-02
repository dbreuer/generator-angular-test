//_enviroment.js
/**
 * Created by David Breuer on 01/02/2016.
 *
 * @file _enviroment.js
 * @description
 *
 */
// Common configuration files with defaults plus overrides from environment vars
var webServerDefaultPort = 80;

module.exports = {
    setDefaultTimeout : (60 * 1000),
    // The address of a running selenium server.
    seleniumAddress:
        (process.env.SELENIUM_URL || '<%= seleniumAddress %>'),

    // Capabilities to be passed to the webdriver instance.
    capabilities: {

        'browserName':
            (process.env.TEST_BROWSER_NAME || 'phantomjs'),
        'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],
        'version':
            (process.env.TEST_BROWSER_VERSION || 'ANY')
    },

    // Default http port to host the web server
    webServerDefaultPort: webServerDefaultPort,

    // Protractor interactive tests
    interactiveTestPort: 6969,

    // A base URL for your application under test.
    baseUrl:
    'http://' + (process.env.HTTP_HOST || 'localhost') +
    ':' + (process.env.HTTP_PORT || webServerDefaultPort)

};
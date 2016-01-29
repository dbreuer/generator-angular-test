//_base_e2e.js
/**
 * Created by <%= username %> on <%= dateTime %>.
 *
 * @file _base_e2e.js
 * @description
 * @module <%= moduleName %>
 */
var sleepTime = 3000;
var text, value, bool, bool2, bool3, source, url, title;
var TestVars = {};
var page = require('./pageObject.helper.js');

beforeEach(function () {
    isAngularSite('<%= isAngular %>');
});

describe('User: ' + DATA.user5.username, function () {
    it('should execute test case without errors', function () {

    })
});
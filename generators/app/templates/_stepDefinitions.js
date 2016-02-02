//_stepDefinitions.js
/**
 * Created by David Breuer on 01/02/2016.
 *
 * @file _stepDefinitions.js
 * @description
 *
 */
// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var Helper = require('./PageObject.js');
var page = new Helper(/* options here */);

chai.use(chaiAsPromised);

var expect = chai.expect;

// Chai expect().to.exist syntax makes default jshint unhappy.
// jshint expr:true

module.exports = function() {

    this.Given(/^I run Cucumber with Protractor$/, function(next) {
        next();
    }, 3000);

    this.Given(/^I go on(?: the website)? "([^"]*)"$/, {timeout: 60 * 1000}, function(url, next) {
        page.navigateTo(url, next);
    });

    this.Then(/^it should still do normal tests$/, function(next) {
        expect(true).to.equal(true);
        next();
    });

    this.Then(/^it should expose the correct global variables$/, function(next) {
        expect(protractor).to.exist;
        expect(browser).to.exist;
        expect(by).to.exist;
        expect(element).to.exist;
        expect($).to.exist;
        next();
    });

    this.Then(/the title should equal "([^"]*)"$/, {timeout: 60 * 1000}, function(text, next) {
        expect(browser.getTitle()).to.eventually.equal(text).and.notify(next);

    });
};
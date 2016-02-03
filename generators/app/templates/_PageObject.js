//_PageObject.js
/**
 * Created by David Breuer on 01/02/2016.
 *
 * @file _support.js
 * @description
 *
 */
var env = require('../../../environment');
var Helper = function (options) {
    this.sleeptime = 5000 || options.sleeptime;
};

Helper.prototype = Object.create({}, {
    navigateToHome: {
        value: function(next){
            browser.get(env.baseUrl);
            browser.wait(function() {
                return browser.getCurrentUrl(function(curl) {
                    return baseUrl.test(curl);
                });
            });
            next();
        }
    },
    navigateTo: {
        value: function(url, next){
            browser.get(url);
            browser.wait(function() {
                return browser.getCurrentUrl(function(curl) {
                    return url.test(curl);
                });
            });
            next();
        }
    },
    loginAs: {
        value: function(user, pass, redirect){
            browser.get(VARS.domainpath + "user");
            element(by.id("edit-name")).sendKeys(user);
            element(by.id("edit-pass")).sendKeys(pass);
            element(by.id("edit-submit")).click();
            browser.sleep(Helper.sleeptime).then(function () {
                browser.get(VARS.domainpath + redirect);
            });
        }
    },
    logMeOut: {
        value: function(){
            browser.sleep(Helper.sleeptime).then(function() {
                browser.sleep(Helper.sleeptime).then(function () {
                    browser.executeScript('window.sessionStorage.clear();');
                    browser.executeScript('window.localStorage.clear();');
                });
                browser.sleep(Helper.sleeptime).then(function () {
                    browser.get(VARS.domainpath + 'caslogout');
                });

            });
        }
    },
    hideNotification: {
        value: function(){
            browser.sleep(Helper.sleeptime).then(function() {
                element(by.css("#modalbox .close")).click();
            });
        }
    },
    switchRule: {
        value: function(option) {
            browser.sleep(Helper.sleeptime).then(function() {
                element(by.id('switch-role-dropdown-button')).click();
                browser.sleep(2000);
                element(by.cssContainingText('#switch-role-dropdown-button + ul > li > a', option)).click();
                browser.sleep(5000);
            });
        }
    },
    selectOptions: {
        value: function(option) {
            browser.sleep(Helper.sleeptime).then(function() {
                element(by.css('#edit-centre')).element(by.cssContainingText('option', option)).click();
            });
        }
    }

});

module.exports = Helper;

//var SearchPage = {
//
//    form: $('input[ng-model="term"]'),
//
//    searchResults: by.repeater('podcast in searchCtrl.results'),
//
//    errorMessage: $('#search-error-message'),
//
//    visit: function () {
//        return browser.get('#/search');
//    },
//
//    search: function (term) {
//        return this.form.sendKeys(term + protractor.Key.ENTER);
//    },
//
//    getSearchResults: function () {
//        return getRepeaterColumns(this.searchResults, ['collectionName', 'feedUrl']);
//    },
//
//    countSearchResults: function () {
//        return getRepeaterCount(this.searchResults);
//    },
//
//    getAlertText: function () {
//        return this.errorMessage.getText();
//    },
//
//    hasAlert: function () {
//        return this.errorMessage.isPresent();
//    }
//};
//
//module.exports = SearchPage;
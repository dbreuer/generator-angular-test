//_base_unit.js
/**
 * Created by <%= username %> on <%= dateTime %>.
 *
 * @file _base_unit.js
 * @description
 * @module <%= moduleName %>
 */
'use strict';

if (jasmine.version) { //the case for version 2.0.0
    console.log('jasmine-version:' + jasmine.version);
}

describe('Module: <%= moduleName %>', function () {

    // load the directive's module
    beforeEach(module('<%= moduleName %>'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('Should to run the basic stuff', function(done){
        var nulla = 'zero';
        expect(nulla).toBe('zero');
        done();
    });
});
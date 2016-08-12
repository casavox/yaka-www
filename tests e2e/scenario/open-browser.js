require('jasmine-bail-fast');

describe('Window', function() {
    browser.ignoreSynchronization = true;


    it('should open', function() {
        browser.get('http://www.casa-local.com:8000/#/');
    });

});

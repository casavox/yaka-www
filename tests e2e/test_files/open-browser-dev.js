require('jasmine-bail-fast');

describe('Window', function() {
    browser.ignoreSynchronization = true;


    it('should open', function() {
        browser.get('https://fad2bced-1115-4049-8e43-e2e107.herokuapp.com/#/');
    });

});

require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('User', function() {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;


    it('should log out', function() {
        loginPage.nameHeader.click();
        loginPage.logOut.click();
        browser.sleep(2000);
    });

});

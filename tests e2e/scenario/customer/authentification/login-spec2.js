require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('Test Casavox', function() {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;


    it('should log in', function() {
        loginPage.homeSectionLogin.click();
        browser.wait(loginPage.isLoginPopupOpen, 5000);
        loginPage.userEmail.click();
        loginPage.userEmail.sendKeys(loginPage.userLogin);
        loginPage.pwd.click();
        loginPage.pwd.sendKeys(loginPage.userPwd);
        browser.wait(loginPage.isLogable, 1000);
        loginPage.signInPopupButton.click();

    });

});

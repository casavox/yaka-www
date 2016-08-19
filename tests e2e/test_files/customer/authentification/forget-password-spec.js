require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');
var InfoCustomer = require('../Customer-variables.js');


describe('The user', function () {
    var loginPage = new LoginPage();
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;

    it('should get it password back', function () {
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLogin), loginPage.waitHigh).then(function () {
            loginPage.homeSectionLogin.click();
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.passwordForgotten), loginPage.waitMedium).then(function () {
            loginPage.passwordForgotten.click();
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.inputPassword), loginPage.waitMedium).then(function () {
            loginPage.inputPassword.sendKeys(infoCustomer.forgetLogin);
            loginPage.passwordReset.click();
            browser.sleep(600);
            loginPage.passwordMailSent.getText().then(function(sent) {
                console.log(sent);
            }) ;
        });
    });
});


require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('Test Casavox', function() {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;


    it('should register customer by email', function() {
        browser.get('http://www.casa-local.com:8000/#/');

        console.log("Start register process");
        loginPage.homeSectionRegister.click();
        browser.wait(loginPage.isLoginPopupOpen, 5000);
        loginPage.registerByEmail.click();

        console.log("Start fill informations");
        loginPage.firstName.sendKeys('Grégory');
        loginPage.lastName.sendKeys('BIZET');
        loginPage.email.sendKeys('gregorybizet@hotmail.com');
        loginPage.address.sendKeys('Paris');
        loginPage.password.sendKeys('blabla');
        loginPage.confPassword.sendKeys('blabla');

        console.log("Confirm Inscription");
        loginPage.confirmInscription.click();
    });

});



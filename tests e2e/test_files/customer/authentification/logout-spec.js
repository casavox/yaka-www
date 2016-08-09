require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('User', function () {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;


    it('should log out', function () {
        console.log("* Début du test : déconnexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.nameHeader), 50000).then(function () {
            loginPage.nameHeader.click().then(function () {
                console.log("** Click Menu utilisateur OK");

            });

        });

    });

});

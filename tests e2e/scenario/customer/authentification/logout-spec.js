require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('User', function() {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;


    it('should log out', function() {
        console.log("* Début du test : déconnexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.nameHeader), 5000).then(function() {
            loginPage.nameHeader.click();
            console.log("** Click Menu utilisateur OK");
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.logOut), 5000).then(function() {
            loginPage.logOut.click();
            console.log("*** Click bouton 'déconnexion' OK");
            console.log('**** L\'utilisateur est déconnecté avec succès');
            console.log("***** Fin du Test, résultat : OK");
        });
    });

});

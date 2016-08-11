require('jasmine-bail-fast');
var LoginPage = require('./pro-login-po.js');

describe('User', function() {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;


    it('should log out', function() {
        console.log("(((***       pro-logout-spec.js       ***)))");
        console.log("* Début du test côté pro : déconnexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.nameHeader), 5000).then(function() {
            loginPage.nameHeader.click().then(function() {
                console.log("** Click Menu utilisateur OK");
            });
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.logOut), 5000).then(function() {
            loginPage.logOut.click().then(function() {
                console.log("*** Click bouton 'déconnexion' OK");
                //console.log('**** L\'utilisateur est déconnecté avec succès');
                console.log("***** Fin du Test côté pro, résultat : OK");
            });
        });
    });

});

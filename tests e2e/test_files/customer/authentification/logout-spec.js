require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');
var InfoCustomer = require('../Customer-variables.js');

describe('User', function () {
    var loginPage = new LoginPage();
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;


    it('should log out', function () {
        console.log("(((***       logout-spec.js       ***)))");
        console.log("** Début du test : déconnexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.nameHeader), 50000).then(function () {
            loginPage.nameHeader.click().then(function () {
                browser.wait(loginPage.EC.elementToBeClickable(loginPage.logOut), 5000).then(function() {
                    loginPage.logOut.click().then(function() {
                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLogin), 20000).then(function () {
                            browser.getTitle().then(function (fullTitle) {
                                var tempTitle = fullTitle.split(" ");
                                var title = tempTitle[0];
                                if (title == "CasaVox") {
                                    console.log("*** utilisateur " + infoCustomer.firstName + " " + infoCustomer.lastName + " déconnecté OK");
                                    console.log("*** Fin du Test côté client, résultat : OK");
                                } else {
                                    console.log("!!! ERROR !!! Utilisateur non déconnecté !!!")
                                }
                            });
                        });
                    });
                });
            });
        });
    });
});

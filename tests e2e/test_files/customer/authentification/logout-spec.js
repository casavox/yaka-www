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

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.nameHeader), loginPage.waitHigh).then(function () {
            loginPage.nameHeader.click().then(function () {
                browser.wait(loginPage.EC.elementToBeClickable(loginPage.logOut), loginPage.waitMedium).then(function () {
                    loginPage.logOut.click();
                    browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLogin), loginPage.waitHigh).then(verifyURL(), function(err) {
                        console.log(err);
                    });
                });
            });
        });
        // Vérification de la page d'arrivée
        function verifyURL() {
            browser.getTitle().then(function (fullTitle) {
                var tempTitle = fullTitle.split(" ");
                var title = tempTitle[0];
                console.log("[[ Page actuelle : " + title + " ]]");
                if (title == "CasaVox") {
                    console.log("*** utilisateur " + infoCustomer.firstName + " " + infoCustomer.lastName + " déconnecté OK");
                    console.log("*** Fin du Test côté client, résultat : OK");
                } else {
                    console.log("!!! ERROR !!! Utilisateur non déconnecté !!!")
                }
            });
        }
    });
});

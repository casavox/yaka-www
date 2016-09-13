require('jasmine-bail-fast');
var LoginPage = require('./pro-login-po.js');
var InfoPro = require('../Pro-variables.js');


describe('User', function () {
    var loginPage = new LoginPage();
    var infoPro = new InfoPro();

    browser.ignoreSynchronization = true;


    it('should log out', function () {
        console.log("(((***       pro-logout-spec.js       ***)))");
        console.log("* Début du test côté pro : déconnexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.nameHeader), 5000).then(function () {
            loginPage.nameHeader.click();
            console.log("** Click Menu utilisateur OK");
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.logOut), 5000).then(function () {
            loginPage.logOut.click();
            browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLoginPro), loginPage.waitHigh).then(verifyURL(), function (err) {
                console.log(err);
            });
        });


        // Vérification de la page d'arrivée
        function verifyURL() {
            browser.getTitle().then(function (fullTitle) {
                var tempTitle = fullTitle.split(" ");
                var title = tempTitle[0];
                console.log("[[ Page actuelle : " + title + " ]]");
                if (title == "CasaVox") {
                    console.log("*** utilisateur " + infoPro.firstName + " " + infoPro.lastName + " déconnecté OK");
                    console.log("*** Fin du Test côté professionnel, résultat : OK");
                } else {
                    console.log("!!! ERROR !!! Utilisateur non déconnecté !!!")
                }
            });
        }
    });

});

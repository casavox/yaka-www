require('jasmine-bail-fast');
var LoginPage = require('./pro-login-po.js');
var InfoPro = require('../Pro-variables.js');

describe('The user', function () {
    var loginPage = new LoginPage();
    var infoPro = new InfoPro();
    browser.ignoreSynchronization = true;


    it('should log in', function () {
        console.log("(((***       pro-login-spec.js       ***)))");
        console.log("* Début du test côté pro : connexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLoginPro), 10000).then(function () {
            loginPage.homeSectionLoginPro.click().then(function () {
                console.log("** Click bouton 'se connecter' OK");
                browser.wait(loginPage.isLoginPopupOpen, 5000).then(function () {
                    loginPage.userEmail.click().then(function () {
                        console.log("*** Click input 'Email' OK");
                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.userEmail), 5000).then(function () {
                            loginPage.userEmail.sendKeys(infoPro.userLogin).then(function () {
                                console.log("**** Entrer Email OK");
                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function () {
                                    loginPage.pwd.click().then(function () {
                                        console.log("***** Click input 'Mot de passe' OK");
                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function () {
                                            loginPage.pwd.sendKeys(infoPro.userPwd).then(function () {
                                                console.log("****** Entrer Mot de passe OK");
                                                browser.wait(loginPage.isLogable, 1000).then(function () {
                                                    loginPage.signInPopupButton.click().then(function () {
                                                        browser.wait(loginPage.EC.textToBePresentInElement(loginPage.nameHeader, infoPro.firstName), loginPage.waitHigh).then(function () {
                                                            loginPage.nameHeader.getText().then(function (name) {
                                                                browser.getTitle().then(function (fullTitle) {
                                                                    var tempTitle = fullTitle.split(" ");
                                                                    var title = tempTitle[0];
                                                                    console.log("[[ Page actuelle : " + title + " ]]");
                                                                    console.log("Nom affiché de l'utilisateur : " + name);
                                                                    if (name == infoPro.firstName) {
                                                                        console.log("******* utilisateur " + name + " loggué OK");
                                                                        console.log("******** Fin du Test côté pro, résultat : OK");
                                                                    } else {
                                                                        console.log("!!! ERROR !!! Utilisateur non loggué !!!")
                                                                    }
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});




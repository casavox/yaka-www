require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('The user', function() {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;

    it('should log in', function() {
        console.log("* Début du test côté client : connexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLogin), 20000).then(function () {
            loginPage.homeSectionLogin.click().then(function() {
                console.log("** Click bouton 'se connecter' OK");
                browser.wait(loginPage.isLoginPopupOpen, 5000).then(function() {
                    loginPage.userEmail.click().then(function() {
                        console.log("*** Click input 'Email' OK");
                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.userEmail), 5000).then(function() {
                            loginPage.userEmail.sendKeys(loginPage.userLogin).then(function() {
                                console.log("**** Entrer Email OK");
                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function() {
                                    loginPage.pwd.click().then(function() {
                                        console.log("***** Click input 'Mot de passe' OK");
                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function() {
                                            loginPage.pwd.sendKeys(loginPage.userPwd).then(function() {
                                                console.log("****** Entrer Mot de passe OK");
                                                browser.wait(loginPage.isLogable, 1000).then(function() {
                                                    loginPage.signInPopupButton.click().then(function() {
                                                        console.log("******* Client loggué OK");
                                                        console.log("******** Fin du Test côté client, résultat : OK");
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

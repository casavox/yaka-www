require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');
var InfoCustomer = require('../Customer-variables.js');


describe('The user', function() {
    var loginPage = new LoginPage();
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;

    it('should log in', function() {
        console.log("(((***       login-spec.js       ***)))");
        console.log("* Début du test côté client : connexion");
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLogin), 20000).then(function () {
            loginPage.homeSectionLogin.click().then(function() {
                console.log("** Click bouton 'se connecter' OK");
                browser.wait(loginPage.isLoginPopupOpen, 5000).then(function() {
                    loginPage.userEmail.click().then(function() {
                        console.log("*** Click input 'Email' OK");
                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.userEmail), 5000).then(function() {
                            loginPage.userEmail.sendKeys(infoCustomer.userLogin).then(function() {
                                console.log("**** Entrer Email OK");
                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function() {
                                    loginPage.pwd.click().then(function() {
                                        console.log("***** Click input 'Mot de passe' OK");
                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function() {
                                            loginPage.pwd.sendKeys(infoCustomer.userPwd).then(function() {
                                                console.log("****** Entrer Mot de passe OK");
                                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.signInPopupButton), 1000).then(function() {
                                                    loginPage.signInPopupButton.click().then(function() {
                                                        browser.wait(loginPage.EC.textToBePresentInElement(loginPage.nameHeader, infoCustomer.firstName), 10000).then(function () {
                                                            loginPage.nameHeader.getText().then(function (name) {
                                                                if (name == infoCustomer.firstName) {
                                                                    console.log("******* utilisateur " + name + " loggué OK");
                                                                    console.log("******** Fin du Test côté client, résultat : OK");
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

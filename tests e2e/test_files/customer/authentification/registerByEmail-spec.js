require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('Test Casavox', function () {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;


    it('should register customer by email', function () {
        console.log("* Début du test : inscription client par email");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionRegister), 5000).then(function () {
            loginPage.homeSectionRegister.click().then(function () {
                console.log("- Menu Ajouter contact OK");
                browser.wait(loginPage.EC.elementToBeClickable(loginPage.registerByEmail), 5000).then(function () {
                    loginPage.registerByEmail.click().then(function () {
                        console.log("-- Début remplissage des informations");
                        loginPage.firstName.sendKeys('Grégory').then(function () {
                            console.log("--- Entrer prénom client OK");
                            loginPage.lastName.sendKeys('BIZET').then(function () {
                                console.log("---- Entrer Nom client OK");
                                loginPage.email.sendKeys(loginPage.fakeMail).then(function () {
                                    console.log("----- Entrer email client OK");
                                    loginPage.address.sendKeys('Paris').then(function () {
                                        console.log("------ Entrer ville client OK");
                                        loginPage.password.sendKeys('blabla').then(function () {
                                            console.log("------- Entrer mot de passe client OK");
                                            loginPage.confPassword.sendKeys('blabla').then(function () {
                                                console.log("-------- Confirmer mot de passe client OK");
                                                loginPage.confirmInscription.click().then(function () {
                                                    console.log("--------- Confirm Inscription");
                                                    console.log("---------- Fin du Test, résultat : OK");
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



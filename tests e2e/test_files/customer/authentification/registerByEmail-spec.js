require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');
var InfoCustomer = require('../Customer-variables.js');

describe('Test Casavox', function () {
    var loginPage = new LoginPage();
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;

    it('should register customer by email', function () {
        console.log("(((***       registerByEmail-spec.js       ***)))");
        console.log("* Début du test : inscription client par email");
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionRegister), loginPage.waitMedium).then(function () {
            loginPage.homeSectionRegister.click().then(function () {
                console.log("- Menu Ajouter contact OK");
                browser.wait(loginPage.EC.elementToBeClickable(loginPage.registerByEmail), loginPage.waitMedium).then(function () {
                    loginPage.registerByEmail.click().then(function () {
                        console.log("-- Début remplissage des informations");
                        loginPage.firstName.sendKeys(infoCustomer.firstName).then(function () {
                            console.log("--- Entrer prénom client OK");
                            loginPage.lastName.sendKeys(infoCustomer.lastName).then(function () {
                                console.log("---- Entrer Nom client OK");
                                loginPage.email.sendKeys(infoCustomer.fakeMail).then(function () {
                                    console.log("----- Entrer email client OK");
                                    loginPage.address.sendKeys(infoCustomer.city).then(function () {
                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.address), loginPage.waitMedium).then(function () {
                                            browser.sleep(200);
                                            loginPage.address.sendKeys(protractor.Key.ARROW_DOWN).then(function () {
                                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.address), loginPage.waitMedium).then(function () {
                                                    loginPage.address.sendKeys(protractor.Key.TAB).then(function () {
                                                        console.log("------ Entrer ville client OK");
                                                        loginPage.password.sendKeys(infoCustomer.password).then(function () {
                                                            console.log("------- Entrer mot de passe client OK");
                                                            loginPage.confPassword.sendKeys(infoCustomer.confirmPassword).then(function () {
                                                                console.log("-------- Confirmer mot de passe client OK");
                                                                loginPage.confirmInscription.click().then(function () {
                                                                    browser.wait(loginPage.EC.textToBePresentInElement(loginPage.nameHeader, infoCustomer.firstName), loginPage.waitHigh).then(function () {
                                                                        loginPage.nameHeader.getText().then(function (name) {
                                                                            browser.getTitle().then(function (fullTitle) {
                                                                                var tempTitle = fullTitle.split(" ");
                                                                                var title = tempTitle[0];
                                                                                console.log("[[ Page actuelle : " + title + " ]]");
                                                                                console.log("Nom affiché de l'utilisateur : " + name);
                                                                                if (name == infoCustomer.firstName) {
                                                                                    console.log("Utilisateur Enregistré : " + name);
                                                                                } else {
                                                                                    console.log("!!! ERROR !!! Utilisateur non enregistré !!!")
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
        });
    });
});

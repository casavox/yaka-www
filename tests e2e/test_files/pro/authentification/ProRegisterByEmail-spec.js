require('jasmine-bail-fast');
var LoginPage = require('./pro-login-po.js');
var InfoPro = require('./Pro-variables.js');


describe('Test Casavox', function () {
    var loginPage = new LoginPage();
    var infoPro = new InfoPro();
    browser.ignoreSynchronization = true;


    it('should register customer by email', function () {
        console.log("(((***       ProRegisterByEmail-spec.js       ***)))");
        console.log("* Début du test : inscription pro par email");
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.goProSection), 5000).then(function () {
            loginPage.goProSection.click().then(function () {
                console.log("- Accès page pro OK");
                browser.wait(loginPage.EC.elementToBeClickable(loginPage.firstName), 5000).then(function () {
                    loginPage.firstName.sendKeys(infoPro.firstName).then(function () {
                        console.log("--- Entrer prénom pro OK");
                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.lastName), 5000).then(function () {
                            loginPage.lastName.sendKeys(infoPro.lastName).then(function () {
                                console.log("---- Entrer Nom pro OK");
                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.email), 5000).then(function () {
                                    loginPage.email.sendKeys(infoPro.fakeMail).then(function () {
                                        console.log("----- Entrer email pro OK");
                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.ProAdress), 5000).then(function () {
                                            loginPage.ProAdress.sendKeys(infoPro.city).then(function () {
                                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.ProAdress), 5000).then(function () {
                                                    browser.sleep(200);
                                                    loginPage.ProAdress.sendKeys(protractor.Key.ARROW_DOWN).then(function () {
                                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.ProAdress), 5000).then(function () {
                                                            loginPage.ProAdress.sendKeys(protractor.Key.TAB).then(function () {
                                                                console.log("------ Entrer ville client OK");
                                                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.password), 5000).then(function () {
                                                                    loginPage.password.sendKeys(infoPro.password).then(function () {
                                                                        console.log("------- Entrer mot de passe client OK");
                                                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.confPassword), 5000).then(function () {
                                                                            loginPage.confPassword.sendKeys(infoPro.confirmPassword).then(function () {
                                                                                console.log("-------- Confirmer mot de passe client OK");
                                                                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.ProPhone), 5000).then(function () {
                                                                                    loginPage.ProPhone.sendKeys(infoPro.phoneNumber).then(function () {
                                                                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.selectProDomain), 20000).then(function () {
                                                                                            loginPage.selectProDomain.click().then(function () {
                                                                                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.selectProOneDomain), 5000).then(function () {
                                                                                                    loginPage.selectProOneDomain.click().then(function () {
                                                                                                        console.log("---------- Choix domaine du professionnel 'Serrurerie' OK");
                                                                                                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.selectProDomain), 20000).then(function () {
                                                                                                            loginPage.selectProDomain.click().then(function () {
                                                                                                                browser.wait(loginPage.EC.elementToBeClickable(loginPage.confirmInscription), 20000).then(function () {
                                                                                                                    loginPage.confirmInscription.click().then(function () {
                                                                                                                        browser.wait(loginPage.EC.textToBePresentInElement(loginPage.nameHeader, 'Victor'), 10000).then(function () {
                                                                                                                            loginPage.nameHeader.getText().then(function (name) {
                                                                                                                                if (name == infoPro.firstName) {
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



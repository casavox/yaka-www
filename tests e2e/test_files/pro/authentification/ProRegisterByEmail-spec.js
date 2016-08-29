require('jasmine-bail-fast');
var LoginPage = require('./pro-login-po.js');
var InfoPro = require('../Pro-variables.js');


describe('Test Casavox', function () {
    var loginPage = new LoginPage();
    var infoPro = new InfoPro();
    browser.ignoreSynchronization = true;


    it('should register pro by email', function () {
        console.log("(((***       ProRegisterByEmail-spec.js       ***)))");
        console.log("* Début du test : inscription pro par email");
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.goProSection), 5000).then(function () {
            loginPage.goProSection.click();
            console.log("- Accès page pro OK");
        });
        enterProRegistrationInfos();
        verifyRegistration();


        // Remplissage des informations relatives au professionnel
        function enterProRegistrationInfos() {
            browser.wait(loginPage.EC.elementToBeClickable(loginPage.firstName), 5000).then(function () {
                loginPage.firstName.sendKeys(infoPro.firstName);
                console.log("--- Entrer prénom pro OK");
                loginPage.lastName.sendKeys(infoPro.lastName);
                console.log("---- Entrer Nom pro OK");
                loginPage.email.sendKeys(infoPro.fakeMail);
                console.log("----- Entrer email pro OK");
                loginPage.ProAdress.sendKeys(infoPro.city);
                browser.sleep(200);
                loginPage.ProAdress.sendKeys(protractor.Key.ARROW_DOWN);
                loginPage.ProAdress.sendKeys(protractor.Key.TAB);
                console.log("------ Entrer ville client OK");
                loginPage.password.sendKeys(infoPro.password);
                console.log("------- Entrer mot de passe client OK");
                loginPage.confPassword.sendKeys(infoPro.confirmPassword);
                console.log("-------- Confirmer mot de passe client OK");
                loginPage.ProPhone.sendKeys(infoPro.phoneNumber);
                browser.wait(loginPage.EC.elementToBeClickable(loginPage.selectProDomain), 20000).then(function () {
                    loginPage.selectProDomain.click().then(function () {
                        browser.wait(loginPage.EC.elementToBeClickable(loginPage.selectProOneDomain), 5000).then(function () {
                            loginPage.selectProOneDomain.click();
                            console.log("---------- Choix domaine du professionnel 'Serrurerie' OK");
                            browser.wait(loginPage.EC.elementToBeClickable(loginPage.selectProDomain), 20000).then(function () {
                                loginPage.selectProDomain.click();
                            });
                        });
                    });
                });
            });
        }


        // Verification de l'inscription
        function verifyRegistration() {
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
        }
    });
});


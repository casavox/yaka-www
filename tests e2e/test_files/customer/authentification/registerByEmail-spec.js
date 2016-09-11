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
            loginPage.homeSectionRegister.click();
            browser.wait(loginPage.EC.elementToBeClickable(loginPage.registerByEmail), loginPage.waitMedium).then(function () {
                loginPage.registerByEmail.click().then(fillInfos(), function (err) {
                    console.log(err);
                });
                loginPage.confirmInscription.click().then(verifyURL(), function (err) {
                    console.log(err);
                    console.log("Impossible d'enregistrer l'utilisateur");
                });
            });
        });


        // Remplissage des informations de l'utilisatzeur à enregistrer
        function fillInfos() {
            loginPage.firstName.sendKeys(infoCustomer.firstName);
            loginPage.lastName.sendKeys(infoCustomer.lastName);
            loginPage.email.sendKeys(infoCustomer.fakeMail);
            loginPage.address.sendKeys(infoCustomer.city);
            browser.wait(loginPage.EC.elementToBeClickable(loginPage.address), loginPage.waitMedium).then(function () {
                browser.sleep(200);
                loginPage.address.sendKeys(protractor.Key.ARROW_DOWN);
                browser.wait(loginPage.EC.elementToBeClickable(loginPage.address), loginPage.waitMedium).then(function () {
                    loginPage.address.sendKeys(protractor.Key.TAB);
                    loginPage.password.sendKeys(infoCustomer.password);
                    loginPage.confPassword.sendKeys(infoCustomer.confirmPassword);
                });
            });
        }


        // Vérification de la page d'arrivée et du prénom utilisateur
        function verifyURL() {
            browser.wait(loginPage.EC.textToBePresentInElement(loginPage.nameHeader, infoCustomer.firstName), loginPage.waitHigh).then(function () {
                loginPage.nameHeader.getText().then(function (name) {
                    browser.getTitle().then(function (fullTitle) {
                        var tempTitle = fullTitle.split(" ");
                        var title = tempTitle[0];
                        console.log("[[ Page actuelle : " + title + " ]]");
                        console.log("Nom affiché de l'utilisateur : " + name);
                        if (name == infoCustomer.firstName) {
                            console.log("******* utilisateur " + name + " loggué OK");
                            console.log("******** Fin résultat : OK");
                        }
                        else {
                            console.log("!!! ERROR !!! Utilisateur non loggué !!!");
                        }
                    });
                });
            });
        }
    });
});


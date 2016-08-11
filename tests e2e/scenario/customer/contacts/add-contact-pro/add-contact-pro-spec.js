require('jasmine-bail-fast');
var AddProContactPage = require('./add-contact-pro-po.js');

describe('This test', function () {
    var addProContactPage = new AddProContactPage();
    var APCPage = addProContactPage;
    browser.ignoreSynchronization = true;


    it('should add a Pro (FAMILY) contact', function () {
        console.log("- Début du test : ajouter professionnel (FAMILLE)");

        browser.wait(APCPage.EC.elementToBeClickable(APCPage.menuMyContacts), 20000).then(function () {
            APCPage.menuMyContacts.click();
            console.log("-- Menu Contacts OK");
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.addProButton), 20000).then(function () {
            APCPage.addProButton.click();
            console.log("--- Click bouton 'ajouter un pro' OK");
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProFirstName), 20000).then(function () {
            APCPage.enterProFirstName.sendKeys("Pierre");
            console.log("---- Entrer Prénom OK");
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProLastName), 20000).then(function () {
            APCPage.enterProLastName.sendKeys("Paul");
            console.log("----- Entrer Nom OK");
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProPhone), 20000).then(function () {
            APCPage.enterProPhone.sendKeys("0123456789");
            console.log("------ Entrer numéro de téléphone OK");
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProEmail), 20000).then(function () {
            APCPage.enterProEmail.sendKeys(APCPage.fakeMail);
            console.log("------- Entrer Email OK")
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), 20000).then(function () {
            APCPage.enterProAddress.sendKeys("Paris");
            browser.sleep(APCPage.wait4Anim);
            APCPage.enterProAddress.sendKeys(protractor.Key.ARROW_DOWN);
            browser.sleep(APCPage.wait4Anim);
            APCPage.enterProAddress.sendKeys(protractor.Key.TAB);
            console.log("-------- Choix adresse OK");
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProRelation), 20000).then(function () {
            APCPage.selectProRelation.click();
            console.log("--------- Choix Relation 'Famille' OK");

        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), 20000).then(function () {
            APCPage.selectProDomain.click();
            APCPage.selectProOneDomain.click();
            console.log("---------- Choix domaine du professionnel 'Serrurerie' OK");
        });
        browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), 20000).then(function () {
            APCPage.selectProDomain.click();
            browser.sleep(500);
            APCPage.sendEmailToPro.click();
            console.log("----------- Envoi Email au professionnel OK");
            console.log("------------ Fin du Test, résultat : OK");
        });
    });
});

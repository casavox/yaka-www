require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('The user', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should publish a new project', function () {
        console.log("- Début du test : Modifier description du projet");


        browser.wait(projectPage.EC.elementToBeClickable(projectPage.menuNewProject), 20000).then(function () {
            projectPage.menuNewProject.click();
            console.log("-- Click bouton 'Publier un projet' OK");
        });
        browser.sleep(projectPage.wait4Anim);
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.activityMulti), 5000).then(function () {
            projectPage.activityMulti.click();
            console.log("--- Click catégorie 'Multi' OK");
        });

        // Slide Description
        browser.sleep(projectPage.wait4Anim);
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.materialYes), 5000).then(function () {
            projectPage.materialYes.click();
            console.log("---- Click Matériel fourni 'oui' OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.projectDescription), 20000).then(function () {
            projectPage.projectDescription.sendKeys("Desc too short : Ko");
            console.log("----- Entrer description OK");
            projectPage.projectDescription.clear();
            console.log("------ Suppression description OK");
            projectPage.projectDescription.sendKeys("Protractor TEST --> Description so long  : Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST ");
            console.log("------- Entrer nouvelle description OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.descriptionOkBt), 5000).then(function () {
            projectPage.descriptionOkBt.click();
            console.log("-------- Click bouton 'valider description' OK");
        });

        // Slide Photo
        browser.sleep(projectPage.wait4Anim).then(function() {
            projectPage.photoSlide_Next.click();
            console.log("--------- Click bouton 'suivant' photo OK");
        });

        browser.wait(projectPage.EC.elementToBeClickable(projectPage.photoSlide_NoPhotoConfirm), 5000).then(function () {
            projectPage.photoSlide_NoPhotoConfirm.click();
            console.log("---------- Click bouton 'confirmer suivant sans photo' OK");
        });


        // Slide Address
        browser.sleep(projectPage.wait4Anim); // because of animated slide
        projectPage.address_NewOne.click().then(function() {
            console.log("----------- Click bouton 'ajouter nouvelle adresse' OK");
        });
        projectPage.addressName.sendKeys("Test CasaVox");
        projectPage.addressLocation.sendKeys("paris").then(function () {
            projectPage.address_Next.click();
            console.log("------------ Click bouton 'suivant' OK");
        });

        projectPage.addressLocation.clear();
        projectPage.addressLocation.sendKeys("paris");
        browser.sleep(projectPage.wait4Anim);
        projectPage.addressLocation.sendKeys(protractor.Key.ARROW_DOWN);
        browser.sleep(projectPage.wait4Anim);
        projectPage.addressLocation.sendKeys(protractor.Key.TAB);
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.address_Next), 20000).then(function () {
            projectPage.address_Next.click();
            console.log("------------- Suppression adresse inscrite OK");
            console.log("-------------- Insertion d'une nouvelle adresse avec autocomplétion OK");
            console.log("--------------- click 'valider adresse' OK");
        });

        // Slide Date
        browser.sleep(projectPage.wait4Anim).then(function () {projectPage.selectDateType.click();}).then(function() {
            console.log("---------------- Selection de la date OK");
        });

        // Publish !
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.publishButton), 5000).then(function () {
            projectPage.publishButton.click();
            console.log("----------------- Click bouton 'Publier le projet' OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.confirmPublish), 5000).then(function () {
            projectPage.confirmPublish.click();
            console.log("------------------ Click bouton 'Confirmer la publication du projet' OK");
            console.log("------------------- Fin du Test, résultat : OK");
        });
    });

});

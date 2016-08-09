require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('This user', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should modify one project', function () {
        console.log("- Début du test : Modifier description du projet");

        browser.wait(projectPage.EC.elementToBeClickable(projectPage.menuMyProjects), 20000).then(function () {
            projectPage.menuMyProjects.click();
            console.log("-- Click bouton 'mes projets' OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.firstProject), 20000).then(function () {
            projectPage.firstProject.click();
            console.log("--- Click sélection premier projet OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.seeProject), 20000).then(function () {
            projectPage.seeProject.click();
            console.log("---- Click bouton 'voir détails projet' OK");
        });
        browser.wait(projectPage.EC.presenceOf(projectPage.newModifiedText), 20000).then(function () {
            projectPage.newModifiedText.getText().then(function (txt) {
                console.log("----- Récupération du text non modifié OK");
            });
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.modifyButton), 20000).then(function () {
            projectPage.modifyButton.click();
            console.log("------ Click bouton 'modifier' OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.modifyProjectDescription), 20000).then(function () {
            projectPage.modifyProjectDescription.sendKeys(" " + projectPage.todayDate);
            dateToCompare = projectPage.todayDate;
            console.log("------- Entrer nouvelle description OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.saveModification), 20000).then(function () {
            projectPage.saveModification.click();
            console.log("--------- Click bouton 'enregistrer' OK");
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.saveConfirm), 5000).then(function () {
            browser.sleep(1000);
            projectPage.saveConfirm.click();
            console.log("----------- Sauvegarde modification OK");
        });
        browser.wait(projectPage.EC.presenceOf(projectPage.newModifiedText), 5000).then(function () {
            projectPage.newModifiedText.getText().then(function (txt) {
                textToCompare = txt;
                endTextToCompare = textToCompare.slice(- dateToCompare.length);
                if (endTextToCompare == dateToCompare) {
                    console.log("------------- Correspondance entre les deux dates OK");
                } else {
                    console.log("------------- LES DATES NE CORRESPONDENT PAS");
                }
                console.log("-------------- Fin du Test, résultat : OK");
            });
        });
    });
})
;

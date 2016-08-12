require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('This user', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should modify one project', function () {
        console.log("(((***       project-modif-spec.js       ***)))");
        console.log("- Début du test : Modifier description du projet");

        browser.wait(projectPage.EC.elementToBeClickable(projectPage.menuMyProjects), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--menuMyProjects--)").then(function () {
            projectPage.menuMyProjects.click().then(function() {
                console.log("-- Click bouton 'mes projets' OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.firstProject), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--firstProject--)").then(function () {
                    projectPage.firstProject.click().then(function() {
                        console.log("--- Click sélection premier projet OK");
                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.seeProject), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--seeProject--)").then(function () {
                            projectPage.seeProject.click().then(function() {
                                console.log("---- Click bouton 'voir détails projet' OK");
                            });
                        });
                    });
                });
            });
        });

        browser.wait(projectPage.EC.elementToBeClickable(projectPage.modifyButton), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--modifyButton--)").then(function () {
            projectPage.modifyButton.click().then(function() {
                console.log("------ Click bouton 'modifier' OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.modifyProjectDescription), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--modifyProjectDescription--)").then(function () {
                    projectPage.modifyProjectDescription.sendKeys(" " + projectPage.todayDate).then(function() {
                        dateToCompare = projectPage.todayDate;
                        console.log("------- Entrer nouvelle description OK");
                    });
                });
            });
        });

        browser.wait(projectPage.EC.elementToBeClickable(projectPage.saveModification), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--saveModification--)").then(function () {
            projectPage.saveModification.click().then(function() {
                console.log("--------- Click bouton 'enregistrer' OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.saveConfirm), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--saveConfirm--)").then(function () {
                    browser.sleep(projectPage.wait4Anim).then(function() {
                        projectPage.saveConfirm.click().then(function() {
                            console.log("----------- Sauvegarde modification OK");
                        });
                    });
                });
            });
        });

        browser.wait(projectPage.EC.presenceOf(projectPage.newModifiedText), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "presenceOf(--newModifiedText--)").then(function () {
            projectPage.newModifiedText.getText().then(function (txt) {
                textToCompare = txt;
                endTextToCompare = textToCompare.slice(- dateToCompare.length);
                if (endTextToCompare == dateToCompare) {
                    console.log("------------- Correspondance entre les deux dates : " + endTextToCompare + " et " + dateToCompare + " OK");
                } else {
                    console.log("------------- LES DATES NE CORRESPONDENT PAS : " + endTextToCompare + " et " + dateToCompare);
                }
                console.log("-------------- Fin du Test, résultat : OK");
            });
        });
    });
})
;

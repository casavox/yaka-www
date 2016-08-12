require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('The user', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should publish a new project', function () {
        console.log("(((***       project-creation-spec.js       ***)))");
        console.log("- Début du test : Modifier description du projet");

        browser.wait(projectPage.EC.elementToBeClickable(projectPage.menuNewProject), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--menuNewProject--)").then(function () {
            projectPage.menuNewProject.click().then(function () {
                console.log("-- Click bouton 'Publier un projet' OK");
                //browser.sleep(projectPage.wait4Anim).then(function () {
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.activityMulti), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--activityMulti--)").then(function () {
                    projectPage.activityMulti.click().then(function () {
                        console.log("--- Click catégorie 'Multi' OK");
                        // Slide Description
                        browser.sleep(projectPage.wait4Anim).then(function () {
                            browser.wait(projectPage.EC.elementToBeClickable(projectPage.materialYes), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--materialYes--)").then(function () {
                                projectPage.materialYes.click().then(function () {
                                    console.log("---- Click Matériel fourni 'oui' OK");
                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.projectDescription), projectPage.waitHigh, "Timeout : " + projectPage.waitHigh + " in " + "elementToBeClickable(--projectDescription--)").then(function () {
                                        projectPage.projectDescription.sendKeys("Desc too short : Ko").then(function () {
                                            console.log("----- Entrer description OK");
                                            projectPage.projectDescription.clear().then(function () {
                                                console.log("------ Suppression description OK");
                                                projectPage.projectDescription.sendKeys("Protractor TEST --> Description so long  : Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST ").then(function () {
                                                    console.log("------- Entrer nouvelle description OK");
                                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.descriptionOkBt), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--descriptionOkBt--)").then(function () {
                                                        projectPage.descriptionOkBt.click().then(function () {
                                                            console.log("-------- Click bouton 'valider description' OK");
                                                            // Slide Photo
                                                            browser.sleep(projectPage.wait4Anim).then(function () {
                                                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.photoSlide_Next), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--photoSlide_Next--)").then(function () {
                                                                    projectPage.photoSlide_Next.click().then(function () {
                                                                        console.log("--------- Click bouton 'suivant' photo OK");
                                                                        browser.sleep(projectPage.wait4Anim).then(function () {
                                                                            browser.wait(projectPage.EC.elementToBeClickable(projectPage.photoSlide_NoPhotoConfirm), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--photoSlide_NoPhotoConfirm--)").then(function () {
                                                                                projectPage.photoSlide_NoPhotoConfirm.click().then(function () {
                                                                                    console.log("---------- Click bouton 'confirmer suivant sans photo' OK");
                                                                                    // Slide Address
                                                                                    browser.sleep(projectPage.wait4Anim).then(function () {
                                                                                        projectPage.address_NewOne.click().then(function () {
                                                                                            console.log("----------- Click bouton 'ajouter nouvelle adresse' OK");
                                                                                            browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressName), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--addressName--)").then(function () {
                                                                                                projectPage.addressName.sendKeys("Test CasaVox").then(function () {
                                                                                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--addressLocation--)").then(function () {
                                                                                                        projectPage.addressLocation.sendKeys("paris").then(function () {
                                                                                                            projectPage.address_Next.click().then(function () {
                                                                                                                console.log("------------ Click bouton 'suivant' OK");
                                                                                                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--addressLocation--)").then(function () {
                                                                                                                    projectPage.addressLocation.clear().then(function () {
                                                                                                                        console.log("------------- Suppression adresse inscrite OK");
                                                                                                                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--addressLocation--)").then(function () {
                                                                                                                            projectPage.addressLocation.sendKeys("paris").then(function () {
                                                                                                                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--addressLocation--)").then(function () {
                                                                                                                                    projectPage.addressLocation.sendKeys(protractor.Key.ARROW_DOWN).then(function () {
                                                                                                                                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--addressLocation--)").then(function () {
                                                                                                                                            projectPage.addressLocation.sendKeys(protractor.Key.TAB).then(function () {
                                                                                                                                                console.log("-------------- Insertion d'une nouvelle adresse avec autocomplétion OK");
                                                                                                                                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.address_Next), projectPage.waitHigh, "Timeout : " + projectPage.waitHigh + " in " + "elementToBeClickable(--address_Next--)").then(function () {
                                                                                                                                                    projectPage.address_Next.click().then(function () {
                                                                                                                                                        console.log("--------------- click 'valider adresse' OK");
                                                                                                                                                        // Slide Date
                                                                                                                                                        browser.sleep(projectPage.wait4Anim).then(function () {
                                                                                                                                                            projectPage.selectDateType.click().then(function () {
                                                                                                                                                                console.log("---------------- Selection de la date OK");
                                                                                                                                                                // Publish !
                                                                                                                                                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.publishButton), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--publishButton--)").then(function () {
                                                                                                                                                                    projectPage.publishButton.click().then(function () {
                                                                                                                                                                        console.log("----------------- Click bouton 'Publier le projet' OK");
                                                                                                                                                                        browser.wait(projectPage.EC.visibilityOf(projectPage.bottomAlert), projectPage.waitHigh, "Timeout : " + projectPage.waitHigh + " in " + "visibilityOf(--bottomAlert--)").then(function () {
                                                                                                                                                                            projectPage.bottomAlert.getText().then(function (result) {
                                                                                                                                                                                var alertMsg = result.slice(2);
                                                                                                                                                                                console.log("Alerte : " + alertMsg);

                                                                                                                                                                                // Todo suite procédure quand le projet est bien créé
                                                                                                                                                                                if (alertMsg == 'Projet Créé') {
                                                                                                                                                                                    console.log("------ Envoi Email à l'ami OK");
                                                                                                                                                                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.confirmPublish), projectPage.waitHigh, "Timeout : " + projectPage.High + " in " + "elementToBeClickable(--confirmPublish--)").then(function () {
                                                                                                                                                                                        projectPage.confirmPublish.click().then(function () {
                                                                                                                                                                                            console.log("------------------ Click bouton 'Confirmer la publication du projet' OK");
                                                                                                                                                                                            browser.sleep(1).then(function () {
                                                                                                                                                                                                browser.getTitle().then(function (fullTitle) {
                                                                                                                                                                                                    var tempTitle = fullTitle.split(" ");
                                                                                                                                                                                                    var title = tempTitle[0];
                                                                                                                                                                                                    console.log("[[ Page actuelle : " + title + " ]]");
                                                                                                                                                                                                    console.log("------- Fin du Test, résultat : OK");
                                                                                                                                                                                                });
                                                                                                                                                                                            });
                                                                                                                                                                                        });
                                                                                                                                                                                    });
                                                                                                                                                                                }
                                                                                                                                                                                else if (alertMsg == 'Error : Impossible de publier le projet') {
                                                                                                                                                                                    console.log("------ !! ECHEC !! CREATION PROJET !! ECHEC !!");
                                                                                                                                                                                    browser.wait(projectPage.EC.visibilityOf(projectPage.closeAlertMsg), projectPage.waitHigh, "Timeout : " + projectPage.waitHigh + " in " + "visibilityOf(--closeAlertMsg--)").then(function () {
                                                                                                                                                                                        projectPage.closeAlertMsg.click().then(function () {
                                                                                                                                                                                                console.log("------- Fin du Test, résultat : ECHEC");
                                                                                                                                                                                        });
                                                                                                                                                                                    });
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
})
;

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
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.activityGet), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--activityGet--)").then(function () {
                    projectPage.activityGet.click().then(function () {
                        console.log("--- Click catégorie 'Construction' OK");
                        browser.sleep(projectPage.wait4Anim).then(function () {
                            browser.wait(projectPage.EC.elementToBeClickable(projectPage.activityObjectif), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--activityObjectif--)").then(function () {
                                projectPage.activityObjectif.click().then(function () {
                                    // Slide Description
                                    browser.sleep(projectPage.wait4Anim).then(function () {
                                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.materialYes), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--materialYes--)").then(function () {
                                            projectPage.materialYes.click().then(function () {
                                                console.log("---- Click Matériel fourni 'oui' OK");
                                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.projectDescription), projectPage.waitHigh, "Timeout : " + projectPage.waitHigh + " in " + "elementToBeClickable(--projectDescription--)").then(function () {
                                                    projectPage.projectDescription.sendKeys(projectPage.descriptionShortTxt).then(function () {
                                                        console.log("----- Entrer description OK");
                                                        projectPage.projectDescription.clear().then(function () {
                                                            console.log("------ Suppression description OK");
                                                            projectPage.projectDescription.sendKeys(projectPage.descriptionText).then(function () {
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
                                                                                                                                                                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.confirmPublish), projectPage.waitHigh, "Timeout : " + projectPage.High + " in " + "elementToBeClickable(--confirmPublish--)").then(function () {
                                                                                                                                                                                        projectPage.confirmPublish.click().then(function () {
                                                                                                                                                                                            console.log("------------------ Click bouton 'Confirmer la publication du projet' OK");
                                                                                                                                                                                            browser.sleep(1).then(function () {
                                                                                                                                                                                                browser.getTitle().then(function (fullTitle) {
                                                                                                                                                                                                    var tempTitle = fullTitle.split(" ");
                                                                                                                                                                                                    var title = tempTitle[0];
                                                                                                                                                                                                    console.log("[[ Page actuelle, projet de " + title + " ]]");
                                                                                                                                                                                                    console.log("------- Fin du Test, résultat : OK");
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
                    });
                });
            });
        });
    });
});


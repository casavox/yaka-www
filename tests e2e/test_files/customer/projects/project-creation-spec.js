require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('The user', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should publish a new project', function () {
        console.log("- Début du test : Modifier description du projet");


        browser.wait(projectPage.EC.elementToBeClickable(projectPage.menuNewProject), 20000).then(function () {
            projectPage.menuNewProject.click().then(function () {
                console.log("-- Click bouton 'Publier un projet' OK");
                browser.sleep(projectPage.wait4Anim).then(function () {
                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.activityMulti), 5000).then(function () {
                        projectPage.activityMulti.click().then(function () {
                            console.log("--- Click catégorie 'Multi' OK");
                        });
                    });
                });
            });
        });


        // Slide Description
        browser.sleep(projectPage.wait4Anim).then(function () {
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.materialYes), 5000).then(function () {
                projectPage.materialYes.click().then(function () {
                    console.log("---- Click Matériel fourni 'oui' OK");
                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.projectDescription), 20000).then(function () {
                        projectPage.projectDescription.sendKeys("Desc too short : Ko").then(function () {
                            console.log("----- Entrer description OK");
                            projectPage.projectDescription.clear().then(function () {
                                console.log("------ Suppression description OK");
                                projectPage.projectDescription.sendKeys("Protractor TEST --> Description so long  : Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST ").then(function () {
                                    console.log("------- Entrer nouvelle description OK");
                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.descriptionOkBt), 5000).then(function () {
                                        projectPage.descriptionOkBt.click().then(function () {
                                            console.log("-------- Click bouton 'valider description' OK");
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });


        // Slide Photo
        browser.sleep(projectPage.wait4Anim).then(function () {
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.photoSlide_Next), 5000).then(function () {
                projectPage.photoSlide_Next.click().then(function () {
                    console.log("--------- Click bouton 'suivant' photo OK");
                    browser.sleep(projectPage.wait4Anim).then(function () {
                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.photoSlide_NoPhotoConfirm), 5000).then(function () {
                            projectPage.photoSlide_NoPhotoConfirm.click().then(function () {
                                console.log("---------- Click bouton 'confirmer suivant sans photo' OK");
                            });
                        });
                    });
                });
            });
        });


        // Slide Address
        browser.sleep(projectPage.wait4Anim).then(function () {
            projectPage.address_NewOne.click().then(function () {
                console.log("----------- Click bouton 'ajouter nouvelle adresse' OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressName), 5000).then(function () {
                    projectPage.addressName.sendKeys("Test CasaVox").then(function () {
                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), 5000).then(function () {
                            projectPage.addressLocation.sendKeys("paris").then(function () {
                                projectPage.address_Next.click().then(function () {
                                    console.log("------------ Click bouton 'suivant' OK");
                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), 5000).then(function () {
                                        projectPage.addressLocation.clear().then(function () {
                                            console.log("------------- Suppression adresse inscrite OK");
                                            browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), 5000).then(function () {
                                                projectPage.addressLocation.sendKeys("paris").then(function () {
                                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), 5000).then(function () {
                                                        projectPage.addressLocation.sendKeys(protractor.Key.ARROW_DOWN).then(function () {
                                                            browser.wait(projectPage.EC.elementToBeClickable(projectPage.addressLocation), 5000).then(function () {
                                                                projectPage.addressLocation.sendKeys(protractor.Key.TAB).then(function () {
                                                                    console.log("-------------- Insertion d'une nouvelle adresse avec autocomplétion OK");
                                                                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.address_Next), 20000).then(function () {
                                                                        projectPage.address_Next.click().then(function () {
                                                                            console.log("--------------- click 'valider adresse' OK");
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


        // Slide Date
        browser.sleep(projectPage.wait4Anim).then(function () {
            projectPage.selectDateType.click().then(function () {
                console.log("---------------- Selection de la date OK");
            });
        });

        // Publish !
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.publishButton), 5000).then(function () {
            projectPage.publishButton.click().then(function () {
                console.log("----------------- Click bouton 'Publier le projet' OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.confirmPublish), 5000).then(function () {
                    projectPage.confirmPublish.click().then(function() {
                        console.log("------------------ Click bouton 'Confirmer la publication du projet' OK");
                        console.log("------------------- Fin du Test, résultat : OK");
                    });
                });
            });
        });
    });
})
;

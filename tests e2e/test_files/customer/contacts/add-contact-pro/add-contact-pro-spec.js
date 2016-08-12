require('jasmine-bail-fast');
var AddProContactPage = require('./add-contact-pro-po.js');
var InfoCustomer = require('../../Customer-variables.js');

describe('This test', function () {
    var addProContactPage = new AddProContactPage();
    var APCPage = addProContactPage;
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;


    it('should add a Pro (FAMILY) contact', function () {
        console.log("(((***       add-contact-pro-spec.js       ***)))");
        console.log("- Début du test : ajouter professionnel (FAMILLE)");

        browser.wait(APCPage.EC.elementToBeClickable(APCPage.menuMyContacts), projectPage.waitMedium, "Timeout : " + projectPage.waitMedium + " in " + "elementToBeClickable(--activityMulti--)").then(function () {
            APCPage.menuMyContacts.click().then(function () {
                console.log("-- Menu Contacts OK");
                browser.wait(APCPage.EC.elementToBeClickable(APCPage.addProButton), APCPage.waitHigh).then(function () {
                    APCPage.addProButton.click().then(function () {
                        console.log("--- Click bouton 'ajouter un pro' OK");
                    });
                });
            });
        });

        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProFirstName), APCPage.waitHigh).then(function () {
            APCPage.enterProFirstName.sendKeys(infoCustomer.ProfirstName).then(function () {
                console.log("---- Entrer Prénom OK");
                browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProLastName), APCPage.waitHigh).then(function () {
                    APCPage.enterProLastName.sendKeys(infoCustomer.ProlastName).then(function () {
                        console.log("----- Entrer Nom OK");
                        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProPhone), APCPage.waitHigh).then(function () {
                            APCPage.enterProPhone.sendKeys(infoCustomer.ProphoneNumber).then(function () {
                                console.log("------ Entrer numéro de téléphone OK");
                                browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProEmail), APCPage.waitHigh).then(function () {
                                    APCPage.enterProEmail.sendKeys(infoCustomer.fakeProMail).then(function () {
                                        console.log("------- Entrer Email OK");
                                        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), APCPage.waitHigh).then(function () {
                                            APCPage.enterProAddress.sendKeys(infoCustomer.Procity).then(function () {
                                                browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), APCPage.waitMedium).then(function () {
                                                    browser.sleep(200).then(function () {
                                                        APCPage.enterProAddress.sendKeys(protractor.Key.ARROW_DOWN).then(function () {
                                                            browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), APCPage.waitMedium).then(function () {
                                                                APCPage.enterProAddress.sendKeys(protractor.Key.TAB).then(function () {
                                                                    console.log("-------- Choix adresse OK");
                                                                    browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProRelation), APCPage.waitHigh).then(function () {
                                                                        console.log("--------- Choix Relation 'Famille' OK");
                                                                        APCPage.selectProRelation.click().then(function () {
                                                                            browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), APCPage.waitHigh).then(function () {
                                                                                APCPage.selectProDomain.click().then(function () {
                                                                                    APCPage.selectProOneDomain.click().then(function () {
                                                                                        console.log("---------- Choix domaine du professionnel 'Serrurerie' OK");
                                                                                        browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), APCPage.waitHigh).then(function () {
                                                                                            APCPage.selectProDomain.click().then(function () {
                                                                                                browser.wait(APCPage.EC.elementToBeClickable(APCPage.sendEmailToPro), APCPage.waitHigh).then(function () {
                                                                                                    APCPage.sendEmailToPro.click().then(function () {
                                                                                                        browser.wait(APCPage.EC.visibilityOf(APCPage.bottomAlert), APCPage.waitHigh).then(function () {
                                                                                                            APCPage.bottomAlert.getText().then(function (result) {
                                                                                                                var alertMsg = result.slice(2);
                                                                                                                console.log("Le message contenu dans l'alerte est : " + alertMsg);
                                                                                                                if (alertMsg == 'Invitation envoyée') {
                                                                                                                    console.log("----------- Envoi Email au professionnel OK");
                                                                                                                    browser.sleep(1).then(function() {
                                                                                                                        browser.getTitle().then(function (fullTitle) {
                                                                                                                            var tempTitle = fullTitle.split(" ");
                                                                                                                            var title = tempTitle[0] + " " + tempTitle[1];
                                                                                                                            console.log("[[ Page actuelle : " + title + " ]]");
                                                                                                                            console.log("------------ Fin du Test, résultat : OK");
                                                                                                                        });
                                                                                                                    });
                                                                                                                }
                                                                                                                else if (alertMsg == 'Vous avez déjà invité cette personne') {
                                                                                                                    console.log("----------- !! ECHEC !! Envoi Email au professionnel !! ECHEC !!");
                                                                                                                    browser.wait(APCPage.EC.visibilityOf(APCPage.closeAlertMsg), APCPage.waitHigh).then(function () {
                                                                                                                        APCPage.closeAlertMsg.click().then(function() {
                                                                                                                            browser.wait(APCPage.EC.visibilityOf(APCPage.closePopupReg), APCPage.waitHigh).then(function () {
                                                                                                                                APCPage.closePopupReg.click().then(function() {
                                                                                                                                    browser.getTitle().then(function (fullTitle) {
                                                                                                                                        var tempTitle = fullTitle.split(" ");
                                                                                                                                        var title = tempTitle[0] + " " +tempTitle[1];
                                                                                                                                        console.log("[[ Page actuelle : " + title + " ]]");
                                                                                                                                        console.log("------------ Fin du Test, résultat : ECHEC");
                                                                                                                                    });
                                                                                                                                });
                                                                                                                            });
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


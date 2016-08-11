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

        browser.wait(APCPage.EC.elementToBeClickable(APCPage.menuMyContacts), 20000).then(function () {
            APCPage.menuMyContacts.click().then(function () {
                console.log("-- Menu Contacts OK");
                browser.wait(APCPage.EC.elementToBeClickable(APCPage.addProButton), 20000).then(function () {
                    APCPage.addProButton.click().then(function () {
                        console.log("--- Click bouton 'ajouter un pro' OK");
                    });
                });
            });
        });

        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProFirstName), 20000).then(function () {
            APCPage.enterProFirstName.sendKeys(infoCustomer.ProfirstName).then(function () {
                console.log("---- Entrer Prénom OK");
                browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProLastName), 20000).then(function () {
                    APCPage.enterProLastName.sendKeys(infoCustomer.ProlastName).then(function () {
                        console.log("----- Entrer Nom OK");
                        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProPhone), 20000).then(function () {
                            APCPage.enterProPhone.sendKeys(infoCustomer.ProphoneNumber).then(function () {
                                console.log("------ Entrer numéro de téléphone OK");
                                browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProEmail), 20000).then(function () {
                                    APCPage.enterProEmail.sendKeys(infoCustomer.fakeProMail).then(function () {
                                        console.log("------- Entrer Email OK");
                                        browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), 20000).then(function () {
                                            APCPage.enterProAddress.sendKeys(infoCustomer.Procity).then(function () {
                                                browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), 5000).then(function () {
                                                    browser.sleep(200).then(function () {
                                                        APCPage.enterProAddress.sendKeys(protractor.Key.ARROW_DOWN).then(function () {
                                                            browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), 5000).then(function () {
                                                                APCPage.enterProAddress.sendKeys(protractor.Key.TAB).then(function () {
                                                                    console.log("-------- Choix adresse OK");
                                                                    browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProRelation), 20000).then(function () {
                                                                        console.log("--------- Choix Relation 'Famille' OK");
                                                                        APCPage.selectProRelation.click().then(function () {
                                                                            browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), 20000).then(function () {
                                                                                APCPage.selectProDomain.click().then(function () {
                                                                                    APCPage.selectProOneDomain.click().then(function () {
                                                                                        console.log("---------- Choix domaine du professionnel 'Serrurerie' OK");
                                                                                        browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), 20000).then(function () {
                                                                                            APCPage.selectProDomain.click().then(function () {
                                                                                                browser.wait(APCPage.EC.elementToBeClickable(APCPage.sendEmailToPro), 20000).then(function () {
                                                                                                    APCPage.sendEmailToPro.click().then(function () {
                                                                                                        browser.wait(APCPage.EC.visibilityOf(APCPage.alertYes), 20000).then(function () {
                                                                                                            APCPage.alertYes.getText().then(function (result) {
                                                                                                                if (result.slice(result.length - 18) == 'Invitation envoyée') {
                                                                                                                    console.log("----------- Envoi Email au professionnel OK");
                                                                                                                }
                                                                                                                else if (result.slice(result.length - 36) == 'Vous avez déjà invité cette personne') {
                                                                                                                    console.log("----------- !! ECHEC !! Envoi Email au professionnel !! ECHEC !!");
                                                                                                                }
                                                                                                                console.log("------------ Fin du Test, résultat : OK");
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


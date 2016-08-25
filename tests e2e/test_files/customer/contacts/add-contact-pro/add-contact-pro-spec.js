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

        browser.wait(APCPage.EC.elementToBeClickable(APCPage.menuMyContacts), APCPage.waitMedium, "Timeout : " + APCPage.waitMedium + " in " + "elementToBeClickable(--activityMulti--)").then(function () {
            APCPage.menuMyContacts.click();
            browser.wait(APCPage.EC.elementToBeClickable(APCPage.addProButton), APCPage.waitHigh).then(function () {
                APCPage.addProButton.click();
            });
        });
        fillProInfos();

        //verificationEmailSent();


        //Remplissage des informations
        function fillProInfos() {
            browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProFirstName), APCPage.waitHigh).then(function () {
                APCPage.enterProFirstName.sendKeys(infoCustomer.ProfirstName);
                APCPage.enterProLastName.sendKeys(infoCustomer.ProlastName);
                APCPage.enterProPhone.sendKeys(infoCustomer.ProphoneNumber);
                APCPage.enterProEmail.sendKeys(infoCustomer.fakeProMail);
                APCPage.enterProAddress.sendKeys(infoCustomer.Procity);
                browser.sleep(200).then(function () {
                    APCPage.enterProAddress.sendKeys(protractor.Key.ARROW_DOWN);
                    browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), APCPage.waitMedium).then(function () {
                        APCPage.enterProAddress.sendKeys(protractor.Key.TAB);
                    });
                });

            });
            browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProRelation), APCPage.waitHigh).then(function () {
                APCPage.selectProRelation.click();
                browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), APCPage.waitHigh).then(function () {
                    APCPage.selectProDomain.click();
                    APCPage.selectProOneDomain.click();
                    browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), APCPage.waitHigh).then(function () {
                        APCPage.selectProDomain.click().then(function() {
                            APCPage.sendEmailToPro.click();
                        });
                    });
                });
            });
        }

        //Vérification de l'envoi de l'email au professionnel
        function verificationEmailSent() {
            browser.wait(APCPage.EC.visibilityOf(APCPage.bottomAlert), APCPage.waitHigh).then(function () {
                APCPage.bottomAlert.getText().then(function (result) {
                    var alertMsg = result.slice(2);
                    console.log("Le message contenu dans l'alerte est : " + alertMsg);
                    if (alertMsg == 'Invitation envoyée') {
                        console.log("----------- Envoi Email au professionnel OK");
                        browser.sleep(1).then(function () {
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
                            APCPage.closeAlertMsg.click();
                            browser.wait(APCPage.EC.visibilityOf(APCPage.closePopupReg), APCPage.waitHigh).then(function () {
                                APCPage.closePopupReg.click();
                                browser.getTitle().then(function (fullTitle) {
                                    var tempTitle = fullTitle.split(" ");
                                    var title = tempTitle[0] + " " + tempTitle[1];
                                    console.log("[[ Page actuelle : " + title + " ]]");
                                    console.log("------------ Fin du Test, résultat : ECHEC");
                                });
                            });
                        });
                    }
                });
            });
        }
    });
});

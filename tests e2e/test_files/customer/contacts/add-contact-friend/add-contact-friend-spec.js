require('jasmine-bail-fast');
var AddFriendContactPage = require('./add-contact-friend-po.js');
var InfoCustomer = require('../../Customer-variables.js');

describe('This test', function () {
    var addFriendContactPage = new AddFriendContactPage();
    var AFCPage = addFriendContactPage;
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;

    it('should add a friend contact', function () {
        console.log("(((***       add-contact-friend-spec.js       ***)))");
        console.log("- Début du test : ajouter contact ami");

        browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.menuMyContacts), AFCPage.waitHigh).then(function () {
            AFCPage.menuMyContacts.click();
            browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.addFriendButton), AFCPage.waitHigh).then(function () {
                AFCPage.addFriendButton.click();
            });
        });
        sendEmailToOne();
        checkAlert();

        // Fonction d'invitation d'un ami
        function sendEmailToOne() {
            browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.enterFriendEmail), AFCPage.waitHigh).then(function () {
                AFCPage.enterFriendEmail.sendKeys(infoCustomer.fakeFriendMail).then(function () {
                    browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.sendEmailToFriend), AFCPage.waitHigh).then(function () {
                        AFCPage.sendEmailToFriend.click().then(function () {
                            browser.sleep(1000);
                        });
                    });
                });
            });
        }
        function checkAlert() {
            browser.wait(AFCPage.EC.visibilityOf(AFCPage.bottomAlert), AFCPage.waitHigh).then(function () {
                AFCPage.bottomAlert.getText().then(function (result) {
                    var alertMsg = result.slice(2);
                    console.log("Le message contenu dans l'alerte est : " + alertMsg);
                    if (alertMsg == 'Invitation envoyée') {
                        console.log("------ Envoi Email à l'ami OK");
                        browser.sleep(1).then(function () {
                            browser.getTitle().then(function (fullTitle) {
                                var tempTitle = fullTitle.split(" ");
                                var title = tempTitle[0];
                                console.log("[[ Page actuelle : " + title + " ]]");
                                console.log("------- Fin du Test, résultat : OK");
                            });
                        });
                    }
                    else if (alertMsg == 'Vous avez déjà invité cette personne') {
                        console.log("------ !! ECHEC !! Envoi Email l'ami !! ECHEC !!");
                        browser.wait(AFCPage.EC.visibilityOf(AFCPage.closeAlertMsg), AFCPage.waitHigh).then(function () {
                            AFCPage.closeAlertMsg.click().then(function () {
                                browser.wait(AFCPage.EC.visibilityOf(AFCPage.closePopupReg), AFCPage.waitHigh).then(function () {
                                    AFCPage.closePopupReg.click().then(function () {
                                        browser.getTitle().then(function (fullTitle) {
                                            var tempTitle = fullTitle.split(" ");
                                            var title = tempTitle[0];
                                            console.log("[[ Page actuelle : " + title + " ]]");
                                            console.log("------- Fin du Test, résultat : ECHEC");
                                        });
                                    });
                                });
                            });
                        });
                    }
                });
            });
        }
    });
});


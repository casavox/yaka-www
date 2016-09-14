require('jasmine-bail-fast');
var ProfilePage = require('./profile-modif-po.js');
var InfoCustomer = require('../Customer-variables.js');


describe('The user', function () {
    var profilePage = new ProfilePage();
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;

    it('should modify his pro profile', function () {
        browser.wait(profilePage.EC.textToBePresentInElement(profilePage.nameHeader, infoCustomer.firstName), profilePage.waitHigh).then(function () {
            profilePage.nameHeader.click();
            browser.wait(profilePage.EC.elementToBeClickable(profilePage.profile), profilePage.waitMedium).then(function () {
                profilePage.profile.click();
            });
        });
        changePhoneNumber();
        verifyChangePhoneNumber();


        // Modification du numéro de téléphone
        function changePhoneNumber() {
            browser.wait(profilePage.EC.textToBePresentInElementValue(profilePage.profileMail, infoCustomer.userLogin), profilePage.waitHigh).then(function () {
                profilePage.phoneNumber.clear();
                console.log('Suppression du numéro de téléphone OK');
                browser.sleep(2000);
                profilePage.phoneNumber.sendKeys(infoCustomer.fakeNumber);
                newPhoneNumber = infoCustomer.fakeNumber;
                console.log('Modification du numéro de téléphone OK');
                browser.wait(profilePage.EC.elementToBeClickable(profilePage.updateProfile), 5000).then(function () {
                    profilePage.closeAlertMsg.isDisplayed().then(function(displayed) {
                        if (displayed) {
                            profilePage.closeAlertMsg.click();
                            profilePage.updateProfile.click();
                            browser.sleep(1500);
                        } else {
                            profilePage.updateProfile.click();
                            browser.sleep(1500);
                        }
                    });

                });
            });
        }

        // Vérification du changement de numéro de téléphone
        function verifyChangePhoneNumber() {
            profilePage.phoneNumber.getAttribute('value').then(function (number) {
                n = number.replace(/ /g, "");
                console.log(n);
                if (n == newPhoneNumber) {
                    console.log('Mise à jour du némero de téléphone OK');
                    browser.sleep(profilePage.wait4Anim);
                } else {
                    console.log("!!! Les numéros ne correspondent pas !!!");
                }
            });
        }
    });
});


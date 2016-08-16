require('jasmine-bail-fast');
var ProfilePage = require('./profile-modif-po.js');
var InfoCustomer = require('../Customer-variables.js');


describe('The user', function () {
    var profilePage = new ProfilePage();
    var infoCustomer = new InfoCustomer();
    browser.ignoreSynchronization = true;

    it('should modify his profile', function () {
        browser.wait(profilePage.EC.textToBePresentInElement(profilePage.nameHeader, infoCustomer.firstName), profilePage.waitHigh).then(function () {
            profilePage.nameHeader.click().then(function () {
                browser.wait(profilePage.EC.elementToBeClickable(profilePage.profile), profilePage.waitMedium).then(function () {
                    profilePage.profile.click().then(function () {
                        browser.wait(profilePage.EC.textToBePresentInElementValue(profilePage.profileMail, infoCustomer.userLogin), profilePage.waitHigh).then(function () {
                            profilePage.phoneNumber.clear().then(function () {
                                console.log('Suppression du numéro de téléphone OK');
                                browser.sleep(2000).then(function () {
                                    profilePage.phoneNumber.sendKeys(infoCustomer.fakeNumber).then(function () {
                                        var newPhoneNumber = infoCustomer.fakeNumber;
                                        console.log('Modification du numéro de téléphone OK');
                                        browser.wait(profilePage.EC.elementToBeClickable(profilePage.updateProfile), 5000).then(function () {
                                            profilePage.updateProfile.click().then(function () {
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

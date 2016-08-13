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
                browser.wait(profilePage.EC.elementToBeClickable(profilePage.profile), 5000).then(function () {
                    profilePage.profile.click().then(function () {
                        browser.wait(profilePage.EC.elementToBeClickable(profilePage.phoneNumber), 5000).then(function () {
                            profilePage.phoneNumber.clear().then(function () {
                                browser.sleep(2000).then(function () {
                                    profilePage.phoneNumber.sendKeys('0132547698').then(function () {
                                        browser.wait(profilePage.EC.elementToBeClickable(profilePage.updateProfile), 5000).then(function () {
                                            profilePage.updateProfile.click().then(function () {
                                                console.log('Bien joué Greg, t\'es le meilleur');
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

require('jasmine-bail-fast');
var ProfilePage = require('./pro-make-offer-po.js');
var InfoPro = require('../Pro-variables.js');

describe('The user', function () {
    var profilePage = new ProfilePage();
    var infoPro = new InfoPro();
    browser.ignoreSynchronization = true;

    it('should modify his profile', function () {
        browser.wait(profilePage.EC.elementToBeClickable(profilePage.menuMapOffers), profilePage.waitMedium).then(function() {
            profilePage.menuMapOffers.click();
        });
        browser.wait(profilePage.EC.elementToBeClickable(profilePage.firstOffer), profilePage.waitMedium).then(function() {
            profilePage.firstOffer.click();
        });
        addPrice();
        addMessage();

        function addPrice() {
            browser.wait(profilePage.EC.elementToBeClickable(profilePage.estimatePrice), profilePage.waitMedium).then(function() {
                profilePage.estimatePrice.click().then(function() {
                    browser.sleep(profilePage.wait4Anim);
                    profilePage.priceInput.clear();
                    profilePage.priceInput.sendKeys(profilePage.priceRandom);
                    profilePage.priceSave.click();
                });
            });
        }
        function addMessage() {
            browser.wait(profilePage.EC.elementToBeClickable(profilePage.messageInput), profilePage.waitMedium).then(function() {
                profilePage.messageInput.sendKeys(profilePage.messageTxt);
                profilePage.sendProposal.click();
                browser.sleep(5000);
            });
        }
    });
});


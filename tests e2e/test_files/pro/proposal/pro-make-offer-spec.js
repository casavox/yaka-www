require('jasmine-bail-fast');
var ProfilePage = require('./pro-make-offer-po.js');
var InfoPro = require('../Pro-variables.js');

describe('The user', function () {
    var profilePage = new ProfilePage();
    var infoPro = new InfoPro();
    browser.ignoreSynchronization = true;

    it('make a proposal to customer with price and message', function () {
        browser.wait(profilePage.EC.elementToBeClickable(profilePage.menuMapOffers), profilePage.waitMedium).then(function () {
            profilePage.menuMapOffers.click();
        });
        browser.sleep(500);
        browser.wait(profilePage.EC.elementToBeClickable(profilePage.firstOffer), profilePage.waitMedium).then(function () {
            profilePage.firstOffer.click();
        });
        addPrice();
        addMessage();
        checkPriceModif();
        profilePage.sendProposal.click();


        function addPrice() {
            browser.wait(profilePage.EC.elementToBeClickable(profilePage.estimatePrice), profilePage.waitMedium).then(function () {
                profilePage.estimatePrice.click().then(function () {
                    priceToCheck = profilePage.priceRandom;
                    browser.sleep(profilePage.wait4Anim);
                    profilePage.priceInput.clear();
                    profilePage.priceInput.sendKeys(priceToCheck);
                    profilePage.priceSave.click();
                });
            });
        }
        function addMessage() {
            browser.wait(profilePage.EC.elementToBeClickable(profilePage.messageInput), profilePage.waitMedium).then(function () {
                profilePage.messageInput.sendKeys(profilePage.messageTxt);
            });
        }

        function checkPriceModif() {
            browser.sleep(profilePage.wait4Anim);
            profilePage.newPrice.getText().then(function (newPriceTxt) {
                if (newPriceTxt == priceToCheck + " €") {
                    console.log("Le Prix inséré correspond au nouveau prix affiché");
                    //checkMessageModif();
                } else {
                    console.log("ERREUR, les prix ne correspondent pas");
                }
            });
        }
        function checkMessageModif() {
            browser.sleep(profilePage.wait4Anim);
            profilePage.newMessage.getAttribute('value').then(function(newMessageTxt) {
                console.log(newMessageTxt);
                if (newMessageTxt == profilePage.messageTxt) {
                    console.log("Le Message inséré correspond au nouveau message affiché");
                } else {
                    console.log("ERREUR, les messages ne correspondent pas");
                }
            });
        }
    });
})
;


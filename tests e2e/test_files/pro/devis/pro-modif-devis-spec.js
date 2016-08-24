require('jasmine-bail-fast');
var ProfilePage = require('./pro-modif-devis-po.js');
var InfoPro = require('../Pro-variables.js');

describe('The user', function () {
    var profilePage = new ProfilePage();
    var infoPro = new InfoPro();
    browser.ignoreSynchronization = true;

    it('should modify his profile', function () {
        browser.wait(profilePage.EC.elementToBeClickable(profilePage.menuDevis), profilePage.waitMedium).then(function() {
            profilePage.menuDevis.click();
        });
        browser.wait(profilePage.EC.elementToBeClickable(profilePage.firstDevis), profilePage.waitMedium).then(function() {
            profilePage.firstDevis.click();
        });
        modifPrice();
        checkPriceModif();

        function modifPrice() {
            browser.wait(profilePage.EC.elementToBeClickable(profilePage.priceIcon), profilePage.waitMedium).then(function() {
                profilePage.priceIcon.click().then(function() {
                    priceToCheck = profilePage.priceRandom;
                    browser.sleep(profilePage.wait4Anim);
                    profilePage.priceInput.clear();
                    profilePage.priceInput.sendKeys(priceToCheck);
                    profilePage.priceSave.click();
                });
            });
        }
        function checkPriceModif() {
            browser.sleep(profilePage.wait4Anim);
            profilePage.newPrice.getText().then(function(newPriceTxt) {
                if (newPriceTxt == priceToCheck + " €") {
                    console.log("Le Prix inséré correspond au nouveau prix affiché");
                } else {
                    console.log("ERREUR, les prix ne correspondent pas");
                }
            });
        }
    });
});


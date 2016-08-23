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

        function modifPrice() {
            browser.wait(profilePage.EC.elementToBeClickable(profilePage.priceIcon), profilePage.waitMedium).then(function() {
                profilePage.priceIcon.click().then(function() {
                    browser.sleep(profilePage.wait4Anim);
                    profilePage.priceInput.clear();
                    profilePage.priceInput.sendKeys(profilePage.priceRandom);
                    profilePage.priceSave.click();
                });
            });
        }
    });
});


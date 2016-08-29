require('jasmine-bail-fast');
var SupportPage = require('./send-message-support-po.js');

describe('The user', function () {
    var supportPage = new SupportPage();
    browser.ignoreSynchronization = true;


    it('should send to support a message', function () {
        console.log("(((***       send-message-support-spec.js       ***)))");
        console.log("- Début du test : Envoi de mail au support");

        browser.wait(supportPage.EC.elementToBeClickable(supportPage.menuSupport), 5000).then(function () {
            supportPage.menuSupport.click().then(function () {
                browser.wait(supportPage.EC.elementToBeClickable(supportPage.supportMessage), 5000).then(function () {
                    supportPage.supportMessage.sendKeys("Hello, this is a support message, thank you ! Hello, this is a support message, thank you ! Hello, this is a support message, thank you ! Hello, this is a support message, thank you ! Hello, this is a support message, thank you ! Hello, this is a support message, thank you !").then(function () {
                        browser.switchTo().frame(0).then(function () {
                            var checkbox = $(".recaptcha-checkbox-checkmark");

                            // first hover the checkbox
                            browser.actions().mouseMove(checkbox).perform();

                            // hardcoded delay
                            browser.sleep(500);

                            // okat, now click - TODO: may be we should click with browser.actions().click() and provide the x, y coordinates for where to click
                            checkbox.click();
                        });
                    });
                });
            });
        });
    });
});


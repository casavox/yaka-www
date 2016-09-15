require('jasmine-bail-fast');
var ProjectPage = require('./pro-project-po.js');

describe('This pro', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should send recommendation to another pro', function () {
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.recommendation), projectPage.waitMedium).then(function() {
            projectPage.recommendation.click();
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.proToRecommend), projectPage.waitMedium).then(function() {
                projectPage.proToRecommend.click();
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.messageToCustomer), projectPage.waitMedium).then(function() {
                    projectPage.messageToCustomer.sendKeys(projectPage.messageContent);
                    projectPage.sendRecommendationButton.click();
                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.confirmRecommendation), projectPage.waitMedium).then(function() {
                        projectPage.confirmRecommendation.click();
                    });
                });
            });
        });
    });
});

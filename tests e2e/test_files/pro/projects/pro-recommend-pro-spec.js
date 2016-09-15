require('jasmine-bail-fast');
var ProjectPage = require('./pro-project-po.js');

describe('This pro', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should send recommendation to another pro', function () {
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.recommendation), projectPage.waitMedium).then(function() {
            projectPage.recommendation.click();
        });
    });
});

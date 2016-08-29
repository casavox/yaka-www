require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('This user', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should recommend a pro', function () {
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.recommendList), projectPage.waitMedium).then(function() {
            projectPage.recommendList.click();
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.addAPro), projectPage.waitMedium).then(function() {
                projectPage.selectProInList.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        projectPage.selectProInList.click();
                        projectPage.recommendProject.click();
                    } else {
                        projectPage.addAPro.click();
                        fillProInfos();
                    }
                });
            });
        });

        function fillProInfos() {
            browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProFirstName), APCPage.waitHigh).then(function () {
                APCPage.enterProFirstName.sendKeys(infoCustomer.ProfirstName);
                APCPage.enterProLastName.sendKeys(infoCustomer.ProlastName);
                APCPage.enterProPhone.sendKeys(infoCustomer.ProphoneNumber);
                APCPage.enterProEmail.sendKeys(infoCustomer.fakeProMail);
                APCPage.enterProAddress.sendKeys(infoCustomer.Procity);
                browser.sleep(200).then(function () {
                    APCPage.enterProAddress.sendKeys(protractor.Key.ARROW_DOWN);
                    browser.wait(APCPage.EC.elementToBeClickable(APCPage.enterProAddress), APCPage.waitMedium).then(function () {
                        APCPage.enterProAddress.sendKeys(protractor.Key.TAB);
                    });
                });

            });
            browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProRelation), APCPage.waitHigh).then(function () {
                APCPage.selectProRelation.click();
                browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), APCPage.waitHigh).then(function () {
                    APCPage.selectProDomain.click();
                    APCPage.selectProOneDomain.click();
                    browser.wait(APCPage.EC.elementToBeClickable(APCPage.selectProDomain), APCPage.waitHigh).then(function () {
                        APCPage.selectProDomain.click().then(function() {
                            APCPage.sendEmailToPro.click();
                        });
                    });
                });
            });
        }


    });
})
;

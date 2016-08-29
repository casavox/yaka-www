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
                        browser.sleep(5000);
                    } else {
                        projectPage.addAPro.click();
                        fillProInfos();
                        browser.sleep(5000);
                    }
                });
            });
        });

        function fillProInfos() {
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.enterProFirstName), projectPage.waitHigh).then(function () {
                projectPage.enterProFirstName.sendKeys(infoCustomer.ProfirstName);
                projectPage.enterProLastName.sendKeys(infoCustomer.ProlastName);
                projectPage.enterProPhone.sendKeys(infoCustomer.ProphoneNumber);
                projectPage.enterProEmail.sendKeys(infoCustomer.fakeProMail);
                projectPage.enterProAddress.sendKeys(infoCustomer.Procity);
                browser.sleep(200).then(function () {
                    projectPage.enterProAddress.sendKeys(protractor.Key.ARROW_DOWN);
                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.enterProAddress), projectPage.waitMedium).then(function () {
                        projectPage.enterProAddress.sendKeys(protractor.Key.TAB);
                    });
                });

            });
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.selectProRelation), projectPage.waitHigh).then(function () {
                projectPage.selectProRelation.click();
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.selectProDomain), projectPage.waitHigh).then(function () {
                    projectPage.selectProDomain.click();
                    projectPage.selectProOneDomain.click();
                    browser.wait(projectPage.EC.elementToBeClickable(projectPage.selectProDomain), projectPage.waitHigh).then(function () {
                        projectPage.selectProDomain.click().then(function() {
                            projectPage.sendEmailToPro.click();
                        });
                    });
                });
            });
        }


    });
})
;

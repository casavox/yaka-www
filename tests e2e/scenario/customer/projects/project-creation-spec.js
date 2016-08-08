require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('Test Casavox', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should publish a new project', function () {
        browser.sleep(6000);
        projectPage.menuNewProject.click();

        browser.sleep(projectPage.wait4Anim);
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.activityMulti), 5000).then(function () {
            projectPage.activityMulti.click();
        });

        // Slide Description
        browser.sleep(projectPage.wait4Anim);
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.materialYes), 5000).then(function () {
            projectPage.materialYes.click();
        });

        projectPage.projectDescription.sendKeys("Desc too short : Ko");
        browser.wait(projectPage.EC.not(projectPage.EC.elementToBeClickable(projectPage.descriptionOkBt)), 5000);

        projectPage.projectDescription.clear();
        projectPage.projectDescription.sendKeys("Protractor TEST --> Description so long  : Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST ");
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.descriptionOkBt), 5000).then(function () {
            projectPage.descriptionOkBt.click();
        });

        // Slide Photo
        browser.sleep(projectPage.wait4Anim); // because of animated slide
        projectPage.photoSlide_Next.click();

        browser.sleep(projectPage.wait4Anim); // because of animated modal
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.photoSlide_NoPhotoConfirm), 5000).then(function () {
            projectPage.photoSlide_NoPhotoConfirm.click();
        });


        // Slide Address
        browser.sleep(projectPage.wait4Anim); // because of animated slide
        projectPage.address_NewOne.click();
        projectPage.addressName.sendKeys("Test YakaClub");
        projectPage.addressLocation.sendKeys("paris").then(function () {
            projectPage.address_Next.click();
        });

        projectPage.addressLocation.clear();
        projectPage.addressLocation.sendKeys("paris");
        browser.sleep(projectPage.wait4Anim);
        projectPage.addressLocation.sendKeys(protractor.Key.ARROW_DOWN);
        browser.sleep(projectPage.wait4Anim);
        projectPage.addressLocation.sendKeys(protractor.Key.TAB);
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.address_Next), 20000).then(function () {
            projectPage.address_Next.click();
        });

        // Slide Date
        browser.sleep(projectPage.wait4Anim); // because of animated slide
        projectPage.selectDateType.click();

        // Publish !
        projectPage.publishButton.click();
        browser.sleep(2000).then(function() {
            projectPage.confirmPublish.click();
        });
        browser.sleep(2000);

    });

});

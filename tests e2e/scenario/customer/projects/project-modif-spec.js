require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('This test', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should modify a project', function () {
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.menuMyProjects), 20000).then(function () {
            projectPage.menuMyProjects.click();
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.firstProject), 20000).then(function () {
            projectPage.firstProject.click();
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.seeProject), 20000).then(function () {
            projectPage.seeProject.click();
        });
        browser.wait(projectPage.EC.presenceOf(projectPage.newModifiedText), 20000).then(function () {
            projectPage.newModifiedText.getText().then(function (txt) {
                originalTxt = txt;
            });
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.modifyButton), 20000).then(function () {
            projectPage.modifyButton.click();
        });
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.modifyProjectDescription), 20000).then(function () {
            if (originalTxt.length > 250) {
                projectPage.modifyProjectDescription.clear();
            }
        });
        projectPage.modifyProjectDescription.sendKeys(" " +projectPage.todayDate);
        browser.sleep(2000);
        projectPage.saveModification.click();
        browser.wait(projectPage.EC.elementToBeClickable(projectPage.saveConfirm), 5000).then(function () {
            browser.sleep(1000);
            projectPage.saveConfirm.click();
        });
        browser.wait(projectPage.EC.presenceOf(projectPage.newModifiedText), 5000).then(function () {
            projectPage.newModifiedText.getText().then(function (txt) {
                console.log(txt);
                console.log(txtArr);
            });
        });
    });
})
;

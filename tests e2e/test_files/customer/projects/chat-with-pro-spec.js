require('jasmine-bail-fast');
var ProjectPage = require('./project-po.js');

describe('This user', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should modify one project', function () {
        console.log("(((***       chat-with-pro-spec.js       ***)))");
        console.log("- Discussion projet avec pro");

        browser.wait(projectPage.EC.elementToBeClickable(projectPage.menuMyProjects), projectPage.waitHigh).then(function () {
            projectPage.menuMyProjects.click().then(function () {
                console.log("-- Click bouton 'mes projets' OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.lastProject), projectPage.waitHigh).then(function () {
                    projectPage.lastProject.click().then(function () {
                        console.log("--- Click sélection dernier projet OK");
                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.chatSelectTab), projectPage.waitHigh).then(function () {
                            projectPage.chatSelectTab.click().then(function() {
                                console.log("-- Selection de la tab 'Messages' OK");
                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.chatText), projectPage.waitHigh).then(function () {
                                    dateToCompare = projectPage.todayDate;
                                    projectPage.chatText.sendKeys(projectPage.totoByC + projectPage.todayDate).then(function() {
                                        console.log("-- Entrer message 'Toto by customer' OK");
                                        projectPage.sendText.click().then(function() {
                                            browser.sleep(projectPage.wait4Anim);
                                            projectPage.lastText.getText().then(function(chatMsg) {
                                                chatMsgToCompare = chatMsg.substr(projectPage.totoByC.length, (projectPage.todayDate.length) );
                                                console.log(chatMsgToCompare);
                                                console.log(projectPage.todayDate);
                                                if (chatMsgToCompare == dateToCompare) {
                                                    console.log('Le dernier message envoyé correspond au dernier message reçu');
                                                }
                                                console.log("---- Messages 'Toto by pro' envoyé OK");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
})
;

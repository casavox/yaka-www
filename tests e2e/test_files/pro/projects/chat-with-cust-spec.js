require('jasmine-bail-fast');
var ProjectPage = require('./pro-project-po.js');

describe('This pro', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should send a message to customer', function () {
        console.log("- Discussion projet avec client");
        browser.wait(projectPage.EC.presenceOf(projectPage.workList), 20000).then(function () {
            projectPage.workList.click().then(function () {
                console.log("-- Click bouton 'mes chantiers' OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.firstWork), 20000).then(function () {
                    projectPage.firstWork.click().then(function() {
                        console.log("--- Click sélection premier projet OK");
                        browser.wait(projectPage.EC.elementToBeClickable(projectPage.chatSelectTab), 20000).then(function () {
                            projectPage.chatSelectTab.click().then(function() {
                                console.log("-- Selection de la tab 'Messages' OK");
                                browser.wait(projectPage.EC.elementToBeClickable(projectPage.chatText), 20000).then(function () {
                                    dateToCompare = projectPage.todayDate;
                                    projectPage.chatText.sendKeys(projectPage.toto + projectPage.todayDate).then(function() {
                                        console.log("-- Entrer message 'Toto by pro' OK");
                                        projectPage.sendText.click().then(function() {
                                            browser.sleep(projectPage.wait4Anim);
                                            projectPage.lastText.getText().then(function(chatMsg) {
                                                chatMsgToCompare = chatMsg.substr(projectPage.toto.length, (projectPage.todayDate.length) );
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

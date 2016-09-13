require('jasmine-bail-fast');
var ProjectPage = require('./pro-project-po.js');

describe('This pro', function () {
    var projectPage = new ProjectPage();
    browser.ignoreSynchronization = true;


    it('should send a message to customer', function () {
        console.log("(((***       chat-with-cust-spec.js       ***)))");
        console.log("- Discussion projet avec client");
        browser.wait(projectPage.EC.presenceOf(projectPage.workList), 20000).then(function () {
            projectPage.workList.click();
            console.log("-- Click bouton 'mes chantiers' OK");
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.firstWork), 20000).then(function () {
                projectPage.firstWork.click();
                console.log("--- Click sélection premier projet OK");
                browser.wait(projectPage.EC.elementToBeClickable(projectPage.chatSelectTab), 20000).then(function () {
                    projectPage.chatSelectTab.click();
                    console.log("-- Selection de la tab 'Messages' OK");
                });
            });
        });
        sendTextAndVerifyIt();



        // Envoi d'un message à un pro et le vérifie
        function sendTextAndVerifyIt() {
            browser.wait(projectPage.EC.elementToBeClickable(projectPage.chatText), projectPage.waitHigh).then(function () {
                dateToCompare = projectPage.todayDate;
                projectPage.chatText.sendKeys(projectPage.totoByC + projectPage.todayDate);
                console.log("-- Entrer message 'Toto by customer' OK");
                projectPage.sendText.click();
                browser.sleep(projectPage.wait4Anim);
                projectPage.lastText.getText().then(function (chatMsg) {
                    chatMsgToCompare = chatMsg.substr(projectPage.totoByC.length, (projectPage.todayDate.length));
                    console.log(chatMsgToCompare);
                    console.log(projectPage.todayDate);
                    if (chatMsgToCompare == dateToCompare) {
                        console.log('Le dernier message envoyé correspond au dernier message affiché');
                    }
                    console.log("---- Messages 'Toto by pro' envoyé OK");
                });
            });
        }
    });
});

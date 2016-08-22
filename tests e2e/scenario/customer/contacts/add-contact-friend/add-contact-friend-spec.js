require('jasmine-bail-fast');
var AddFriendContactPage = require('./add-contact-friend-po.js');

describe('This test', function () {
    var addFriendContactPage = new AddFriendContactPage();
    var AFCPage = addFriendContactPage;
    browser.ignoreSynchronization = true;


    it('should add a friend contact', function () {
        console.log("- Début du test : ajouter contact ami");

        browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.menuMyContacts), 20000).then(function () {
            AFCPage.menuMyContacts.click();
            console.log("-- Menu Contacts OK");
        });
        browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.addFriendButton), 20000).then(function () {
            AFCPage.addFriendButton.click();
            console.log("--- Click bouton 'ajouter ami' OK");
        });
        browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.enterFriendEmail), 20000).then(function () {
            AFCPage.enterFriendEmail.sendKeys(AFCPage.fakeMail);
            console.log("---- Entrer Email OK");
        });
        browser.wait(AFCPage.EC.elementToBeClickable(AFCPage.sendEmailToFriend), 20000).then(function () {
            AFCPage.sendEmailToFriend.click();
            console.log("----- Envoi Email au contact ami OK");
            console.log("------Fin du Test, résultat : OK");
        });
    });
});
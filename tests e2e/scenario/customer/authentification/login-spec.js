require('jasmine-bail-fast');
var LoginPage = require('./login-po.js');

describe('The user', function() {
    var loginPage = new LoginPage();
    browser.ignoreSynchronization = true;
    browser.getSession().then(function(session) {
        currentSession = session.getId();
        console.log(currentSession);
    });


    it('should log in', function() {
        console.log("* Début du test : connexion");

        browser.wait(loginPage.EC.elementToBeClickable(loginPage.homeSectionLogin), 20000).then(function () {
            loginPage.homeSectionLogin.click();
            console.log("** Click bouton 'se connecter' OK");
        });
        browser.wait(loginPage.isLoginPopupOpen, 5000).then(function() {
            loginPage.userEmail.click();
            console.log("*** Click input 'Email' OK");
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.userEmail), 5000).then(function() {
            loginPage.userEmail.sendKeys(loginPage.userLogin);
            console.log("**** Entrer Email OK");
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function() {
            loginPage.pwd.click();
            console.log("***** Click input 'Mot de passe' OK");
        });
        browser.wait(loginPage.EC.elementToBeClickable(loginPage.pwd), 5000).then(function() {
            loginPage.pwd.sendKeys(loginPage.userPwd);
            console.log("****** Entrer Mot de passe OK");
        });
        browser.wait(loginPage.isLogable, 1000).then(function() {
            loginPage.signInPopupButton.click();
            console.log("******* Envoi Email au contact ami OK");
            console.log("******** Fin du Test, résultat : OK");
        });
    });
});

var LoginPage = function () {
    browser.ignoreSynchronization = true;
    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;

    // Log In
    this.menuNewProject = element(by.linkText('Publier un projet'));
    this.homeSectionLogin = element(by.css('.homeSection1Login'));
    this.userEmail = element(by.model('vm.loginUser.email'));
    this.pwd = element(by.model('vm.loginUser.password'));
    this.signInPopupButton = element(by.id('signInPopupButton'));
    this.EC = protractor.ExpectedConditions;
    this.isLogable = this.EC.elementToBeClickable(this.signInPopupButton);
    this.isLoginPopupOpen = this.EC.elementToBeClickable(this.userEmail);

    //Log out
    this.nameHeader = element(by.css('.yakaHeaderFirstname'));
    this.logOut = element(by.css('[data-ng-click="app.logout()"]'));

    // Register informations
    this.homeSectionRegister = element(by.css('.homeSection1Register'));
    this.registerByEmail = element(by.css('.registerWithEmailMessage'));
    this.firstName = element(by.model('vm.newUser.firstName'));
    this.lastName = element(by.model('vm.newUser.lastName'));
    this.email = element(by.model('vm.newUser.email'));
    this.address = element(by.model('vm.newUser.defaultAddress.address'));
    this.password = element(by.model('vm.newUser.password'));
    this.confPassword = element(by.model('vm.passwordConfirm'));
    this.confirmInscription = element(by.css('[ data-ng-click="vm.register()"]'));

}

module.exports = LoginPage;

var LoginPage = function() {
    browser.ignoreSynchronization = true;


    //Login informations

    //Log out
    this.nameHeader = element(by.css('.yakaHeaderFirstname'));
    this.logOut = element(by.css('[data-ng-click="app.logout()"]'));

    //Temp User Info
    this.userLogin = 'gregorybizet@hotmail.com';
    this.userPwd = 'blabla';

    this.homeSectionLogin = element(by.css('.homeSection1Login'));
    this.userEmail = element(by.model('vm.loginUser.email'));
    this.pwd = element(by.model('vm.loginUser.password'));
    this.signInPopupButton = element(by.id('signInPopupButton'));
    this.EC = protractor.ExpectedConditions;
    this.isLogable = this.EC.elementToBeClickable(this.signInPopupButton);
    this.isLoginPopupOpen = this.EC.elementToBeClickable(this.userEmail);


    // Register informations
    this.homeSectionRegister = element(by.css('.homeSection1Register'));
    this.registerByEmail = element(by.css('.registerWithEmailMessage'));
    this.firstName = element(by.model('vm.newUser.firstName'));
    this.lastName = element(by.model('vm.newUser.lastName'));
    this.email = element(by.model('vm.newUser.email'));
    this.address = element(by.model('vm.newUser.defaultAddress.address'));
    this.password = element(by.model('vm.newUser.password'));
    this.confPassword = element(by.model('vm.passwordConfirm'));
    //this.isLoginPopupOpen = this.EC.elementToBeClickable(this.registerByEmail);
    this.confirmInscription = element(by.css('[ data-ng-click="vm.register()"]'));
}

module.exports = LoginPage;

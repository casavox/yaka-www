var LoginPage = function () {
    browser.ignoreSynchronization = true;



    //Temp User Info
    // Browser 1
    this.userLogin = 'dominique@victorleduc.net';
    this.userPwd = 'blabla';


    // Log In
    this.menuNewProject = element(by.linkText('Publier un projet'));
    this.homeSectionLogin = element(by.css('homeSection1Login'));
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
    this.goProSection = element(by.css('.homeSection1ProLink'));
    this.firstName = element(by.model('vm.newUser.firstName'));
    this.lastName = element(by.model('vm.newUser.lastName'));
    this.email = element(by.model('vm.newUser.email'));
    this.address = element(by.model('vm.newUser.defaultAddress.address'));
    this.password = element(by.model('vm.newUser.password'));
    this.confPassword = element(by.model('vm.passwordConfirm'));
    this.ProPhone = element(by.model('vm.newUser.professional.phoneNumber'));
    this.ProAdress = element(by.model('vm.newUser.professional.company.address.address'));
    this.selectProDomain = element(by.css('[ng-click="toggleDropdown()"]'));
    this.selectProOneDomain = element(by.cssContainingText('label', "Serrurerie"));

    this.confirmInscription = element(by.css('[data-ng-click="vm.registerUser()"]'));
    // Email de test
    this.mailNumber = function () {
        return Math.floor((Math.random() * (20 - 1) + 1) + (Math.random() * (20 - 1) + 1)+ (Math.random() * (20 - 1) + 1));
    }
    this.fakeMail = 'casavox.dev+regPro' + this.mailNumber() + '@gmail.com';
}

module.exports = LoginPage;

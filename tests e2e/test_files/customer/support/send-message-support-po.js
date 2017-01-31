var SupportPage = function() {
    browser.ignoreSynchronization = true;
    this.wait4Anim = 500;
    this.EC = protractor.ExpectedConditions;

    this.menuSupport = element(by.linkText('Aide'));
    this.gender = element(by.model('vm.supportMessage.gender'));
    this.firstName = element(by.model('vm.supportMessage.firstName'));
    this.lastName = element(by.model('vm.supportMessage.lastName'));
    this.phoneNumber = element(by.model('vm.supportMessage.phoneNumber'));
    this.supportMessage = element(by.model('vm.supportMessage.message'));
    this.captcha = element(by.css('recaptcha-checkbox-checkmark'));
}

module.exports = SupportPage;

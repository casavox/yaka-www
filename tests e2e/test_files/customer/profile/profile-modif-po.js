var ProfilePage = function () {
    browser.ignoreSynchronization = true;
    this.EC = protractor.ExpectedConditions;

    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;

    //Log out
    this.nameHeader = element(by.css('.yakaHeaderFirstname'));
    this.profile = element(by.css('[ui-sref="profile"]'));
    this.phoneNumber = element(by.model('vm.profileInfo.phoneNumber'));
    this.profileMail = element(by.name('email'));
    this.closeAlertMsg = element(by.css('[ng-click="alertMsgFlag = false"]'));
    this.updateProfile = element(by.css('[data-ng-click="vm.updateProfile()"]'));
}

module.exports = ProfilePage;

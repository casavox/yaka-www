var ProfilePage = function () {
    browser.ignoreSynchronization = true;
    this.EC = protractor.ExpectedConditions;

    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;

    // Elements
    this.nameHeader = element(by.css('.yakaHeaderFirstname'));
    this.profile = element(by.css('[ui-sref="pro-profile"]'));
    this.phoneNumber = element(by.model('vm.profileInfo.phoneNumber'));
    this.profileMail = element(by.name('email'));
    this.updateProfile = element(by.css('[data-ng-click="vm.profileSaveButtonClicked()"]'));
    this.updateDescProfile = element(by.css('[data-ng-click="vm.updateAboutMe()"]'));
    this.description = element(by.model('vm.about.aboutMe'));
    this.updateActivitiesProfile = element(by.css('[data-ng-click="vm.updateActivities()"]'));
    this.bottomAlert = element(by.binding('alertMessage'));
    this.closeAlertMsg = element(by.css('[ng-click="alertMsgFlag = false"]'));
    this.closePopupReg = element(by.id('closePopupFriendImg'));
    //this.certificationADD = element(by.css('[data-ng-click="vm.setVerif(\'RGE\')"]'));


    this.n = Math.floor((Math.random() * (15 - 1) + 0));
    console.log("Random Number = " + this.n);
    this.skillCategory = element.all(by.repeater('s in vm.cat'));


    // Date et heure actuelles
    this.today = new Date();
    this.options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
    };
    this.todayDate = this.today.toLocaleDateString("fr-FR", this.options);
}

module.exports = ProfilePage;

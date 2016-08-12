var AddFriendContactPage = function() {
    browser.ignoreSynchronization = true;
    this.wait4Anim = 500;
    this.EC = protractor.ExpectedConditions;

    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;


    //Navigation dans menu contacts
    this.menuMyContacts = element(by.linkText('Mes contacts'));
    this.addFriendButton = element(by.id('invite-friend-button'));
    this.enterFriendEmail = element(by.model('vm.invitCustomer'));
    this.sendEmailToFriend = element(by.css('[data-ng-click="vm.sendCustomerInvit()"]'));
    this.bottomAlert = element(by.binding('alertMessage'));
    this.closeAlertMsg = element(by.css('[ng-click="alertMsgFlag = false"]'));
    this.closePopupReg = element(by.id('closePopupFriendImg'));

}
module.exports = AddFriendContactPage;

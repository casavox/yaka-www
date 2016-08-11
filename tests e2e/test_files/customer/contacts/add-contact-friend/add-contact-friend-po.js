var AddFriendContactPage = function() {
    browser.ignoreSynchronization = true;
    this.wait4Anim = 500;
    this.EC = protractor.ExpectedConditions;


    //Navigation dans menu contacts
    this.menuMyContacts = element(by.linkText('Mes contacts'));
    this.addFriendButton = element(by.id('invite-friend-button'));
    this.enterFriendEmail = element(by.model('vm.invitCustomer'));
    this.sendEmailToFriend = element(by.css('[data-ng-click="vm.sendCustomerInvit()"]'));


}
module.exports = AddFriendContactPage;

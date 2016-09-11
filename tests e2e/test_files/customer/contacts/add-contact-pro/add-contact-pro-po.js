var AddProContactPage = function() {
    browser.ignoreSynchronization = true;
    this.wait4Anim = 500;
    this.EC = protractor.ExpectedConditions;

    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;

    // Navigation dans menu contacts
    this.menuMyContacts = element(by.linkText('Mes contacts'));
    this.addProButton = element(by.id('invite-pro-button'));

    // Renseignement ds informations concernant le pro
    this.enterProFirstName = element(by.model('vm.invitPro.firstName'));
    this.enterProLastName = element(by.model('vm.invitPro.lastName'));
    this.enterProPhone = element(by.model('vm.phoneNumber'));
    this.enterProEmail = element(by.model('vm.invitPro.email'));
    this.enterProAddress = element(by.model('vm.invitPro.address.address'));
    this.selectProRelation = element(by.id('select-pro-relation')).$('[value="FAMILY"]');
    this.selectProDomain = element(by.css('[ng-click="toggleDropdown()"]'));
    this.selectProOneDomain = element(by.cssContainingText('label', "Serrurerie"));

    // Envoi du mail d'invitation
    this.sendEmailToPro = element(by.css('[data-ng-click="vm.sendProInvit()"]'));
    // Résultat de l'envoi de la demande
    this.bottomAlert = element(by.binding('alertMessage'));
    this.closeAlertMsg = element(by.css('[ng-click="alertMsgFlag = false"]'));
    this.closePopupReg = element(by.id('closePopupProImg'));

}
module.exports = AddProContactPage;

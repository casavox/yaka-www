var AddProContactPage = function() {
    browser.ignoreSynchronization = true;
    this.wait4Anim = 500;
    this.EC = protractor.ExpectedConditions;

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
    this.popupInvit = element(by.css('yakaPopupWindow'));
    // Résultat de l'envoi de la demande
    this.alertYes = element(by.binding('alertMessage'));


}
module.exports = AddProContactPage;

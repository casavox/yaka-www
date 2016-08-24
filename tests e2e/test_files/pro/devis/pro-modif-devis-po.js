var ProfilePage = function () {
    browser.ignoreSynchronization = true;
    this.EC = protractor.ExpectedConditions;

    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;

    // Elements
    this.menuDevis = element(by.linkText('Mes devis'));
    this.firstDevis = element.all(by.repeater('proposal in vm.proposals')).get(0);

    // Elements pour la modification du prix
    this.priceIcon =  element(by.css('[data-ng-click="vm.editPrice()"]'));
    this.priceInput = element(by.model('vm.myPrice'));
    this.priceRandom = Math.floor((Math.random() * (1000 - 1) + 1));
    this.priceSave = element(by.css('[data-ng-click="vm.selectPrice(); vm.save()"]'));

    // Elements pour la vérification du prix et du message
    this.newPrice = element(by.id('checkPrice'));
    this.newMessage = element(by.model('vm.offer.comment'));

}

module.exports = ProfilePage;

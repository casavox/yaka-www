var ProfilePage = function () {
    browser.ignoreSynchronization = true;
    this.EC = protractor.ExpectedConditions;

    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;

    // Elements
    this.menuMapOffers = element(by.linkText('Carte des offres'));
    this.firstOffer = element.all(by.repeater('lead in vm.leads track by lead.id')).get(0);

    // Elements de la modification du prix
    this.estimatePrice = element(by.css('[data-ng-click="vm.editPrice()"]'));
    this.priceInput = element(by.model('vm.price'));
    this.priceRandom = Math.floor((Math.random() * (1000 - 1) + 1));
    this.priceSave = element(by.css('[data-ng-click="vm.selectPrice();"]'));
    this.messageInput = element(by.model('vm.offer.comment'));
    this.messageTxt = "Ceci est un message à destination du particulier. Il s'agit du premier contact entre le professionnel et le client et doit être composé d'au moins 40 caractères";
    this.sendProposal = element(by.css('[data-ng-click="vm.sendOffer()"]'));

}

module.exports = ProfilePage;

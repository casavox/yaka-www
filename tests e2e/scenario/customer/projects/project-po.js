var ProjectPage = function() {
    browser.ignoreSynchronization = true;
    this.wait4Anim = 500;
    this.EC = protractor.ExpectedConditions;

    // Création d'un projet
    this.menuNewProject = element(by.linkText('Publier un projet'));
    this.menuMyProjects = element(by.linkText('Mes projets'));
    this.activityMulti = element(by.css('[data-ng-click="vm.selectType(\'AUTO_MULTI\')"]'));
    this.materialYes = element(by.id('materialYes'));
    this.projectDescription = element(by.model('vm.projectDescription'));
    this.descriptionOkBt = element(by.css('[data-ng-click="vm.continueProject()"]'));
    this.photoSlide_Next = element(by.css('[data-ng-click="vm.continueProjectImg()"]'));
    this.photoSlide_NoPhotoConfirm = element(by.css('.cancel.btn.btn-lg.btn-default'));
    this.address_NewOne = element(by.model('vm.myAddress')).$('[value="new"]');
    this.addressName = element(by.model('vm.newAddr.name'));
    this.addressLocation = element(by.model('address.name'));
    this.address_Next = element(by.css('[data-ng-click="vm.continueAddr()"]'));
    this.selectDateType = element(by.id('selectDateType_WITHIN_A_MONTH'));
    this.publishButton = element(by.id('publish'));
    this.confirmPublish = element(by.css('.confirm.btn.btn-lg.btn.btn-success'));


    // Modification d'un projet
    this.firstProject = element.all(by.repeater('p in vm.projectsOnGoing')).get(0);
    this.seeProject = element(by.css('[data-ng-click="vm.projectDetails()"]'));
    this.modifyButton = element(by.css('[data-ng-click="vm.edit()"]'));
    this.modifyProjectDescription = element(by.model('vm.projectTmp.description'));
    this.newModifiedText = element(by.id('description-content'));
    this.saveModification = element(by.css('[data-ng-click="vm.openSavePopup()"]'));
    this.saveConfirm = element(by.css('.confirm'));

    // Date et heure actuelles
    this.today = new Date();
    this.options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
    };
    this.todayDate = this.today.toLocaleDateString("fr-FR", this.options);


}

module.exports = ProjectPage;
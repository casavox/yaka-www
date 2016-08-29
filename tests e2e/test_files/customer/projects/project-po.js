var ProjectPage = function() {
    browser.ignoreSynchronization = true;
    this.wait4Anim = 500;
    this.EC = protractor.ExpectedConditions;

    // Temps d'attente timeout
    this.waitLow = 2000;
    this.waitMedium = 5000;
    this.waitHigh = 10000;


    // Création d'un projet
    this.menuNewProject = element(by.linkText('Publier un projet'));
    this.menuMyProjects = element(by.linkText('Mes projets'));
    this.activityGet = element.all(by.repeater('child in vm.newProject.childrenActivities')).get(-1);
    this.activityObjectif = element.all(by.repeater('child in q.childrenActivities')).get(-1);
    this.materialYes = element(by.id('materialYes'));
    this.projectDescription = element(by.model('vm.projectDescription'));
    this.descriptionShortTxt = "Lorem ipsum dolor sit amet";
    this.descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at tincidunt quam, nec semper augue. Aliquam aliquet blandit volutpat.";
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
    this.bottomAlert = element(by.binding('alertMessage'));
    this.closeAlertMsg = element(by.css('[ng-click="alertMsgFlag = false"]'));
    this.closePopupReg = element(by.id('closePopupFriendImg'));


    // Modification d'un projet
    this.firstProject = element.all(by.repeater('p in vm.projectsOnGoing')).get(0);
    this.lastProject = element.all(by.repeater('p in vm.projectsOnGoing')).get(-1);
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

    // Chat conversation
    this.chatSelectTab = element(by.css('[data-ng-click="vm.showChat = true; vm.scrollBottom = 1"]'));
    this.firstWork = element.all(by.repeater('proposal in vm.ongoing')).get(0);
    this.chatText = element(by.model('newMessage.text'));
    this.totoByC = "Toto by Customer ";
    this.sendText = element(by.css('[data-ng-click="sendMessage()"]'));
    this.lastText = element.all(by.repeater('message in messages')).get(-1);

    // Recommend pro
    this.recommendList = element.all(by.repeater('project in vm.projectsToRecommend')).get(0);
    this.selectProInList = element.all(by.repeater('professional in vm.professionals')).get(0);
    this.addAPro = element(by.css('[vm.openProPopup()]'));
    this.recommendProject = element(by.css('[vm.recommendPro(vm.selectedProfessional.id)]'));

    // Renseignement ds informations concernant le pro
    this.enterProFirstName = element(by.model('vm.invitPro.firstName'));
    this.enterProLastName = element(by.model('vm.invitPro.lastName'));
    this.enterProPhone = element(by.model('vm.invitPro.phone'));
    this.enterProEmail = element(by.model('vm.invitPro.email'));
    this.enterProAddress = element(by.model('vm.invitPro.address.address'));
    this.selectProRelation = element(by.model('vm.invitPro.relation')).$('[value="FAMILY"]');
    this.selectProDomain = element(by.css('[ng-click="toggleDropdown()"]'));
    this.selectProOneDomain = element(by.cssContainingText('label', "Serrurerie"));
    this.sendEmailToPro = element(by.id('invitButton'));







}

module.exports = ProjectPage;

require('jasmine-bail-fast');
// spec.js
describe('Test Casavox', function() {
    // URL Domain env
    var urlDomain = 'http://www.casa-local.com:8000/';
    // pages
    var currentPage = '';
    var mHome = urlDomain + '#/';
    var cMyProjects = urlDomain + '#/my-projects';
    var cNewProject = urlDomain + '#/new-project';
    var wait4Anim = 500;

    var userLogin = 'gregorybizet@hotmail.com';
    var userPwd = 'blabla';
    var homeTitle = 'CasaVox : Trouvez vos artisans en toute confiance';

    browser.ignoreSynchronization = true;
    var EC = protractor.ExpectedConditions;

    var urlAsChanged = function(url) {
        return function() {
            return browser.getCurrentUrl().then(function(actualUrl) {
                currentPage = actualUrl;
                return url != actualUrl;
            });
        };
    };

    //home page
    var homeSectionLogin = element(by.css('.homeSection1Login'));
    var eMail = element(by.model('vm.loginUser.email'));
    var pwd = element(by.model('vm.loginUser.password'));
    var signInPopupButton = element(by.id('signInPopupButton'));
    var isLoginPopupOpen = EC.elementToBeClickable(eMail);
    var isLogable = EC.elementToBeClickable(signInPopupButton);
    it('should be home page', function() {
        browser.get(mHome);
        expect(browser.getTitle()).toEqual(homeTitle);
        browser.getCurrentUrl().then(function(url) {
            currentPage = url;
        })
        homeSectionLogin.getText().then(function() {
            console.log("\n(X) Home page principale on '" + currentPage + "'");
        });
        homeSectionLogin.click();
        browser.wait(isLoginPopupOpen, 5000);
        eMail.click();
        eMail.sendKeys(userLogin);
        pwd.click();
        pwd.sendKeys(userPwd);
        browser.wait(isLogable, 1000);
        signInPopupButton.click();
    });

    // my-projects
    var isPro = false;
    var userFirstname = element(by.binding('app.getFirstName()'));

    it('should be logged in', function() {
        browser.wait(urlAsChanged(currentPage), 5000).then(function() {
            userFirstname.getText().then(function(text) {
                expect(text.length).toBeGreaterThan(1);
            });
        });

        element(by.tagName('header')).getAttribute('data-current-skin').then(function(value) {
            isPro = (value == 'orange');
            console.log("\n(X) " + (isPro ? "PRO " : "CUSTOMER ") + "Logged as '" + userLogin + "' on '" + currentPage + "'");
        });

        browser.driver.manage().window().maximize();

        expect(element(by.linkText('Publier un projet')).getTagName()).toBe('a');
        console.log("\n#### #### START --> Create project #### #### ");
    });

    // new-project
    var menuNewProject = element(by.linkText('Publier un projet'));
    var activityMulti = element(by.css('[data-ng-click="vm.selectType(\'AUTO_MULTI\')"]'));
    var materialYes = element(by.id('materialYes'));
    var projectDescription = element(by.model('vm.projectDescription'));
    var descriptionOkBt = element(by.css('[data-ng-click="vm.continueProject()"]'));
    var photoSlide_Next = element(by.css('[data-ng-click="vm.continueProjectImg()"]'));
    var photoSlide_NoPhotoConfirm = element(by.css('.cancel.btn.btn-lg.btn-default'));
    var address_NewOne = element(by.model('vm.myAddress')).$('[value="new"]');
    var addressName = element(by.model('vm.newAddr.name'));
    var addressLocation = element(by.model('address.name'));
    var address_Next = element(by.css('[data-ng-click="vm.continueAddr()"]'));
    var address_errorMessage = element(by.css('[data-ng-show="vm.error.address.flag"]'));
    var selectDateType = element(by.id('selectDateType_WITHIN_A_MONTH'));

    it('should create a new-project', function() {
        menuNewProject.click();
        browser.wait(urlAsChanged(currentPage), 5000).then(function() {
            console.log("\n(X) '" + userLogin + "' move on '" + currentPage + "'");
        });

        // Slide main activity
        browser.sleep(wait4Anim); // because of animated slide
        browser.wait(EC.elementToBeClickable(activityMulti), 5000).then(function() {
            activityMulti.click().then(function() {
                console.log("\n(X) --(1)--> Activity 'ACTIVITY_MULTI'");
            });
        });

        // Slide Description
        browser.sleep(wait4Anim); // because of animated slide
        browser.wait(EC.elementToBeClickable(materialYes), 5000).then(function() {
            //browser.actions().mouseMove(materialYes).click();
            materialYes.click().then(function() {
                console.log("\n(X) ----(2)--> Material 'YES'");
            });
        });

        projectDescription.sendKeys("Desc too short : Ko");
        browser.wait(EC.not(EC.elementToBeClickable(descriptionOkBt)), 5000).then(function() {
            console.log("\n(X) ------(3.1)--> Description too short so 'CONTINUER' = disabled as excpected");
        });

        projectDescription.clear();
        projectDescription.sendKeys("Protractor TEST --> Description so long  : Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST Protractor TEST ");
        browser.wait(EC.elementToBeClickable(descriptionOkBt), 5000).then(function() {
            descriptionOkBt.click().then(function() {
                console.log("\n(X) ------(3.2)--> Description ok so click on Description/'CONTINUER'");
            });
        });

        // Slide Photo
        browser.sleep(wait4Anim); // because of animated slide
        photoSlide_Next.click().then(function() {
            console.log("\n(X) --------(4.1)--> Photo : 'CONTINUER' without photo ?");
        });

        browser.sleep(wait4Anim); // because of animated modal
        browser.wait(EC.elementToBeClickable(photoSlide_NoPhotoConfirm), 5000).then(function() {
            photoSlide_NoPhotoConfirm.click().then(function() {
                console.log("\n(X) --------(4.2)--> Photo : YES 'CONTINUER' without photo");
            });
        });

        // Slide Address
        browser.sleep(wait4Anim); // because of animated slide
        address_NewOne.click();
        addressName.sendKeys("Test YakaClub").then(function() {
            console.log("\n(X) ----------(5.1)--> Address name : 'Test YakaClub'");
        });
        addressLocation.sendKeys("paris").then(function() {
            address_Next.click().then(function() {
                console.log("\n(X) ----------(5.2)--> Address location : 'paris' ---> Bad address, missing google completion");
            });
        });
        addressLocation.clear();
        addressLocation.sendKeys("paris");
        browser.sleep(wait4Anim);
        addressLocation.sendKeys(protractor.Key.ARROW_DOWN);
        browser.sleep(wait4Anim);
        addressLocation.sendKeys(protractor.Key.TAB);
        browser.wait(EC.elementToBeClickable(address_Next), 20000).then(function() {
            address_Next.click().then(function() {
                console.log("\n(X) ----------(5.3)--> Address location : 'paris' + 'TAB' --> Ok");
            });
        });

        // Slide Date
        browser.sleep(wait4Anim); // because of animated slide
        selectDateType.click();
    });

    // Project publish Ack
    var publishButton = element(by.id('publish'));
    var confirmPublish = element(by.css('.confirm.btn.btn-lg.btn.btn-success'));

    it('should be published', function() {

        publishButton.click();
        browser.wait(urlAsChanged(currentPage), 5000).then(function() {
            confirmPublish.click();
        });

        console.log("\n#### #### END --> Create project #### #### ");
        browser.sleep(20000); // because of animated modal
    });
    //
});

require('jasmine-bail-fast');
var ProfilePage = require('./pro-profile-modif-po.js');
var InfoPro = require('../Pro-variables.js');
var path = require('path');


describe('The user', function () {
    var profilePage = new ProfilePage();
    var infoPro = new InfoPro();
    browser.ignoreSynchronization = true;

    it('should modify his profile', function () {
            browser.wait(profilePage.EC.textToBePresentInElement(profilePage.nameHeader, infoPro.userFirstName), profilePage.waitHigh).then(function () {
                profilePage.nameHeader.click();
                browser.wait(profilePage.EC.elementToBeClickable(profilePage.profile), profilePage.waitMedium).then(function () {
                    profilePage.profile.click();
                });
            });
            changePhoneNumber();
            verifyChangePhoneNumber();
            //sendCertification();
            changeDescription();
            verifyDateModification();
            changeSkill();


            // Modification du numéro de téléphone
            function changePhoneNumber() {
                browser.wait(profilePage.EC.visibilityOf(profilePage.profileMail), profilePage.waitHigh).then(function () {
                    browser.wait(profilePage.EC.textToBePresentInElementValue(profilePage.profileMail, infoPro.userLogin), profilePage.waitHigh).then(function () {
                        profilePage.phoneNumber.clear();
                        browser.sleep(2000);
                        profilePage.phoneNumber.sendKeys(infoPro.fakeNumber);
                        newPhoneNumber = infoPro.fakeNumber;
                        browser.wait(profilePage.EC.elementToBeClickable(profilePage.updateProfile), 5000).then(function () {
                            profilePage.updateProfile.click();
                        });
                    });
                });
            }
            function verifyChangePhoneNumber() {
                profilePage.phoneNumber.getAttribute('value').then(function (number) {
                    n = number.replace(/ /g, "");
                    console.log(n);
                    if (n == newPhoneNumber) {
                        console.log('Mise à jour du némero de téléphone OK');
                        browser.sleep(profilePage.wait4Anim);
                    } else {
                        console.log("!!! Les numéros ne correspondent pas !!!");
                    }
                });
            }

            // Modification de la description
            function changeDescription() {
                browser.wait(profilePage.EC.visibilityOf(profilePage.bottomAlert), profilePage.waitHigh).then(function () {
                    browser.wait(profilePage.EC.visibilityOf(profilePage.closeAlertMsg), profilePage.waitHigh).then(function () {
                        profilePage.closeAlertMsg.click().then(function () {
                            browser.wait(profilePage.EC.textToBePresentInElementValue(profilePage.profileMail, infoPro.userLogin), profilePage.waitHigh).then(function () {
                                profilePage.description.sendKeys(" " + profilePage.todayDate);
                                dateToCompare = profilePage.todayDate;
                                browser.wait(profilePage.EC.elementToBeClickable(profilePage.updateDescProfile), 5000).then(function () {
                                    profilePage.updateDescProfile.click();
                                });
                            });
                        });
                    });
                });
            }
            function verifyDateModification() {
                browser.wait(profilePage.EC.presenceOf(profilePage.description), profilePage.waitMedium, "Timeout : " + profilePage.waitMedium + " in " + "presenceOf(--newModifiedText--)").then(function () {
                    profilePage.description.getText().then(function (txt) {
                        textToCompare = txt;
                        endTextToCompare = textToCompare.slice(-dateToCompare.length);
                        if (endTextToCompare == dateToCompare) {
                            console.log("------------- Correspondance entre les deux dates : " + endTextToCompare + " et " + dateToCompare + " OK");
                        } else {
                            console.log("------------- LES DATES NE CORRESPONDENT PAS : " + endTextToCompare + " et " + dateToCompare);
                        }
                        console.log("-------------- Fin du Test, résultat : OK");
                    });
                });
            }

            // Ajout d'un document todo envoi de document impossible !
            /*function sendCertification () {
                var fileToUpload = '/img.png';
                var absolutePath = path.resolve(fileToUpload);
                console.log(absolutePath);
                $('input[type="file"]').sendKeys(absolutePath);
                profilePage.certificationADD.click();
                browser.sleep(2000);
                browser.sleep(10000);
            }*/

            // Modification des domaines de compétence
            function changeSkill() {
                profilePage.skillCategory.get(profilePage.n).click();
                browser.wait(profilePage.EC.elementToBeClickable(profilePage.updateActivitiesProfile), 5000).then(function () {
                    profilePage.updateActivitiesProfile.click();
                    browser.sleep(1000);
                });
            }
        }
    );
});


(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AdminProDetailsController', AdminProDetailsController);

    function AdminProDetailsController($rootScope, $scope, networkService, alertMsg, Upload, cloudinary, uiGmapGoogleMapApi, $state, $stateParams, screenSize, $auth, $localStorage, $timeout, $filter, ngTableParams) {

        if ($localStorage.user && !$localStorage.user.isAdmin) {
            $state.go("home");
        }

        $rootScope.pageName = "Détail du pro";
        $rootScope.updateProfile();

        var vm = this;

        vm.isXsmall = function () {
            return screenSize.is('xs');
        };

        vm.updating = false;

        vm.profileInfo = {};
        vm.workArea = {};
        vm.aboutMe = "";
        vm.portfolio = {};
        vm.verifications = {};
        vm.activities = {};
        vm.now = new Date();
        vm.Year = vm.now.getFullYear();
        vm.error = {
            password: {flag: false, message: ""},
            activities: {flag: false, message: ""},
            verif: {flag: false, message: ""},
            profile: {flag: false, message: ""}
        };

        vm.years = generateYears();

        function generateYears() {
            var res = [];
            for (var i = 0; i < (parseInt(vm.Year) - 1949); i++) {
                res.push(1950 + i);
            }
            return res;
        }

        vm.updateProfile = function () {
            var f = false;
            if (!vm.profileInfo.user.firstName || //
                !vm.profileInfo.user.lastName || //
                !vm.profileInfo.phoneNumber || //
                !vm.profileInfo.user.email || //
                !vm.profileInfo.activityStartedYear || //
                !vm.profileInfo.company.name || //
                !vm.profileInfo.company.siret || //
                !vm.profileInfo.company.address.address) {

                f = true;
            }
            if (!f) {
                vm.error.profile.flag = false;
                vm.updating = true;
                networkService.adminProProfilePUT($stateParams.professionnalId, vm.profileInfo, function (res) {
                    vm.updating = false;
                    vm.profileInfo = res;
                    vm.profile.status = res.status;
                    vm.profile.user.firstName = res.user.firstName;
                    vm.profile.user.lastName = res.user.lastName;
                    vm.profile.user.avatar = angular.copy(res.user.avatar);
                    vm.profile.phoneNumber = res.phoneNumber;
                    vm.profile.user.email = res.user.email;
                    vm.profile.activityStartedYear = res.activityStartedYear;
                    vm.profile.company.name = res.company.name;
                    vm.profile.company.siret = res.company.siret;
                    vm.profile.company.address = angular.copy(res.company.address);
                    vm.profile.company.phone = res.company.phone;
                    alertMsg.send("Profil mis à jour avec succès", "success");
                }, errorProfilePUT, true);
            }
            else {
                alertMsg.send("Veuillez vérifier les informations que vous avez renseigné", "danger");
            }
        };

        vm.updateAboutMe = function () {
            vm.updating = true;
            networkService.adminProAboutMePUT($stateParams.professionnalId, vm.about, function (res) {
                vm.about = angular.copy(res);
                vm.profile.aboutMe = res.aboutMe;
                vm.profile.status = res.status;
                vm.updating = false;
                alertMsg.send("Description enregistrée avec succès", "success");
            }, function () {
                vm.updating = false;
                alertMsg.send("Votre description est trop courte", "danger");
            }, true);
        };

        vm.updateWorkArea = function () {
            vm.updating = true;
            networkService.adminProWorkAreaPUT($stateParams.professionnalId, vm.workArea, succesWorkareaPUT, errorWorkareaPUT, true);
        };

        vm.updateVerifications = function () {
            vm.verifications = vm.verifications || [];
            if (vm.verifications.filter(function (obj) {
                    return obj.name === 'BUSINESS_REGISTRATION';
                })[0]
                &&
                vm.verifications.filter(function (obj) {
                    return obj.name === 'INSURANCE';
                })[0]
            ) {
                vm.error.verif.flag = false;
                vm.updating = true;
                networkService.adminProVerificationsPUT($stateParams.professionnalId, vm.verifications, function (res) {
                    vm.verifications = res.verifications;
                    vm.profile.verifications = res.verifications;
                    vm.profile.status = res.status;
                    vm.updating = false;
                    alertMsg.send("Les vérifications ont été modifiées avec succès", "success");
                }, errorProfilePUT, true);
            } else {
                vm.error.verif.message = "Merci de fournir un scan de votre KBIS et certificat d'assurance, " +
                    "une fois que nous les aurons vérifié, vous pourrez répondre à toutes les offres.";
                vm.error.verif.flag = true;
            }
        };

        vm.updateActivities = function () {
            if (vm.activities.length > 0) {
                vm.error.activities.flag = false;
                vm.updating = true;
                networkService.adminProActivitiesPUT($stateParams.professionnalId, vm.activities, function (res) {
                    vm.activities = res.activities;
                    vm.profile.activities = res.activities;
                    vm.profile.status = res.status;
                    vm.updating = false;
                    alertMsg.send("Vos domaines d'activité ont été modifié avec succès", "success");
                }, errorProfilePUT, true);
            }
            else {
                vm.error.activities.message = "Vous devez indiquer au moins une de vos compétences.";
                vm.error.activities.flag = true;
            }
        };

        vm.updatePortfolio = function () {
            vm.updating = true;
            networkService.adminProPortfolioPUT($stateParams.professionnalId, vm.portfolio, function (res) {
                vm.portfolio = res.portfolio;
                vm.profile.portfolio = res.portfolio;
                vm.profile.status = res.status;
                vm.editFlag = false;
                vm.updating = false;
                alertMsg.send("Le portfolio à été modifié avec succès", "success");
            }, errorProfilePUT, true);
        };

        vm.cancelProfile = function () {
            vm.error.profile.flag = false;
            vm.profileInfo = {
                phoneNumber: angular.copy(vm.profile.phoneNumber),
                user: angular.copy(vm.profile.user),
                activityStartedYear: angular.copy(vm.profile.activityStartedYear),
                company: angular.copy(vm.profile.company)
            };
        };

        vm.cancelAboutMe = function () {
            vm.about = {aboutMe: angular.copy(vm.profile.aboutMe)};
        };

        vm.cancelWorkArea = function () {
            vm.workArea = angular.copy(vm.profile.workArea);
            displayWorkArea();
        };

        vm.cancelVerifications = function () {
            vm.error.verif.flag = false;
            vm.verifications = angular.copy(vm.profile.verifications);
        };

        vm.cancelActivities = function () {
            vm.error.activities.flag = false;
            vm.activities = angular.copy(vm.profile.activities);
        };

        vm.cancelPortfolio = function () {
            vm.portfolio = angular.copy(vm.profile.portfolio);
            vm.editFlag = false;
        };

        vm.uploadPortfolio = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Taille maximum : 20Mo.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    vm.updating = true;
                    file.upload = Upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                            upload_preset: cloudinary.config().upload_preset,
                            tags: 'myPortfolio',
                            context: 'photo=' + $scope.title,
                            file: file,
                            resource_type: 'image'
                        }
                    }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                    }).success(function (data, status, headers, config) {
                        vm.updating = false;
                        vm.portfolio = vm.portfolio || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        vm.portfolio.push({cloudinaryPublicId: data.public_id});
                    }).error(function (data, status, headers, config) {
                        vm.updating = false;
                        alertMsg.send("Impossible d'envoyer l'image", "danger");
                    });
                }
            });
        };

        vm.indexOfObject = function (a, token, tab) {
            var res = [];

            if (angular.isDefined(tab)) {
                for (var i = 0; i < tab.length; i++) {
                    if (tab[i] && tab[i][token] == a) {
                        res.push(i);
                    }
                }
            }
            return res;
        };

        vm.getVerification = function (verificationName) {

            var foundVerification = null;
            angular.forEach(vm.verifications, function (verification) {
                if (verification.name && verification.name == verificationName) {
                    foundVerification = verification;
                }
            });
            return foundVerification;
        };

        vm.actionActivities = function (s) {
            var res = null;
            if ((res = vm.indexOfObject(s, 'code', vm.activities)).length == 0) {
                if (!vm.activities) {
                    vm.activities = [];
                }
                vm.activities.push({code: s});
            }
            else {
                for (var i = 0; i < res.length; i++) {
                    vm.activities.splice(res[i], 1);
                }
            }
        };

        vm.changePassword = function () {
            vm.pwd1 = vm.pwd1 || "";
            vm.pwd2 = vm.pwd2 || "";
            if (vm.pwd1.length < 6) {
                vm.error.password.message = "Password min length 6.";
                vm.error.password.flag = true;
            }
            else {
                vm.error.password.flag = false;
                var formData = {
                    currentPassword: vm.pwdCurrent,
                    newPassword: vm.pwd1
                };
                if (vm.pwd2 === vm.pwd1) {
                    vm.updating = true;
                    networkService.adminChangePassword($stateParams.professionnalId, formData, function (res) {
                        alertMsg.send("Mot de passe modifié avec succès", "success");
                        vm.updating = false;
                    }, function (res) {
                        vm.updating = false;
                        alertMsg.send("Impossible de modifier le mot de passe", "danger");
                    }, true);
                }
                else {
                    vm.error.password.message = "Les deux mots de passe ne correspondent pas";
                    vm.error.password.flag = true;
                }
            }
        };

        vm.uploadVerifications = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Taille maximum : 20Mo.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    vm.updating = true;
                    file.upload = Upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                            upload_preset: cloudinary.config().upload_preset,
                            tags: 'verifications',
                            context: 'file=' + $scope.title,
                            file: file
                        }
                    }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                    }).success(function (data, status, headers, config) {
                        vm.updating = false;
                        vm.verifications = vm.verifications || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        if (vm.verifications.length > 0 && vm.verifTmp.name) {
                            var removeExistingVerificationIndex = vm.verifications.map(function (v) {
                                return v.name;
                            }).indexOf(vm.verifTmp.name);
                            ~removeExistingVerificationIndex && vm.verifications.splice(removeExistingVerificationIndex, 1);
                        }
                        vm.verifications.push({name: vm.verifTmp.name, cloudinaryPublicId: data.public_id});
                    }).error(function (data, status, headers, config) {
                        vm.updating = false;
                        alertMsg.send("Impossible d'envoyer ce fichier", "danger");
                    });
                }
            });
        };

        vm.uploadProfile = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Taille maximum : 20Mo.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    vm.updating = true;
                    file.upload = Upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                            upload_preset: cloudinary.config().upload_preset,
                            tags: 'verifications',
                            context: 'file=' + $scope.title,
                            file: file,
                            resource_type: 'image'
                        }
                    }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                    }).success(function (data, status, headers, config) {
                        vm.updating = false;
                        vm.profileInfo.user.avatar = vm.profileInfo.user.avatar || {};
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        var res = null;
                        vm.profileInfo.user.avatar.cloudinaryPublicId = data.public_id;
                    }).error(function (data, status, headers, config) {
                        vm.updating = false;
                        alertMsg.send("Impossible d'envoyer l'image", "danger");
                    });
                }
            });
        };

        vm.setVerif = function setVerif(name) {
            vm.verifTmp = {name: name};
        };

        vm.getProDetails = function (ignoreLoading) {
            if ($stateParams.professionnalId) {
                networkService.adminProDetailsGET($stateParams.professionnalId, succesProfileGET, errorProfileGET, ignoreLoading);
            }
            networkService.adminPartnerListGET(succesPartnerListGET, errorProfileGET, ignoreLoading);
        };

        vm.getCompatiblesProjects = function (ignoreLoading) {
            if ($stateParams.professionnalId) {
                networkService.adminProCompatibleProjectsGET($stateParams.professionnalId, successCompatiblesProjectsGET, errorCompatiblesProjectsGET, ignoreLoading);
            }
        };

        function successCompatiblesProjectsGET (res) {
            vm.compatiblesProjectsList = res;

            angular.forEach(vm.compatiblesProjectsList, function (project) {
                project.user.name = project.user.firstName + " " + project.user.lastName;

                project.place = project.address.postalCode + " " + project.address.locality;

                project.distance = (project.distance / 1000).toFixed(2);
                project.numberDistance = Number(project.distance);
                project.status = $filter('casaProfessionalStatus')(project.status);

            });
            vm.tableData = [];

            CompatibleProjectSorting();
        }

        function CompatibleProjectSorting() {
            $scope.projectTable = new ngTableParams({
                page: 1,
                count: 99999999,
                sorting: {numberDistance: "asc"}
            }, {
                total: vm.compatiblesProjectsList.length,
                counts: [],
                getData: function ($defer, params) {
                    vm.tableData = vm.compatiblesProjectsList;
                    vm.tableData = params.sorting() ? $filter('orderBy')(vm.tableData, params.orderBy()) : vm.tableData;
                    vm.tableData = params.filter() ? $filter('filter')(vm.tableData, params.filter()) : vm.tableData;
                    vm.tableData = vm.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(vm.tableData);
                }
            });
        }

        function errorCompatiblesProjectsGET() {
            alertMsg.send("Impossible de récupérer la liste des projets compatibles avec le professionnel", "danger");
        }

        vm.getProDetails(false);
        vm.getCompatiblesProjects(false);

        networkService.skillsGET(function (res) {
            vm.cat = res;
        }, function (res) {
        });

        function errorProfilePUT() {
            vm.updating = false;
            alertMsg.send("Impossible de modifier le profil", "danger");
        }

        function succesWorkareaPUT(res) {
            vm.mapEditing = false;
            vm.updating = false;
            vm.profile.status = res.status;
            alertMsg.send("La zone de notification à été modifiée avec succès", "success");
        }

        function errorWorkareaPUT() {
            vm.updating = false;
            alertMsg.send("Impossible de modifier la zone de notification", "danger");
        }

        function succesPartnerListGET(res) {
            vm.partner = res;
        }

        function succesProfileGET(res) {
            vm.profile = res;
            if (!vm.profile.activityStartedYear) {
                vm.profile.activityStartedYear = 0;
            }

            vm.contactFriendNumber = 0;
            vm.contactProNumber = 0;

            if (vm.profile.user.contacts) {
                for (var i = 0; i < vm.profile.user.contacts.length; i++) {
                    if (vm.profile.user.contacts[i].isPro) {
                        vm.contactProNumber++;
                    } else {
                        vm.contactFriendNumber++;
                    }
                }
            }

            vm.invitationFriendNumber = 0;
            vm.invitationProNumber = 0;

            if (vm.profile.user.invitations) {
                for (var i = 0; i < vm.profile.user.invitations.length; i++) {
                    if (vm.profile.user.invitations[i].isPro) {
                        vm.invitationProNumber++;
                    } else {
                        vm.invitationFriendNumber++;
                    }
                }
            }

            vm.profile.status = $filter('casaProfessionalStatus')(vm.profile.status);
            vm.profile.eligibleStatus = $filter('casaProfessionalStatus')(vm.profile.eligibleStatus);

            vm.profileInfo = {
                phoneNumber: angular.copy(vm.profile.phoneNumber),
                user: angular.copy(vm.profile.user),
                activityStartedYear: vm.profile.activityStartedYear,
                company: angular.copy(vm.profile.company)
            };
            vm.workArea = angular.copy(vm.profile.workArea);
            vm.about = {aboutMe: angular.copy(vm.profile.aboutMe)};
            vm.portfolio = angular.copy(vm.profile.portfolio);
            vm.verifications = angular.copy(vm.profile.verifications);
            vm.activities = angular.copy(vm.profile.activities);
            displayWorkArea();
        }

        vm.validatePro = function () {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Le statut du pro sera modifié",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Oui, modifier le statut",
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.adminValidateProPOST([$stateParams.professionnalId],
                        function (res) {
                            alertMsg.send("Le statut a été modifié", "info");
                            vm.getProDetails(true);
                        }, function () {
                            alertMsg.send("Impossible de modifier le statut", "danger");
                        }, true
                    );

                }
            });
        };

        function errorProfileGET(res) {
            alertMsg.send("Impossible de récupérer le profil", "danger");
        }

        vm.showProfileEditPopup = false;
        vm.showVerificationsEditPopup = false;

        vm.profileSaveButtonClicked = function () {
            if (vm.profileInfo.company.name != vm.profile.company.name ||
                vm.profileInfo.company.siret != vm.profile.company.siret) {
                vm.showProfileEditPopup = true
            } else {
                vm.updateProfile();
            }
        };

        vm.validatePopup = function () {
            if (vm.showProfileEditPopup) {
                vm.updateProfile();
            } else if (vm.showVerificationsEditPopup) {
                vm.updateVerifications();
            }
            vm.showProfileEditPopup = false;
            vm.showVerificationsEditPopup = false;
        };

        vm.closePopup = function () {
            vm.showProfileEditPopup = false;
            vm.showVerificationsEditPopup = false;
        };

        vm.showButtonsAbout = function () {
            if (!vm.about || !vm.profile || !vm.about.aboutMe) {
                return false;
            }
            return vm.about.aboutMe != vm.profile.aboutMe;
        };

        vm.showButtonsProfile = function () {

            if (!vm.profileInfo || //
                !vm.profile || //
                !vm.profile.user || //
                !vm.profileInfo.company || //
                !vm.profile.company || //
                !vm.profileInfo.user || //
                !vm.profileInfo.company.address || //
                !vm.profile.company.address) {
                return false;
            }

            if (
                !vm.profileInfo.user.firstName || //
                !vm.profileInfo.user.lastName || //
                !vm.profileInfo.phoneNumber || //
                !vm.profileInfo.user.email || //
                !vm.profileInfo.activityStartedYear || //
                !vm.profileInfo.company.name || //
                !vm.profileInfo.company.siret || //
                !vm.profileInfo.company.address.address) {
                return false;
            }

            if (!vm.profileInfo.user.avatar) {
                vm.profileInfo.user.avatar = {};
            }

            if (!vm.profile.user.avatar) {
                vm.profile.user.avatar = {};
            }

            return (vm.profileInfo.user.firstName != vm.profile.user.firstName ||
                vm.profileInfo.user.lastName != vm.profile.user.lastName ||
                vm.profileInfo.phoneNumber != vm.profile.phoneNumber ||
                vm.profileInfo.user.email != vm.profile.user.email ||
                vm.profileInfo.user.avatar.cloudinaryPublicId != vm.profile.user.avatar.cloudinaryPublicId ||
                vm.profileInfo.activityStartedYear != vm.profile.activityStartedYear ||
                vm.profileInfo.company.name != vm.profile.company.name ||
                vm.profileInfo.company.siret != vm.profile.company.siret ||
                vm.profileInfo.company.address.address != vm.profile.company.address.address ||
                vm.profileInfo.company.phone != vm.profile.company.phone
            );
        };

        vm.showButtonsVerifications = function () {
            if (!vm.profile) {
                return false;
            }

            if (!vm.verifications) {
                vm.verifications = [];
            }

            if (!vm.profile.verifications) {
                vm.profile.verifications = [];
            }

            if (vm.indexOfObject('BUSINESS_REGISTRATION', 'name', vm.verifications).length == 0 ||
                vm.indexOfObject('INSURANCE', 'name', vm.verifications).length == 0) {
                return false;
            }

            if (vm.verifications.length != vm.profile.verifications.length) {
                return true;
            }

            for (var i = 0; i < vm.verifications.length; i++) {
                if (vm.verifications[i].name != vm.profile.verifications[i].name ||
                    vm.verifications[i].cloudinaryPublicId != vm.profile.verifications[i].cloudinaryPublicId) {
                    return true;
                }
            }
            return false;
        };

        vm.showButtonsNewPassword = function () {
            if (!vm.pwdCurrent || !vm.pwd1 || !vm.pwd2) {
                return false;
            }

            return (vm.pwd1 == vm.pwd2);
        };

        vm.showButtonsWorkArea = function () {
            return vm.mapEditing;
        };

        vm.showButtonsPortfolio = function () {
            if (!vm.profile) {
                return false;
            }

            if (!vm.portfolio) {
                vm.portfolio = [];
            }

            if (!vm.profile.portfolio) {
                vm.profile.portfolio = [];
            }

            if (vm.portfolio.length != vm.profile.portfolio.length) {
                return true;
            }

            for (var i = 0; i < vm.portfolio.length; i++) {
                if (!vm.portfolio[i].description) {
                    vm.portfolio[i].description = "";
                }
                if (!vm.profile.portfolio[i].description) {
                    vm.profile.portfolio[i].description = "";
                }
                if (vm.portfolio[i].description != vm.profile.portfolio[i].description ||
                    vm.portfolio[i].cloudinaryPublicId != vm.profile.portfolio[i].cloudinaryPublicId) {
                    return true;
                }
            }
            return false;
        };

        vm.editFlag = false;

        vm.saveComment = function () {
            $timeout(function () {
                $('html').trigger('click');
            });
        };

        vm.descriptionChanged = function (image) {
            image.description = image.description.replace(/\n/g, ' ');
            if (image.length > 140) {
                image = image.substring(0, 140);
            }
        };

        vm.removeImage = function (imageIndex) {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Voulez-vous vraiment supprimer cette image ?",
                type: "warning",
                confirmButtonColor: "#f44336",
                confirmButtonText: "Oui, je veux la supprimer",
                showCancelButton: true,
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    vm.portfolio.splice(imageIndex, 1);
                    $scope.$applyAsync();
                }
            });
        };

        vm.getStringLength = function (str) {
            if (!str) {
                return 0;
            }
            return str.length;
        };

        vm.showButtonsActivities = function () {

            if (!vm.profile) {
                return false;
            }

            if (!vm.activities) {
                vm.activities = [];
            }

            if (!vm.profile.activities) {
                vm.profile.activities = [];
            }

            if (vm.activities.length != vm.profile.activities.length) {
                return true;
            }

            for (var i = 0; i < vm.activities.length; i++) {
                if (vm.activities[i]) {
                    if (!vm.activities[i].code) {
                        vm.activities[i].code = "";
                    }
                    if (!vm.profile.activities[i].code) {
                        vm.profile.activities[i].code = "";
                    }
                    if (vm.activities[i].code != vm.profile.activities[i].code) {
                        return true;
                    }
                }
            }
            return false;
        };

        $scope.$on('$stateChangeStart', function (event) {

            if (vm.showButtonsAbout() ||
                vm.showButtonsProfile() ||
                vm.showButtonsPortfolio() ||
                vm.showButtonsActivities() ||
                vm.showButtonsNewPassword() ||
                vm.showButtonsVerifications() ||
                vm.showButtonsWorkArea()) {
                if (confirm("Vous avez des modification en cours non sauvegardées. Voulez-vous vraiment quiter cette page ?\nCliquez sur Annuler pour rester sur cette page ou sur OK pour la quitter.")) {
                    return;
                }
                event.preventDefault();
            }
        });

        vm.infosCardIsComplete = function () {
            return (vm.profile &&
            vm.profile.user &&
            vm.profile.user.firstName &&
            vm.profile.user.lastName &&
            vm.profile.phoneNumber &&
            vm.profile.user.email &&
            vm.profile.activityStartedYear &&
            vm.profile.company.name &&
            vm.profile.company.siret &&
            vm.profile.company.address.address);
        };

        vm.descriptionCardIsComplete = function () {
            return (vm.profile &&
            vm.profile.aboutMe);
        };

        vm.verificationsCardIsComplete = function () {
            return (vm.profile &&
            vm.indexOfObject('BUSINESS_REGISTRATION', 'name', vm.profile.verifications).length > 0 &&
            vm.indexOfObject('INSURANCE', 'name', vm.profile.verifications).length > 0);
        };

        vm.portfolioCardIsComplete = function () {
            return (vm.profile &&
            vm.profile.portfolio &&
            vm.profile.portfolio.length > 0);
        };

        //
        //
        //
        //
        // Map Stuff
        //
        //
        //
        //

        vm.mapShowMinimumZoomMessage = false;
        vm.mapEditing = false;
        vm.workareaDiameter = 0;

        function rad(x) {
            return x * Math.PI / 180;
        }

        function getDistance(p1, p2) {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(p2.latitude - p1.latitude);
            var dLong = rad(p2.longitude - p1.longitude);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // returns the distance in meter
            return d;
        }

        function getMinimumWidthOrHeight() {

            var map = vm.map.control.getGMap();
            var bounds = map.getBounds();
            var center = map.getCenter();

            var width = getDistance(
                {
                    latitude: center.lat(),
                    longitude: bounds.getSouthWest().lng()
                },
                {
                    latitude: center.lat(),
                    longitude: bounds.getNorthEast().lng()
                }
            );

            var height = getDistance(
                {
                    latitude: bounds.getSouthWest().lat(),
                    longitude: center.lng()
                },
                {
                    latitude: bounds.getNorthEast().lat(),
                    longitude: center.lng()
                }
            );

            if (width < height) {
                return width;
            } else {
                return height;
            }
        }

        var canStartEditionWithZoom = false;
        var firstZoom = true;

        setTimeout(function () {
            loadMap();
            setTimeout(function () {
                displayWorkArea();
            }, 1000);
        }, 1000);

        function loadMap() {
            uiGmapGoogleMapApi.then(function (maps) {
                vm.map = {
                    center: {
                        latitude: 46.5945259,
                        longitude: 2.4623584
                    },
                    bounds: {},
                    zoom: 6,
                    events: {
                        "idle": function () {
                            if (vm.mapEditing) {
                                setTimeout(function () {
                                    var circleRadius = (getMinimumWidthOrHeight() / 2) * 0.9;
                                    vm.circle.radius = circleRadius;
                                    vm.circle.control.getCircle().setCenter(new google.maps.LatLng(vm.map.center.latitude, vm.map.center.longitude));
                                    vm.circle.control.getCircle().setRadius(circleRadius);
                                    vm.workArea.radius = circleRadius;
                                    vm.workArea.latitude = vm.map.center.latitude;
                                    vm.workArea.longitude = vm.map.center.longitude;
                                    var bnds = vm.circle.control.getCircle().getBounds();
                                    vm.workArea.swLatitude = bnds.getSouthWest().lat();
                                    vm.workArea.swLongitude = bnds.getSouthWest().lng();
                                    vm.workArea.neLatitude = bnds.getNorthEast().lat();
                                    vm.workArea.neLongitude = bnds.getNorthEast().lng();
                                    vm.workareaDiameter = Math.ceil((circleRadius * 2) / 1000);
                                }, 0);
                            }
                        },
                        "dragstart": function () {
                            vm.mapEditing = true;
                        },
                        "zoom_changed": function () {
                            /*
                             if (canStartEditionWithZoom && firstZoom) {
                             firstZoom = false;
                             } else if (canStartEditionWithZoom && !firstZoom) {
                             vm.mapEditing = true;
                             }
                             */
                        }
                    },
                    control: {}
                };
                vm.circle =
                {
                    id: 1,
                    center: {
                        latitude: 0,
                        longitude: 0
                    },
                    radius: 10,
                    stroke: {
                        color: '#03A9F4',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: '#03A9F4',
                        opacity: 0.15
                    },
                    visible: false,
                    control: {},
                    bounds: {}
                };
                vm.mapOptions = {
                    minZoom: 6,
                    maxZoom: 13,
                    scrollwheel: false,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.TOP_LEFT,
                        mapTypeIds: [
                            google.maps.MapTypeId.ROADMAP,
                            google.maps.MapTypeId.HYBRID
                        ]
                    }
                };
                $scope.$watch(
                    function () {
                        return vm.map.zoom;
                    },
                    function (newValue, oldValue) {
                        if (vm.mapEditing) {
                            if (newValue < 9) {
                                vm.mapShowMinimumZoomMessage = true;
                                vm.circle.visible = false;
                            } else {
                                vm.mapShowMinimumZoomMessage = false;
                                vm.circle.visible = true;
                            }
                        } else {
                            vm.mapShowMinimumZoomMessage = false;
                            vm.circle.visible = true;
                        }
                        if (!vm.mapEditing && newValue - oldValue > 1) {
                            vm.map.zoom = newValue + 1;
                            canStartEditionWithZoom = true;
                        }
                    }
                );
                vm.map.bounds = {
                    'southwest': {
                        'latitude': vm.workArea.swLatitude,
                        'longitude': vm.workArea.swLongitude
                    },
                    'northeast': {
                        'latitude': vm.workArea.neLatitude,
                        'longitude': vm.workArea.neLongitude
                    }
                };
                if (vm.mapEditing) {
                    if (vm.map.zoom < 9) {
                        vm.mapShowMinimumZoomMessage = true;
                        vm.circle.visible = false;
                    } else {
                        vm.mapShowMinimumZoomMessage = false;
                        vm.circle.visible = true;
                    }
                } else {
                    vm.mapShowMinimumZoomMessage = false;
                    vm.circle.visible = true;
                }
            });
        }

        function displayWorkArea() {
            if (vm.map) {
                vm.map.bounds = {
                    'southwest': {
                        'latitude': vm.workArea.swLatitude,
                        'longitude': vm.workArea.swLongitude
                    },
                    'northeast': {
                        'latitude': vm.workArea.neLatitude,
                        'longitude': vm.workArea.neLongitude
                    }
                };
                vm.circle.center = {
                    latitude: vm.workArea.latitude,
                    longitude: vm.workArea.longitude
                };
                vm.circle.radius = vm.workArea.radius;
                vm.workareaDiameter = Math.ceil((vm.workArea.radius * 2) / 1000);
                $scope.$applyAsync();
            }
        }

        //
        //
        //
        //
        // End Map Stuff
        //
        //
        //
        //

        vm.attachGoogle = function () {
            $auth.authenticate('googleLoginAttach').then(function (res) {
                if (res.data && res.data.status && res.data.status == "ok") {
                    $rootScope.updateProfile();
                } else {
                    alertMsg.send("Impossible d'associer le compte Google", 'danger');
                }
            }).catch(function (res) {
                alertMsg.send("Impossible d'associer le compte Google", 'danger');
            });
        };

        vm.attachFacebook = function () {
            $auth.authenticate('facebookLoginAttach').then(function (res) {
                if (res.data && res.data.status && res.data.status == "ok") {
                    $rootScope.updateProfile();
                } else {
                    alertMsg.send("Impossible d'associer le compte Facebook", 'danger');
                }
            }).catch(function (res) {
                alertMsg.send("Impossible d'associer le compte Facebook", 'danger');
            });
        };

        vm.detachGoogle = function () {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Vous ne pourrez plus vous connecter automatiquement via votre compte Google",
                type: "warning",
                confirmButtonColor: "#f44336",
                confirmButtonText: "Oui",
                showCancelButton: true,
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.loginGoogleDetach(function () {
                        $rootScope.updateProfile();
                    }, function () {
                        alertMsg.send("Impossible d'effectuer cette action", "danger");
                    }, true);
                }
            });
        };

        vm.detachFacebook = function () {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Vous ne pourrez plus vous connecter automatiquement via votre compte Facebook",
                type: "warning",
                confirmButtonColor: "#f44336",
                confirmButtonText: "Oui",
                showCancelButton: true,
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.loginFacebookDetach(function () {
                        $rootScope.updateProfile();
                    }, function () {
                        alertMsg.send("Impossible d'effectuer cette action", "danger");
                    }, true);
                }
            });
        };

        vm.invalidatePro = function (proId, requiredRefusedMessage) {
            var data = {
                "refusedReason": requiredRefusedMessage
            };
            swal({
                title: "Êtes-vous sûr ?",
                text: "Le professionnel sera bloqué",
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Oui, bloquer le professionnel",
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.adminInvalidateProPOST(proId, data,
                        function (res) {
                            alertMsg.send("Le pro a été bloqué", "info");
                            vm.getProDetails(true);
                        }, function () {
                            alertMsg.send("Impossible de bloquer le pro", "danger");
                        }, true
                    );

                }
            });
        };

        vm.setMainPartner = function () {
            networkService.adminSetMainPartnerPUT(vm.profile.id, vm.selectedPartner.id,
                function (res) {
                    alertMsg.send("Le partenaire du professionnel a été mise à jour", "info");
                    vm.getProDetails(true);
                },
                function () {
                    alertMsg.send("Impossible de modifier le partenaire", "danger");
                }, true
            );
        };
    }
})();

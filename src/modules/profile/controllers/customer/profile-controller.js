(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProfileCustomerController', ProfileController);

    function ProfileController($rootScope, $scope, networkService, alertMsg, $state, screenSize, $localStorage, Upload, cloudinary, $auth) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        $rootScope.pageName = "Mon profil";
        $rootScope.updateProfile();

        var vm = this;

        vm.isXsmall = function () {
            return screenSize.is('xs');
        };

        vm.updating = false;
        vm.updatingcommu = false;


        vm.profileInfo = {};
        vm.now = new Date();

        vm.updateProfile = updateProfile;
        vm.cancelProfile = cancelProfile;
        vm.changePassword = changePassword;

        networkService.profileGET(succesProfileGET, errorProfileGET);

        function changePassword() {
            vm.pwd1 = vm.pwd1 || "";
            vm.pwd2 = vm.pwd2 || "";
            var formData = {
                currentPassword: vm.pwdCurrent,
                newPassword: vm.pwd1
            };
            if (vm.pwd2 === vm.pwd1) {
                vm.updating = true;
                networkService.changePassword(formData, function (res) {
                    alertMsg.send("Mot de passe modifié avec succès", "success");
                    vm.updating = false;
                }, function (res) {
                    vm.updating = false;
                    alertMsg.send("Impossible de modifier le mot de passe", "danger");
                }, true);
            }
        }

        function updateProfile() {
            var f = false;
            if (!vm.profileInfo.firstName || //
                !vm.profileInfo.lastName || //
                !vm.profileInfo.phoneNumber || //
                !vm.profileInfo.gender || //
                !vm.profileInfo.email) {

                f = true;
            }
            if (!f) {
                vm.updating = true;
                networkService.profilePUT(vm.profileInfo, function (res) {
                    vm.updating = false;
                    vm.profileInfo = res;
                    vm.profile.firstName = res.firstName;
                    vm.profile.lastName = res.lastName;
                    vm.profile.avatar = angular.copy(res.avatar);
                    vm.profile.phoneNumber = res.phoneNumber;
                    vm.profile.gender = res.gender;
                    vm.profile.email = res.email;
                    alertMsg.send("Profil mis à jour avec succès", "success");
                }, errorProfilePUT, true);
            }
            else {
                alertMsg.send("Veuillez vérifier les informations que vous avez renseigné", "danger");
            }
        }


        vm.uploadProfileImg = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Taille maximum : 20Mo.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
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
                        vm.profileInfo.avatar = vm.profileInfo.avatar || {};
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        var res = null;
                        vm.profileInfo.avatar.cloudinaryPublicId = data.public_id;
                        networkService.updateAvatarPUT(vm.profileInfo, function (res) {
                            alertMsg.send("L'image a été mise à jour avec succès", "success");
                        }, errorAvatarPUT, true);
                    }).error(function (data, status, headers, config) {
                        alertMsg.send("Impossible d'envoyer l'image", "danger");
                    });
                }
            });
        };

        function cancelProfile() {
            vm.profileInfo = angular.copy(vm.profile);
        }

        function errorProfilePUT() {
            vm.updating = false;
            alertMsg.send("Impossible de modifier le profil", "danger");
        }

        function errorAvatarPUT() {
            alertMsg.send("Impossible de mettre à jour votre photo", "danger");
        }

        function succesProfileGET(res) {
            vm.profile = angular.copy(res);
            vm.profileInfo = angular.copy(res);
        }

        function errorProfileGET(res) {
            alertMsg.send("Impossible de récupérer le profil", "danger");
        }

        vm.showButtonsProfile = function () {

            if (!vm.profileInfo || //
                !vm.profile) {
                return false;
            }

            if (
                !vm.profileInfo.firstName || //
                !vm.profileInfo.lastName || //
                !vm.profileInfo.gender || //
                !vm.profileInfo.phoneNumber || //
                !vm.profileInfo.email) {
                return false;
            }

            if (!vm.profileInfo.avatar) {
                vm.profileInfo.avatar = {};
            }

            if (!vm.profile.avatar) {
                vm.profile.avatar = {};
            }

            return (vm.profileInfo.firstName != vm.profile.firstName ||
                vm.profileInfo.lastName != vm.profile.lastName ||
                vm.profileInfo.gender != vm.profile.gender ||
                vm.profileInfo.phoneNumber != vm.profile.phoneNumber ||
                vm.profileInfo.email != vm.profile.email
            );
        };

        vm.showButtonsNewPassword = function () {
            if (!vm.pwdCurrent || !vm.pwd1 || !vm.pwd2) {
                return false;
            }

            return (vm.pwd1 == vm.pwd2);
        };

        vm.descriptionChanged = function (image) {
            image.description = image.description.replace(/\n/g, ' ');
            if (image.length > 140) {
                image = image.substring(0, 140);
            }
        };

        vm.getStringLength = function (str) {
            if (!str) {
                return 0;
            }
            return str.length;
        };

        $scope.$on('$stateChangeStart', function (event) {

            if (vm.showButtonsNewPassword() ||
                vm.showButtonsProfile()) {
                if (confirm("Vous avez des modification en cours non sauvegardées. Voulez-vous vraiment quiter cette page ?\nCliquez sur Annuler pour rester sur cette page ou sur OK pour la quitter.")) {
                    return;
                }
                event.preventDefault();
            }
        });

        vm.infosCardIsComplete = function () {
            return (vm.profile &&
            vm.profile.gender &&
            vm.profile.firstName &&
            vm.profile.lastName &&
            vm.profile.defaultAddress &&
            vm.profile.defaultAddress.address &&
            vm.profile.phoneNumber &&
            vm.profile.email);
        };

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

        vm.autocomplete = {
            options: {
                types: ['address'],
                componentRestrictions: {country: 'fr'}
            },
            cityOptions: {
                types: ['(cities)'],
                componentRestrictions: {country: 'fr'}
            }
        };

        networkService.communitiesGET(successCommunitiesGET, errorCommunitiesGET);

        function successCommunitiesGET(res) {
            vm.communities = res;
        }

        vm.getCommunityByType = function (type) {
            if (vm.communities) {
                for (var i = 0; i < vm.communities.length; i++) {
                    if (type == vm.communities[i].type) {
                        return vm.communities[i];
                    }
                }
            }
        };

        function errorCommunitiesGET(res) {
            alertMsg.send("Impossible de récupérer les communautés", "danger");
        }

        vm.updateCommunities = function () {
            networkService.communitiesPUT(vm.communities, function (res) {
                alertMsg.send("Les communautés ont été mises à jour", "success");
            }, errorProfilePUT, true);
        };

        vm.cancelCommunitiesUpdate = function () {
            networkService.communitiesGET(successCommunitiesGET, errorCommunitiesGET, true);
        };

        vm.disabledCom = function () {
            if (!vm.communities) {
                return false;
            }
            return !(vm.getCommunityByType('PROFILE_CITY').address.address &&
            ((!vm.getCommunityByType('JOB').name && !vm.getCommunityByType('JOB').address.address) ||
            (vm.getCommunityByType('JOB').name && vm.getCommunityByType('JOB').address.address)) &&
            ((!vm.getCommunityByType('OTHER').name && !vm.getCommunityByType('OTHER').address.address) ||
            (vm.getCommunityByType('OTHER').name && vm.getCommunityByType('OTHER').address.address)) );
        };


    }
})();

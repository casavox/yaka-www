(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProfileCustomerController', ProfileController);

    function ProfileController($rootScope, $scope, networkService, alertMsg, $state, $localStorage, Upload, cloudinary) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        $rootScope.pageName = "Mon profil";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;

        vm.updating = false;

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
                });
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
                }, errorProfilePUT);
            }
            else {
                alertMsg.send("Veuillez vérifier les informations que vous avez renseigné", "danger");
            }
        }


        vm.uploadProfileImg = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Taille maximum : 5Mo.", "danger");
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
                        vm.profileInfo.avatar = vm.profileInfo.avatar || {};
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        var res = null;
                        vm.profileInfo.avatar.cloudinaryPublicId = data.public_id;
                    }).error(function (data, status, headers, config) {
                        console.log(5);
                        vm.updating = false;
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
                vm.profileInfo.email != vm.profile.email ||
                vm.profileInfo.avatar.cloudinaryPublicId != vm.profile.avatar.cloudinaryPublicId
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

    }
})();
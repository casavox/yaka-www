(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProfileCustomerController', ProfileController);

    //
    //Controller login
    function ProfileController($scope, networkService, alertMsg, Upload, cloudinary) {
        var vm = this;
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

        networkService.profileGET(succesProfileGET, errorProfileGET);

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
                if (vm.pwd2 === vm.pwd1)
                    networkService.changePassword(formData, function (res) {
                        alertMsg.send("Password updated.", "success");
                    }, function (res) {
                        alertMsg.send("Error password not changed", "danger");
                    });
                else {
                    vm.error.password.message = "Password not confirmed.";
                    vm.error.password.flag = true;
                }
            }
        };



        vm.indexOfObject = function (a, token, tab) {
            var res = [];
            if (angular.isDefined(tab)) {
                for (var i = 0; i < tab.length; i++) {
                    if (tab[i][token] == a)
                        res.push(i);
                }
            }
            return res;
        };


        vm.setVerif = function (name) {
            vm.verifTmp = {name: name};
        };

        vm.uploadProfile = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Error : max size 5MB.", "danger");
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
                            file: file
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
                    }).error(function (data, status, headers, config) {
                        alertMsg.send("Error : Upload failed.", "danger");
                    });
                }
            });
        };


        vm.updateProfile = function () {
            var f = false;
            angular.forEach(vm.profileInfo, function (value, key) {
                if (angular.isUndefined(value) || !value)
                    f = true;
            });
            if (!f) {
                vm.error.profile.flag = false;
                networkService.proProfilePUT(vm.profileInfo, function (res) {
                    vm.profileInfo = res;
                    alertMsg.send("Profile updated.", "success");
                }, errorProfilePUT);
            }
            else {
                vm.error.profile.message = "All is mandatory.";
                vm.error.profile.flag = true;
            }

        };

        vm.updateAboutMe = function () {
            networkService.proAboutMePUT(vm.about, function (res) {
                vm.about = angular.copy(res);
                alertMsg.send("Description updated.", "success");
            }, errorProfilePUT);
        };

        vm.cancelProfile = function () {
            vm.error.profile.flag = false;
            vm.profileInfo = {
                phoneNumber: angular.copy(vm.phoneNumber),
                firstName: angular.copy(vm.profile.firstName),
                lastName: angular.copy(vm.profile.lastName),
                avatar: angular.copy(vm.profile.avatar),
                defaultAddress: angular.copy(vm.profile.defaultAddress),
                addresses: angular.copy(vm.profile.addresses)
            };
        };

        vm.cancelAboutMe = function () {
            vm.about = {aboutMe: angular.copy(vm.profile.aboutMe)};
        };


        function succesProfilePUT(res) {
            succesProfileGET(res);
            alertMsg.send("Profile updated.", "success");
        }

        function errorProfilePUT() {
            alertMsg.send("Profile not updated.", "danger");
        }

        function succesWorkareaPUT(res) {
            vm.mapEditing = false;
            alertMsg.send("Profile updated.", "success");
        }

        function errorWorkareaPUT() {
            alertMsg.send("Profile not updated.", "danger");
        }

        function succesProfileGET(res) {
            vm.profile = res;
            vm.profileInfo = {
                phoneNumber: angular.copy(vm.phoneNumber),
                firstName: angular.copy(vm.profile.firstName),
                lastName: angular.copy(vm.profile.lastName),
                avatar: angular.copy(vm.profile.avatar),
                defaultAddress: angular.copy(vm.profile.defaultAddress),
                addresses: angular.copy(vm.profile.addresses)
            };
        }

        function errorProfileGET(res) {
            alertMsg.send("Error to get the profile informations.", "danger");
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProfileCustomerController', ProfileController);

    //
    //Controller login
    ProfileController.$inject = ['$scope', 'networkService', '$localStorage', '$state', 'alertMsg', 'Upload', 'cloudinary', 'uiGmapGoogleMapApi']
    function ProfileController($scope, networkService, $localStorage, $state, alertMsg, $upload, cloudinary, uiGmapGoogleMapApi) {

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

        vm.years = yearsContent();
        vm.updateProfile = updateProfile;
        vm.updateAboutMe = updateAboutMe;
        vm.updateWorkArea = updateWorkArea;
        vm.updateVerifications = updateVerifications;
        vm.updateActivities = updateActivities;
        vm.updatePortfolio = updatePortfolio;
        vm.cancelProfile = cancelProfile;
        vm.cancelAboutMe = cancelAboutMe;
        vm.cancelWorkArea = cancelWorkArea;
        vm.cancelVerifications = cancelVerifications;
        vm.cancelActivities = cancelActivities;
        vm.cancelPortfolio = cancelPortfolio;
        vm.uploadPortfolio = uploadPortfolio;
        vm.indexOfObject = indexOfObject;
        vm.actionActivities = actionActivities;
        vm.changePassword = changePassword;
        vm.uploadVerifications = uploadVerifications;
        vm.uploadProfile = uploadProfile;
        vm.setVerif = setVerif;

        vm.mapShowMinimumZoomMessage = false;
        vm.mapEditing = false;
        vm.workareaDiameter = 0;

        function rad(x) {
            return x * Math.PI / 180;
        };

        function getDistance(p1, p2) {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(p2.latitude - p1.latitude);
            var dLong = rad(p2.longitude - p1.longitude);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d; // returns the distance in meter
        };

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
                        console.log("zoom_changed !");
                        console.log(canStartEditionWithZoom);
                        console.log(firstZoom);
                        if (canStartEditionWithZoom && firstZoom) {
                            firstZoom = false;
                        } else if (canStartEditionWithZoom && !firstZoom) {
                            vm.mapEditing = true;
                        }
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
                    color: '#00aded',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#00aded',
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
                    console.log("old : " + oldValue + ", new : " + newValue);
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

        function displayWorkArea() {
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
        };

        networkService.professionalGET(succesProfileGET, errorProfileGET);
        networkService.skillsGET(succeSkillsGET, errorSkillsGET);

        function changePassword() {
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
        }

        function actionActivities(s) {
            var res = null;
            if ((res = indexOfObject(s, 'code', vm.activities)).length == 0)
                vm.activities.push({code: s});
            else {
                for (var i = 0; i < res.length; i++) {
                    vm.activities.splice(res[i], 1);
                }
            }
        }

        function indexOfObject(a, token, tab) {
            var res = [];

            if (angular.isDefined(tab)) {
                for (var i = 0; i < tab.length; i++) {
                    if (tab[i][token] == a)
                        res.push(i);
                }
            }
            return res;
        }

        function succeSkillsGET(res) {
            vm.cat = res;
            console.log(res);
        }

        function errorSkillsGET(res) {
            console.log(res);
        }

        function uploadPortfolio(files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Error : max size 5MB.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    file.upload = $upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                            upload_preset: cloudinary.config().upload_preset,
                            tags: 'myPortfolio',
                            context: 'photo=' + $scope.title,
                            file: file
                        }
                    }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                    }).success(function (data, status, headers, config) {
                        vm.portfolio = vm.portfolio || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        vm.portfolio.push({cloudinaryPublicId: data.public_id});
                    }).error(function (data, status, headers, config) {
                        alertMsg.send("Error : Upload failed.", "danger");
                    });
                }
            });
        }

        function setVerif(name) {
            vm.verifTmp = {name: name};
        }

        function uploadVerifications(files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Error : max size 5MB.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    file.upload = $upload.upload({
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
                        vm.verifications = vm.verifications || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        var res = null;
                        if ((res = indexOfObject(vm.verifTmp, 'name', vm.verifications)).length > 0)
                            for (var i = 0; i < res.length; i++) {
                                vm.verifications.slice(res[i], 1);
                            }
                        vm.verifications.push({name: vm.verifTmp.name, cloudinaryPublicId: data.public_id});
                    }).error(function (data, status, headers, config) {
                        alertMsg.send("Error : Upload failed.", "danger");
                    });
                }
            });
        };

        function uploadProfile(files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Error : max size 5MB.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    file.upload = $upload.upload({
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

        function yearsContent() {
            var res = [];
            console.log(vm.Year);
            console.log(parseInt(vm.Year) - 1949);
            for (var i = 0; i < (parseInt(vm.Year) - 1949); i++) {
                res.push(1950 + i);
            }
            return res;
        }

        function updateProfile() {
            var f = false;
            angular.forEach(vm.profileInfo, function (value, key) {
                if (angular.isUndefined(value) || !value)
                    f = true;
            })
            angular.forEach(vm.profileInfo.company, function (value, key) {
                if (angular.isUndefined(value) || !value)
                    f = true;
            })
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

        }

        function updatePortfolio() {
            networkService.proPortfolioPUT(vm.portfolio, function (res) {
                vm.portfolio = res;
                alertMsg.send("Portfolio updated.", "success");
            }, errorProfilePUT);
        }

        function updateWorkArea() {
            networkService.proWorkAreaPUT(vm.workArea, succesWorkareaPUT, errorWorkareaPUT);
        }

        function updateAboutMe() {
            networkService.proAboutMePUT(vm.about, function (res) {
                vm.about = angular.copy(res);
                alertMsg.send("Description updated.", "success");
            }, errorProfilePUT);
        }

        function updateVerifications() {
            vm.verifications = vm.verifications || [];
            if (vm.verifications.length < 4) {
                vm.error.verif.message = "All is mandatory.";
                vm.error.verif.flag = true;
            }
            else {
                vm.error.verif.flag = false;
                networkService.proVerificationsPUT(vm.verifications, function (res) {
                    vm.verifications = res;
                    alertMsg.send("Verifications updated.", "success");
                }, errorProfilePUT);
            }
        }

        function updateActivities() {
            if (vm.activities.length > 0) {
                vm.error.activities.flag = false;
                networkService.proActivitiesPUT(vm.activities, function (res) {
                    vm.activities = res;
                    alertMsg.send("Activities updated.", "success");
                }, errorProfilePUT);
            }
            else {
                vm.error.activities.message = "Select at least one category or skill.";
                vm.error.activities.flag = true;
            }
        }

        function cancelProfile() {
            vm.error.profile.flag = false;
            vm.profileInfo = {
                firstName: angular.copy(vm.profile.firstName),
                lastName: angular.copy(vm.profile.lastName),
                phoneNumber: angular.copy(vm.profile.phoneNumber),
                user: angular.copy(vm.profile.user),
                activityStartedYear: angular.copy(vm.profile.activityStartedYear),
                company: angular.copy(vm.profile.company),
                avatar: angular.copy(vm.profile.avatar)
            };
        }

        function cancelPortfolio() {
            vm.portfolio = angular.copy(vm.profile.portfolio);
        }

        function cancelWorkArea() {
            vm.workArea = angular.copy(vm.profile.workArea);
        }

        function cancelAboutMe() {
            vm.about = {aboutMe: angular.copy(vm.profile.aboutMe)};
        }

        function cancelVerifications() {
            vm.error.verif.flag = false;
            vm.verifications = angular.copy(vm.profile.verifications);
        }

        function cancelActivities() {
            vm.error.activities.flag = false;
            vm.activities = angular.copy(vm.profile.activities);
        }

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
                firstName: angular.copy(vm.profile.firstName),
                lastName: angular.copy(vm.profile.lastName),
                phoneNumber: angular.copy(vm.profile.phoneNumber),
                user: angular.copy(vm.profile.user),
                activityStartedYear: angular.copy(vm.profile.activityStartedYear),
                company: angular.copy(vm.profile.company),
                avatar: angular.copy(vm.profile.avatar)
            };
            vm.workArea = angular.copy(vm.profile.workArea);
            vm.about = {aboutMe: angular.copy(vm.profile.aboutMe)};
            vm.portfolio = angular.copy(vm.profile.portfolio);
            vm.verifications = angular.copy(vm.profile.verifications);
            vm.activities = angular.copy(vm.profile.activities);
            displayWorkArea();
            console.log(res);
        }

        function errorProfileGET(res) {
            alertMsg.send("Error to get the profile informations.", "danger");
        }
    }
})();

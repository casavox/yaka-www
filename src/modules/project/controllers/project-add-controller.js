(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('NewProjectController', NewProjectController);

    //
    //Controller login
    function NewProjectController($scope, networkService, $rootScope, $timeout, $localStorage, $filter, $state, Upload, cloudinary, alertMsg, smoothScroll) {
        var vm = this;
        vm.user = $localStorage.user;

        $rootScope.showMenu = false;
        vm.newProject = {};
        vm.projectDescription = vm.dateType = vm.child2 = vm.child1 = vm.child3 = vm.child0 = "";
        vm.countdown = 5;
        vm.service = vm.continueAddressFlag = vm.continue = vm.dateFlag = vm.emergency = vm.popupFlag = vm.wait = false;
        vm.newAddrFlag = vm.continueImg = vm.popUpImg = false;
        vm.selectCategory = vm.disabledAddr = true;
        vm.questions = [];
        vm.material = null;
        vm.img = [];
        vm.error = {
            description: {flag: false, message: ""},
            address: {flag: false, message: ""},
            date: {flag: false, message: ""},
            material: {flag: false, message: ""}
        };
        vm.dt = new Date(); // date picker binding
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date();
        vm.maxDate = new Date();
        vm.maxDate.setDate(vm.minDate.getDate() + 180);
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        var d = new Date();
        $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
        vm.imageLoading = {
            0: false,
            1: false,
            2: false,
            3: false
        };
        $rootScope.photos = [{}, {}, {}, {}];
        vm.newAddr = {};
        var scrollOptions = {containerId: 'main-scroll-container'};
        $scope.options = {
            types: ['address'],
            componentRestrictions: {country: 'fr'}
        };
        $scope.address = {
            name: '',
            place: '',
            components: {
                placeId: '',
                streetNumber: '',
                street: '',
                city: '',
                state: '',
                countryCode: '',
                country: '',
                postCode: '',
                district: '',
                location: {
                    lat: '',
                    long: ''
                }
            }
        };
        vm.cleanAddress = angular.copy($scope.address);

        // ---------------------------------------

        networkService.activitiesGET(succesProjectsGET, errorProjectsGET);
        networkService.profileGET(succesProfileGET, errorProfileGET);


        vm.limitLength = function (obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        };

        vm.verifDescription = function () {
            if (vm.projectDescription.length < 3) {
                vm.continue = false;
                vm.continueImg = false;
                vm.img = [];
                vm.continueAddressFlag = false;
                vm.error.description.flag = true;
                vm.error.description.message = "Add a description of your needs";

            }
        };

        // UPLOAD FILE

        $scope.uploadFiles = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Error : max size 5MB.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    vm.imageLoading[index] = true;
                    file.upload = Upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                            upload_preset: cloudinary.config().upload_preset,
                            tags: 'project',
                            context: 'photo=' + $scope.title,
                            file: file
                        }
                    }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                    }).success(function (data, status, headers, config) {
                        vm.imageLoading[index] = false;
                        $rootScope.photos = $rootScope.photos || [{}, {}, {}, {}];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        $rootScope.photos[index] = data;
                    }).error(function (data, status, headers, config) {
                        vm.imageLoading[index] = false;
                        file.result = data;
                    });
                }
            });
        };

        $scope.dragOverClass = function ($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items != null) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind == 'file') {
                        hasFile = true;
                        break;
                    }
                }
            } else {
                hasFile = true;
            }
            return hasFile ? "dragover" : "dragover-err";
        };


        // ------------


        vm.resetProject = function () {
            networkService.activitiesGET(succesProjectsGET, errorProjectsGET);
            vm.type = {};
            vm.continue = vm.continueImg = vm.service = vm.continueAddressFlag = false;
            vm.questions = [];
            vm.material = vm.subService = null;
            vm.title = vm.projectDescription = vm.child2 = vm.child1 = vm.child3 = vm.child0 = '';
            vm.error = {
                description: {flag: false, message: ""},
                address: {flag: false, message: ""},
                date: {flag: false, message: ""},
                material: {flag: false, message: ""}
            };
            if (!angular.isUndefined(vm.user) && vm.user.addresses) {
                if (vm.user.addresses.length > 0) {
                    vm.myAddress = vm.user.addresses[0].address;
                    $scope.address.name = vm.myAddress;
                    vm.continueAddress = true;
                }
                else {
                    vm.continueAddress = false;
                    vm.newAddrFlag = true;
                }
            }
            else {
                vm.user = {};
                vm.user.addresses = [];
            }
            for (var i = 0; i < vm.newProject.childrenActivities.length; i++) {
                vm.newProject.childrenActivities[i].selected = "";
            }
        };


        vm.draft = function () {
            if (!vm.dateType) {
                vm.error.date.flag = true;
                vm.error.date.message = "At least a slot is required";
                return;
            }
            else if (vm.dateType == 'SPECIFIC') {
                if (vm.dt.getTime() == vm.default.getTime()) {
                    vm.error.date.flag = true;
                    vm.error.date.message = "At least a slot is required";
                    return;
                }
                else {
                    vm.error.date.flag = false;
                    vm.error.date.message = "At least a slot is required";
                }
            }
            else {
                vm.error.date.flag = false;
                vm.error.date.message = "At least a slot is required";
            }
            var formData = {
                title: vm.title,
                description: vm.projectDescription,
                desiredDatePeriod: vm.dateType,
                status: "DRAFT",
                address: {},
                activities: []
            };
            for (var i = 0; i < vm.questions.length; i++) {
                formData.activities.push({code: vm.questions[i].code});
            }
            if (vm.dateType == "SPECIFIC") {
                formData.desiredDate = $filter('date')(vm.dt, "yyyy-MM-dd");
            }
            if (vm.continueAddress) {
                for (var i = 0; i < vm.user.addresses.length; i++) {
                    if (vm.user.addresses[i].address == vm.myAddress) {
                        formData.address.name = vm.user.addresses[i].name;
                        formData.address.address = vm.myAddress;
                        break;
                    }
                }
            }
            else {
                formData.address.name = vm.newAddr.name;
                formData.address.address = vm.newAddr.address;
            }
            for (var i = 0; i < $rootScope.photos.length; i++) {
                if ($rootScope.photos[i].public_id) {
                    var tmp = {cloudinaryPublicId: $rootScope.photos[i].public_id};
                    if ($rootScope.photos[i].commentFlag && $rootScope.photos[i].description) {
                        tmp.description = $rootScope.photos[i].description;
                    }
                    formData.images = formData.images || [];
                    formData.images.push(tmp);
                }
            }
            formData.type = "small";
            if (angular.isUndefined($localStorage.token) == false && $localStorage.token)
                networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
            else {
                $rootScope.newProject = formData;
                $state.go("login");
            }
        };

        vm.post = function () {
            if (!vm.emergency) {
                if (!vm.dateType) {
                    vm.error.date.flag = true;
                    vm.error.date.message = "At least a slot is required";
                    return
                }
                else if (vm.dateType == 'SPECIFIC') {
                    if (vm.dt.getTime() == vm.default.getTime()) {
                        vm.error.date.flag = true;
                        vm.error.date.message = "At least a slot is required";
                        return;
                    }
                    else {
                        vm.error.date.flag = false;
                        vm.error.date.message = "At least a slot is required";
                    }
                }
                else {
                    vm.error.date.flag = false;
                    vm.error.date.message = "At least a slot is required";
                }
                var formData = {
                    title: vm.title,
                    description: vm.projectDescription,
                    desiredDatePeriod: vm.dateType,
                    address: {},
                    activities: []
                };
                for (var i = 0; i < vm.questions.length; i++) {
                    formData.activities.push({code: vm.questions[i].code});
                }
                if (vm.dateType == "SPECIFIC") {
                    formData.desiredDate = $filter('date')(vm.dt, "yyyy-MM-dd");
                }
                if (vm.continueAddress) {
                    for (var i = 0; i < vm.user.addresses.length; i++) {
                        if (vm.user.addresses[i].address == vm.myAddress) {
                            formData.address.name = vm.user.addresses[i].name;
                            formData.address.address = vm.myAddress;
                            break;
                        }
                    }
                }
                else {
                    if (angular.isUndefined(vm.newAddr) || !vm.newAddr.name || vm.newAddr.name.length < 3) {
                        vm.error.address.flag = true;
                        vm.error.address.message = "A valid address name is required";
                        $timeout(function () {
                            var element = document.getElementById('slide5');
                            smoothScroll(element, scrollOptions);
                        }, 0);

                    }
                    else if (angular.isUndefined(vm.newAddr) || !vm.newAddr.address || vm.newAddr.address.length < 3) {
                        vm.error.address.flag = true;
                        vm.error.address.message = "A valid address is required";
                        $timeout(function () {
                            var element = document.getElementById('slide5');
                            smoothScroll(element, scrollOptions);
                        }, 0);

                    }
                    formData.address.name = vm.newAddr.name;
                    formData.address.address = vm.newAddr.address;
                }
                for (var i = 0; i < $rootScope.photos.length; i++) {
                    if ($rootScope.photos[i].public_id) {
                        var tmp = {cloudinaryPublicId: $rootScope.photos[i].public_id};
                        if ($rootScope.photos[i].description) {
                            tmp.description = $rootScope.photos[i].description;
                        }
                        formData.images = formData.images || [];
                        formData.images.push(tmp);
                    }
                }
                formData.type = "small";
                if (angular.isUndefined($localStorage.token) == false && $localStorage.token)
                    networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
                else {
                    $rootScope.newProject = formData;
                    $state.go("login");
                }
            }
            else {
                var formData = {
                    title: vm.title,
                    description: vm.projectDescription,
                    address: {},
                    activities: [],
                    availabilities: []
                };
                for (var i = 0; i < vm.questions.length; i++) {
                    formData.activities.push({code: vm.questions[i].code});
                }
                if (vm.continueAddress) {
                    for (var i = 0; i < vm.user.addresses.length; i++) {
                        if (vm.user.addresses[i].address == vm.myAddress) {
                            if (angular.isUndefined(formData.images))
                                formData.images = [];
                            formData.address.name = vm.user.addresses[i].name;
                            formData.address.address = vm.myAddress;
                            break;
                        }
                    }
                }
                else {
                    formData.address.name = vm.newAddr.name;
                    formData.address.address = vm.newAddr.address;
                }
                for (var i = 0; i < $rootScope.photos.length; i++) {
                    if ($rootScope.photos[i].public_id) {
                        if (angular.isUndefined(formData.images))
                            formData.images = [];
                        var tmp = {cloudinaryPublicId: $rootScope.photos[i].public_id};
                        if ($rootScope.photos[i].description) {
                            tmp.description = $rootScope.photos[i].description;
                        }
                        formData.images.push(tmp);
                    }
                }
                vm.initDate(vm.J1, formData.availabilities);
                vm.initDate(vm.J2, formData.availabilities);
                vm.initDate(vm.J3, formData.availabilities);
                if (formData.availabilities.length == 0) {
                    vm.error.date.flag = true;
                    vm.error.date.message = "At least a slot is required";
                    return;
                }
                formData.type = "emergency";
                if (angular.isUndefined($localStorage.token) == false && $localStorage.token)
                    networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
                else {
                    $rootScope.newProject = formData;
                    $state.go("login");
                }
            }
        };

        function succesProjectsPOST(res) {
            vm.continueAddressFlag = vm.continueImg = vm.continue = vm.service = vm.selectCategory = false;
            vm.questions = [];
            vm.end = true;
            $timeout(function () {
                var element = document.getElementById('slideEnd');
                smoothScroll(element, scrollOptions);
                vm.redirect();
            }, 0);
        }

        function errorProjectsPOST() {
            vm.end = false;
            alertMsg.send("Error : Impossible de créer le projet", "danger");
            if (vm.error.description.flag || vm.error.material.flag)
                $timeout(function () {
                    var element = document.getElementById('slide3');
                    smoothScroll(element, scrollOptions);
                }, 0);
            else if (vm.error.address.flag) {
                $timeout(function () {
                    var element = document.getElementById('slide5');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
            else if (vm.error.date.flag) {
                $timeout(function () {
                    var element = document.getElementById('slide6');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        }

        vm.selectDateType = function (type) {
            vm.dateFlag = vm.dateSelected = false;
            vm.dateType = type;
        };

        vm.selectDate = function () {
            vm.dateFlag = true;
        };

        vm.unSelectdate = function () {
            vm.dateSelected = false;
            vm.dateFlag = true;
        };

        $scope.$watch("vm.dt", function (newVal, oldVal) {
            if (newVal !== oldVal) {
                vm.dateSelected = true;
                vm.error.date.flag = vm.dateFlag = false;
                vm.error.date.message = "At least a slot is required";
            }
        });

        vm.verifNameAddr = function () {
            vm.continueAddressFlag = false;
            if (vm.newAddr.name.length > 0) {
                vm.disabledAddr = vm.continueAddress = false;
                vm.myAddress = "new";
                $scope.address = angular.copy(vm.cleanAddress);
            }
            else {
                vm.disabledAddr = true;
            }
        };

        vm.continueAddr = function () {
            if (vm.continueAddress == false) {
                if (vm.newAddr.name) {
                    if ($scope.address.components.placeId && !angular.isUndefined($scope.address.components.street) && !angular.isUndefined($scope.address.components.city) && !angular.isUndefined($scope.address.components.countryCode) && $scope.address.components.countryCode == "FR") {
                        vm.newAddr.address = $scope.address.name;
                        vm.continueAddressFlag = vm.continueAdress = true;
                        vm.error.address.flag = false;
                        vm.error.address.message = "";
                        $timeout(function () {
                            var element = document.getElementById('slide6');
                            smoothScroll(element, scrollOptions);
                        }, 0);
                    }
                    else {
                        vm.continueAddressFlag = false;
                        vm.error.address.flag = true;
                        vm.error.address.message = "A valid address is required";
                    }
                }
                else {
                    vm.continueAddressFlag = false;
                    vm.error.address.message = "An address name is required";
                    vm.error.address.flag = true;
                }
            }
            else {
                if (vm.myAddress == $scope.address.name) {
                    vm.continueAddressFlag = vm.continueAdress = true;
                    vm.error.address.flag = false;
                    vm.error.address.message = "";
                    $timeout(function () {
                        var element = document.getElementById('slide6');
                        smoothScroll(element, scrollOptions);
                    }, 0);
                }
                else {
                    vm.continueAddressFlag = false;
                    vm.error.address.message = "An address is required";
                    vm.error.address.flag = true;
                }
            }
        };

        vm.setAddress = function () {
            if (vm.myAddress == "new") {
                vm.continueAddress = vm.continueAddressFlag = false;
                vm.newAddrFlag = true;
                $scope.address.name = "";
            }
            else {
                $scope.address.name = vm.myAddress;
                vm.continueAddress = true;
                vm.newAddrFlag = false;
                vm.newAddr.name = "";
            }
            vm.disabledAddr = true;
        };

        vm.verif = function () {
            if (vm.projectDescription.length < 3) {
                vm.continueImg = vm.continueAddressFlag = vm.continue = false;
                vm.img = [];
                vm.error.description.message = "Add a description of your needs";
                vm.error.description.flag = true;
            }
            else {
                vm.error.description.message = "";
                vm.error.description.flag = false;
            }
        };

        vm.continueProject = function () {
            if (vm.material == null) {
                vm.error.material.message = "Select YES or NO";
                vm.error.material.flag = true;
            }
            if (vm.projectDescription.length < 3) {
                vm.error.description.message = "Add a description of your needs";
                vm.error.description.flag = true;
            }
            else if (vm.material != null && vm.projectDescription.length >= 3) {
                vm.continue = vm.error.material.flag = true;
                vm.error.description.message = vm.error.material.message = "";
                vm.error.description.flag = false;
                $timeout(function () {
                    var element = document.getElementById('slide4');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        };

        vm.continueProjectImg = function () {
            var flag = 0;
            for (var i = 0; i < $rootScope.photos.length; i++) {
                if ($rootScope.photos[i].public_id) {
                    flag += 1;
                }
            }
            if (flag == 0) {
                vm.continueImg = false;
                vm.popupFlag = true;
            }
            else {
                vm.popupFlag = false;
                vm.continueImg = true;
                $timeout(function () {
                    var element = document.getElementById('slide5');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        };

        vm.continueWithoutImages = function () {
            vm.popupFlag = false;
            vm.continueImg = true;
            $timeout(function () {
                var element = document.getElementById('slide5');
                smoothScroll(element, scrollOptions);
            }, 0);
        };

        vm.selectType = function (item, items) {
            vm.title = item.name;
            vm.type = item;
            vm.questions = [];
            vm.continue = vm.continueImg = vm.continueAddressFlag = vm.service = false;
            vm.questions.push(item);
            vm.material = vm.subService = null;
            vm.projectDescription = vm.child1 = vm.child2 = vm.child3 = vm.child0 = "";
            for (var i = 0; i < items.length; i++) {
                items[i].selected = "";
            }
            if (item.childrenActivities && item.childrenActivities.length > 0) {
                var childrenArray = [];
                for (var i = 0; i < item.childrenActivities.length; i++) {
                    if (vm.emergency && item.childrenActivities[i].emergency)
                        childrenArray.push(item.childrenActivities[i]);
                    else if (!vm.emergency && item.childrenActivities[i].small)
                        childrenArray.push(item.childrenActivities[i]);
                }
                item.childrenActivities = childrenArray;
                for (var i = 0; i < item.childrenActivities.length; i++) {
                    item.childrenActivities[i].selected = "";
                }
                var otherChild = {code: "OTHER"};
                item.childrenActivities.push(otherChild);
            }
            item.selected = "activate";
            if (!angular.isUndefined(vm.user) && vm.user.addresses) {
                if (vm.user.addresses.length > 0) {
                    vm.myAddress = vm.user.addresses[0].address;
                    $scope.address.name = vm.myAddress;
                    vm.continueAddress = true;
                }
                else {
                    vm.continueAddress = false;
                    vm.newAddrFlag = true;
                }
            }
            else {
                vm.user = {};
                vm.user.addresses = [];
            }
            $timeout(function () {
                var element = document.getElementById('subSlide0');
                smoothScroll(element, scrollOptions);
            }, 0);
        };

        vm.selectSubService = function (item, items, index) {
            if (index == 0)
                vm.title += " " + item.name;
            vm.questions[index + 1] = item;
            vm.service = false;
            for (var i = 0; i < items.length; i++) {
                items[i].selected = "";
            }
            item.selected = "activate";
            var tmp = angular.copy(vm.questions.slice(0, index + 2));
            vm.questions = tmp;
            item.selected = "activate";
            if (item.childrenActivities && item.childrenActivities.length > 0) {
                var otherChild = {
                    code: "OTHER",
                    emergency: true,
                    small: true
                };
                vm.questions[index + 1].childrenActivities.push(otherChild);
                var childrenArray = [];
                for (var i = 0; i < vm.questions[index + 1].childrenActivities.length; i++) {
                    if (vm.emergency && vm.questions[index + 1].childrenActivities[i].emergency)
                        childrenArray.push(vm.questions[index + 1].childrenActivities[i]);
                    else if (!vm.emergency && vm.questions[index + 1].childrenActivities[i].small)
                        childrenArray.push(vm.questions[index + 1].childrenActivities[i]);
                }
                item.childrenActivities = childrenArray;
                for (var i = 0; i < vm.questions[index + 1].childrenActivities.length; i++) {
                    vm.questions[index + 1].childrenActivities[i].selected = "";
                }
                $timeout(function () {
                    var element = document.getElementById('subSlide' + (index + 1).toString());
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
            else {
                vm.service = true;
                $timeout(function () {
                    var element = document.getElementById('slide3');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        };

        function succesProjectsGET(res) {
            var childrenArray = [];
            for (var i = 0; i < res.childrenActivities.length; i++) {
                if (vm.emergency && res.childrenActivities[i].emergency)
                    childrenArray.push(res.childrenActivities[i]);
                else if (!vm.emergency && res.childrenActivities[i].small)
                    childrenArray.push(res.childrenActivities[i]);
            }
            res.childrenActivities = childrenArray;
            vm.newProject = res;
            vm.wait = true;
        }

        function errorProjectsGET() {
            alertMsg.send("Error : Impossible de charger le module de création de projet", "danger");
            $state.go("dashboard");
        }

        function succesProfileGET(res) {
            vm.user = res;
            if (!angular.isUndefined(res.addresses) && res.addresses) {
                if (res.addresses.length > 0) {
                    vm.myAddress = res.addresses[0].address;
                    $scope.address.name = vm.myAddress;
                    vm.continueAddress = true;
                }
                else {
                    vm.continueAddress = false;
                    vm.newAddrFlag = true;
                    vm.myAddress = "new";
                }
            }
            else {
                vm.user.addresses = [];
                vm.continueAddress = false;
                vm.newAddrFlag = true;
                vm.myAddress = "new";
            }
        }

        vm.all = function (j) {
            angular.forEach(j, function (value, key) {
                if (key != 'date' && j.all == true)
                    j[key] = true;
                else if (key != 'date' && j.all == false)
                    j[key] = false;
            });
        };


        vm.initDate = function (j, tab) {
            var array = ["7H_9H", "9H_12H", "12H_14H", "14H_16H", "16H_18H", "18H_20H", "AFTER_20H"];
            if (j.all && j.allDisabled != "checkbox-disabled")
                tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"), slot: "ALL_DAY"});
            else {
                for (var i = 0; i < 7; i++) {
                    if (j["c" + (i + 1)] && j["c" + (i + 1) + "Disabled"] != "checkbox-disabled")
                        tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"), slot: array[i]});
                }
            }
        };

        vm.initHours = function () {
            if (vm.time >= 9) {
                vm.J1.c1Disabled = "checkbox-disabled";
                vm.J1.allDisabled = "checkbox-disabled";
            }
            if (vm.time >= 12) {
                vm.J1.c2Disabled = "checkbox-disabled";
                vm.J1.allDisabled = "checkbox-disabled";
            }
            if (vm.time >= 14) {
                vm.J1.c3Disabled = "checkbox-disabled";
                vm.J1.allDisabled = "checkbox-disabled";
            }
            if (vm.time >= 16) {
                vm.J1.c4Disabled = "checkbox-disabled";
                vm.J1.allDisabled = "checkbox-disabled";
            }
            if (vm.time >= 18) {
                vm.J1.c5Disabled = "checkbox-disabled";
                vm.J1.allDisabled = "checkbox-disabled";
            }
            if (vm.time >= 20) {
                vm.J1.c6Disabled = "checkbox-disabled";
                vm.J1.allDisabled = "checkbox-disabled";
            }
        };

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
        }

        vm.redirect = function () {
            vm.countdown -= 1;
            if (vm.countdown == 0)
                $state.go("dashboard");
            else {
                $timeout(function () {
                    vm.redirect();
                }, 1000);
            }
        };
        vm.initHours();
    }
})();

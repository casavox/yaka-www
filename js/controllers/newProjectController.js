(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('NewProjectController', NewProjectController);

    //
    //Controller login
    NewProjectController.$inject = ['$scope', 'networkService', '$rootScope', '$location', '$anchorScroll', '$timeout', '$localStorage', '$filter', '$state', 'Upload', 'cloudinary', 'alertMsg', 'smoothScroll']
    function NewProjectController($scope, networkService, $rootScope, $location, $anchorScroll, $timeout, $localStorage, $filter, $state, $upload, cloudinary, alertMsg, smoothScroll) {
        var vm = this;
        vm.user = $localStorage.user;


        vm.newProject = {};
        vm.child0 = "";
        vm.child1 = "";
        vm.child2 = "";
        vm.child3 = "";
        vm.countdown = 5;
        vm.popupFlag = false;
        vm.emergency = false;
        vm.dateFlag = false;
        vm.continue = false;
        vm.disabledAddr = true;
        vm.questions = [];
        vm.material = null;
        vm.continueAddressFlag = false;
        vm.selectCategory = true;
        vm.service = false;
        vm.continueImg = false;
        vm.img = [];
        vm.dateType = "";
        vm.popUpImg = false;
        vm.newAddrFlag = false;
        vm.error = {
            description: {flag: false, message: ""},
            address: {flag: false, message: ""},
            date: {flag: false, message: ""},
            material: {flag: false, message: ""}
        };

        vm.dt = new Date(); // date picker binding
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date()
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        var d = new Date();
        $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

        $rootScope.photos = [{}, {}, {}, {}];


        vm.redirect = redirect;
        vm.continueWithoutImages = continueWithoutImages;
        vm.initHours = initHours;
        vm.selectType = selectType;
        // vm.selectService = selectService;
        vm.selectSubService = selectSubService;
        vm.projectDescription = "";
        vm.continueProject = continueProject;
        vm.continueProjectImg = continueProjectImg;
        vm.continueAddr = continueAddr;
        vm.verif = verif;
        vm.setAddress = setAddress;
        vm.selectDate = selectDate;
        vm.unSelectdate = unSelectdate;
        vm.selectDateType = selectDateType;
        vm.verifNameAddr = verifNameAddr;
        vm.resetProject = resetProject;
        vm.post = post;
        vm.draft = draft;
        vm.newAddr = {};
        vm.all = all;
        vm.initDate = initDate;
        vm.limitLength = limitLength;
        vm.verifDescription = verifDescription

        var scrollOptions = {
            containerId: 'main-scroll-container'
        }

        // Google autocomplete binding

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

        // ---------------------------------------

        vm.initHours();
        networkService.activitiesGET(succesProjectsGET, errorProjectsGET);
        networkService.profileGET(succesProfileGET, errorProfileGET);


        function limitLength(obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        }

        function verifDescription() {
            if (vm.projectDescription.length < 3) {
                vm.continue = false;
                vm.continueImg = false;
                vm.img = [];
                vm.continueAddressFlag = false;
                vm.error.description.flag = true;
                vm.error.description.message = "Add a description of your needs";

            }
        }

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
                    file.upload = $upload.upload({
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
                        $rootScope.photos = $rootScope.photos || [{}, {}, {}, {}];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        $rootScope.photos[index] = data;
                    }).error(function (data, status, headers, config) {
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


        function resetProject() {
            networkService.activitiesGET(succesProjectsGET, errorProjectsGET);
            vm.title = "";
            vm.type = {};
            vm.continue = false;
            vm.continueImg = false;
            vm.continueAddressFlag = false;
            vm.questions = [];
            vm.service = false;
            vm.subService = null;
            vm.projectDescription = "";
            vm.material = null;
            vm.child0 = '';
            vm.child1 = '';
            vm.child2 = '';
            vm.child3 = '';
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
                vm.user = {}
                vm.user.addresses = [];
            }
            for (var i = 0; i < vm.newProject.childrenActivities.length; i++) {
                vm.newProject.childrenActivities[i].selected = "";
            }
        }


        function draft() {
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
                status: "DRAFT",
                address: {},
                activities: [],
            }
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
        }


        function post() {

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
                    activities: [],
                }
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
                }
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
        }

        function succesProjectsPOST(res) {
            console.log(res);
            vm.selectCategory = false;
            vm.questions = [];
            vm.service = false;
            vm.continue = false;
            vm.continueImg = false;
            vm.continueAddressFlag = false;
            vm.end = true;
            $timeout(function () {
                var element = document.getElementById('slideEnd');
                smoothScroll(element, scrollOptions);
                redirect();
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

        function selectDateType(type) {
            vm.dateSelected = false;
            vm.dateFlag = false;
            vm.dateType = type;
        }

        function selectDate() {
            vm.dateFlag = true;
        }

        function unSelectdate() {
            vm.dateSelected = false;
            vm.dateFlag = true;
        }

        $scope.$watch("vm.dt", function (newVal, oldVal) {
            if (newVal !== oldVal) {
                vm.dateSelected = true;
                vm.dateFlag = false;
                vm.error.date.flag = false;
                vm.error.date.message = "At least a slot is required";
            }
        })

        function verifNameAddr() {
            vm.continueAddressFlag = false;
            if (vm.newAddr.name.length > 0) {
                vm.continueAddress = false
                vm.disabledAddr = false;
                vm.myAddress = "new";
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
            }
            else {
                vm.disabledAddr = true;
            }
        }

        function continueAddr() {
            console.log($scope.address);
            if (vm.continueAddress == false) {
                if (vm.newAddr.name) {
                    if ($scope.address.components.placeId && !angular.isUndefined($scope.address.components.street) && !angular.isUndefined($scope.address.components.city) && !angular.isUndefined($scope.address.components.countryCode) && $scope.address.components.countryCode == "FR") {
                        vm.newAddr.address = $scope.address.name;
                        vm.continueAdress = true;
                        vm.error.address.flag = false;
                        vm.error.address.message = "";
                        vm.continueAddressFlag = true;
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
                    vm.continueAdress = true;
                    vm.error.address.flag = false;
                    vm.error.address.message = "";
                    vm.continueAddressFlag = true;
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
        }

        function setAddress() {
            if (vm.myAddress == "new") {
                vm.continueAddressFlag = false;
                vm.newAddrFlag = true;
                $scope.address.name = "";
                vm.continueAddress = false;
            }
            else {
                $scope.address.name = vm.myAddress;
                vm.continueAddress = true;
                vm.newAddrFlag = false;
                vm.newAddr.name = "";
            }
            vm.disabledAddr = true;
        }

        function verif() {
            if (vm.projectDescription.length < 3) {
                vm.continue = false;
                vm.continueImg = false;
                vm.img = [];
                vm.continueAddressFlag = false;
                vm.error.description.message = "Add a description of your needs";
                vm.error.description.flag = true;
            }
            else {
                vm.error.description.message = "";
                vm.error.description.flag = false;
            }
        }

        function continueProject() {
            if (vm.material == null) {
                vm.error.material.message = "Select YES or NO";
                vm.error.material.flag = true;
            }
            if (vm.projectDescription.length < 3) {
                vm.error.description.message = "Add a description of your needs";
                vm.error.description.flag = true;
            }
            else if (vm.material != null && vm.projectDescription.length >= 3) {
                vm.error.material.flag = true;
                vm.error.material.message = "";
                vm.error.description.message = "";
                vm.error.description.flag = false;
                vm.continue = true;
                $timeout(function () {
                    var element = document.getElementById('slide4');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        }

        function continueProjectImg() {
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
        }

        function continueWithoutImages() {
            vm.popupFlag = false;
            vm.continueImg = true;
            $timeout(function () {
                var element = document.getElementById('slide5');
                smoothScroll(element, scrollOptions);
            }, 0);
        }

        function selectType(item, items) {
            vm.title = item.name;
            vm.type = item;
            vm.questions = [];
            vm.service = false;
            vm.continue = false;
            vm.continueImg = false;
            vm.continueAddressFlag = false;
            vm.questions.push(item);
            vm.subService = null;
            vm.material = null;
            vm.projectDescription = "";
            vm.child0 = "";
            vm.child1 = "";
            vm.child2 = "";
            vm.child3 = "";
            for (var i = 0; i < items.length; i++) {
                items[i].selected = "";
            }
            if (item.childrenActivities && item.childrenActivities.length > 0) {

                var childrenArray = [];
                for (var i = 0; i < item.childrenActivities.length; i++) {
                    item.childrenActivities[i].name = 'ACTIVITY_' + item.childrenActivities[i].code;
                    if (vm.emergency && item.childrenActivities[i].emergency) {
                        childrenArray.push(item.childrenActivities[i]);
                    } else if (!vm.emergency && item.childrenActivities[i].small) {
                        childrenArray.push(item.childrenActivities[i]);
                    }
                }
                item.childrenActivities = childrenArray;

                for (var i = 0; i < item.childrenActivities.length; i++) {
                    item.childrenActivities[i].selected = "";
                }

                var otherChild = {
                    code: "OTHER"
                }
                otherChild.name = 'ACTIVITY_' + otherChild.code;
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
                vm.user = {}
                vm.user.addresses = [];
            }
            $timeout(function () {
                var element = document.getElementById('subSlide0');
                smoothScroll(element, scrollOptions);
            }, 0);
        }

        // function selectService(item, items){
        //   vm.questions.push(item);
        //   for (var i = 0; i < items.length; i++) {
        //     items[i].selected = ""
        //   }
        //   item.selected = "activate";
        //   $timeout(function(){
        //     $location.hash('subSlide0');
        //     $anchorScroll();
        //   },0);
        // }
        function selectSubService(item, items, index) {
            if (index == 0) {
                vm.title += " " + item.name;
            }
            if (item.code != "OTHER") {
                vm.questions[index + 1] = item;
            }
            vm.service = false;
            vm.questions = vm.questions.slice(0, index + 2);
            for (var i = 0; i < items.length; i++) {
                items[i].selected = ""
            }
            if (item.childrenActivities && item.childrenActivities.length > 0) {

                var childrenArray = [];
                for (var i = 0; i < item.childrenActivities.length; i++) {
                    item.childrenActivities[i].name = 'ACTIVITY_' + item.childrenActivities[i].code;
                    if (vm.emergency && item.childrenActivities[i].emergency) {
                        childrenArray.push(item.childrenActivities[i]);
                    } else if (!vm.emergency && item.childrenActivities[i].small) {
                        childrenArray.push(item.childrenActivities[i]);
                    }
                }
                item.childrenActivities = childrenArray;

                for (var i = 0; i < item.childrenActivities.length; i++) {
                    item.childrenActivities[i].selected = "";
                }

                var otherChild = {
                    code: "OTHER"
                }
                otherChild.name = 'ACTIVITY_' + otherChild.code;
                item.childrenActivities.push(otherChild);
            }
            item.selected = "activate";
            if (item.childrenActivities && item.childrenActivities.length > 0) {
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

        }

        function succesProjectsGET(res) {

            var childrenArray = [];
            for (var i = 0; i < res.childrenActivities.length; i++) {
                res.childrenActivities[i].name = 'ACTIVITY_' + res.childrenActivities[i].code;
                if (vm.emergency && res.childrenActivities[i].emergency) {
                    childrenArray.push(res.childrenActivities[i]);
                } else if (!vm.emergency && res.childrenActivities[i].small) {
                    childrenArray.push(res.childrenActivities[i]);
                }
            }
            res.childrenActivities = childrenArray;

            vm.newProject = res;
            console.log(res);
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

            console.log(res);
        }

        function all(j) {
            if (j.all == true) {
                j.all = true;
                j.c1 = true;
                j.c2 = true;
                j.c3 = true;
                j.c4 = true;
                j.c5 = true;
                j.c6 = true;
                j.c7 = true;
            }
            else {
                j.all = false;
                j.c1 = false;
                j.c2 = false;
                j.c3 = false;
                j.c4 = false;
                j.c5 = false;
                j.c6 = false;
                j.c7 = false;
            }
        }


        function initDate(j, tab) {
            var tmp = "";
            if (j.all && j.allDisabled != "checkbox-disabled") {
                tmp = "ALL_DAY";
                tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"), slot: tmp});
            }
            else {
                for (var i = 0; i < 7; i++) {
                    if (j["c" + (i + 1)] && j["c" + (i + 1) + "Disabled"] != "checkbox-disabled") {
                        switch (i) {
                            case 0:
                                tmp = "7H_9H";
                                break;
                            case 1:
                                tmp = "9H_12H";
                                break;
                            case 2:
                                tmp = "12H_14H";
                                break;
                            case 3:
                                tmp = "14H_16H";
                                break;
                            case 4:
                                tmp = "16H_18H";
                                break;
                            case 5:
                                tmp = "18H_20H"
                                break;
                            case 6:
                                tmp = "AFTER_20H";
                                break;
                        }
                        tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"), slot: tmp});
                    }
                }
            }
        }

        function initHours() {
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
        }

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
            // alertMsg.send("Error : Impossible de charger les addresses existantes", "danger");
        }

        function redirect() {
            vm.countdown -= 1;
            if (vm.countdown == 0)
                $state.go("dashboard");
            else {
                $timeout(function () {
                    redirect();
                }, 1000);
            }
        }
    }
})();

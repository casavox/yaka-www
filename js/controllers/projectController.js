(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProjectController', ProjectController);

    //
    //Controller login
    ProjectController.$inject = ['$scope', '$state', '$localStorage', 'networkService', 'alertMsg', 'uiGmapGoogleMapApi', 'Upload', 'cloudinary', '$filter', '$stateParams', 'Lightbox', '$rootScope'];
    function ProjectController($scope, $state, $localStorage, networkService, alertMsg, uiGmapGoogleMapApi, $upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope) {
        var vm = this;
        vm.pro = true;
        vm.saveFlag = false;
        vm.editFlag = false;
        vm.proDetails = false;
        vm.editDescriptionFlag = false;
        vm.selectProposal = selectProposal;
        vm.hireMessage = "Hi, I made my choice, I definitely choose you for my project.";
        vm.child0 = "";
        vm.child1 = "";
        vm.child2 = "";
        vm.child3 = "";
        vm.deleteProject = deleteProject;
        vm.editImage = editImage;
        vm.editWhere = editWhere;
        vm.newAddrFlag = false;
        vm.dateSelected = false;
        vm.imagePreviewFlag = false;
        vm.disabledAddr = true;
        vm.project = {};
        vm.projectTmp = {};
        vm.prev = prev;
        vm.deleteImg = deleteImg;
        vm.updateImg = updateImg;
        vm.getWhen = getWhen;
        vm.getTags = getTags;
        vm.hire = hire;
        vm.changeWhen = changeWhen;
        vm.selectDateType = selectDateType;
        vm.selectDate = selectDate;
        vm.unSelectdate = unSelectdate;
        vm.dateType = "";
        vm.dateFlag = false;
        vm.initDate = initDate;
        vm.editDescription = editDescription;
        vm.edit = edit;
        vm.update = update;
        vm.whenFlag = false;
        vm.editWhen = editWhen;
        vm.uploadFiles = uploadFiles;
        vm.limitLength = limitLength;
        vm.markerCoords = {};
        $scope.map = {
            center: {
                latitude: 46.5945259,
                longitude: 2.4623584
            }, zoom: 6
        };
        $scope.mapOptions = {
            draggable: false,
            disableDoubleClickZoom: true,
            scrollwheel: false
        };
        vm.getQualities = getQualities;

        vm.dt = new Date();
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date();
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
        vm.initHours = initHours;
        vm.initHours();
        vm.now = new Date();
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        vm.all = all;
        vm.whereFlag = false;
        vm.cancel = cancel;
        vm.imageFlag = false;
        vm.setAddress = setAddress;
        vm.newAddr = {};
        vm.draft = draft;
        vm.calculateExp = calculateExp;
        vm.changeWhere = changeWhere;
        vm.indexOfObject = indexOfObject;
        vm.homeDetail = homeDetail;
        vm.verifNameAddr = verifNameAddr;
        vm.getSlot = getSlot;
        vm.closeProject = closeProject;
        vm.error = {
            description: {flag: false, message: ""},
            address: {flag: false, message: ""},
            date: {flag: false, message: ""},
            material: {flag: false, message: ""}
        };
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

        vm.deleteProject = function () {
            if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
                networkService.deleteProject($stateParams.projectId,
                    function () {
                        alertMsg.send("Your project has been deleted", "success");
                        $state.go("my-projects");
                    },
                    function () {
                        alertMsg.send("Error : project can't be deleted", "danger");
                    }
                );
            }
        };

        vm.publishProject = function () {
            if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
                networkService.publishProject($stateParams.projectId,
                    function () {
                        alertMsg.send("Your project has been published", "success");
                        if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
                            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
                        }
                    },
                    function () {
                        alertMsg.send("Error : project can't be published", "danger");
                    }
                );
            }
        };


        function closeProject() {
            networkService.closeProject(vm.project.proposal.id, function (res) {
                vm.project.status = "ONGOING_RATE_PRO";
                vm.closeFlag = false;
            }, function (res) {
                alertMsg.send("Error : project can't be close", "danger");
            });
        }

        networkService.profileGET(succesProfileGET, errorProfileGET);

        function hire() {
            var formData = {
                id: vm.proposal.id,
                text: vm.hireMessage
            };
            networkService.proposalAcceptPOST(formData, succesProposalAcceptPOST, errorProposalAcceptPOST);
        }

        function succesProposalAcceptPOST(res) {
            vm.proposal = res;
            vm.hireFlag = false;
            alertMsg.send("Proposal selected", "success");
        }

        function errorProposalAcceptPOST() {
            alertMsg.send("Error Proposal not selected", "danger");
        }

        function getQualities() {
            if (!angular.isUndefined(vm.proposal) && !angular.isUndefined(vm.proposal.professional) && !angular.isUndefined(vm.proposal.professional.qualities)) {
                var res = "";
                for (var i = 0; i < vm.proposal.professional.qualities.length; i++) {
                    switch (vm.proposal.professional.qualities[i].name) {
                        case expression:

                            break;
                        default:

                    }
                }
            }
        }

        function getSlot() {
            if (!angular.isUndefined(vm.proposal) && !angular.isUndefined(vm.proposal.availability) && !angular.isUndefined(vm.proposal.availability.slot))
                switch (vm.proposal.availability.slot) {
                    case "7H_9H":
                        return "7h";
                        break;
                    case "9H_12H":
                        return "9h";
                        break;
                    case "12H_14H":
                        return "12h";
                        break;
                    case "14H_16H":
                        return "14h";
                        break;
                    case "16H_18H":
                        return "16h";
                        break;
                    case "18H_20H":
                        return "18h";
                        break;
                    case "AFTER_20H":
                        return "20h";
                        break;

                }
        }

        function verifNameAddr() {
            vm.continueAddressFlag = false;
            if (vm.newAddr.name.length > 0) {
                vm.continueAddress = false;
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
                vm.newAddr.name = "";
                vm.disabledAddr = true;
            }
        }

        function indexOfObject(a, token, array) {
            var res = [];
            if (!angular.isUndefined(array)) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][token] == a) {
                        res.push(i);
                    }
                }
                return res;
            }
            return res;
        }

        function calculateExp(d) {
            var tmp = new Date(d);
            var ageDifMs = Date.now() - tmp.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        function selectProposal(p) {
            networkService.proposalGET(p.id, succesProposalGET, errorProposalGET);

        }

        function succesProposalGET(res) {
            vm.proposal = res;
            vm.proDetails = true;
            vm.pro = false;
            console.log(res);
        }

        function homeDetail() {
            vm.proposal = {};
            vm.pro = true;
            vm.proDetails = false;
        }

        function errorProposalGET(res) {
            alertMsg.send("Error. Can't get this proposal", "danger");
        }

        function draft() {
            vm.projectTmp.status = "DRAFT";
            update();
        }

        function deleteProject() {

        }

        function limitLength(obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        }

        function updateImg() {
            for (var i = 0; i < vm.projectTmp.images.length; i++) {
                if (vm.projectTmp.images[i].cloudinaryPublicId == vm.imgTmp.cloudinaryPublicId) {
                    vm.projectTmp.images[i].description == vm.imgTmp.description;
                    vm.imageFlag = false;
                    break;
                }
            }
        }

        vm.selectImagePreview = function(index){
            var data = [{url: vm.projectTmp.images[index].cloudinaryPublicId}];
            $rootScope.media = vm.projectTmp.images[index];
            Lightbox.openModal(data, 0);
        };

        function deleteImg() {
            for (var i = 0; i < vm.projectTmp.images.length; i++) {
                if (vm.projectTmp.images[i].cloudinaryPublicId == vm.imgTmp.cloudinaryPublicId) {
                    vm.projectTmp.images.splice(i, 1);
                    vm.imageFlag = false;
                    break;
                }
            }
        }

        function editImage(media) {
            if (vm.editFlag) {
                vm.imgTmp = media;
                vm.imageFlag = true;
            }
            else {
                vm.imgTmpPreview = media;
                vm.imagePreviewFlag = true;
            }
        }

        function changeWhere() {
            if (vm.myAddress == "new") {
                vm.projectTmp.address.name = vm.newAddr.name;
                vm.projectTmp.address.address = $scope.address.name;
                vm.whereFlag = false;
            }
            else {
                for (var i = 0; i < vm.user.addresses.length; i++) {
                    if (vm.user.addresses[i].address == vm.myAddress) {
                        vm.projectTmp.address.name = vm.user.addresses[i].name;
                        vm.projectTmp.address.address = vm.myAddress;
                        vm.whereFlag = false;
                        break;
                    }
                }
            }
        }

        function setAddress() {
            if (vm.myAddress == "new") {
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

        function succesProfileGET(res) {
            vm.user = res;


            console.log(res, vm.projectTmp);
        }

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
            // alertMsg.send("Error : Impossible de charger les addresses existantes", "danger");
        }

        if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        }

        function editWhere() {
            vm.whereFlag = true;
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
                        if (i == 0)
                            tmp = "7H_9H";
                        else if (i == 1) {
                            tmp = "9H_12H";
                        }
                        else if (i == 2) {
                            tmp = "12H_14H";
                        }
                        else if (i == 3) {
                            tmp = "14H_16H";
                        }
                        else if (i == 4) {
                            tmp = "16H_18H";
                        }
                        else if (i == 5) {
                            tmp = "18H_20H"
                        }
                        else if (i == 6) {
                            tmp = "AFTER_20H";
                        }
                        tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"), slot: tmp});
                    }
                }
            }
        }

        function changeWhen() {
            if (vm.projectTmp.type == "EMERGENCY") {
                var formData = [];
                vm.initDate(vm.J1, formData);
                vm.initDate(vm.J2, formData);
                vm.initDate(vm.J3, formData);
                if (formData.length > 0) {
                    vm.projectTmp.availabilities = formData;
                    vm.whenFlag = false;
                }
                else {
                    vm.error.date.flag = true;
                    vm.error.date.message = "At least a slot is required";
                    return
                }
            }
            else {
                if (vm.dateType) {
                    vm.projectTmp.desiredDatePeriod = vm.dateType;
                    if (vm.dateType == "SPECIFIC") {
                        vm.projectTmp.desiredDate = $filter('date')(vm.dt, "yyyy-MM-dd");
                    }
                    vm.whenFlag = false;
                }
                else {
                    vm.error.date.flag = true;
                    vm.error.date.message = "At least a slot is required";
                    return
                }
            }
        }

        function cancel() {
            vm.projectTmp = angular.copy(vm.project);
            vm.editDescriptionFlag = false;
            vm.editFlag = false;
            vm.whereFlag = false;
            vm.saveFlag = false;
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
                if (vm.dateFlag)
                    vm.dateSelected = true;
                vm.dateFlag = false;
                vm.error.date.flag = false;
                vm.error.date.message = "At least a slot is required";
            }
        });

        function update() {
            vm.projectTmp.tags = vm.projectTmp.tags || [];
            vm.projectTmp.images = vm.projectTmp.images || [];
            vm.projectTmp.availabilities = vm.projectTmp.availabilities || [];
            networkService.projectPUT(vm.projectTmp, succesProfilePUT, errorProfilePUT);
        }

        function succesProfilePUT(res) {
            vm.cancel();
            alertMsg.send("Project updated.", "success");
            succesProjectGET(res);
        }

        function errorProfilePUT() {
            vm.cancel();
            alertMsg.send("Error. the server can't update the project.", "danger");
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
                        if (i == 0)
                            tmp = "7H_9H";
                        else if (i == 1) {
                            tmp = "9H_12H";
                        }
                        else if (i == 2) {
                            tmp = "12H_14H";
                        }
                        else if (i == 3) {
                            tmp = "14H_16H";
                        }
                        else if (i == 4) {
                            tmp = "16H_18H";
                        }
                        else if (i == 5) {
                            tmp = "18H_20H"
                        }
                        else if (i == 6) {
                            tmp = "AFTER_20H";
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

        function editWhen() {
            vm.whenFlag = true;
        }

        function uploadFiles(files, invalides, index) {
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
                        vm.projectTmp.images = vm.projectTmp.images || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        vm.projectTmp.images.push({cloudinaryPublicId: data.public_id});
                    }).error(function (data, status, headers, config) {
                        alertMsg.send("Error : Upload failed.", "danger");
                    });
                }
            });
        }

        function editDescription() {
            vm.editDescriptionFlag = true;
        }

        function edit() {
            vm.editFlag = true;
        }

        function getTags() {
            var res = "";
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.activities) {
                for (var i = 0; i < vm.projectTmp.activities.length; i++) {
                    if (i != 0)
                        res += " - ";
                    res += vm.projectTmp.activities[i].code;
                }
            }
            return res;
        }

        function getWhen() {
            var res = 0;
            if (!angular.isUndefined(vm.projectTmp.availabilities) && vm.projectTmp.availabilities && vm.projectTmp.availabilities.length > 0) {
                for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
                    res += 1;
                }
                return "Emergency : " + res + " slots appointment"
            }
            else {
                switch (vm.projectTmp.desiredDatePeriod) {
                    case "SPECIFIC":
                        return "Le " + vm.projectTmp.desiredDate;
                    case "WITHIN_A_WEEK":
                        return "Dans la semaine";
                    case "WITHIN_A_MONTH":
                        return "Dans le mois";
                    case "NONE":
                        return "Flexible sur la date de départ";
                }
            }
        }

        function prev() {
            $state.go("proposals", {projectId: $stateParams.projectId});
        }

        function succesProjectGET(res) {
            if (res.address.latitude && res.address.longitude) {
                $scope.map.center = {
                    latitude: res.address.latitude,
                    longitude: res.address.longitude
                };
                $scope.map.zoom = 15;
                vm.markerCoords = {
                    latitude: res.address.latitude,
                    longitude: res.address.longitude
                }
            }

            vm.project = res;
            console.log(res);
            vm.projectTmp = angular.copy(vm.project);
            if (vm.projectTmp.type != "EMERGENCY") {
                vm.dateType = vm.projectTmp.desiredDatePeriod;
                vm.dt = angular.copy(vm.now);
            }
            if (!angular.isUndefined(vm.projectTmp.address) && vm.projectTmp.address) {
                vm.myAddress = vm.projectTmp.address.address;
                $scope.address.name = vm.projectTmp.address.address;
            }
            else {
                vm.newAddrFlag = true;
                vm.myAddress = "new";
            }
            if (vm.projectTmp.type == "EMERGENCY" && vm.projectTmp.availabilities) {
                for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
                    switch (vm.projectTmp.availabilities[i].slot) {
                        case "7H_9H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c1 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c1 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c1 = true;
                            }
                            break;
                        case "9H_12H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c2 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c2 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c2 = true;
                            }
                            break;
                        case "12H_14H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c3 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c3 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c3 = true;
                            }
                            break;
                        case "14H_16H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c4 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c4 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c4 = true;
                            }
                            break;
                        case "16H_18H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c5 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c5 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c5 = true;
                            }
                            break;
                        case "18H_20H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c6 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c6 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c6 = true;
                            }
                            break;
                        case "AFTER_20H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c7 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c7 = true;
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c7 = true;
                            }
                            break;
                        case "ALL_DAY":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.all = true
                                vm.all(vm.J1);
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.all = true
                                vm.all(vm.J2);
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.all = true
                                vm.all(vm.J3);
                            }
                            break;
                    }

                }
            }
            else {
                switch (vm.projectTmp.desiredDatePeriod) {
                    case "SPECIFIC":
                        vm.child0 = "activate";
                        vm.dateSelected = true;
                        break;
                    case "WITHIN_A_WEEK":
                        vm.child1 = "activate";
                        vm.dateSelected = false;
                        break;
                    case "WITHIN_A_MONTH":
                        vm.child2 = "activate";
                        vm.dateSelected = false;
                        break;
                    case "NONE":
                        vm.child3 = "activate";
                        vm.dateSelected = false;
                        break;
                }
            }
        }

        function errorProjectGET(res) {
            alertMsg.send("Error : Impossible to get the mission.", "danger");
            $state.go("my-projects");
        }
    }
})();

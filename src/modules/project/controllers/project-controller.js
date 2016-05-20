(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProjectController', ProjectController);

    //
    //Controller login
    function ProjectController($scope, $state, networkService, alertMsg, Upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope, $translate) {

        //TODO
        $rootScope.pageName = "";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;
        var vm = this;
        vm.pro = vm.disabledAddr = true;
        vm.newAddrFlag = vm.saveFlag = vm.editFlag = $rootScope.editMode = vm.proDetails = vm.editDescriptionFlag = false;
        vm.hireMessage = "Hi, I made my choice, I definitely choose you for my project.";
        vm.dateType = vm.child3 = vm.child2 = vm.child1 = vm.child0 = "";
        vm.imageFlag = vm.whereFlag = vm.whenFlag = vm.dateFlag = vm.imagePreviewFlag = vm.dateSelected = false;
        vm.project = {};
        vm.projectTmp = {};
        vm.markerCoords = {};
        vm.dt = new Date();
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date();
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
        vm.now = new Date();
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        vm.newAddr = {};
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
                        vm.publishFlag = false;
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


        vm.closeProject = function () {
            networkService.closeProject(vm.project.proposal.id, function (res) {
                vm.project.status = "ONGOING_RATE_PRO";
                vm.closeFlag = false;
            }, function (res) {
                alertMsg.send("Error : project can't be close", "danger");
            });
        };

        networkService.profileGET(succesProfileGET, errorProfileGET);

        vm.hire = function () {
            var formData = {
                id: vm.proposal.id,
                text: vm.hireMessage
            };
            networkService.proposalAcceptPOST(formData, succesProposalAcceptPOST, errorProposalAcceptPOST);
        };

        function succesProposalAcceptPOST(res) {
            vm.proposal = res;
            vm.hireFlag = false;
            alertMsg.send("Proposal selected", "success");
        }

        function errorProposalAcceptPOST() {
            alertMsg.send("Error Proposal not selected", "danger");
        }

        // vm.getQualities = function () {
        //     if (!angular.isUndefined(vm.proposal) && !angular.isUndefined(vm.proposal.professional) && !angular.isUndefined(vm.proposal.professional.qualities)) {
        //         var res = "";
        //         for (var i = 0; i < vm.proposal.professional.qualities.length; i++) {
        //             switch (vm.proposal.professional.qualities[i].name) {
        //                 case expression:
        //                     break;
        //                 default:
        //
        //             }
        //         }
        //     }
        // };

        vm.getSlot = function () {
            if (!angular.isUndefined(vm.proposal) && !angular.isUndefined(vm.proposal.availability) && !angular.isUndefined(vm.proposal.availability.slot)) {
                var tmp = _.split(vm.proposal.availability.slot, '_');
                if (tmp[0] == "AFTER")
                    return $filter('lowercase')(tmp[1]);
                return $filter('lowercase')(tmp[0]);
            }
        };

        vm.verifNameAddr = function () {
            vm.continueAddressFlag = false;
            if (vm.newAddr.name.length > 0) {
                vm.disabledAddr = vm.continueAddress = false;
                vm.myAddress = "new";
                $scope.address = angular.copy(cleanAddress);
            }
            else {
                vm.newAddr.name = "";
                vm.disabledAddr = true;
            }
        };

        vm.indexOfObject = function (a, token, array) {
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
        };

        vm.calculateExp = function (d) {
            var tmp = new Date(d);
            var ageDifMs = Date.now() - tmp.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        vm.selectProposal = function (p) {
            networkService.proposalGET(p.id, succesProposalGET, errorProposalGET);

        };

        function succesProposalGET(res) {
            vm.proposal = res;
            vm.proDetails = true;
            vm.pro = false;
        }

        vm.homeDetail = function () {
            vm.proposal = {};
            vm.pro = true;
            vm.proDetails = false;
        };

        function errorProposalGET(res) {
            alertMsg.send("Error. Can't get this proposal", "danger");
        }

        vm.draft = function () {
            vm.projectTmp.status = "DRAFT";
            update();
        };

        vm.limitLength = function (obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        };

        vm.updateImg = function () {
            for (var i = 0; i < vm.projectTmp.images.length; i++) {
                if (vm.projectTmp.images[i].cloudinaryPublicId == vm.imgTmp.cloudinaryPublicId) {
                    vm.projectTmp.images[i].description = vm.imgTmp.description;
                    vm.imageFlag = false;
                    break;
                }
            }
        };

        vm.selectImagePreview = function (index) {
            var data = [{url: vm.projectTmp.images[index].cloudinaryPublicId}];
            $rootScope.media = vm.projectTmp.images[index];
            $rootScope.deleteImg = vm.deleteImg;
            $rootScope.updateImg = vm.updateImg;
            Lightbox.openModal(data, 0);
        };

        vm.deleteImg = function () {
            for (var i = 0; i < vm.projectTmp.images.length; i++) {
                if (vm.projectTmp.images[i].cloudinaryPublicId == $rootScope.media.cloudinaryPublicId) {
                    vm.projectTmp.images.splice(i, 1);
                    vm.imageFlag = false;
                    break;
                }
            }
        };

        vm.editImage = function (media) {
            if (vm.editFlag) {
                vm.imgTmp = media;
                vm.imageFlag = true;
            }
            else {
                vm.imgTmpPreview = media;
                vm.imagePreviewFlag = true;
            }
        };

        vm.changeWhere = function () {
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
        };

        vm.setAddress = function () {
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
        };

        function succesProfileGET(res) {
            vm.user = res;
        }

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
        }

        if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        }

        vm.editWhere = function () {
            vm.whereFlag = true;
        };

        vm.changeWhen = function () {
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
                    return;
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
                    return;
                }
            }
        };

        vm.cancel = function () {
            vm.projectTmp = angular.copy(vm.project);
            vm.editDescriptionFlag = false;
            vm.editFlag = false;
            $rootScope.editMode = false;
            vm.whereFlag = false;
            vm.saveFlag = false;
        };

        vm.selectDateType = function (type) {
            vm.dateSelected = false;
            vm.dateFlag = false;
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
                if (vm.dateFlag)
                    vm.dateSelected = true;
                vm.dateFlag = false;
                vm.error.date.flag = false;
                vm.error.date.message = "At least a slot is required";
            }
        });

        vm.update = function () {
            vm.projectTmp.tags = vm.projectTmp.tags || [];
            vm.projectTmp.images = vm.projectTmp.images || [];
            vm.projectTmp.availabilities = vm.projectTmp.availabilities || [];
            networkService.projectPUT(vm.projectTmp, succesProfilePUT, errorProfilePUT);
        };

        function succesProfilePUT(res) {
            vm.cancel();
            alertMsg.send("Project updated.", "success");
            succesProjectGET(res);
        }

        function errorProfilePUT() {
            vm.cancel();
            alertMsg.send("Error. the server can't update the project.", "danger");
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

        vm.editWhen = function () {
            vm.whenFlag = true;
        };

        vm.uploadFiles = function (files, invalides, index) {
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
        };

        vm.editDescription = function () {
            vm.editDescriptionFlag = true;
        };

        vm.edit = function () {
            vm.editFlag = true;
            $rootScope.editMode = true;
        };

        vm.getTags = function () {
            var res = "";
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.activities) {
                for (var i = 0; i < vm.projectTmp.activities.length; i++) {
                    if (i != 0)
                        res += " - ";
                    res += $translate.instant('ACTIVITY_' + vm.projectTmp.activities[i].code)
                }
            }
            if (vm.project.hasMaterial) {
                res += " - Matériel fourni";
            }
            return res;
        };

        vm.getWhen = function () {
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
        };

        vm.prev = function () {
            $state.go("proposals", {projectId: $stateParams.projectId});
        };

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
                    var dateObject = "J1";
                    if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd"))
                        dateObject = "J1";
                    else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd"))
                        dateObject = "J2";
                    else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd"))
                        dateObject = "J3";
                    switch (vm.projectTmp.availabilities[i].slot) {
                        case "7H_9H":
                            vm[dateObject].c1 = true;
                            break;
                        case "9H_12H":
                            vm[dateObject].c2 = true;
                            break;
                        case "12H_14H":
                            vm[dateObject].c3 = true;
                            break;
                        case "14H_16H":
                            vm[dateObject].c4 = true;
                            break;
                        case "16H_18H":
                            vm[dateObject].c5 = true;
                            break;
                        case "18H_20H":
                            vm[dateObject].c6 = true;
                            break;
                        case "AFTER_20H":
                            vm[dateObject].c7 = true;
                            break;
                        case "ALL_DAY":
                            vm[dateObject].c1 = true;
                            vm.all(vm[dateObject]);
                            break;
                    }

                }
            }
            else {
                vm.dateSelected = false;

                switch (vm.projectTmp.desiredDatePeriod) {
                    case "SPECIFIC":
                        vm.child0 = "activate";
                        vm.dateSelected = true;
                        break;
                    case "WITHIN_A_WEEK":
                        vm.child1 = "activate";
                        break;
                    case "WITHIN_A_MONTH":
                        vm.child2 = "activate";
                        break;
                    case "NONE":
                        vm.child3 = "activate";
                        break;
                }
            }
        }

        function errorProjectGET(res) {
            alertMsg.send("Error : Impossible to get the mission.", "danger");
            $state.go("my-projects");
        }

        vm.initHours();
    }
})();

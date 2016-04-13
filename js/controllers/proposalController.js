(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProposalController', ProposalController);

    //
    //Controller login
    ProposalController.$inject = ['$scope', '$state', 'networkService', 'alertMsg', '$filter', '$stateParams', '$rootScope', 'Lightbox'];
    function ProposalController($scope, $state, networkService, alertMsg, $filter, $stateParams, $rootScope, Lightbox) {
        var vm = this;
        vm.pro = true;
        vm.saveFlag = false;
        vm.editFlag = false;
        vm.proDetails = false;
        vm.editDescriptionFlag = false;
        vm.hireMessage = "Hi, I made my choice, I definitely choose you for my project.";
        vm.child0 = "";
        vm.child1 = "";
        vm.child2 = "";
        vm.child3 = "";
        vm.newAddrFlag = false;
        vm.dateSelected = false;
        vm.imagePreviewFlag = false;
        vm.disabledAddr = true;
        vm.project = {};
        vm.projectTmp = {};
        vm.prev = prev;
        vm.getWhen = getWhen;
        vm.getTags = getTags;
        vm.closeProject = closeProject;
        vm.hire = hire;
        vm.dateType = "";
        vm.dateFlag = false;
        vm.initDate = initDate;
        vm.whenFlag = false;
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
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        vm.all = all;
        vm.whereFlag = false;
        vm.imageFlag = false;
        vm.newAddr = {};
        vm.calculateExp = calculateExp;
        vm.indexOfObject = indexOfObject;
        vm.verifNameAddr = verifNameAddr;
        vm.getSlot = getSlot;
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


        if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
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
            vm.hireFlag = false;
            if (angular.isDefined($stateParams.proposalId) && $stateParams.proposalId)
                networkService.proposalGET($stateParams.proposalId, succesProposalGET, errorProposalGET);
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

        vm.ratePro = function () {
            $rootScope.rating = false;
            $rootScope.rate_watcher = !$rootScope.rate_watcher;
        };

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

        vm.selectImagePreview = function (index) {
            var data = [{url: vm.proposal.professional.portfolio[index].cloudinaryPublicId}];
            $rootScope.media = vm.proposal.professional.portfolio[index];
            Lightbox.openModal(data, 0);
        };

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

        if (angular.isDefined($stateParams.proposalId) && $stateParams.proposalId)
            networkService.proposalGET($stateParams.proposalId, succesProposalGET, errorProposalGET);

        function succesProposalGET(res) {
            vm.proposal = res;
            vm.proDetails = true;
            vm.pro = false;
            console.log(res);
        }

        function errorProposalGET(res) {
            alertMsg.send("Error. Can't get this proposal", "danger");
        }


        function limitLength(obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        }


        function succesProfileGET(res) {
            vm.user = res;


            console.log(res, vm.projectTmp);
        }

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
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
            if (vm.proposal.project.status == "ONGOING_PROJECT_ONGOING")
                $state.go('my-projects');
            else
                $state.go("proposals", {projectId: vm.proposal.project.id});
        }

        function closeProject() {
            networkService.closeProject(vm.proposal.id, function (res) {
                vm.proposal.project.status = "ONGOING_RATE_PRO";
                vm.project.status = "ONGOING_RATE_PRO";
                vm.closeFlag = false;
            }, function () {
                alertMsg.send("Error : project can't be close", "danger");
            });
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
                vm.dt = new Date(vm.projectTmp.desiredDate);
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
                                vm.J1.all = true;
                                vm.all(vm.J1);
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.all = true;
                                vm.all(vm.J2);
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.all = true;
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

(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProposalController', ProposalController);

    //
    //Controller login
    function ProposalController($scope, $localStorage, $state, networkService, alertMsg, $filter, $stateParams, $rootScope, Lightbox, $translate, uiGmapGoogleMapApi) {

        if ($localStorage.user.professional) {
            $state.go("home");
        }

        //TODO
        $rootScope.pageName = "";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;
        vm.disabledAddr = vm.pro = true;
        vm.dateSelected = vm.newAddrFlag = vm.editDescriptionFlag = vm.proDetails = vm.editFlag = vm.saveFlag = false;
        vm.hireMessage = "Hi, I made my choice, I definitely choose you for my project.";
        vm.dateType = vm.child1 = vm.child2 = vm.child3 = vm.child0 = "";
        vm.whereFlag = vm.imageFlag = vm.dateFlag = vm.whenFlag = vm.imagePreviewFlag = false;
        vm.project = {};
        vm.projectTmp = {};
        vm.markerCoords = {};
        uiGmapGoogleMapApi.then(function (maps) {
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
        });
        vm.dt = new Date();
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date();
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
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

        if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        }

        networkService.profileGET(succesProfileGET, errorProfileGET);

        vm.hire = function () {
            var formData = {
                id: vm.proposal.id,
                text: vm.hireMessage
            };
            networkService.proposalAcceptPOST(formData, succesProposalAcceptPOST, errorProposalAcceptPOST);
        };

        function succesProposalAcceptPOST(res) {
            vm.hireFlag = false;
            if (angular.isDefined($stateParams.proposalId) && $stateParams.proposalId)
                networkService.proposalGET($stateParams.proposalId, succesProposalGET, errorProposalGET);
            alertMsg.send("Proposition acceptée avec succès", "success");
        }

        function errorProposalAcceptPOST() {
            alertMsg.send("Impossible d'accepter cette proposition", "danger");
        }

        // vm.getQualities = function () {
        //     if (!angular.isUndefined(vm.proposal) && !angular.isUndefined(vm.proposal.professional) && !angular.isUndefined(vm.proposal.professional.qualities)) {
        //         var res = "";
        //         for (var i = 0; i < vm.proposal.professional.qualities.length; i++) {
        //             switch (vm.proposal.professional.qualities[i].name) {
        //                 case expression:
        //
        //                     break;
        //                 default:
        //
        //             }
        //         }
        //     }
        // }

        vm.ratePro = function () {
            $rootScope.rating = false;
            $rootScope.rate_watcher = !$rootScope.rate_watcher;
        };

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

        vm.selectImagePreview = function (index) {
            var data = [{url: vm.proposal.professional.portfolio[index].cloudinaryPublicId}];
            $rootScope.media = vm.proposal.professional.portfolio[index];
            Lightbox.openModal(data, 0);
        };

        vm.indexOfObject = function (a, token, array) {
            var res = [];
            if (!angular.isUndefined(array)) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][token] == a)
                        res.push(i);
                }
            }
            return res;
        };

        vm.calculateExp = function calculateExp(d) {
            return Math.abs(d - (new Date()).getFullYear());
        };

        function succesProposalGET(res) {
            vm.proposal = res;
            vm.proDetails = true;
            vm.pro = false;
        }

        function errorProposalGET(res) {
            alertMsg.send("Impossible de récupérer la proposition", "danger");
        }


        vm.limitLength = function (obj, token, limit) {
            if (obj[token].length >= limit)
                obj[token] = obj[token].slice(0, limit);
        };


        function succesProfileGET(res) {
            vm.user = res;
        }

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
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

        vm.getTags = function () {
            var res = "";
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.activities) {
                for (var i = 0; i < vm.projectTmp.activities.length; i++) {
                    if (i != 0)
                        res += " - ";
                    res += $translate.instant('ACTIVITY_' + vm.projectTmp.activities[i].code)
                }
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
            if (vm.proposal.project.status == "ONGOING_PROJECT_ONGOING")
                $state.go('my-projects');
            else
                $state.go("proposals", {projectId: vm.proposal.project.id});
        };

        vm.closeProject = function () {
            networkService.closeProject(vm.proposal.id, function (res) {
                vm.proposal.project.status = "ONGOING_RATE_PRO";
                vm.project.status = "ONGOING_RATE_PRO";
                vm.closeFlag = false;
            }, function () {
                alertMsg.send("Impossible de fermer le projet", "danger");
            });
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
            alertMsg.send("Impossible de récupérer le projet", "danger");
            $state.go("my-projects");
        }

        vm.initHours();
        if (angular.isDefined($stateParams.proposalId) && $stateParams.proposalId)
            networkService.proposalGET($stateParams.proposalId, succesProposalGET, errorProposalGET);

        vm.getClUrlThumbnail = function (clPublicId) {
            return $.cloudinary.url(clPublicId, {secure: true, width: 200, height: 200, crop: 'fill'});
        };

        vm.getClUrl = function (clPublicId) {
            return $.cloudinary.url(clPublicId, {secure: true});
        };

    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProJobController', ProJobController);

    //
    //Controller login
    function ProJobController($rootScope, $scope, $state, networkService, alertMsg, $filter, $stateParams) {

        //TODO
        $rootScope.pageName = "";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;
        vm.markerCoords = {};
        vm.declineComment = "";
        vm.declineFlag = vm.imagePreviewFlag = vm.myDateFlag = vm.myPriceFlag = false;
        vm.price = 0;
        vm.offer = {};
        vm.dt = new Date();
        vm.now = new Date();
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date();
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        vm.error = {};
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
        if (!angular.isUndefined($stateParams.proposalId) && $stateParams.proposalId) {
            networkService.proposalProGET($stateParams.proposalId, succesProjectGET, errorProjectGET);
        }

        vm.declineProposal = function () {

        };

        vm.decline = function () {
            vm.declineFlag = true;
        };

        vm.save = function () {
            vm.proposalTmp.type = vm.project.type;
            vm.proposalTmp.priceType = $filter('uppercase')(vm.proposalTmp.priceType);
            networkService.proposalPUT(vm.proposalTmp, function (res) {
                alertMsg.send("Proposal updated.", "success");
            }, function (res) {
                alertMsg.send("Proposal not updated.", "danger");
            });
            vm.editFlag = false;
        };

        vm.editPrice = function () {
            if (vm.editFlag) {
                vm.myPrice = vm.proposalTmp.price;
                vm.myPriceFlag = true;
            }
        };

        vm.editDate = function () {
            if (vm.editFlag) {
                if (vm.projectTmp.type == "EMERGENCY" && vm.projectTmp.availabilities) {
                    vm.disabledDay(vm.J1);
                    vm.disabledDay(vm.J2);
                    vm.disabledDay(vm.J3);
                    vm.unSelectOther();
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
                    var dateObject = "J1";
                    if (vm.proposalTmp.availability.date == $filter('date')(vm.J1.date, "yyyy-MM-dd"))
                        dateObject = "J1";
                    else if (vm.proposalTmp.availability.date == $filter('date')(vm.J2.date, "yyyy-MM-dd"))
                        dateObject = "J2";
                    else if (vm.proposalTmp.availability.date == $filter('date')(vm.J3.date, "yyyy-MM-dd"))
                        dateObject = "J3";
                    switch (vm.proposalTmp.availability.slot) {
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
                else
                    vm.dt = new Date(vm.proposalTmp.startDate);
                vm.myDateFlag = true;
            }
        };

        vm.edit = function () {
            vm.editFlag = true;
        };

        vm.cancel = function () {
            vm.proposalTmp = vm.proposal;
            vm.editFlag = false;
        };

        vm.getStartDate = function () {
            if (!angular.isUndefined(vm.proposalTmp) && vm.proposalTmp && vm.proposalTmp.availability && vm.proposalTmp.availability.date && vm.proposalTmp.availability.slot)
                return $filter('date')(new Date(vm.proposalTmp.availability.date), "dd EEE yyyy") + " " + vm.proposalTmp.availability.slot;
            else if (!angular.isUndefined(vm.proposalTmp) && vm.proposalTmp.startDate)
                return $filter('date')(new Date(vm.proposalTmp.startDate), "dd MMM.  yyyy");
        };

        vm.getTags = function () {
            var res = "";
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.activities) {
                if (vm.projectTmp.activities.length > 0 && vm.projectTmp.type == "EMERGENCY")
                    res += " - ";
                for (var i = 0; i < vm.projectTmp.activities.length; i++) {
                    if (i != 0)
                        res += " - ";
                    res += vm.projectTmp.activities[i].code;
                }
            }
            return res;
        };

        vm.sendOffer = function () {
            if (vm.offer.comment && vm.offer.comment.length > 0 && vm.offer.comment.indexOf(' ') > -1 && ((vm.projectTmp.type == "EMERGENCY" && vm.offer.price.price && vm.offer.date.date) || (vm.projectTmp.type != "EMERGENCY"))) {
                vm.offer.date.date = vm.offer.date.date || null;
                vm.offer.comment = vm.offer.comment || "";
                var formData = {
                    project: {id: vm.projectTmp.id},
                    price: parseInt(vm.offer.price.price),
                    priceType: $filter('uppercase')(vm.offer.price.type),
                    comment: vm.offer.comment
                };
                if (vm.projectTmp.type == 'EMERGENCY') {
                    formData.availability = {
                        date: $filter('date')(vm.offer.date.date, "yyyy-MM-dd"),
                        slot: vm.offer.date.slot
                    };
                    networkService.proposalEmergencyPOST(formData, function (res) {
                        alertMsg.send("Proposal sent.", "success");
                    }, function (res) {
                        alertMsg.send("Error : proposal not sent", "danger");
                    });
                }
                else {
                    formData.startDate = $filter('date')(vm.offer.date.date, "yyyy-MM-dd");
                    networkService.proposalSmallPOST(formData, function (res) {
                        alertMsg.send("Proposal sent.", "success");
                    }, function (res) {
                        alertMsg.send("Error : proposal not sent", "danger");
                    });
                }
            } else {
                if (vm.projectTmp.type == "EMERGENCY")
                    vm.error.comment.message = "The comment is mandatory";
                else
                    vm.error.comment.message = "Price, Start date and comment are mandatory"
                vm.error.comment.falg = true;
            }
        };

        vm.selectDate = function () {
            vm.proposalTmp.startDate = $filter('date')(vm.dt, 'yyyy-MM-dd');
            if (vm.projectTmp.type == 'EMERGENCY') {
                var tmp = [];
                initDate(vm.J1, tmp);
                initDate(vm.J2, tmp);
                initDate(vm.J3, tmp);
                if (tmp.length > 0) {
                    vm.proposalTmp.availability.date = $filter('date')(tmp[0].date, "yyyy-MM-dd");
                    vm.proposalTmp.availability.slot = tmp[0].slot;
                    vm.myDateFlag = false;
                }
            }
        };

        vm.getSlot = function () {
            if (!angular.isUndefined(vm.proposal) && !angular.isUndefined(vm.proposal.availability) && !angular.isUndefined(vm.proposal.availability.slot)) {
                var tmp = _.split(vm.proposal.availability.slot, '_');
                if (tmp[0] == "AFTER")
                    return $filter('lowercase')(tmp[1]);
                return $filter('lowercase')(tmp[0]);
            }
        };

        vm.all = function (j) {
            angular.forEach(j, function (value, key) {
                if (key != 'date' && j.all == true)
                    j[key] = true;
                else if (key != 'date' && j.all == false)
                    j[key] = false;
            });
        };

        vm.disabledDay = function (j) {
            j.c6Disabled = j.c5Disabled = j.c4Disabled = j.c3Disabled = j.c2Disabled = j.c1Disabled = j.c7Disabled = j.allDisabled = "checkbox-disabled";
        };

        function enabledDay(j) {
            j.c6Disabled = j.c5Disabled = j.c4Disabled = j.c3Disabled = j.c2Disabled = j.c1Disabled = j.c7Disabled = j.allDisabled = "";
        }

        vm.unSelectOther = function () {
            vm.J3.all = vm.J2.all = vm.J1.all = false;
            vm.all(vm.J1);
            vm.all(vm.J2);
            vm.all(vm.J3);
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
            var tmp = '';
            if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J1.date, "yyyy-MM-dd"))
                tmp = 'J1';
            else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J2.date, "yyyy-MM-dd"))
                tmp = 'J2';
            else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J3.date, "yyyy-MM-dd"))
                tmp = 'J3';
            if (vm.time >= 9)
                vm[tmp].allDisabled = vm[tmp].c1Disabled = "checkbox-disabled";
            if (vm.time >= 12)
                vm[tmp].allDisabled = vm[tmp].c2Disabled = "checkbox-disabled";
            if (vm.time >= 14)
                vm[tmp].allDisabled = vm[tmp].c3Disabled = "checkbox-disabled";
            if (vm.time >= 16)
                vm[tmp].allDisabled = vm[tmp].c4Disabled = "checkbox-disabled";
            if (vm.time >= 18)
                vm[tmp].allDisabled = vm[tmp].c5Disabled = "checkbox-disabled";
            if (vm.time >= 20)
                vm[tmp].allDisabled = vm[tmp].c6Disabled = "checkbox-disabled";
        };

        vm.selectPrice = function (type) {
            vm.error.price = vm.error.price || {};
            if (vm.myPrice > 1) {
                vm.proposalTmp.price = vm.myPrice;
                vm.proposalTmp.priceType = type;
                vm.error.price.flag = vm.myPriceFlag = false;
            }
            else {
                vm.error.price.message = "At least 1 Euro";
                vm.error.price.flag = true;
            }
        };

        vm.selectImagePreview = function (media) {
            vm.imgTmpPreview = media;
            vm.imagePreviewFlag = true;
        };

        vm.dateDiff = function (d1, d2) {
            var h = 0;
            var d = 0;
            var m = 0;
            var min = 0;
            d1 = new Date(d1).getTime() / 60000;
            d2 = new Date(d2).getTime() / 60000;
            var min = new Number(d2 - d1).toFixed(0);
            if (min > 60) {
                h = min / 60;
                if (h > 24) {
                    d = h / 24;
                    if (d > 30)
                        m = d / 30;
                }
            }
            if (m > 0)
                return $filter('number')(m, 0) + " mois"
            else if (d > 0)
                return $filter('number')(d, 0) + " jours";
            else if (h > 0)
                return $filter('number')(h, 0) + "h";
            else
                return $filter('number')(min, 0) + " min";
        };

        function succesProjectGET(res) {
            vm.project = res.project;
            vm.proposal = res;
            vm.proposalTmp = angular.copy(vm.proposal);
            vm.projectTmp = angular.copy(vm.project);
            if (vm.projectTmp.type != "EMERGENCY") {
                vm.dateType = vm.projectTmp.desiredDatePeriod;
                vm.dt = new Date(vm.projectTmp.desiredDate);
            }
            if (vm.projectTmp.type == "EMERGENCY" && vm.projectTmp.availabilities) {
                vm.disabledDay(vm.J1);
                vm.disabledDay(vm.J2);
                vm.disabledDay(vm.J3);
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
                            vm[dateObject].c1Disabled = true;
                            break;
                        case "9H_12H":
                            vm[dateObject].c2Disabled = true;
                            break;
                        case "12H_14H":
                            vm[dateObject].c3Disabled = true;
                            break;
                        case "14H_16H":
                            vm[dateObject].c4Disabled = true;
                            break;
                        case "16H_18H":
                            vm[dateObject].c5Disabled = true;
                            break;
                        case "18H_20H":
                            vm[dateObject].c6Disabled = true;
                            break;
                        case "AFTER_20H":
                            vm[dateObject].c7Disabled = true;
                            break;
                        case "ALL_DAY":
                            vm[dateObject].c1 = true;
                            enabledDay(vm[dateObject]);
                            break;
                    }
                }
                var dateObject = "J1";
                if (vm.proposal.availability.date == $filter('date')(vm.J1.date, "yyyy-MM-dd"))
                    dateObject = "J1";
                else if (vm.proposal.availability.date == $filter('date')(vm.J2.date, "yyyy-MM-dd"))
                    dateObject = "J2";
                else if (vm.proposal.availability.date == $filter('date')(vm.J3.date, "yyyy-MM-dd"))
                    dateObject = "J3";
                switch (vm.proposal.availability.slot) {
                    case "7H_9H":
                        vm[dateObject].c1Disabled = true;
                        break;
                    case "9H_12H":
                        vm[dateObject].c2Disabled = true;
                        break;
                    case "12H_14H":
                        vm[dateObject].c3Disabled = true;
                        break;
                    case "14H_16H":
                        vm[dateObject].c4Disabled = true;
                        break;
                    case "16H_18H":
                        vm[dateObject].c5Disabled = true;
                        break;
                    case "18H_20H":
                        vm[dateObject].c6Disabled = true;
                        break;
                    case "AFTER_20H":
                        vm[dateObject].c7Disabled = true;
                        break;
                    case "ALL_DAY":
                        vm[dateObject].all = true;
                        vm[dateObject].allDisabled = '';
                        enabledDay(vm[dateObject]);
                        break;
                }
            }
            else {
                vm.dt = new Date(vm.proposal.startDate);
            }
        }

        vm.getWhen = function () {
            var res = 0;
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.availabilities && vm.projectTmp.availabilities.length > 0) {
                for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
                    res += 1;
                }
                return "Emergency : " + res + " slots appointment"
            }
            else if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.desiredDatePeriod) {
                switch (vm.projectTmp.desiredDatePeriod) {
                    case "SPECIFIC":
                        return "Le " + vm.projectTmp.desiredDate;
                    case "WITHIN_A_WEEK":
                        var d = new Date();
                        d.setDate(d.getDate() + 7);
                        return "until " + $filter('date')(d, "yyyy-MM-dd");
                    case "WITHIN_A_MONTH":
                        var d = new Date();
                        d.setDate(d.getDate() + 30);
                        return "Until " + $filter('date')(d, "yyyy-MM-dd");
                    case "NONE":
                        return "Flexible sur la date de départ";
                }
            }
            else {
                return "";
            }
        };

        function errorProjectGET() {
            // $state.go("prodashboard");
        }

        vm.initHours();

    }
})();

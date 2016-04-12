(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProProjectController', ProProjectController);

    //
    //Controller login
    ProProjectController.$inject = ['$scope', '$state', '$timeout', '$localStorage', 'networkService', 'alertMsg', 'Upload', 'cloudinary', '$filter', '$stateParams'];
    function ProProjectController($scope, $state, $timeout, $localStorage, networkService, alertMsg, $upload, cloudinary, $filter, $stateParams) {
        var vm = this;
        vm.getWhen = getWhen;
        vm.getTags = getTags;
        vm.dateDiff = dateDiff;
        vm.myPrice = myPrice;
        vm.myDate = myDate;
        vm.selectImagePreview = selectImagePreview;
        vm.selectPrice = selectPrice;
        vm.selectDate = selectDate;
        vm.sendOffer = sendOffer;
        vm.disabledDay = disabledDay;
        vm.unSelectOther = unSelectOther;
        vm.imagePreviewFlag = false;
        vm.myPriceFlag = false;
        vm.myDateFlag = false;
        vm.price = 0;
        vm.offer = {};
        vm.error = {};

        vm.now = new Date();
        vm.dt = new Date();
        vm.price = "";
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date();
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
        vm.initHours = initHours;
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        vm.all = all;
        vm.getSlot = getSlot;

        vm.circle =
        {
            id: 1,
            center: {
                latitude: 0,
                longitude: 0
            },
            radius: 200,
            stroke: {
                color: '#00aded',
                weight: 2,
                opacity: 1
            },
            visible: false,
            control: {},
            bounds: {}
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

        if ($stateParams.projectId) {
            var res = parseInt($stateParams.projectId);
            if (res.toString() != $stateParams.projectId)
                $state.go("prodashboard");
            else {
                networkService.proProjectGET(res, succesProjectGET, errorProjectGET);
            }
        }
        else {
            $state.go("prodashboard");
        }

        function unSelectOther() {
            vm.J1.all = false;
            vm.all(vm.J1);
            vm.J2.all = false;
            vm.all(vm.J2);
            vm.J3.all = false;
            vm.all(vm.J3);
        }

        function getTags() {
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
        }

        function sendOffer() {
            if (vm.offer.comment && vm.offer.comment.length > 0 && vm.offer.comment.indexOf(' ') > -1 && ((vm.projectTmp.type == "EMERGENCY" && vm.offer.price && vm.offer.price.price && vm.offer.date && vm.offer.date.date) || (vm.projectTmp.type != "EMERGENCY"))) {
                if (vm.projectTmp.type == 'EMERGENCY') {
                    vm.offer.date.date = vm.offer.date.date || null;
                    vm.offer.comment = vm.offer.comment || "";
                    var formData = {
                        project: {id: vm.projectTmp.id},
                        price: parseInt(vm.offer.price.price),
                        priceType: $filter('uppercase')(vm.offer.price.type),
                        comment: vm.offer.comment
                    }
                    formData.availability = {
                        date: $filter('date')(vm.offer.date.date, "yyyy-MM-dd"),
                        slot: vm.offer.date.slot
                    };
                    networkService.proposalEmergencyPOST(formData, function (res) {
                        console.log(res);
                        alertMsg.send("Proposal sent.", "success");
                        $state.go('prodashboard');
                    }, function (res) {
                        alertMsg.send("Error : proposal not sent", "danger");
                    });
                }
                else {
                    vm.offer.comment = vm.offer.comment || "";
                    var formData = {
                        project: {id: vm.projectTmp.id},
                        comment: vm.offer.comment
                    }
                    if (vm.offer.price && vm.offer.price.price) {
                        formData.price = parseInt(vm.offer.price.price);
                        formData.priceType = $filter('uppercase')(vm.offer.price.type);
                    }
                    if (vm.offer.date && vm.offer.date.date) {
                        formData.startDate = $filter('date')(vm.offer.date.date, "yyyy-MM-dd");
                    }
                    networkService.proposalSmallPOST(formData, function (res) {
                        console.log(res);
                        alertMsg.send("Proposal sent.", "success");
                        $state.go('prodashboard');
                    }, function (res) {
                        alertMsg.send("Error : proposal not sent", "danger");
                    });
                }
            } else {
                vm.error = {comment: {}};
                if (vm.projectTmp.type != "EMERGENCY")
                    vm.error.comment.message = "The comment is mandatory";
                else {
                    vm.error.comment.message = "Price, Start date and Comment are mandatory"
                }
                vm.error.comment.flag = true;
            }
        }

        function selectDate() {
            vm.offer.date = {date: vm.dt};
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
            else if (vm.projectTmp.type != 'EMERGENCY')
                vm.myDateFlag = false;
        }

        function getSlot(slot) {
            slot = slot || null;
            switch (slot) {
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
                default:
                    return "";
            }
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

        function disabledDay(j) {
            j.allDisabled = "checkbox-disabled";
            j.c1Disabled = "checkbox-disabled";
            j.c2Disabled = "checkbox-disabled";
            j.c3Disabled = "checkbox-disabled";
            j.c4Disabled = "checkbox-disabled";
            j.c5Disabled = "checkbox-disabled";
            j.c6Disabled = "checkbox-disabled";
            j.c7Disabled = "checkbox-disabled";
        }

        function enabledDay(j) {
            j.allDisabled = "";
            j.c1Disabled = "";
            j.c2Disabled = "";
            j.c3Disabled = "";
            j.c4Disabled = "";
            j.c5Disabled = "";
            j.c6Disabled = "";
            j.c7Disabled = "";
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
                if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                    vm.J1.c1Disabled = "checkbox-disabled";
                    vm.J1.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                    vm.J2.c1Disabled = "checkbox-disabled";
                    vm.J2.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                    vm.J3.c1Disabled = "checkbox-disabled";
                    vm.J3.allDisabled = "checkbox-disabled";
                }
            }
            if (vm.time >= 12) {
                if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                    vm.J1.c2Disabled = "checkbox-disabled";
                    vm.J1.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                    vm.J2.c2Disabled = "checkbox-disabled";
                    vm.J2.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                    vm.J3.c2Disabled = "checkbox-disabled";
                    vm.J3.allDisabled = "checkbox-disabled";
                }
            }
            if (vm.time >= 14) {
                if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                    vm.J1.c3Disabled = "checkbox-disabled";
                    vm.J1.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                    vm.J2.c3Disabled = "checkbox-disabled";
                    vm.J2.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                    vm.J3.c3Disabled = "checkbox-disabled";
                    vm.J3.allDisabled = "checkbox-disabled";
                }
            }
            if (vm.time >= 16) {
                if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                    vm.J1.c4Disabled = "checkbox-disabled";
                    vm.J1.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                    vm.J2.c4Disabled = "checkbox-disabled";
                    vm.J2.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                    vm.J3.c4Disabled = "checkbox-disabled";
                    vm.J3.allDisabled = "checkbox-disabled";
                }
            }
            if (vm.time >= 18) {
                if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                    vm.J1.c5Disabled = "checkbox-disabled";
                    vm.J1.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                    vm.J2.c5Disabled = "checkbox-disabled";
                    vm.J2.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                    vm.J3.c5Disabled = "checkbox-disabled";
                    vm.J3.allDisabled = "checkbox-disabled";
                }
            }
            if (vm.time >= 20) {
                if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                    vm.J1.c6Disabled = "checkbox-disabled";
                    vm.J1.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                    vm.J2.c6Disabled = "checkbox-disabled";
                    vm.J2.allDisabled = "checkbox-disabled";
                }
                else if ($filter('date')(vm.now, "yyyy-MM-dd") == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                    vm.J3.c6Disabled = "checkbox-disabled";
                    vm.J3.allDisabled = "checkbox-disabled";
                }
            }
        }

        function getWhen() {
            var res = "";
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.availabilities && vm.projectTmp.availabilities.length > 0) {
                var arr = $filter('orderBy')(vm.projectTmp.availabilities, "date");
                for (var i = 0; i < arr.length; i++) {
                    if (i == 0)
                        res += $filter('date')(new Date(arr[i].date), "EEE dd/MM") + " ";
                    else if (arr[i].date != arr[i - 1].date)
                        res += "\n" + $filter('date')(new Date(arr[i].date), "EEE dd/MM") + " ";
                    switch (arr[i].slot) {
                        case "7H_9H":
                            res += "7h-9h. ";
                            break;
                        case "9H_12H":
                            res += "9h-12h. ";
                            break;
                        case "12H_14H":
                            res += "12h-14h. ";
                            break;
                        case "14H_16H":
                            res += "14h-16h. ";
                            break;
                        case "16H_18H":
                            res += "16h-18h. ";
                            break;
                        case "18H_20H":
                            res += "18h-20h. ";
                            break;
                        case "AFTER_20H":
                            res += "Après 20h. ";
                            break;
                        case "ALL_DAY":
                            res += "Toute la journée. ";
                            break;
                    }
                }
                return res;
            }
            else if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.type != "EMERGENCY") {
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
            return "";
        }

        function selectPrice(type) {
            vm.error.price = {message: "At least 10 Euro", flag: false};
            if (vm.price < 10) {
                vm.error.price.message = "At least 10 Euro";
                vm.error.price.flag = true;
                vm.price = 10;
            }
            else {
                vm.offer.price = {type: type, price: vm.price};
                vm.myPriceFlag = false;
                vm.error.price.flag = false;
            }

        }

        function myPrice() {
            vm.myPriceFlag = true;
        }

        function myDate() {
            vm.myDateFlag = true;
        }

        function selectImagePreview(media) {
            $timeout(function () {
                vm.imgTmpPreview = {};
                $timeout(function () {
                    vm.imgTmpPreview = media;
                    vm.imagePreviewFlag = true;
                }, 0)
            }, 0)

        }

        function dateDiff(d1, d2) {
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
            if (m > 0) {
                return $filter('number')(m, 0) + " mois"
            }
            else if (d > 0)
                return $filter('number')(d, 0) + " jours";
            else if (h > 0)
                return $filter('number')(h, 0) + "h";
            else
                return $filter('number')(min, 0) + " min";
        }

        function succesProjectGET(res) {

            $scope.map.center = {
                latitude: res.address.latitude,
                longitude: res.address.longitude
            };
            $scope.map.zoom = 14;

            vm.circle.center = {
                latitude: res.address.latitude,
                longitude: res.address.longitude
            };
            vm.circle.visible = true;

            vm.project = res;
            console.log(res);
            vm.projectTmp = angular.copy(vm.project);
            vm.whenSlot = vm.getWhen();
            if (vm.projectTmp.type != "EMERGENCY") {
                vm.dateType = vm.projectTmp.desiredDatePeriod;
                vm.dt = new Date(vm.projectTmp.desiredDate);
            }
            if (vm.projectTmp.type == "EMERGENCY" && vm.projectTmp.availabilities) {
                vm.disabledDay(vm.J1);
                vm.disabledDay(vm.J2);
                vm.disabledDay(vm.J3);
                for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
                    switch (vm.projectTmp.availabilities[i].slot) {
                        case "7H_9H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c1Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c1Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c1Disabled = '';
                            }
                            break;
                        case "9H_12H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c2Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c2Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c2Disabled = '';
                            }
                            break;
                        case "12H_14H":
                            console.log(vm.projectTmp.availabilities[i].date, $filter('date')(vm.J1.date, "yyyy-MM-dd"), $filter('date')(vm.J2.date, "yyyy-MM-dd"), $filter('date')(vm.J3.date, "yyyy-MM-dd"));

                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c3Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c3Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c3Disabled = '';
                            }
                            break;
                        case "14H_16H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c4Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c4Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c4Disabled = '';
                            }
                            break;
                        case "16H_18H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c5Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c5Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c5Disabled = '';
                            }
                            break;
                        case "18H_20H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c6Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c6Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c6Disabled = '';
                            }
                            break;
                        case "AFTER_20H":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.c7Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.c7Disabled = '';
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.c7Disabled = '';
                            }
                            break;
                        case "ALL_DAY":
                            if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")) {
                                vm.J1.allDisabled = '';
                                enabledDay(vm.J1);
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")) {
                                vm.J2.allDisabled = '';
                                enabledDay(vm.J2);
                            }
                            else if (vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")) {
                                vm.J3.allDisabled = '';
                                enabledDay(vm.J3);
                            }
                            break;
                    }
                    vm.initHours();
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


        function errorProjectGET() {
            $state.go("prodashboard");
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProProjectController', ProProjectController);

    //
    //Controller login
    function ProProjectController($rootScope, $scope, $localStorage, $state, $timeout, networkService, alertMsg, $filter, $stateParams, uiGmapGoogleMapApi) {

        if ($localStorage.user && !$localStorage.user.professional) {
            $state.go("home");
        }

        //TODO
        $rootScope.pageName = "";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;
        vm.getWhen = getWhen;
        vm.getTags = getTags;
        vm.myPrice = myPrice;
        vm.myDate = myDate;
        vm.selectImagePreview = selectImagePreview;
        vm.selectPrice = selectPrice;
        vm.selectDate = selectDate;
        vm.sendOffer = sendOffer;
        vm.imagePreviewFlag = false;
        vm.myPriceFlag = false;
        vm.myDateFlag = false;
        vm.price = 0;
        vm.offer = {};
        vm.error = {};

        vm.now = new Date();
        vm.dt = new Date();
        vm.default = angular.copy(vm.dt);
        vm.price = "";

        vm.datepickerOptions = {
            showWeeks: false,
            customClass: getDayClass
        };

        uiGmapGoogleMapApi.then(function (maps) {
            vm.circle =
            {
                id: 1,
                center: {
                    latitude: 0,
                    longitude: 0
                },
                radius: 200,
                stroke: {
                    color: '#03A9F4',
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
        });

        if ($stateParams.projectId) {
            networkService.proProjectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        } else {
            $state.go("findjobs");
        }

        function getTags() {
            var res = "";
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.activities) {
                for (var i = 0; i < vm.projectTmp.activities.length; i++) {
                    if (i != 0)
                        res += " - ";
                    res += vm.projectTmp.activities[i].code
                }
            }
            return res;
        }

        function sendOffer() {
            if (vm.offer.comment && vm.offer.comment.length > 20 && vm.offer.comment.indexOf(' ') > -1) {
                vm.offer.comment = vm.offer.comment || "";
                var formData = {
                    project: {id: vm.projectTmp.id},
                    comment: vm.offer.comment
                };
                if (vm.offer.price && vm.offer.price.price) {
                    formData.price = parseInt(vm.offer.price.price);
                    formData.priceType = $filter('uppercase')(vm.offer.price.type);
                }
                if (vm.offer.date && vm.offer.date.date) {
                    formData.startDate = $filter('date')(vm.offer.date.date, "yyyy-MM-dd");
                }
                networkService.proposalPOST(formData, function (res) {
                    alertMsg.send("Proposition envoyée avec succès", "success");
                    $state.go('pro-proposals');
                }, function (res) {
                    alertMsg.send("Impossible d'envoyer la proposition", "danger");
                });
            } else {
                vm.error = {comment: {}};
                vm.error.comment.message = "Merci d'écrire un premier message au client (20 caractères minimum)";
                vm.error.comment.flag = true;
            }
        }

        function selectDate() {
            vm.offer.date = {date: vm.dt};
            vm.myDateFlag = false;
        }

        function setMinMaxDate() {
            var minDate = new Date();
            var maxDate = new Date();
            maxDate.setDate(minDate.getDate() + 91);
            if (vm.projectTmp.desiredDatePeriod == "SPECIFIC" && moment(vm.projectTmp.desiredDate).isAfter(minDate)) {
                // move date picker marker to desiredDate
                vm.dt = new Date(vm.projectTmp.desiredDate);
            }
            vm.datepickerOptions.minDate = minDate;
            vm.datepickerOptions.maxDate = maxDate;
        }

        function getDayClass(date, mode) {
            if (vm.projectTmp && date.mode === 'day' && moment(date.date).isSame(moment(vm.projectTmp.desiredDate), 'day')) {
                return 'desiredDate';
            }
            return '';
        }

        function getWhen() {
            var res = 0;
            if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.desiredDatePeriod) {
                switch (vm.projectTmp.desiredDatePeriod) {
                    case "SPECIFIC":
                        return "autour du " + moment(vm.projectTmp.desiredDate).format("D MMMM YYYY");
                    case "WITHIN_A_WEEK":
                        return "dans la semaine autour du " + moment(vm.projectTmp.desiredDate).format("D MMMM YYYY");
                    case "WITHIN_A_MONTH":
                        return "avant le " + moment(vm.projectTmp.desiredDate).format("D MMMM YYYY");
                    case "NONE":
                    default:
                        return 'dès que possible';
                }
            } else {
                return "";
            }
        }

        function selectPrice(type) {
            vm.error.price = {message: "Merci de proposer un tarif réaliste - ou de ne pas en mettre", flag: false};
            if (vm.price < 10) {
                vm.error.price.flag = true;
                vm.price = '';
            } else {
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
            vm.projectTmp = angular.copy(vm.project);
            vm.dateType = vm.projectTmp.desiredDatePeriod;
            setMinMaxDate();
        }

        function errorProjectGET(err) {
            $state.go("findjobs");
        }

        vm.getStringLength = function (str) {
            if (!str) {
                return 0;
            }
            return str.length;
        };

    }
})();

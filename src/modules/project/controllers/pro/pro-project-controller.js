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

        $rootScope.updateProfile();

        var vm = this;
        vm.getWhen = getWhen;
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
                radius: 150,
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
            $state.go("pro-dashboard");
        }

        function sendOffer() {
            if (vm.offer.comment && vm.offer.comment.length > 40 && vm.offer.comment.indexOf(' ') > -1) {
                vm.offer.comment = vm.offer.comment || "";
                var formData = {
                    project: {id: vm.projectTmp.id},
                    comment: vm.offer.comment
                };
                if (vm.offer.price && vm.offer.price) {
                    formData.price = parseInt(vm.offer.price);
                }
                if (vm.offer.date && vm.offer.date) {
                    formData.startDate = $filter('date')(vm.offer.date, "yyyy-MM-dd");
                }
                networkService.proposalPOST(formData, function (res) {
                    alertMsg.send("Proposition envoyée avec succès", "success");
                    $state.go('pro-proposals');
                }, function (res) {
                    alertMsg.send("Impossible d'envoyer la proposition", "danger");
                });
            }
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

        function selectDate() {
            vm.offer.date = vm.dt;
            vm.myDateFlag = false;
        }

        function selectPrice() {
            vm.error.price = vm.error.price || {};
            if (vm.price <= 30 || vm.price > 1000000) {
                vm.error.price.message = "Merci d'indiquer un montant réaliste";
                vm.error.price.flag = true
            } else {
                vm.offer.price = vm.price;
                vm.myPriceFlag = false;
                vm.error.price.flag = false;
            }
        }

        vm.isValidPrice = function () {
            if (!vm.price || vm.price == 0 || vm.price <= 30 || vm.price > 1000000) {
                return false;
            }
            return true;
        };

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
            $scope.map.zoom = 15;

            vm.circle.center = {
                latitude: res.address.latitude,
                longitude: res.address.longitude
            };
            vm.circle.visible = true;

            vm.marker = {
                coords: {
                    latitude: res.address.latitude,
                    longitude: res.address.longitude
                },
                options: {
                    icon: "http://res.cloudinary.com/yaka/image/upload/yakaclub/pinSmallProject.png"
                }
            };

            vm.project = res;

            if (vm.project.address.address) {
                vm.project.address.address = vm.project.address.address.replace(/, /g, "\n");
            }

            $rootScope.pageName = vm.project.user.firstName + " " +
                vm.project.user.lastName +
                " - " + vm.project.title;

            vm.projectTmp = angular.copy(vm.project);
            vm.dateType = vm.projectTmp.desiredDatePeriod;
            setMinMaxDate();
        }

        function errorProjectGET(err) {
            $state.go("pro-dashboard");
        }

        vm.getStringLength = function (str) {
            if (!str) {
                return 0;
            }
            return str.length;
        };

        vm.getTags = function () {
            var res = [];
            if (!angular.isUndefined(vm.project) && vm.project.activities) {
                for (var i = 0; i < vm.project.activities.length; i++) {
                    if (!_.includes(res, vm.project.activities[i].code)) {
                        res.push(vm.project.activities[i].code);
                    }
                }
                if (vm.project.hasMaterial) {
                    res.push("MATERIAL_TRUE");
                }
            }
            return res;
        };


        vm.editPrice = function () {
            vm.price = vm.offer.price;
            vm.myPriceFlag = true;
        };

        vm.editDate = function () {
            vm.dt = vm.offer.date;
            vm.myDateFlag = true;
        };

        vm.formIsValid = function () {
            return (vm.offer &&
            vm.offer.comment &&
            vm.offer.comment.length >= 40);
        };
    }
})();

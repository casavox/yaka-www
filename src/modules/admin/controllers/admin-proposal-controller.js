(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AdminProposalController', AdminProposalController);

    //
    //Controller login
    function AdminProposalController($rootScope, $scope, $localStorage, $state, networkService, alertMsg, $filter, $stateParams, uiGmapGoogleMapApi, modalService, smoothScroll) {

        if ($localStorage.user && !$localStorage.user.isAdmin) {
            $state.go("home");
        }

        var vm = this;

        $rootScope.updateProfile();

        vm.showChat = false;
        vm.scrollBottom = 0;

        if ($stateParams.chat) {

            setTimeout(function () {
                vm.showChat = true;
                vm.scrollBottom = 1;
            }, 500);
        }

        vm.getWhen = getWhen;
        vm.selectImagePreview = selectImagePreview;
        vm.selectPrice = selectPrice;
        vm.selectDate = selectDate;
        vm.getTags = getTags;
        vm.edit = edit;
        vm.cancel = cancel;
        vm.save = save;
        vm.editPrice = editPrice;
        vm.editDate = editDate;
        vm.cancelProposalModal = cancelProposalModal;
        vm.cancelRecommandationModal = cancelRecommandationModal;
        vm.cancelProposal = cancelProposal;
        vm.cancelRecommandation = cancelRecommandation;
        vm.declineFlag = false;
        vm.imagePreviewFlag = false;
        vm.myPriceFlag = false;
        vm.myDateFlag = false;
        vm.price = 0;
        vm.offer = {};

        vm.dt = new Date();
        vm.now = new Date();
        vm.default = angular.copy(vm.dt);
        vm.datepickerOptions = {
            showWeeks: false,
            customClass: getDayClass
        };
        vm.error = {};

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
                    weight: 1,
                    opacity: 1
                },
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

        if ($stateParams.proposalId) {
            networkService.adminProposalGET($stateParams.proposalId, succesProjectGET, errorProjectGET);
        } else {
            $state.go('home');
        }

        function cancelProposal(cancelProposalMessage) {
            networkService.proProposalDeclinePOST($stateParams.proposalId,
                {text: cancelProposalMessage},
                function (res) {
                    alertMsg.send("Votre proposition à bien été retirée", "info");
                    $state.go("pro-proposals");
                }, function () {
                    alertMsg.send("Impossible de retirée la proposition (contactez le support)", "danger");
                }, true
            );
        }

        function cancelProposalModal() {
            modalService.proCancelProposal(vm.proposal.status, function (chatMessage) {
                vm.cancelProposal(chatMessage);
            });
        }

        function cancelRecommandation(cancelMessage) {
            networkService.proProposalDeclinePOST($stateParams.proposalId,
                {text: cancelMessage},
                function (res) {
                    alertMsg.send("L'offre vous a bien été retirée", "info");
                    $state.go("pro-proposals");
                }, function () {
                    alertMsg.send("Impossible de retirée l'offre (contactez le support)", "danger");
                }, true
            );
        }

        function cancelRecommandationModal() {
            modalService.proCancelRecommandation(vm.proposal.status, function (chatMessage) {
                vm.cancelRecommandation(chatMessage);
            });
        }

        function save() {
            vm.proposalTmp.type = vm.project.type;
            networkService.proposalPUT(vm.proposalTmp, function (res) {
                alertMsg.send("La proposition a bien été mise à jour", "success");
            }, function (res) {
                alertMsg.send("Impossible de mettre à jour la proposition", "danger");
            }, true);
            vm.editFlag = false;
        }

        function editPrice() {
            vm.myPrice = vm.proposalTmp.price;
            vm.myPriceFlag = true;
        }

        function editDate() {
            vm.dt = new Date(vm.proposalTmp.startDate);
            vm.myDateFlag = true;
        }

        function edit() {
            vm.editFlag = true;
        }

        function cancel() {
            vm.proposalTmp = vm.proposal;
            vm.editFlag = false;
        }

        function getTags() {
            var res = [];
            if (!angular.isUndefined(vm.project) && vm.project.activities) {
                for (var i = 0; i < vm.project.activities.length; i++) {
                    if (!_.includes(res, vm.project.activities[i].code)) {
                        res.push(vm.project.activities[i].code);
                    }
                }
                if (vm.project.hasMaterial) {
                    res.push("MATERIAL_TRUE");
                } else {
                    res.push("MATERIAL_FALSE");
                }
            }
            return res;
        }

        function selectDate() {
            vm.proposalTmp.startDate = $filter('date')(vm.dt, 'yyyy-MM-dd');
        }

        function selectPrice() {
            vm.error.price = vm.error.price || {};
            if (vm.myPrice <= 10 || vm.myPrice > 1000000) {
                vm.error.price.message = "Merci d'indiquer un montant réaliste";
                vm.error.price.flag = true;
            } else {
                vm.proposalTmp.price = vm.myPrice;
                vm.myPriceFlag = false;
                vm.error.price.flag = false;
            }
        }

        vm.isValidPrice = function () {
            if (!vm.myPrice || vm.myPrice == 0 || vm.myPrice <= 10 || vm.myPrice > 1000000) {
                return false;
            }
            return true;
        }

        function selectImagePreview(media) {
            vm.imgTmpPreview = media;
            vm.imagePreviewFlag = true;
        }

        function succesProjectGET(res) {
            vm.project = res.project;
            vm.proposal = res;


            if (vm.project.address.latitude && vm.project.address.longitude) {
                $scope.map.center = {
                    latitude: vm.project.address.latitude,
                    longitude: vm.project.address.longitude
                };
                $scope.map.zoom = 15;
                vm.marker = {
                    coords: {
                        latitude: vm.project.address.latitude,
                        longitude: vm.project.address.longitude
                    },
                    options: {
                        icon: "https://res.cloudinary.com/yaka/image/upload/yakaclub/pinSmallProject.png"
                    }
                };
                vm.circle.center = {
                    latitude: vm.project.address.latitude,
                    longitude: vm.project.address.longitude
                };
            }

            if (vm.project.address.address) {
                vm.project.address.address = vm.project.address.address.replace(/, /g, "\n");
            }
            $rootScope.pageName = vm.project.user.firstName + " " + vm.project.user.lastName +
                " - " + vm.project.title;

            vm.proposalTmp = angular.copy(vm.proposal);
            vm.projectTmp = angular.copy(vm.project);
            vm.dateType = vm.projectTmp.desiredDatePeriod;
            setMinMaxDate();

            if (vm.proposal.supportChat.AdminUnreadMessages || vm.proposal.unreadMessages) {

                setTimeout(function () {

                    vm.showChat = true;
                    vm.scrollBottom = 1;
                }, 500);
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
                        return "Autour du " + moment(vm.projectTmp.desiredDate).format("D MMMM YYYY");
                    case "WITHIN_A_WEEK":
                        return "Dans la semaine autour du " + moment(vm.projectTmp.desiredDate).format("D MMMM YYYY");
                    case "WITHIN_A_MONTH":
                        return "Avant le " + moment(vm.projectTmp.desiredDate).format("D MMMM YYYY");
                    case "NONE":
                    default:
                        return 'Dès que possible';
                }
            } else {
                return "";
            }
        }

        function errorProjectGET() {
            $state.go("findjobs");
        }

        vm.getUpState = function () {
            if (!vm.proposal || !vm.proposal.status) {
                return "home";
            }

            switch (vm.proposal.status) {
                case "RECOMMENDATION":
                    return "pro-dashboard";
                case "START":
                case "PRO_DECLINED":
                case "CUSTOMER_DECLINED":
                case "RECO_PRO_DECLINED":
                case "RECO_CUSTOMER_DECLINED":
                    return "pro-proposals";
                case "COMPLETED":
                case "SELECTED":
                case "RATE_PRO":
                    return "pro-jobs";
            }
        };

        vm.getUpName = function () {
            switch (vm.proposal.status) {
                case "RECOMMENDATION":
                    return "Accueil";
                case "START":
                case "PRO_DECLINED":
                case "CUSTOMER_DECLINED":
                case "RECO_PRO_DECLINED":
                case "RECO_CUSTOMER_DECLINED":
                    return "Mes devis";
                case "COMPLETED":
                case "SELECTED":
                case "RATE_PRO":
                    return "Mes chantiers";
            }
        };

        vm.offer = {};

        vm.editPriceOffer = function () {
            vm.price = vm.offer.price;
            vm.myPriceFlagOffer = true;
        };

        vm.editDateOffer = function () {
            vm.dt = vm.offer.date;
            vm.myDateFlagOffer = true;
        };

        vm.formIsValid = function () {
            return (vm.offer &&
            vm.offer.comment &&
            vm.offer.comment.length >= 40);
        };

        vm.sendOffer = function () {
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
                }, true);
            }
        };

        vm.selectDateOffer = function () {
            vm.offer.date = vm.dt;
            vm.myDateFlagOffer = false;
        };

        vm.selectPriceOffer = function () {
            vm.error.price = vm.error.price || {};
            if (vm.price <= 30 || vm.price > 1000000) {
                vm.error.price.message = "Merci d'indiquer un montant réaliste";
                vm.error.price.flag = true
            } else {
                vm.offer.price = vm.price;
                vm.myPriceFlagOffer = false;
                vm.error.price.flag = false;
            }
        };

        vm.isValidPriceOffer = function () {
            if (!vm.price || vm.price == 0 || vm.price <= 30 || vm.price > 1000000) {
                return false;
            }
            return true;
        };

        vm.smoothScrollToSend = function () {
            var element = document.getElementById('map_canvas');
            smoothScroll(element);
        };

        vm.changeUserDialog = function (user) {
            if (user == 'admin') {
                vm.chatWithAdmin = true;
            } else {
                vm.chatWithAdmin = false;
            }
        };

    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProProposalController', ProProposalController);

    //
    //Controller login
    function ProProposalController($rootScope, $scope, $localStorage, $state, networkService, alertMsg, $filter, $stateParams, uiGmapGoogleMapApi, modalService) {

        if ($localStorage.user && !$localStorage.user.professional) {
            $state.go("home");
        }

        $rootScope.updateProfile();

        var vm = this;
        vm.scrollBottom = 0;
        vm.showChat = false;
        vm.getWhen = getWhen;
        vm.selectImagePreview = selectImagePreview;
        vm.marker = {
            coords: {},
            visible: false
        };
        vm.selectPrice = selectPrice;
        vm.selectDate = selectDate;
        vm.sendOffer = sendOffer;
        vm.getTags = getTags;
        vm.edit = edit;
        vm.cancel = cancel;
        vm.save = save;
        vm.getStartDate = getStartDate;
        vm.editPrice = editPrice;
        vm.editDate = editDate;
        vm.cancelProposalModal = cancelProposalModal;
        vm.cancelProposal = cancelProposal;
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

        if ($stateParams.chat) {
            vm.showChat = true;
            vm.scrollBottom = 1;
        }

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

        if (!angular.isUndefined($stateParams.proposalId) && $stateParams.proposalId) {
            networkService.proProposalGET($stateParams.proposalId, succesProjectGET, errorProjectGET);
        } else {
            $state.go('home');
        }

        function cancelProposal(cancelProposalMessage) {
            if (cancelProposalMessage && cancelProposalMessage.length >= 20) {
                networkService.proProposalDeclinePOST($stateParams.proposalId,
                    {text: cancelProposalMessage},
                    function (res) {
                        alertMsg.send("Votre proposition à bien été retirée", "info");
                        $state.go("pro-proposals");
                    }, function () {
                        alertMsg.send("Impossible de retirée la proposition (contactez le support)", "danger");
                    }
                );
            } else {
                alertMsg.send("Vous devez accompagner le retrait de votre proposition d'un message au client (30 caractères minimum)", "danger");
            }
        }

        function cancelProposalModal() {
            modalService.cancelProposal('cancelProposalContent.html', 'animated zoomIn', function (chatMessage) {
                vm.cancelProposal(chatMessage);
            });
        }

        function save() {
            vm.proposalTmp.type = vm.project.type;
            networkService.proposalPUT(vm.proposalTmp, function (res) {
                alertMsg.send("La proposition a bien été mise à jour", "success");
            }, function (res) {
                alertMsg.send("Impossible de mettre à jour la proposition", "danger");
            });
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

        function getStartDate() {
            if (!angular.isUndefined(vm.proposalTmp) && vm.proposalTmp.startDate) {
                return $filter('date')(new Date(vm.proposalTmp.startDate), "dd MMM.  yyyy");
            }
        }

        function getTags() {
            var res = [];
            if (!angular.isUndefined(vm.project) && vm.project.activities) {
                for (var i = 0; i < vm.project.activities.length; i++) {
                    res.push(vm.project.activities[i].code);
                }
                if (vm.project.hasMaterial) {
                    res.push("MATERIAL_TRUE");
                }
            }
            return res;
        }

        function sendOffer() {
            if (vm.offer.comment && vm.offer.comment.length > 30 && vm.offer.comment.indexOf(' ') > -1) {
                vm.offer.date.date = vm.offer.date.date || null;
                vm.offer.comment = vm.offer.comment || "";
                var formData = {
                    project: {id: vm.projectTmp.id},
                    price: parseInt(vm.offer.price.price),
                    comment: vm.offer.comment
                };
                formData.startDate = $filter('date')(vm.offer.date.date, "yyyy-MM-dd");
                networkService.proposalPOST(formData, function (res) {
                    alertMsg.send("Proposition envoyée avec succès", "success");
                }, function (res) {
                    alertMsg.send("Impossible d'envoyer la proposition", "danger");
                });
            } else {
                vm.error.comment.message = "Vous devez accompagner votre proposition d'un premier message au client (30 caractères minimums)"
                vm.error.comment.falg = true;
            }
        }

        function selectDate() {
            vm.proposalTmp.startDate = $filter('date')(vm.dt, 'yyyy-MM-dd');
        }

        function selectPrice() {
            vm.error.price = vm.error.price || {};
            if (vm.myPrice <= 10) {
                vm.error.price.message = "Vous devez entrer un montant de 10 € minimum";
            } else if (vm.myPrice > 1000000) {
                vm.error.price.message = "Veuillez entrer un montant réaliste";
            }
            vm.proposalTmp.price = vm.myPrice;
            vm.myPriceFlag = false;
            vm.error.price.flag = false;
        }

        function selectImagePreview(media) {
            vm.imgTmpPreview = media;
            vm.imagePreviewFlag = true;
        }

        function succesProjectGET(res) {

            vm.project = res.project;
            vm.proposal = res;
            if (vm.project.address.address) {
                vm.project.address.address = vm.project.address.address.replace(/, /g, "\n");
            }
            $rootScope.pageName = vm.project.user.firstName + " " + vm.project.user.lastName +
                " - " + $filter('yakaTranslateTitle')(vm.project.title);

            if (vm.proposal.status != 'START') {
                $state.go("pro-proposal", {'proposalId': vm.proposal.id});
            }

            vm.proposalTmp = angular.copy(vm.proposal);
            vm.projectTmp = angular.copy(vm.project);
            vm.dateType = vm.projectTmp.desiredDatePeriod;
            setMinMaxDate();
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

        function errorProjectGET() {
            $state.go("findjobs");
        }
    }
})();

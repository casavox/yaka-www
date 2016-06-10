(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProposalController', ProposalController);

    function ProposalController($scope, $localStorage, $state, networkService, alertMsg, $filter, $stateParams, $rootScope, Lightbox, $translate, uiGmapGoogleMapApi) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        //TODO
        $rootScope.pageName = "";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;
        vm.showChat = false;
        vm.proposal = {};

        if (angular.isDefined($stateParams.proposalId) && $stateParams.proposalId) {
            loadProposal();
        } else {
            $state.go("my-projects");
        }

        function loadProposal() {
            networkService.proposalGET($stateParams.proposalId, function (res) {
                vm.proposal = res;
                if (vm.proposal.professional.company.address.address) {
                    vm.proposal.professional.company.address.address = vm.proposal.professional.company.address.address.replace(/, /g, "\n");
                }
            }, function (err) {
                alertMsg.send("Impossible de récupérer l'offre", "danger");
                $state.go("my-projects");
            });
        }

        vm.getExperienceYearNumber = function () {
            if (vm.proposal && vm.proposal.professional && vm.proposal.professional.activityStartedYear) {
                return (new Date().getFullYear() - vm.proposal.professional.activityStartedYear) + 1;
            }
            return " - ";
        };

        vm.declineProposal = function () {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Une fois cette offre refusée, vous ne pourrez plus y accéder",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Oui, refuser cette offre",
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.proposalDeclinePOST(vm.proposal.id,
                        function (res) {
                            alertMsg.send("L'offre a été refusée", "info");
                            $state.go("proposals", {projectId: vm.proposal.project.id});
                        }, function () {
                            alertMsg.send("Impossible de refuser l'offre", "danger");
                        }
                    );
                }
            });
        };

        vm.acceptProposal = function () {
            swal({
                title: "Vous êtes sur le point de sélectionner ce Pro pour vos travaux",
                text: "Votre projet de travaux ne sera plus visible par les autres professionels",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Oui, sélectionner ce Pro",
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.proposalAcceptPOST(vm.proposal.id,
                        function (res) {
                            alertMsg.send("L'offre a été sélectionnée", "info");
                            loadProposal();
                        }, function () {
                            alertMsg.send("Impossible de sélectionner l'offre", "danger");
                        }
                    );
                }
            });
        };

        vm.completeProposal = function () {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Voulez-vous indiquer que les travaux sont terminés ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Oui, les travaux sont terminés",
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.closeProject(vm.proposal.id,
                        function (res) {
                            alertMsg.send("Vous avez indiqué que les travaux étaient terminés", "info");
                            loadProposal();
                        }, function () {
                            alertMsg.send("Impossible d'indiquer que les travaux sont terminés", "danger");
                        }
                    );
                }
            });
        };

        vm.rateProposal = function () {
            $rootScope.rating = false;
            $rootScope.rate_watcher = !$rootScope.rate_watcher;
        };
    }
})();

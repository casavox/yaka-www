(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProProposalsController', ProProposalsController);

    //
    //Controller login
    function ProProposalsController(networkService, alertMsg, $rootScope, $state, $localStorage) {

        if ($localStorage.user && !$localStorage.user.professional) {
            $state.go("home");
        }

        $rootScope.pageName = "Mes devis";
        $rootScope.updateProfile();

        var vm = this;

        networkService.proProposalsGET('proposal_sent', function (res) {
            vm.proposals = res;
        }, function () {
        });
        networkService.proProposalsGET('declined_proposal', function (res) {
            vm.decline = res;
        }, function () {
        });

        vm.quoteClicked = function (proposalId) {
            var user = $localStorage.user;
            if (user.professional &&
                user.professional.status &&
                (user.professional.status == 'REGISTERED' || user.professional.status == 'WAITING' || user.professional.status == 'REFUSED')) {
                vm.showProNotValidatedPopup = true;
            } else {
                $state.go('pro-proposal', {
                    proposalId: proposalId
                });
            }
        };

        vm.showProNotValidatedPopup = false;

        vm.closePopup = function () {
            vm.showProNotValidatedPopup = false;
        };

        vm.getWhen = function (proposal) {
            switch (proposal.project.desiredDatePeriod) {
                case "SPECIFIC":
                    return "à partir du " + moment(proposal.project.desiredDate).format("D MMMM");
                case "WITHIN_A_MONTH":
                    return "avant le " + moment(proposal.project.desiredDate).format("D MMMM");
                case "NONE":
                    return 'dès que possible';
            }
        };

        networkService.getProNetworkLeads(function (projects) {
            vm.networkProjects = projects;
        }, function (err) {
            console.log("Impossible de récupérer les offres", "danger");
        });

        vm.showTopViewRecommendation = function () {
            return getRecommendationNumber();
        };

        function getRecommendationNumber() {
            if (vm.networkProjects) {
                var recoNumber = 0;
                for (var i = 0; i < vm.networkProjects.length; i++) {
                    if (vm.networkProjects[i].recoProposals) {
                        recoNumber++;
                    }
                }
                return recoNumber;
            } else
                return 0;
        }
    }

})
();

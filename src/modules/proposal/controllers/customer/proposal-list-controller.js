(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProposalsController', ProposalsController);

    //
    //Controller login
    function ProposalsController(networkService, alertMsg, $stateParams, $localStorage, $state, $rootScope, $filter) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        $rootScope.updateProfile();

        var vm = this;
        vm.getWhen = getWhen;
        vm.projectDetails = projectDetails;
        vm.selectProposal = selectProposal;
        if ($stateParams.projectId) {
            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        } else {
            $state.go("dashboard");
        }

        function selectProposal(p) {
            $state.go('proposal', {proposalId: p.id});
        }

        function succesProjectGET(res) {
            vm.project = res;

            vm.displayProposalText = function() {
                if (!vm.project.proposals || vm.project.proposals.length == 0) {
                    return true;
                } else {
                    return false;
                }
            };
            vm.displayRecommendText = function() {
                if (!vm.project.recoProposals || vm.project.recoProposals.length == 0) {
                    return true;
                } else {
                    return false;
                }
            };
            $rootScope.pageName = vm.project.title;
        }

        function errorProjectGET() {
            alertMsg.send("Impossible de récupérer les propositions", "danger");
        }

        function projectDetails() {
            $state.go('project', {projectId: $stateParams.projectId});
        }

        function getWhen() {
            var res = 0;
            if (vm.project && vm.project.desiredDatePeriod) {
                switch (vm.project.desiredDatePeriod) {
                    case "SPECIFIC":
                        return "autour du " + moment(vm.project.desiredDate).format("D MMMM");
                    case "WITHIN_A_WEEK":
                        return "dans la semaine autour du " + moment(vm.project.desiredDate).format("D MMMM");
                    case "WITHIN_A_MONTH":
                        return "dans le mois (avant le " + moment(vm.project.desiredDate).format("D MMMM") + ")";
                    case "NONE":
                        return 'dès que possible';
                }
            }
        }

        vm.communities = [
            {
                "type": "ville",
                "text": "Paris - 13ème arrondissement"
            },
            {
                "type": "entreprise",
                "text": "Okabé"
            },
            {
                "type": "cercle",
                "text": "Famille"
            },
            {
                "type": "member",
                "text": "Prenium"
            }
        ];
    }
})();

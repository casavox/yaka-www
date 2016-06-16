(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProposalsController', ProposalsController);

    //
    //Controller login
    function ProposalsController(networkService, alertMsg, $stateParams, $localStorage, $state, $rootScope) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        //TODO
        $rootScope.pageName = "";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;
        vm.getWhen = getWhen;
        vm.projectDetails = projectDetails;
        vm.selectProposal = selectProposal;
        if ($stateParams.projectId) {
            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        } else {
            $state.go("my-projects");
        }

        function selectProposal(p) {
            $state.go('proposal', {proposalId: p.id});
        }

        function succesProjectGET(res) {
            vm.project = res;
        }

        function errorProjectGET() {
            alertMsg.send("Impossible de récupérer les propositions", "danger");
        }

        function projectDetails() {
            $state.go('project', {projectId: $stateParams.projectId});
        }

        function getWhen() {
            var res = 0;
            if (!angular.isUndefined(vm.project) && vm.project.availabilities && vm.project.availabilities.length > 0) {
                for (var i = 0; i < vm.project.availabilities.length; i++) {
                    res += 1;
                }
                return "Emergency : " + res + " slots appointment"
            }
            else if (angular.isDefined(vm.project) && vm.project.desiredDatePeriod) {
                switch (vm.project.desiredDatePeriod) {
                    case "SPECIFIC":
                        return "autour du " + moment(vm.project.desiredDate).format("D MMMM");
                    case "WITHIN_A_WEEK":
                        return "dans la semaine autour du " + moment(vm.project.desiredDate).format("D MMMM");
                    case "WITHIN_A_MONTH":
                        return "dans le mois avant le " + moment(vm.project.desiredDate).format("D MMMM");
                    case "NONE":
                        return 'dès que possible';
                }
            }
        }
    }
})();
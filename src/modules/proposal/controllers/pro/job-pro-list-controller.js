(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProJobsController', ProJobsController);

    //
    //Controller login
    function ProJobsController(networkService, alertMsg, $rootScope, $localStorage, $state) {

        if ($localStorage.user && !$localStorage.user.professional) {
            $state.go("home");
        }

        $rootScope.pageName = "Mes chantiers";
        $rootScope.updateProfile();

        var vm = this;

        networkService.proProposalsGET('ongoing', function (res) {
            vm.ongoing = res;
        }, function () {
        });
        networkService.proProposalsGET('completed', function (res) {
            vm.completed = res;
        }, function () {
        });
        networkService.proProposalsGET('declined_job', function (res) {
            vm.decline = res;
        }, function () {
        });

        vm.selectProposal = function (index) {
            vm.index = index;
            vm.delete = true;
        };

        vm.deleteProposal = function () {
            networkService.proProposalsArchiveGET(vm.decline[vm.index].id, function (res) {
                vm.delete = false;
                alertMsg.send('Offre supprimée avec succès', "success");
            }, function () {
                vm.delete = false;
                alertMsg.send("Impossible de supprimer cette offre", "danger");
            }, true);
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
    }
})();

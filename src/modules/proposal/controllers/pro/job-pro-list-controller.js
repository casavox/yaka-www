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

        $rootScope.pageName = "Mes projets";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;

        vm.getMenuItemClass = function (state) {
            if (state == "pro-jobs") {
                return "active-menu";
            }
            return "";
        };

        networkService.proProposalsGET('ongoing', function (res) {
            vm.ongoing = res;
        }, function () {
        });
        networkService.proProposalsGET('scheduled', function (res) {
            vm.scheduled = res;
        }, function () {
        });
        networkService.proProposalsGET('completed', function (res) {
            vm.completed = res;
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
            });
        }
    }
})();

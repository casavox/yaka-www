(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProJobsController', ProJobsController);

    //
    //Controller login
    ProJobsController.$inject = ['networkService', 'alertMsg', '$filter', '$rootScope'];
    function ProJobsController(networkService, alertMsg, $filter, $rootScope) {

        $rootScope.showMenu = true;

        var vm = this;

        vm.getMenuItemClass = function (state) {
            if (state == "pro-jobs") {
                return "active-menu";
            }
            return "";
        };

        networkService.proProposalsGET('ongoing', function (res) {
            console.log(res);
            vm.ongoing = res;
        }, function () {
            console.log("Error");
        });
        networkService.proProposalsGET('scheduled', function (res) {
            console.log(res);
            vm.scheduled = res;
        }, function () {
            console.log("Error");
        });
        networkService.proProposalsGET('completed', function (res) {
            console.log(res);
            vm.completed = res;
        }, function () {
            console.log("Error");
        });

        vm.selectProposal = function (index) {
            vm.index = index;
            vm.delete = true;
        };

        vm.deleteProposal = function () {
            networkService.proProposalsArchiveGET(vm.decline[vm.index].id, function (res) {
                console.log(res);
                vm.delete = false;
                alertMsg.send('Proposal deleted', "success");
            }, function () {
                vm.delete = false
                alertMsg.send("Erro : Proposal can't be deleted", "danger");
            });
        }
    }
})();

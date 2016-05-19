(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProProposalsController', ProProposalsController);

    //
    //Controller login
    function ProProposalsController(networkService, alertMsg, $rootScope) {

        $rootScope.showMenu = true;

        var vm = this;

        vm.getMenuItemClass = function (state) {
            if (state == "pro-proposals") {
                return "active-menu";
            }
            return "";
        };

        networkService.proProposalsGET('proposal_sent', function (res) {
            vm.proposals = res;
            console.log(vm.proposals);
        }, function () {
        });
        networkService.proProposalsGET('declined', function (res) {
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
                alertMsg.send('Proposal deleted', "success");
            }, function () {
                vm.delete = false;
                alertMsg.send("Erro : Proposal can't be deleted", "danger");
            });
        }
    }
})();

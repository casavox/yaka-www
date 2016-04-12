(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProProposalsController', ProProposalsController);

    //
    //Controller login
    ProProposalsController.$inject = ['networkService', 'alertMsg', '$filter'];
    function ProProposalsController(networkService, alertMsg, $filter) {
        var vm = this;
        networkService.proProposalsGET('proposal_sent', function (res) {
            console.log(res);
            vm.proposals = res;
        }, function () {
            console.log("Error");
        });
        networkService.proProposalsGET('declined', function (res) {
            console.log(res);
            vm.decline = res;
        }, function () {
            console.log("Error");
        });

        vm.selectProposal = function(index){
            vm.index = index;
            vm.delete = true;
        };

        vm.deleteProposal = function(){
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

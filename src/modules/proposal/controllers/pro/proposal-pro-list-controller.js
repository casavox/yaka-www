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

        vm.getMenuItemClass = function (state) {
            if (state == "pro-proposals") {
                return "active-menu";
            }
            return "";
        };

        networkService.proProposalsGET('proposal_sent', function (res) {
            vm.proposals = res;
        }, function () {
        });
        networkService.proProposalsGET('declined', function (res) {
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
    }
})();

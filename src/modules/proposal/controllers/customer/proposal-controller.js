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
            networkService.proposalGET($stateParams.proposalId, function (res) {
                vm.proposal = res;
            }, function (err) {
                alertMsg.send("Impossible de récupérer l'offre", "danger");
            });
        }

    }
})();

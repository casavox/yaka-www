(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('DashboardController', DashboardController);

    //
    //Controller login
    function DashboardController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("pro-dashboard");
        }

        if ($localStorage.invitationId) {
            $state.go("contacts");
        }

        $rootScope.pageName = "Accueil";
        $rootScope.updateProfile();

        var vm = this;

        networkService.projectsToRecommendGET(function (projects) {
            vm.projectsToRecommend = projects;
        }, function (err) {
            alertMsg.send("Oups ! une erreur s'est produite, merci de recharger la page depuis votre navigateur ('F5' ou 'cmd+R'), contactez le support CasaVox si nécessaire", "danger");
        });

        networkService.dashboardDataGET(function (data) {
            vm.data = data;
        }, function (err) {
            alertMsg.send("Oups ! une erreur s'est produite, merci de recharger la page depuis votre navigateur ('F5' ou 'cmd+R'), contactez le support CasaVox si nécessaire", "danger");
        });

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
})
();

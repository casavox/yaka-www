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

        networkService.communitiesGET(successCommunitiesGET, errorCommunitiesGET);

        function successCommunitiesGET(res) {
            vm.communities = res;
        }

        vm.getCommunityByType = function (type) {
            if (vm.communities) {
                for (var i = 0; i < vm.communities.length; i++) {
                    if (type == vm.communities[i].type) {
                        return vm.communities[i];
                    }
                }
            }
        };

        function errorCommunitiesGET(res) {
            alertMsg.send("Impossible de récupérer les communautés", "danger");
        }

    }
})
();

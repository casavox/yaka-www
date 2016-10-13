(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardController', ProDashboardController);

    function ProDashboardController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        if ($localStorage.user && !$localStorage.user.professional) {
            $state.go("dashboard");
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
            alertMsg.send("Impossible de récupérer les offres", "danger");
        });

        networkService.proDashboardDataGET(function (data) {
            vm.data = data;
        }, function (err) {
            alertMsg.send("Impossible de récupérer les données", "danger");
        });

        vm.getWhen = function (project) {
            switch (project.desiredDatePeriod) {
                case "SPECIFIC":
                    return "à partir du " + moment(project.desiredDate).format("D MMMM");
                case "WITHIN_A_MONTH":
                    return "avant le " + moment(project.desiredDate).format("D MMMM");
                case "NONE":
                    return 'dès que possible';
            }
        };

        networkService.getProNetworkLeads(function (projects) {
            vm.networkProjects = projects;
        }, function (err) {
            alertMsg.send("Impossible de récupérer les offres", "danger");
        });


        vm.networkProjectClicked = function (project) {
            if (project.recoProposals) {
                $state.go('pro-proposal', {'proposalId': project.recoProposals[0].id});
            } else {
                $state.go('pro-project-proposal-new', {'projectId': project.id});
            }
        };

        networkService.professionalGET(function (pro) {
            vm.pro = pro;
            if (vm.pro && vm.pro.step2 && vm.pro.step3 && vm.pro.status && (vm.pro.status == 'VALIDATED' || vm.pro.status == 'COMPLETED')) {
                $state.go("pro-dashboard");
            }
        }, function (err) {
            alertMsg.send("Impossible de récupérer le profil", "danger");
            $state.go("home", {'login': true});
        });

        vm.isInNetworkList = function (project) {
            if (!vm.networkProjects) {
                return false;
            }

            for (var i = 0; i < vm.networkProjects.length; i++) {
                if (project.id == vm.networkProjects[i].id) {
                    return true;
                }
            }
            return false;
        };

        vm.isListEmpty = function () {

            if (!vm.projectsToRecommend) {
                return true;
            }
            for (var i = 0; i < vm.projectsToRecommend.length; i++) {
                if (!vm.isInNetworkList(vm.projectsToRecommend[i])) {
                    return false;
                }
            }
            return true;
        };

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

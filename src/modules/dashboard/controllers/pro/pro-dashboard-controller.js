(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardController', ProDashboardController);

    function ProDashboardController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        if ($localStorage.user && !$localStorage.user.professional) {
            $state.go("dashboard");
        }

        $rootScope.pageName = "Accueil";
        $rootScope.updateProfile();

        var vm = this;

        networkService.projectToRecommendGET(function (projects) {
            vm.projectsToRecommend = projects;
        }, function (err) {
            alertMsg.send("Impossible de récupérer les projets", "danger");
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
            console.log(projects);
        }, function (err) {
            alertMsg.send("Impossible de récupérer les projets", "danger");
        });

        vm.networkProjectClicked = function (project) {
            if (project.recoProposals) {
                $state.go('pro-proposal', {'proposalId': project.recoProposals[0].id});
            } else {
                $state.go('pro-project-proposal-new', {'projectId': project.id});
            }
        }
    }
})
();

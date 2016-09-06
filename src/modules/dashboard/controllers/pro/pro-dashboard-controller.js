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

        networkService.projectsToRecommendGET(function (projects) {
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
        }, function (err) {
            alertMsg.send("Impossible de récupérer les projets", "danger");
        });

        vm.showProDoesntCorrespondPopup = false;

        vm.networkProjectClicked = function (project) {
            if (project.activityDoesntCorrespond) {
                vm.selectedProject = project;
                vm.showProDoesntCorrespondPopup = true;
            } else {
                if (project.recoProposals) {
                    $state.go('pro-proposal', {'proposalId': project.recoProposals[0].id});
                } else {
                    $state.go('pro-project-proposal-new', {'projectId': project.id});
                }
            }
        };

        networkService.professionalGET(function (pro) {
            vm.pro = pro;
            if (vm.pro && vm.pro.step2 && vm.pro.step3 && vm.pro.status && (vm.pro.status == 'VALIDATED' || vm.pro.status == 'COMPLETED')) {
                $state.go("pro-dashboard");
            }
        }, function (err) {
            alertMsg.send("Impossible de récupérer le profil", "danger");
            $state.go("home");
        });

        vm.isInNetworkList = function (project) {
            if (!vm.networkProjects) {
                return false;
            }
            vm.emptyList = 0;
            for (var i = 0; i < vm.networkProjects.length; i++) {
                if (project.id == vm.networkProjects[i].id) {
                    vm.emptyList++;
                    return true;
                }
            }

            return false;
        };

        vm.isListEmpty = function() {
            if (vm.emptyList.length <= 0) {
                return true;
            }
            return false;
        };
    }
})
();

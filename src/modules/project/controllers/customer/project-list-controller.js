(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('MyProjectsController', MyProjectscontroller);

    //Controller login
    function MyProjectscontroller(networkService, $rootScope, $localStorage, $state, $filter) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        if ($localStorage.invitationId) {
            $state.go("contacts");
        }

        $rootScope.pageName = "Mes projets";
        $rootScope.updateProfile();

        var vm = this;
        vm.selectProject = selectProject;
        vm.selectProposal = selectProposal;
        vm.dateDiff = dateDiff;
        vm.now = new Date();
        networkService.projectsGET("ongoing", 1, 2147483647, successProjectsGET, errorProjectsGET);
        networkService.projectsGET("completed", 1, 2147483647, succesProjectsCompletedGET, errorProjectsCompletedGET);
        networkService.projectsGET("canceled", 1, 2147483647, succesProjectsCanceledGET, errorProjectsCanceledGET);

        function dateDiff(d1, d2) {
            var h = 0;
            var d = 0;
            var m = 0;
            d1 = new Date(d1).getTime() / 60000;
            d2 = new Date(d2).getTime() / 60000;
            var min = new Number(d2 - d1).toFixed(0);
            if (min > 60) {
                h = min / 60;
                if (h > 24) {
                    d = h / 24;
                    if (d > 30)
                        m = d / 30;
                }
            }
            return m > 0 ? $filter('number')(m, 0) + " mois" : d > 0 ? $filter('number')(d, 0) + " jours" : h > 0 ? $filter('number')(h, 0) + "h" : $filter('number')(min, 0) + " min";
        }

        vm.getDesiredPedriod = function (project) {
            switch (project.desiredDatePeriod) {
                case "SPECIFIC":
                    return "autour du " + moment(project.desiredDate).format("D MMMM");
                case "WITHIN_A_WEEK":
                    return "dans la semaine autour du " + moment(project.desiredDate).format("D MMMM");
                case "WITHIN_A_MONTH":
                    return "dans le mois (avant le " + moment(project.desiredDate).format("D MMMM") + ")";
                case "NONE":
                    return 'dès que possible';
            }
            return "";
        };

        function selectProject(p) {
            if (p.status == 'ONGOING_PROJECT_ONGOING' || p.status == 'ONGOING_RATE_PRO') {
                $state.go("proposal", {proposalId: p.proposal.id});
            } else {
                $state.go("proposals", {projectId: p.id});
            }
        }

        function selectProposal(proposal) {
            $state.go("proposal", {proposalId: proposal.id});
        }

        function successProjectsGET(res) {
            $rootScope.projects = res.items;
            if (!angular.isUndefined(res.items) && res.items && res.items.length > 0) {
                vm.projectsOnGoing = res.items;
            } else {
                vm.projectsOnGoing = [];
            }
        }

        function succesProjectsCompletedGET(res) {
            vm.projectsCompleted = res.items;
        }

        function succesProjectsCanceledGET(res) {
            vm.projectsCanceled = res.items;
        }

        function errorProjectsGET(res) {
        }

        function errorProjectsCompletedGET(res) {
        }

        function errorProjectsCanceledGET(res) {
        }

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
})();

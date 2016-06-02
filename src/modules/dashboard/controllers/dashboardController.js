(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('DashboardController', DashboardController);

    //
    //Controller login
    function DashboardController(networkService, $rootScope, $state, alertMsg) {

        $rootScope.pageName = "Tableau de bord";
        $rootScope.updateProfile();
        $rootScope.showMenu = true;

        var vm = this;
        vm.dashboardProjects = [];
        vm.dashboardAddress = [];
        vm.dashboardPro = [];
        vm.count = 0;
        vm.selectProject = selectProject;

        vm.getMenuItemClass = function (state) {
            if (state == "dashboard") {
                return "active-menu";
            }
            return "";
        };

        networkService.projectsGET("ongoing", 1, 3, succesProjectsGET, errorProjectsGET);

        function succesProjectsGET(res) {
            $rootScope.projects = res.items;
            vm.count = res.totalItemNumber;
            vm.dashboardProjects = res.items;
        }


        function errorProjectsGET() {
            alertMsg.send("Imposible de récupérer les projets", "warning");
        }

        function selectProject(p) {
            $state.go("project", {projectId: p.id});
        }


    }
})();

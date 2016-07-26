(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProjectRecommendController', ProjectRecommendController);

    //
    //Controller login
    function ProjectRecommendController($scope, $localStorage, $state, networkService, alertMsg, Upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope, uiGmapGoogleMapApi, modalService) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        if (angular.isUndefined($stateParams.projectId) || !$stateParams.projectId) {
            $state.go("home");
        }

        $rootScope.updateProfile();
        var vm = this;

        networkService.projectRecommendGET($stateParams.projectId,
            function (project) {
                vm.project = project;
            }, function (err) {
                alertMsg.send("Impossible de récupérer le projet", "danger");
            }
        );

        networkService.projectRecommendMyProsGET($stateParams.projectId,
            function (professionals) {
                vm.professionals = professionals;
            }, function (err) {
                alertMsg.send("Impossible de récupérer le projet", "danger");
            }
        );

        vm.getWhen = function () {
            if (!vm.project) {
                return "";
            }
            switch (vm.project.desiredDatePeriod) {
                case "SPECIFIC":
                    return "À partir du " + moment(vm.project.desiredDate).format("D MMMM");
                case "WITHIN_A_MONTH":
                    return "Dans le mois (avant le " + moment(vm.project.desiredDate).format("D MMMM") + ")";
                case "NONE":
                    return 'Dès que possible';
            }
        };

        vm.getExperienceYearNumber = function () {
            if (vm.selectedProfessional && vm.selectedProfessional.activityStartedYear) {
                return (new Date().getFullYear() - vm.selectedProfessional.activityStartedYear) + 1;
            }
            return " - ";
        };

    }
})();

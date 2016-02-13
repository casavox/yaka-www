(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardController', ProDashboardController);

    ProDashboardController.$inject = ['$scope', 'networkService']
    function ProDashboardController($scope, networkService) {
        var vm = this;

        vm.getMenuItemClass = function (state) {
            if (state == "prodashboard") {
                return "active-menu";
            }
            return "";
        }

        networkService.professionalGET(succesProfessionalGET, errorProfessionalGET);

        function succesProfessionalGET(res) {
            var emergencies = res.availableEmergencies;

            $scope.emergencies = geocodeEmergencies(emergencies);
        }

        function errorProfessionalGET() {

        }

    }
})();

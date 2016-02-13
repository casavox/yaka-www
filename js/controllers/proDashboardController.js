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

        $scope.$on('onEmergenciesLoadedEmit', function (event, args) {
            $scope.$broadcast('onEmergenciesLoadedBroadcast', args);
        });

        networkService.professionalGET(succesProfessionalGET, errorProfessionalGET);

        function succesProfessionalGET(res) {
            var emergencies = res.availableEmergencies;

            $scope.$emit('onEmergenciesLoadedEmit', emergencies)
        }

        function errorProfessionalGET() {

        }

    }
})();

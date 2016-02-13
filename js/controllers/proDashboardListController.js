(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardListController', ProDashboardListController);

    ProDashboardListController.$inject = ['$scope']
    function ProDashboardListController($scope) {

        var vm = this;
        vm.page = "Liste"

        $scope.$on('onEmergenciesLoadedBroadcast', function(event, args) {
            onEmergenciesLoaded(args);
        });

        function onEmergenciesLoaded(emergencies) {

        }
    }
})();

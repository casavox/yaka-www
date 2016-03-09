(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardController', ProDashboardController);

    ProDashboardController.$inject = ['$rootScope', '$scope', 'networkService', 'alertMsg']
    function ProDashboardController($rootScope, $scope, networkService, alertMsg) {
        $scope.showList = false;

        var vm = this;

        vm.showTopView = true;
        vm.showFilters = false;

        vm.getMenuItemClass = function (state) {
            if (state == "prodashboard") {
                return "active-menu";
            }
            return "";
        }

        $rootScope.$on('onLeadsLoadedEmit', function (event, args) {
            $rootScope.$broadcast('onLeadsLoadedBroadcast', args);
        });

        $rootScope.$on('showTopViewBroadcast', function (event, show) {
            vm.showTopView = show;
        });

        networkService.proLeadsGET('all', false,
            function succesProLeads(res) {
                $rootScope.$emit('onLeadsLoadedEmit', res);
            }, function errorProLeads() {
                alertMsg.send("Pro get", "danger");
            }
        );
    }
})();

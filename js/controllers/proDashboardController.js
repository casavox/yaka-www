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

        $rootScope.$on('reloadLeadsBroadcast', function (event, args) {
            console.log(args.sw_lng);
            networkService.proLeadsGET('all', false, args.sw_lat, args.sw_lng, args.ne_lat, args.ne_lng,
                function succesProLeads(res) {
                    $rootScope.$emit('onLeadsLoadedEmit', res);
                }, function errorProLeads() {
                    alertMsg.send("Pro get", "danger");
                }
            );
        });

        networkService.proLeadsGET('all', false, 0, 0, 90, 90,
            function succesProLeads(res) {
                $rootScope.$emit('onLeadsLoadedEmit', res);
            }, function errorProLeads() {
                alertMsg.send("Pro get", "danger");
            }
        );
    }
})();

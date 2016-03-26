(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardController', ProDashboardController);

    ProDashboardController.$inject = ['$rootScope', '$scope', 'networkService', 'alertMsg']
    function ProDashboardController($rootScope, $scope, networkService, alertMsg) {
        $scope.showList = false;

        var vm = this;

        vm.showFilters = false;

        vm.type = "all";

        vm.getMenuItemClass = function (state) {
            if (state == "prodashboard") {
                return "active-menu";
            }
            return "";
        }

        vm.changedType = function (newType) {
            vm.type = newType
            $rootScope.$emit('changedTypeEmit', newType);
        }

        $rootScope.$on('onLeadsLoadedEmit', function (event, args) {
            $rootScope.$broadcast('onLeadsLoadedBroadcast', args);
        });

        $rootScope.$on('addCircleEmit', function (event, args) {
            $rootScope.$broadcast('addCircleBroadcast', args);
        });

        $rootScope.$on('changedTypeEmit', function (event, type) {
            $rootScope.$broadcast('changedTypeBroadcast', type);
        });

        $rootScope.$on('reloadLeadsBroadcast', function (event, args) {
            loadLeads(args);
        });

        function loadLeads(args) {
            networkService.proLeadsGET(args.type, false, args.sw_lat, args.sw_lng, args.ne_lat, args.ne_lng,
                function succesProLeads(res) {
                    $rootScope.$emit('onLeadsLoadedEmit', res);
                }, function errorProLeads() {
                    alertMsg.send("Pro get", "danger");
                }
            );
        }

        networkService.proWorkAreaGET(
            function succesProLeads(res) {
                var bounds = {
                    'sw_lat': res.swLatitude,
                    'sw_lng': res.swLongitude,
                    'ne_lat': res.neLatitude,
                    'ne_lng': res.neLongitude
                };
                console.log(res);
                bounds.type = "all";
                loadLeads(bounds);
                $rootScope.$emit('addCircleEmit', res);
            }, function errorProLeads() {
                alertMsg.send("Pro get", "danger");
            }
        );
    }
})();
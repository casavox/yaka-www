(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardListController', ProDashboardListController);

    ProDashboardListController.$inject = ['$rootScope', '$scope', 'networkService'];
    function ProDashboardListController($rootScope, $scope, networkService) {

        var vm = this;

        vm.tabIndex = 0;
        vm.leads = [];

        $rootScope.$on('onLeadsLoadedBroadcast', function (event, args) {
            vm.leads = args;
        });
    }
})();

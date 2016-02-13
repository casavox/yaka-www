(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardListController', ProDashboardListController);

    ProDashboardListController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope']
    function ProDashboardListController($scope, networkService, socialNetworkService, $rootScope) {

        var vm = this;
        vm.page = "Liste"
    }
})();

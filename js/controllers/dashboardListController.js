(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('DashboardListController', DashboardListController);

    DashboardListController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope']
    function DashboardListController($scope, networkService, socialNetworkService, $rootScope) {

        var vm = this;
        $scope.page = "Liste"
    }
})();

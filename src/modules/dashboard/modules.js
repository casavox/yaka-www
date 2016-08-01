(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "/modules/dashboard/views/customer/dashboard.html",
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .state('pro-dashboard', {
                url: "/pro/dashboard",
                templateUrl: "/modules/dashboard/views/pro/pro-dashboard.html",
                controller: 'ProDashboardController',
                controllerAs: 'vm'
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "/modules/dashboard/views/dashboard.html",
                controller: 'DashboardController',
                controllerAs: 'vm'
            });
    }
})();

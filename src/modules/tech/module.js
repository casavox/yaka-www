/**
 * Created by Vincent on 30/04/2016.
 */
(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('maintenance', {
                url: "/maintenance",
                templateUrl: "/modules/tech/views/maintenance.html",
                controller: 'MaintenanceController',
                controllerAs: 'vm'
            })
            .state('maintenance-pro', {
                url: "/maintenance-pro",
                templateUrl: "/modules/tech/views/maintenance-pro.html",
                controller: 'MaintenanceProController',
                controllerAs: 'vm'
            });
    }
})();

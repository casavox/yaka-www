(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('admin', {
                url: "/admin/professionnals",
                templateUrl: "/modules/admin/views/admin-pro.html",
                controller: 'AdminController',
                controllerAs: 'vm'
            })
            .state('admin-pro-details', {
                url: "/admin/pro/:professionnalId",
                templateUrl: "/modules/admin/views/admin-pro-details.html",
                controller: 'AdminProDetailsController',
                controllerAs: 'vm'
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('admin', {
                url: "/admin/professionnals",
                templateUrl: "/modules/admin/views/admin.html",
                controller: 'AdminController',
                controllerAs: 'vm'
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('support', {
                url: "/support",
                templateUrl: "/modules/support/views/support.html",
                controller: 'SupportController',
                controllerAs: 'vm'
            })
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('test', {
                url: "/test",
                templateUrl: "/modules/tests/views/tests.html",
                controller: 'TestsController',
                controllerAs: 'vm'
            });
    }
})();

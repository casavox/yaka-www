(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('protuto', {
                url: "/pro/tuto",
                templateUrl: "/modules/tuto/views/pro-tuto.html",
                controller: 'ProTutoController',
                controllerAs: 'vm'
            });
    }
})();

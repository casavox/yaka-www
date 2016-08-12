(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('pro-help', {
                url: "/pro/help",
                templateUrl: "/modules/help/views/pro-help.html",
                controller: 'ProHelpController',
                controllerAs: 'vm'
            });
    }
})();

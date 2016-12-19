(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('help', {
                url: "/help?card",
                templateUrl: "modules/help/views/help.html",
                controller: 'HelpController',
                controllerAs: 'vm'
            });
    }
})();

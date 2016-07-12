(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('invite', {
                url: "/invite",
                templateUrl: "/modules/invite/views/invite.html",
                controller: 'InviteController',
                controllerAs: 'vm'
            });
    }
})();

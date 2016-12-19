(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('recoverpassword', {
                url: "/recoverpassword/?token",
                templateUrl: "modules/password/views/recoverpassword.html",
                controller: 'RecoverPasswordController',
                controllerAs: 'vm'
            })
    }
})();

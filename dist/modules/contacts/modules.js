(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('contacts', {
                url: "/contacts",
                templateUrl: "partials/contacts.html",
                controller: 'ContactsController',
                controllerAs: 'vm'
            });
    }
})();

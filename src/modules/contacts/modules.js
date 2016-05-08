(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('contacts', {
                url: "/contacts",
                templateUrl: "/modules/contacts/views/contacts.html",
                controller: 'ContactsController',
                controllerAs: 'vm'
            });
    }
})();

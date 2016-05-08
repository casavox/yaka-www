/**
 * Created by Vincent on 30/04/2016.
 */
(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('inbox', {
                url: "/inbox/:proposalId",
                templateUrl: "/modules/inbox/views/inbox.html",
                controller: 'InboxController',
                controllerAs: 'vm'
            })
            .state('pro-inbox', {
                url: "/pro/inbox/:proposalId",
                templateUrl: "/modules/inbox/views/inbox.html",
                controller: 'InboxController',
                controllerAs: 'vm'
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('findjobs', {
                url: "/pro/jobs",
                templateUrl: "/modules/findjobs/views/pro-find-jobs.html",
                controller: 'FindJobsController',
                controllerAs: 'vm'
            });
    }
})();

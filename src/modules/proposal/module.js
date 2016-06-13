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

            //Customer

            .state('proposal', {
                url: "/proposal/:proposalId",
                templateUrl: "/modules/proposal/views/customer/proposal.html",
                controller: 'ProposalController',
                controllerAs: 'vm'
            })
            .state('proposals', {
                url: "/project/:projectId/proposals",
                templateUrl: "/modules/proposal/views/customer/proposal-list.html",
                controller: 'ProposalsController',
                controllerAs: 'vm'
            })

            // Pro

            .state('pro-proposal', {
                url: "/pro/proposal/:proposalId",
                templateUrl: "/modules/proposal/views/pro/proposal-pro.html",
                controller: 'ProProposalController',
                controllerAs: 'vm'
            })
            .state('pro-job', {
                url: "/pro/job/:proposalId",
                templateUrl: "/modules/proposal/views/pro/job-pro.html",
                controller: 'ProJobController',
                controllerAs: 'vm'
            })
            .state('pro-proposals', {
                url: "/pro/proposals/quotes",
                templateUrl: "/modules/proposal/views/pro/proposal-pro-list.html",
                controller: 'ProProposalsController',
                controllerAs: 'vm'
            })
            .state('pro-jobs', {
                url: "/pro/proposals/jobs",
                templateUrl: "/modules/proposal/views/pro/job-pro-list.html",
                controller: 'ProJobsController',
                controllerAs: 'vm'
            });
    }
})();

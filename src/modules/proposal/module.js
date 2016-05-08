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
            .state('pro-proposal', {
                url: "/pro/proposal/:proposalId",
                templateUrl: "/modules/proposal/views/proposal-pro.html",
                controller: 'ProProposalController',
                controllerAs: 'vm'
            })
            .state('pro-job', {
                url: "/pro/proposals/:proposalId/edit",
                templateUrl: "/modules/proposal/views/job-pro.html",
                controller: 'ProJobController',
                controllerAs: 'vm'
            })
            .state('proposal', {
                url: "/proposal/:proposalId",
                templateUrl: "/modules/proposal/views/proposal.html",
                controller: 'ProposalController',
                controllerAs: 'vm'
            })
            .state('proposals', {
                url: "/proposals/:projectId",
                templateUrl: "/modules/proposal/views/proposal-list.html",
                controller: 'ProposalsController',
                controllerAs: 'vm'
            })
            .state('pro-proposals', {
                url: "/pro/proposals/quotes",
                templateUrl: "/modules/proposal/views/proposal-pro-list.html",
                controller: 'ProProposalsController',
                controllerAs: 'vm'
            })
            .state('pro-jobs', {
                url: "/pro/proposals/jobs",
                templateUrl: "/modules/proposal/views/job-pro-list.html",
                controller: 'ProJobsController',
                controllerAs: 'vm'
            });
    }
})();

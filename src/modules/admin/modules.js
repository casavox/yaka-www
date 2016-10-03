(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('admin-users', {
                url: "/admin/users",
                templateUrl: "/modules/admin/views/admin-users.html",
                controller: 'AdminUsersController',
                controllerAs: 'vm'
            })
            .state('admin-pro', {
                url: "/admin/professionnals",
                templateUrl: "/modules/admin/views/admin-pro.html",
                controller: 'AdminController',
                controllerAs: 'vm'
            })
            .state('admin-user-details', {
                url: "/admin/user/:userId",
                templateUrl: "/modules/admin/views/admin-user-details.html",
                controller: 'AdminUserDetailsController',
                controllerAs: 'vm'
            })
            .state('admin-pro-details', {
                url: "/admin/pro/:professionnalId",
                templateUrl: "/modules/admin/views/admin-pro-details.html",
                controller: 'AdminProDetailsController',
                controllerAs: 'vm'
            })
            .state('admin-projects', {
                url: "/admin/projects",
                templateUrl: "/modules/admin/views/admin-projects.html",
                controller: 'AdminProjectsController',
                controllerAs: 'vm'
            })
            .state('admin-project-details', {
                url: "/admin/projects/:projectId/details?chat",
                templateUrl: "/modules/admin/views/admin-project-details.html",
                controller: 'AdminProjectController',
                controllerAs: 'vm'
            })
            .state('admin-proposal', {
                url: "/admin/proposal/:proposalId",
                templateUrl: "/modules/admin/views/admin-proposal.html",
                controller: 'AdminProposalController',
                controllerAs: 'vm'
            })
    }
})();

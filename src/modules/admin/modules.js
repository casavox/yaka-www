(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('admin-pro', {
                url: "/admin/professionnals",
                templateUrl: "/modules/admin/views/admin-pro.html",
                controller: 'AdminController',
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
                url: "/admin/projects/:projectId/details",
                templateUrl: "/modules/admin/views/admin-project-details.html",
                controller: 'AdminProjectController',
                controllerAs: 'vm'
            })
    }
})();

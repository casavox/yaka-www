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

            .state('my-projects', {
                url: "/my-projects",
                templateUrl: "/modules/project/views/customer/project-list.html",
                controller: 'MyProjectsController',
                controllerAs: 'vm'
            })
            .state('new-project', {
                url: "/new-project",
                templateUrl: "/modules/project/views/customer/project-add.html",
                controller: 'NewProjectController',
                controllerAs: 'vm'
            })
            .state('project', {
                url: "/project/:projectId/details?chat?incompleteAddress",
                templateUrl: "/modules/project/views/customer/project.html",
                controller: 'ProjectController',
                controllerAs: 'vm'
            })
            .state('project-recommend', {
                url: "/project/recommend/:projectId",
                templateUrl: "/modules/project/views/customer/project-recommend.html",
                controller: 'ProjectRecommendController',
                controllerAs: 'vm'
            })
            .state('public-project-recommend', {
                url: "/public/project/recommend/:projectId",
                templateUrl: "/modules/project/views/public/public-project-recommend.html",
                controller: 'PublicProjectRecommendController',
                controllerAs: 'vm'
            })

            //Pro

            .state('pro-project-proposal-new', {
                url: "/pro/project/:projectId",
                templateUrl: "/modules/project/views/pro/pro-project.html",
                controller: 'ProProjectController',
                controllerAs: 'vm'
            })

            //Public

            .state('public-project-proposal', {
                url: "/p/:shortId",
                templateUrl: "/modules/project/views/public/public-project.html",
                controller: 'PublicProjectController',
                controllerAs: 'vm'
            });
    }
})();

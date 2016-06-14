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
            .state('end-project', {
                url: "/new-project/end-project",
                templateUrl: "/modules/project/views/customer/project-add-end.html",
                controller: 'EndController',
                controllerAs: 'vm'
            })
            .state('project', {
                url: "/project/:projectId/details",
                templateUrl: "/modules/project/views/customer/project.html",
                controller: 'ProjectController',
                controllerAs: 'vm'
            })

            //Pro

            .state('pro-project-proposal-new', {
                url: "/pro/project/:projectId",
                templateUrl: "/modules/project/views/pro/pro-project.html",
                controller: 'ProProjectController',
                controllerAs: 'vm'
            });
    }
})();

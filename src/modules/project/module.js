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
            .state('my-projects', {
                url: "/my-projects",
                templateUrl: "/modules/project/views/project-list.html",
                controller: 'MyProjectsController',
                controllerAs: 'vm'
            })
            .state('new-project', {
                url: "/new-project",
                templateUrl: "/modules/project/views/project-add.html",
                controller: 'NewProjectController',
                controllerAs: 'vm'
            })
            .state('end-project', {
                url: "/new-project/end-project",
                templateUrl: "/modules/project/views/project-add-end.html",
                controller: 'EndController',
                controllerAs: 'vm'
            })
            .state('pro-project-proposal-new', {
                url: "/pro/project/:projectId",
                templateUrl: "/modules/project/views/pro-project.html",
                controller: 'ProProjectController',
                controllerAs: 'vm'
            })
            .state('project', {
                url: "/project/:projectId",
                templateUrl: "/modules/project/views/project.html",
                controller: 'ProjectController',
                controllerAs: 'vm'
            }
        )
    }
})();

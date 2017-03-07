angular.module('Yaka')

    .directive('yakaMobileHeader', function ($state) {
        return {
            restrict: 'E',
            scope: {
                upState: '@',
                upStateId: '=',
                title: '@'
            },
            link: function (scope, element, attr) {

                scope.goUp = function () {
                    switch (scope.upState) {
                        case "proposals":
                            $state.go(scope.upState, {
                                projectId: scope.upStateId
                            });
                            break;
                        case "public-project-proposal":
                            $state.go(scope.upState, {
                                shortId: scope.upStateId
                            });
                            break;
                        default :
                            $state.go(scope.upState);
                            break;
                    }
                };

            },
            templateUrl: "/modules/core/directives/views/yakaMobileHeader.html"
        }
    });

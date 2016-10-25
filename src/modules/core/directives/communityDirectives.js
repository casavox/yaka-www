angular.module('Yaka')

    .directive('casaCommunityTag', function () {
        return {
            restrict: 'E',
            scope: {
                community: '='
            },
            link: function (scope, element, attr) {

            },
            templateUrl: "/modules/core/directives/views/casaCommunityTag.html"
        }
    });

angular.module('Yaka')

    .directive('yakaAvatar', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=',
                user: '='
            },
            link: function (scope, element, attr) {

                function getPixelSize() {
                    return scope.size + "px";
                }

                function sizeChanged() {
                    element.css(
                        {
                            'width': getPixelSize,
                            'height': getPixelSize,
                            'line-height': getPixelSize
                        }
                    );
                }

                attr.$observe('size', sizeChanged);

            },
            templateUrl: "/modules/core/directives/views/yakaAvatar.html"
        }
    });

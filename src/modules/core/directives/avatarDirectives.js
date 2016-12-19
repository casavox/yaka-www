angular.module('Yaka')

    .directive('yakaAvatar', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=',
                user: '='
            },
            link: function (scope, element, attr) {

                function getPixelSize(ratio) {
                    return (scope.size * ratio) + "px";
                }

                function sizeChanged() {
                    element.css({
                        'width': getPixelSize(1),
                        'height': getPixelSize(1),
                        'line-height': getPixelSize(1),
                        'font-size': getPixelSize(0.35)
                    });
                    var toto = element.children();
                    toto.css({
                        'width': getPixelSize(1),
                        'height': getPixelSize(1)
                    });
                }

                attr.$observe('size', sizeChanged);

            },
            templateUrl: "modules/core/directives/views/yakaAvatar.html"
        }
    });

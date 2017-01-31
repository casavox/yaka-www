angular.module('Yaka')

    .directive('elemReady', function ($parse) {
        return {
            restrict: 'A',
            link: function ($scope, elem, attrs) {
                elem.ready(function () {
                    $scope.$applyAsync(function () {
                        var func = $parse(attrs.elemReady);
                        func($scope);
                    })
                })
            }
        }
    })

    .directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    // Incase value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = scope;
                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    }
                    $compile(element.contents())(compileScope);
                });
            }
        };
    }]);

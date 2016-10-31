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
    });

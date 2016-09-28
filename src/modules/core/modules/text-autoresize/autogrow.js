angular.module('Yaka').directive('autogrow', function () {
    return function (scope, element, attr) {
        var update = function () {
            element.css("height", "auto");
            element.css("height", element[0].scrollHeight + "px");
        };
        scope.$watch(attr.ngModel, function () {
            update();
        });
    };
});

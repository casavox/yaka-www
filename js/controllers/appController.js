(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AppController', Dashboard2Controller);

    Dashboard2Controller.$inject = ['$scope']
    function Dashboard2Controller($scope) {

        var menuOpened = false;

        $scope.menu = {
            openMenu: function () {
                menuOpened = true;
            },
            closeMenu: function () {
                menuOpened = false;
            },
            getMenuClass: function () {
                if (menuOpened) {
                    return "opened";
                } else {
                    return "closed";
                }
            },
            getOverlayClass: function () {
                if (menuOpened) {
                    return "overlayVisible";
                } else {
                    return "overlayInvisible";
                }
            },
            getMenuItemClass: function () {
                return "";
            }
        }
    }
})();

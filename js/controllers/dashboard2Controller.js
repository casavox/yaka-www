(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('Dashboard2Controller', Dashboard2Controller);

    Dashboard2Controller.$inject = []
    function Dashboard2Controller() {
        var vm = this;

        vm.getMenuItemClass = function (state) {
            if (state == "prodashboard") {
                return "active-menu";
            }
            return "";
        }
    }
})();

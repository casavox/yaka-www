(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('Dashboard2Controller', Dashboard2Controller);

    Dashboard2Controller.$inject = []
    function Dashboard2Controller() {
        var vm = this;

        vm.getMenuItemClass = function (state) {
            if (state == "dashboard2") {
                return "active-menu";
            }
            return "";
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('EndController', EndController);

    //
    //Controller login
    function EndController($state, $timeout) {
        var vm = this;
        vm.countdown = 5;
        redirect();
        function redirect() {
            vm.countdown -= 1;
            if (vm.countdown == 0)
                $state.go("dashboard");
            else {
                $timeout(function () {
                    redirect();
                }, 1000);
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProTutoController', ProTutoController);

    function ProTutoController($rootScope, $scope, networkService, alertMsg, $state) {
        $scope.showList = false;

        $rootScope.pageName = "Tuto Pro";
        $rootScope.updateProfile();

        var vm = this;

        networkService.professionalGET(function (pro) {
            vm.pro = pro;
            if (vm.pro && vm.pro.step2 && vm.pro.step3 && vm.pro.status && (vm.pro.status == 'VALIDATED' || vm.pro.status == 'COMPLETED')) {
                $state.go("pro-dashboard");
            }
        }, function (err) {
            alertMsg.send("Impossible de récupérer le profil", "danger");
            $state.go("home");
        });
    }
})();

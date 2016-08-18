(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AdminController', AdminController);

    function AdminController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG, $filter, $sce, ngTableParams) {
        if ($localStorage.user && !$localStorage.user.isAdmin) {
            $state.go("home");
        }
        $rootScope.pageName = "Admin";
        var vm = this;
        networkService.proListGET('allPros', function (res) {
            vm.proData = res;
            angular.forEach(vm.proData, function (pro) {
                pro.user.name = pro.user.firstName + " " + pro.user.lastName;
                if (pro.company.address.postalCode == undefined) {
                    pro.company.address.postalCode = "";
                }
                pro.company.address.city = pro.company.address.postalCode + " " + pro.company.address.locality;
            });
            proSorting();
        }, function () {
        });

        function proSorting() {
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 10,
                sorting: {name: "asc"}
            }, {
                total: vm.proData.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')(vm.proData, params.orderBy()) : vm.proData;
                    $scope.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve($scope.data);
                }
            });
        }
    }
})
();


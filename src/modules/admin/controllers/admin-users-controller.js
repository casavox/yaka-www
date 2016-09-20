(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AdminUsersController', AdminUsersController);

    function AdminUsersController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG, $filter, $sce, ngTableParams) {
        if ($localStorage.user && !$localStorage.user.isAdmin) {
            $state.go("home");
        }
        $rootScope.pageName = "Admin";
        var vm = this;


        function loadUserList() {
            networkService.adminUserListGET(function (res) {
                vm.userData = res;
                console.log(vm.userData);
                vm.possibleIsPro = [];
                console.log(vm.possibleIsPro);


                angular.forEach(vm.userData, function (user) {
                    user.selected = false;
                    user.name = user.firstName + " " + user.lastName;
                    if (!user.professional) {
                        user.isPro = "Non";
                    } else {
                        user.isPro = "Oui";
                    }
                    if ($.inArray(user.isPro, vm.possibleIsPro) == -1) {
                        vm.possibleIsPro.push(user.isPro);
                    }

                });
                vm.possibleIsPro.sort(function(a, b){return b-a});
                userSorting();
            }, function () {
            });
        }

        loadUserList();
        vm.tableData = [];

        function userSorting() {
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 10,
                sorting: {name: "asc"}
            }, {
                total: vm.userData.length,
                counts: [],
                getData: function ($defer, params) {
                    vm.tableData = vm.userData;
                    vm.tableData = params.sorting() ? $filter('orderBy')(vm.tableData, params.orderBy()) : vm.tableData;
                    vm.tableData = params.filter() ? $filter('filter')(vm.tableData, params.filter()) : vm.tableData;
                    console.log(params.sorting());
                    vm.tableData = vm.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(vm.tableData);
                }
            });
        }

        vm.oneOrMoreUser = function () {
            if (vm.userData) {
                for (var i = 0; i < vm.userData.length; ++i) {
                    if (vm.userData[i].selected) {
                        return true;
                    }
                }
            }
            return false;
        };

        function createIdList() {
            var idList = [];
            angular.forEach(vm.userData, function (user) {
                if (user.selected == true) {
                    idList.push(user.id);
                }
            });
            return idList;
        }
    }
})
();


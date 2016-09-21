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

        loadUserList();


        function loadUserList() {
            networkService.adminUserListGET(function (res) {
                vm.userData = res;
                console.log(vm.userData);
                vm.possibleIsPro = [];
                console.log(vm.possibleIsPro);


                angular.forEach(vm.userData, function (user) {
                    if (!user.recommendedProNumber) {
                        user.recommendedProNumber = 0;
                    }
                    if (!user.onGoingProjectNumber) {
                        user.onGoingProjectNumber = 0;
                    }
                    if (!user.completedProjectNumber) {
                        user.completedProjectNumber = 0;
                    }
                    if (!user.canceledProjectNumber) {
                        user.canceledProjectNumber = 0;
                    }
                    if (!user.contactNumber) {
                        user.contactNumber = 0;
                    }
                    if (!user.invitationSentNumber) {
                        user.invitationSentNumber = 0;
                    }
                    user.selected = false;
                    user.name = user.firstName + " " + user.lastName;
                    if (!user.professional) {
                        user.isPro = "Particulier";
                    } else {
                        user.isPro = "Professionnel";
                    }
                    if ($.inArray(user.isPro, vm.possibleIsPro) == -1) {
                        vm.possibleIsPro.push(user.isPro);
                    }

                    if (!user.defaultAddress) {
                        user.place = "Non Précisé";
                    } else {
                        user.place = user.defaultAddress.address;
                    }

                });
                vm.possibleIsPro.sort(function(a, b){return b-a});
                userSorting();
            }, function () {
            });
        }

        vm.tableData = [];

        function userSorting() {
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 9999999,
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


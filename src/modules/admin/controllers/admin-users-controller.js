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
                vm.possibleIsPro = [];

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
                vm.possibleIsPro.sort(function (a, b) {
                    return b - a
                });
                userSorting();
            }, function () {
            });
        }

        vm.reinitializeCreatedDate = function () {
            vm.toDate = new Date();
            vm.fromDate = new Date(2016, 7, 11);
            vm.updatedToDate = new Date();
            vm.updatedFromDate = new Date(2016, 7, 11);
        };

        vm.today = function () {
            vm.toDate = new Date();
            vm.fromDate = new Date(2016, 7, 11);
            vm.updatedToDate = new Date();
            vm.updatedFromDate = new Date(2016, 7, 11);
        };

        vm.today();
        vm.toggleMin = function () {
            vm.minDate = vm.minDate ? null : new Date();
        };
        vm.toggleMin();
        vm.maxDate = new Date(2018, 5, 22);

        vm.openFromDate = function ($event) {
            vm.status1.opened = true;
        };

        vm.openUpdatedFromDate = function ($event) {
            vm.status3.opened = true;
        };

        vm.openToDate = function ($event) {
            vm.status2.opened = true;
        };

        vm.openUpdatedToDate = function ($event) {
            vm.status4.opened = true;
        };

        vm.setDate = function (year, month, day) {
            vm.fromDate = new Date(year, month, day);
            vm.toDate = new Date(year, month, day);
            vm.updatedFromDate = new Date(year, month, day);
            vm.updatedToDate = new Date(year, month, day);
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];

        vm.status1 = {
            opened: false
        };

        vm.status3 = {
            opened: false
        };

        vm.status2 = {
            opened: false
        };

        vm.status4 = {
            opened: false
        };

        vm.tableData = [];

        function userSorting() {
            vm.usersTable = new ngTableParams({
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

        vm.userSelectedEmailList = function () {
            var idList = '"email","firstName","lastName","isPro","update","created","onGoingProject" \n';
            angular.forEach(vm.userData, function (user) {
                if (!user.professional) {
                    var userIsPro = "No"
                } else {
                    var userIsPro = "Yes"
                }
                var TmpUserCreated = moment(user.created).format("DD-MM-YYYY");
                var TmpUserUpdated = moment(user.updated).format("DD-MM-YYYY");

                if (user.selected == true) {

                    idList += '"' + user.email + '","' +
                        user.email + '","' +
                        user.firstName + '","' +
                        user.lastName + '","' +
                        userIsPro + '","' +
                        TmpUserUpdated + '","' +
                        TmpUserCreated + '","' +
                        user.onGoingProjectNumber + '"\n';
                }
            });
            return idList;
        }

        vm.userClicked = function(user) {
            if (!user.professional) {
                $state.go("admin-user-details", {'userId': user.id});
            } else {
                $state.go("admin-pro-details", {'professionnalId': user.professional.id});
            }
        }

    }
})
();


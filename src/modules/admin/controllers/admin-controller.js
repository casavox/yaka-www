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


        function loadProList(ignoreLoading) {
            networkService.adminProListGET(function (res) {
                vm.proData = res;
                angular.forEach(vm.proData, function (pro) {
                    pro.status = $filter('casaProfessionalStatus')(pro.status);
                    pro.eligibleStatus = $filter('casaProfessionalStatus')(pro.eligibleStatus);
                    pro.selected = false;
                    pro.userName = pro.user.firstName + " " + pro.user.lastName;
                    if (pro.company.address.postalCode == undefined) {
                        pro.company.address.postalCode = "";
                    }
                    pro.city = pro.company.address.postalCode + " " + pro.company.address.locality;
                    pro.created = pro.user.created;
                    pro.updated = pro.user.updated;
                    if (pro.needToRecheck) {
                        pro.newNeedToRecheck = "OUI";
                    } else {
                        pro.newNeedToRecheck = "NON";
                    }
                });

                proSorting();
            }, function () {
            }, ignoreLoading);
        }

        $scope.reinitializeCreatedDate = function() {
            $scope.toDate = new Date();
            $scope.fromDate = new Date(2016, 7, 11);
            $scope.updatedToDate = new Date();
            $scope.updatedFromDate = new Date(2016, 7, 11);
        };

        $scope.today = function () {
            $scope.toDate = new Date();
            $scope.fromDate = new Date(2016, 7, 11);
            $scope.updatedToDate = new Date();
            $scope.updatedFromDate = new Date(2016, 7, 11);
        };

        $scope.today();
        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2018, 5, 22);

        $scope.openFromDate = function ($event) {
            $scope.status1.opened = true;
        };

        $scope.openUpdatedFromDate = function ($event) {
            $scope.status3.opened = true;
        };

        $scope.openToDate = function ($event) {
            $scope.status2.opened = true;
        };

        $scope.openUpdatedToDate = function ($event) {
            $scope.status4.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.fromDate = new Date(year, month, day);
            $scope.toDate = new Date(year, month, day);
            $scope.updatedFromDate = new Date(year, month, day);
            $scope.updatedToDate = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status1 = {
            opened: false
        };

        $scope.status3 = {
            opened: false
        };

        $scope.status2 = {
            opened: false
        };

        $scope.status4 = {
            opened: false
        };

        loadProList(false);

        vm.tableData = [];

        function proSorting() {
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 99999999,
                sorting: {name: "asc"}
            }, {
                total: vm.proData.length,
                counts: [],
                getData: function ($defer, params) {
                    vm.tableData = vm.proData;
                    vm.tableData = params.sorting() ? $filter('orderBy')(vm.tableData, params.orderBy()) : vm.tableData;
                    vm.tableData = params.filter() ? $filter('filter')(vm.tableData, params.filter()) : vm.tableData;
                    console.log(params.filter());
                    vm.tableData = vm.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(vm.tableData);
                }
            });
        }

        vm.oneOrMorePro = function () {
            if (vm.proData) {
                for (var i = 0; i < vm.proData.length; ++i) {
                    if (vm.proData[i].selected) {
                        return true;
                    }
                }
            }
            return false;
        };

        function createIdList() {
            var idList = [];
            angular.forEach(vm.proData, function (pro) {
                if (pro.selected == true) {
                    idList.push(pro.id);
                }
            });
            return idList;
        }

        vm.validatePro = function () {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Le statut du pro sera modifié",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Oui, modifier le statut",
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.adminValidateProPOST(createIdList(),
                        function (res) {
                            alertMsg.send("Le statut a été modifié", "info");
                            loadProList(true);
                        }, function () {
                            alertMsg.send("Impossible de modifier le statut", "danger");
                        }, true
                    );

                }
            });
        };
    }
})
();


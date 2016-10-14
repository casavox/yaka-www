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

        vm.reinitializeCreatedDate = function() {
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

        loadProList(false);

        vm.tableData = [];

        function proSorting() {
            vm.usersTable = new ngTableParams({
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


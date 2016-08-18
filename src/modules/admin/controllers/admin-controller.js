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


        function loadProList () {
            networkService.adminProListGET(function (res) {
                vm.proData = res;
                angular.forEach(vm.proData, function (pro) {
                    pro.selected = false;
                    pro.user.name = pro.user.firstName + " " + pro.user.lastName;
                    if (pro.company.address.postalCode == undefined) {
                        pro.company.address.postalCode = "";
                    }
                    pro.company.address.city = pro.company.address.postalCode + " " + pro.company.address.locality;
                });
                proSorting();
            }, function () {
            });
        }

        loadProList();

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

        function createIdList () {
            var idList = [];
            angular.forEach(vm.proData, function (pro) {
                if (pro.selected == true) {
                    idList.push(pro.id);
                }
            });
            return idList;
        }

        vm.validatePro = function () {
            console.log(vm.proData);
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
                            loadProList();
                        }, function () {
                            alertMsg.send("Impossible de modifier le statut", "danger");
                        }
                    );

                }
            });
        }
    }
})
();


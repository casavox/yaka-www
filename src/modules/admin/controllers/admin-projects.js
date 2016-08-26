(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AdminProjectsController', AdminProjectsController);

    function AdminProjectsController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG, $filter, $sce, ngTableParams) {
        if ($localStorage.user && !$localStorage.user.isAdmin) {
            $state.go("home");
        }
        $rootScope.pageName = "Admin";
        var vm = this;


        function loadProList () {
            networkService.adminProjectsListGET(function (res) {
                vm.projectsList = res;
                vm.possibleProposalNbr = [];
                angular.forEach(vm.projectsList, function (project) {
                    project.frenchStatus = $filter('casaProjectStatus')(project.status);
                    if (project.address.postalCode == undefined) {
                        project.address.postalCode = "";
                    }
                    project.place = project.address.postalCode + " " + project.address.locality;
                    project.name = project.user.firstName + " " + project.user.lastName;
                    project.proposalsNbr = 0;
                    if (project.proposals) {
                        project.proposalsNbr = project.proposals.length;
                    }
                    project.recoProposalsNbr = 0;
                    if (project.recoProposals) {
                        project.recoProposalsNbr = project.recoProposals.length;
                    }
                    if (!project.compatibleValidatedProsNumber) {
                        project.compatibleValidatedProsNumber = 0;
                    }
                    if(!project.compatibleNotValidatedProsNumber) {
                        project.compatibleNotValidatedProsNumber = 0;
                    }

                    if ($.inArray(project.proposalsNbr, vm.possibleProposalNbr) == -1) {
                        vm.possibleProposalNbr.push(project.proposalsNbr);
                    }
                });
                proSorting();
            }, function () {
            });
        }

        loadProList();
        vm.tableData = [];

        function proSorting() {
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 99999999,
                sorting: {name: "asc"}
            }, {
                total: vm.projectsList.length,
                counts: [],
                getData: function ($defer, params) {
                    vm.tableData = vm.projectsList;
                    vm.tableData = params.sorting() ? $filter('orderBy')(vm.tableData, params.orderBy()) : vm.tableData;
                    vm.tableData = params.filter() ? $filter('filter')(vm.tableData, params.filter()) : vm.tableData;
                    console.log(params.filter());
                    vm.tableData = vm.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(vm.tableData);
                }
            });
        }




        function createIdList () {
            var idList = [];
            angular.forEach(vm.projectsList, function (pro) {
                if (project.selected == true) {
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
                            loadProList();
                        }, function () {
                            alertMsg.send("Impossible de modifier le statut", "danger");
                        }
                    );

                }
            });
        };

        vm.getWhen = function(project) {
            var res = 0;
            if (project && project.desiredDatePeriod) {
                switch (project.desiredDatePeriod) {
                    case "SPECIFIC":
                        return "autour du " + moment(project.desiredDate).format("D MMMM");
                    case "WITHIN_A_WEEK":
                        return "dans la semaine autour du " + moment(project.desiredDate).format("D MMMM");
                    case "WITHIN_A_MONTH":
                        return "dans le mois (avant le " + moment(project.desiredDate).format("D MMMM") + ")";
                    case "NONE":
                        return 'dès que possible';
                }
            }
        }
    }
})
();


(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProposalsController', ProposalsController);

    //
    //Controller login
    function ProposalsController($scope, $rootScope, networkService, alertMsg, $stateParams, $localStorage, $state, $filter, screenSize) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        $rootScope.updateProfile();

        var vm = this;
        vm.getWhen = getWhen;
        vm.projectDetails = projectDetails;
        vm.selectProposal = selectProposal;
        if ($stateParams.projectId) {
            networkService.projectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        } else {
            $state.go("dashboard");
        }

        function selectProposal(p) {
            $state.go('proposal', {proposalId: p.id});
        }

        function succesProjectGET(res) {
            vm.project = res;

            vm.displayProposalText = function () {
                if (!vm.project.proposals || vm.project.proposals.length == 0) {
                    return true;
                } else {
                    return false;
                }
            };
            vm.displayRecommendText = function () {
                if (!vm.project.recoProposals || vm.project.recoProposals.length == 0) {
                    return true;
                } else {
                    return false;
                }
            };
            $rootScope.pageName = vm.project.title;
        }

        function errorProjectGET() {
            alertMsg.send("Impossible de récupérer les propositions", "danger");
        }

        function projectDetails() {
            $state.go('project', {projectId: $stateParams.projectId});
        }

        function getWhen() {
            var res = 0;
            if (vm.project && vm.project.desiredDatePeriod) {
                switch (vm.project.desiredDatePeriod) {
                    case "SPECIFIC":
                        return "autour du " + moment(vm.project.desiredDate).format("D MMMM");
                    case "WITHIN_A_WEEK":
                        return "dans la semaine autour du " + moment(vm.project.desiredDate).format("D MMMM");
                    case "WITHIN_A_MONTH":
                        return "dans le mois (avant le " + moment(vm.project.desiredDate).format("D MMMM") + ")";
                    case "NONE":
                        return 'dès que possible';
                }
            }
        }

        $(function () {
            $('.chart').easyPieChart({
                scaleColor: false,
                lineWidth: 5,
                lineCap: 'square',
                barColor: '#03a9f4',
                trackColor: '#ededed',
                size: 100,
                animate: 500
            });

            function showPieCharts() {
                if ($('.chart1').data('easyPieChart')) {
                    $('.chart1').data('easyPieChart').update(25);
                }
                setTimeout(function () {
                    if ($('.chart2').data('easyPieChart')) {
                        $('.chart2').data('easyPieChart').update(50);
                    }
                }, 500);
                setTimeout(function () {
                    if ($('.chart3').data('easyPieChart')) {
                        $('.chart3').data('easyPieChart').update(75);
                    }
                }, 1000);
                setTimeout(function () {
                    if ($('.chart4').data('easyPieChart')) {
                        $('.chart4').data('easyPieChart').update(100);
                    }
                }, 1500);
            }

            $.fn.isOnScreen = function () {
                var win = $(window);
                var viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                };
                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();
                var bounds = this.offset();
                bounds.right = bounds.left + this.outerWidth();
                bounds.bottom = bounds.top + this.outerHeight();
                return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            };

            var pieChartsShown = false;
            var pieChartsShown1 = false;
            var pieChartsShown2 = false;
            var pieChartsShown3 = false;
            var pieChartsShown4 = false;

            $scope.$watch(function () {
                return document.readyState
            }, function (newValue, oldValue) {
                if (newValue == "complete") {
                    animateCircles();
                }
            });

            function animateCircles() {
                if (!screenSize.is('xs')) { //Desktop
                    $scope.$watch(function () {
                        return $('.chart1 i').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown) {
                            pieChartsShown = true;
                            showPieCharts();
                        }
                    });
                } else {  //Mobile
                    $scope.$watch(function () {
                        return $('.chart1 i').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown1) {
                            pieChartsShown1 = true;
                            $('.chart1').data('easyPieChart').update(25);
                        }
                    });

                    $scope.$watch(function () {
                        return $('.chart2 i').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown2) {
                            pieChartsShown2 = true;
                            $('.chart2').data('easyPieChart').update(50);
                        }
                    });

                    $scope.$watch(function () {
                        return $('.chart3 i').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown3) {
                            pieChartsShown3 = true;
                            $('.chart3').data('easyPieChart').update(75);
                        }
                    });

                    $scope.$watch(function () {
                        return $('.chart4 i').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown4) {
                            pieChartsShown4 = true;
                            $('.chart4').data('easyPieChart').update(100);
                        }
                    });
                }
            }
        });
    }
})();

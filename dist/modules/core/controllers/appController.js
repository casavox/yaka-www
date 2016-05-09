(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AppController', AppController);

    function AppController($scope, networkService, alertMsg, $rootScope, $state, $stomp, $localStorage, CONFIG) {

        var app = this;
        var vm = this;
        $scope.user = $localStorage.user;
        var menuOpened = false;
        $rootScope.rate_watcher = true;
        $scope.projectFlag = false;
        $scope.project = null;
        $scope.error = {criteria: {message: "", flag: true}};
        $scope.rating = {positive: "", comment: "", criteria: []};
        var can = true;
        var connectHeaders = {token: $localStorage.token};

        $stomp
            .connect(CONFIG.API_BASE_URL + '/connect', connectHeaders)

            // frame = CONNECTED headers
            .then(function (frame) {
                var subscription = $stomp.subscribe('/notif/', function (payload, headers, res) {
                    vm.messages.items.push(payload);
                    vm.glue = true;
                }, {
                    'token': $localStorage.token
                });
            });

        $scope.$watch(function () {
            return $localStorage.user;
        }, function (newVal, oldVal) {
            if (newVal === oldVal)
                return;
            $scope.user = $localStorage.user;
        });

        $scope.viewProposal = function () {
            $rootScope.rating = true;
            $scope.projectFlag = false;
            if ($rootScope.state.name == 'proposal')
                $state.reload();
            else
                $state.go('proposal', {proposalId: $scope.project.proposal.id});
        };

        function check() {
            if (!$rootScope.rating) {
                if (can && $localStorage.token && $localStorage.user) {
                    can = false;
                    networkService.proToRate(function (res) {
                        can = true;
                        if (res) {
                            $scope.project = res;
                            console.log(res);
                            networkService.criteriaGET(function (res) {
                                $scope.criteria = res;
                                $scope.projectFlag = true;
                            }, function (res) {

                                alertMsg.send("Error impossible to rate the pro.", "danger");
                            })
                        }
                    }, function (res) {
                        can = true;
                    });
                }

            }

        }

        check();

        $scope.$watch(function () {
            return $rootScope.rate_watcher;
        }, function (newVal, oldVal) {
            if (newVal === oldVal)
                return;
            check();
        });

        $scope.selectCriteria = function (index) {
            var flag = false;

            for (var i = 0; i < $scope.rating.criteria.length; i++) {
                if ($scope.rating.criteria[i].name == $scope.criteria[index]) {
                    $scope.rating.criteria.splice(i, 1);
                    flag = true;
                    break;
                }
            }
            if ($scope.rating.criteria.length < 3 && ($scope.rating.positive == 'true' || $scope.rating.positive == 'false')) {
                if (!flag)
                    $scope.rating.criteria.push({name: $scope.criteria[index]});
            }
        };

        $scope.indexOfObject = function (a, token, array) {
            var res = [];
            if (!angular.isUndefined(array)) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][token] == a) {
                        res.push(i);
                    }
                }
                return res;
            }
            return res;
        };

        $scope.send = function () {
            if ($scope.rating.criteria.length > 2 && $scope.rating.positive != '' && (($scope.rating.positive == 'false' && $scope.rating.comment.length >= 10) || $scope.rating.positive == 'true')) {
                $scope.disable = true;
                $scope.error.criteria.flag = false;
                $scope.rating.id = $scope.project.proposal.id;
                networkService.ratePro($scope.rating, function (res) {
                    $scope.projectFlag = false;
                    $rootScope.rate_pro = false;
                    $scope.disable = false;
                    $scope.rating = {positive: true, comment: "", criteria: []};
                }, function (res) {
                    alertMsg.send("Error : impossible to rate the pro", "danger");
                    $scope.projectFlag = false;
                    $scope.rating = {positive: true, comment: "", criteria: []};
                    $scope.disable = false;
                })
            }
            else if ($scope.rating.positive == 'false' && $scope.rating.comment.length < 10) {
                $scope.error.criteria.message = "Please select at least 3 criteria and say why.";
                $scope.error.criteria.flag = true;
                $scope.disable = false;
            }
            else {
                $scope.error.criteria.message = "Please select at least 3 criteria";
                $scope.error.criteria.flag = true;
                $scope.disable = false;
            }
        };


        app.menu = {
            openMenu: function () {
                menuOpened = true;
            },
            closeMenu: function () {
                menuOpened = false;
            },
            getMenuClass: function () {
                if (menuOpened) {
                    return "opened";
                } else {
                    return "closed";
                }
            },
            getOverlayClass: function () {
                if (menuOpened) {
                    return "overlayVisible";
                } else {
                    return "overlayInvisible";
                }
            },
            getMenuItemClass: function () {
                return "";
            }
        }

        app.logout = function () {
            $localStorage.token = "";
            $state.go('home');
        }
    }
})();

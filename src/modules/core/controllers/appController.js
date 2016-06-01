(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AppController', AppController);

    function AppController($scope, networkService, alertMsg, $rootScope, $state, $stomp, $localStorage, $cookies, CONFIG) {

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

        $rootScope.pageName = "";

        app.getPageName = function () {
            if ($rootScope.pageName == "") {
                return "YakaClub : Trouvez et recommandez vos artisans pour vos travaux";
            } else {
                return $rootScope.pageName + " - YakaClub : Trouvez et recommandez vos artisans pour vos travaux"
            }
        };

        $rootScope.updateProfile = function () {
            networkService.me(function (res) {
                $localStorage.user = res;
                $scope.user = $localStorage.user;
            }, function () {
                app.logout();
            });
        };

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
                            networkService.criteriaGET(function (res) {
                                $scope.criteria = res;
                                $scope.projectFlag = true;
                            }, function (res) {

                                alertMsg.send("Impossible d'effectuer la notation", "danger");
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
                    alertMsg.send("Impossible d'effectuer la notation", "danger");
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
        };

        app.getUser = function () {
            if ($scope.user == undefined) {
                return {};
            } else {
                return $scope.user;
            }
        };

        app.logout = function () {
            $localStorage.$reset();
            $state.go('home');
        };

        app.getUserType = function () {
            if ($scope.user == undefined ||
                $scope.user.type == undefined) {
                return "";
            } else {
                return $scope.user.type;
            }
        };

        app.isPro = function () {
            return app.getUserType() == "pro";
        };

        app.getFirstName = function () {
            if ($scope.user == undefined) {
                return "";
            }
            return $scope.user.firstName;
        };

        app.getLastName = function () {
            if ($scope.user == undefined) {
                return "";
            }
            return $scope.user.lastName;
        };

        app.getFullName = function () {
            var firstName = app.getFirstName();
            var lastName = app.getLastName();
            if (firstName == "" && lastName == "") {
                return "";
            }
            return firstName + " " + lastName;
        };

        app.getEmail = function () {
            if ($scope.user == undefined) {
                return "";
            }
            return $scope.user.email.toLowerCase();
        };

        app.showCustomerSupport = false;

        app.closeCustomerSupport = function () {
            app.showCustomerSupport = false;
            smartsupp('chat:close');
        };

        app.openCustomerSupport = function () {
            app.showCustomerSupport = true;
            smartsupp('name', app.getFullName());
            smartsupp('email', app.getEmail().toLowerCase());
            smartsupp('variables',
                {
                    name: {
                        label: 'Name',
                        value: app.getFullName()
                    },
                    email: {
                        label: 'Email',
                        value: app.getEmail().toLowerCase()
                    },
                    userType: {
                        label: 'User Type',
                        value: app.getUserType()
                    },
                    version: {
                        label: 'YakaClub Version',
                        value: 'beta 0'
                    }
                });
            smartsupp('chat:open');
        };
    }
})();

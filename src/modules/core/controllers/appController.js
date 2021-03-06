(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AppController', AppController);

    function AppController($scope, networkService, alertMsg, $rootScope, $state, $stomp, $localStorage, $cookies, $stateParams, $analytics, CONFIG) {

        var app = this;
        var vm = this;
        $rootScope.rate_watcher = true;
        $scope.projectFlag = false;
        $scope.project = null;
        $scope.error = {criteria: {message: "", flag: true}};
        $scope.rating = {positive: "", comment: "", criteria: []};
        var can = true;
        var connectHeaders = {token: $localStorage.token};

        $rootScope.pageName = "";

        app.getPageName = function () {
            if (!$rootScope.pageName) {
                return "CasaVox : Trouvez vos artisans en toute confiance";
            } else {
                return $rootScope.pageName + " - CasaVox : Trouvez vos artisans en toute confiance"
            }
        };

        $rootScope.updateProfile = function (ignoreLoading) {
            networkService.me(function (res) {
                app.setUser(res);
                $analytics.setUsername($localStorage.user.id);
                if ($rootScope.fcmRegisterToken) {
                    $rootScope.fcmRegisterToken();
                }
            }, function () {
            }, ignoreLoading);
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
                }
            );

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

        $scope.sendRating = function () {
            if ($scope.rating.criteria.length > 0 && $scope.rating.criteria.length < 4 && $scope.rating.positive != '' && (($scope.rating.positive == 'false' && $scope.rating.comment.length >= 10) || $scope.rating.positive == 'true')) {
                $scope.disable = true;
                $scope.error.criteria.flag = false;
                $scope.rating.id = $scope.project.proposal.id;
                networkService.ratePro($scope.rating, function (res) {
                    $scope.projectFlag = false;
                    $rootScope.rate_pro = false;
                    $scope.disable = false;
                    $scope.rating = {positive: true, comment: "", criteria: []};
                    afterRatingSuccess()
                }, function (res) {
                    alertMsg.send("Impossible d'effectuer la notation", "danger");
                    $scope.projectFlag = false;
                    $scope.rating = {positive: true, comment: "", criteria: []};
                    $scope.disable = false;
                }, true)
            }
            else if ($scope.rating.positive == 'false' && $scope.rating.comment.length < 10) {
                $scope.error.criteria.message = "Merci de choisir 1 à 3 critères et d'ajouter un commentaire (10 caractères au moins).";
                $scope.error.criteria.flag = true;
                $scope.disable = false;
            }
            else {
                $scope.error.criteria.message = "Merci de choisir 1 à 3 critères, vous pouvez également ajouter un commentaire";
                $scope.error.criteria.flag = true;
                $scope.disable = false;
            }
        };

        function afterRatingSuccess() {
            swal({
                title: "C'est fait !",
                text: "La communauté CasaVox vous remercie d'avoir partagé votre avis sur ce Pro !",
                type: "success",
                showConfirmButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Fermer"
            }, function () {
                $state.go('dashboard');
            });
        }

        app.setUser = function (user) {
            $localStorage.user = user;
        };

        app.getUser = function () {
            return $localStorage.user;
        };

        app.logout = function () {
            if ($localStorage.user && $localStorage.user.professional) {
                $state.go('pro-home');
            } else {
                $state.go('home');
            }
            $localStorage.$reset();
        };

        app.isPro = function () {
            if (!app.getUser()) {
                return false;
            }
            return app.getUser().professional;
        };

        app.isAdmin = function () {
            if (!app.getUser()) {
                return false;
            }
            return app.getUser().isAdmin;
        };

        app.getTheme = function () {
            if (app.isPro()) {
                return "orange";
            } else {
                return "lightblue"
            }
        };

        app.getThemeColor = function () {
            if (app.isPro()) {
                return "#FF9800";
            } else {
                return "#03A9F4"
            }
        };

        app.getFirstName = function () {
            if (app.getUser()) {
                return app.getUser().firstName;
            }
            return "";
        };

        app.getLastName = function () {
            if (app.getUser()) {
                return app.getUser().lastName;
            }
            return "";
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
            if (app.getUser()) {
                return app.getUser().email.toLowerCase();
            }
            return "";
        };

        app.getUserchats = function () {
            if (app.getUser() && app.getUser().userChats) {
                return app.getUser().userChats;
            }
            return [];
        };

        app.getUserchatsUnreadNumber = function () {
            var num = 0;
            if (app.getUserchats()) {
                angular.forEach(app.getUserchats(), function (userChat) {
                    if (userChat.unreadMessages) {
                        num++;
                    }
                })
            }
            return num;
        };


        app.openHelp = function () {
            $localStorage.lastUrlBeforeSupport = window.location.href;
            $state.go("help");
        };

        //Template stuff

        app.sidebarToggle = {
            left: false
        };

        app.sidebarStat = function (event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        };

        app.getEnvironment = function () {
            return CONFIG.ENV;
        };

        app.goToLogin = function () {
            if ($state.current.name == "public-project-recommend") {
                window.recoProjectId = $stateParams.projectId;
            }
            $state.go('home', {login: true});
        };

        var oldLoadingValue = false;

        app.isLoading = function () {
            if ($rootScope.loading && !oldLoadingValue) {
                setTimeout(function () {
                    app.showLoadingIcons = true;
                }, 500);
            } else if (!$rootScope.loading) {
                app.showLoadingIcons = false;
            }

            oldLoadingValue = $rootScope.loading;
            return $rootScope.loading;
        };

        app.showLoadingIcons = false;

        app.isMobile = $rootScope.isMobile;
        app.isProApp = $rootScope.isProApp;

        $rootScope.createSnackbar = (function () {
            // Any snackbar that is already shown
            var previous = null;

            return function (message, actionText, action) {
                if (previous) {
                    previous.dismiss();
                }

                var snackbar = document.createElement('div');
                snackbar.className = 'paper-snackbar';
                snackbar.dismiss = function () {
                    this.style.opacity = 0;
                };
                var text = document.createTextNode(message);
                snackbar.appendChild(text);
                if (actionText) {
                    if (!action) {
                        action = snackbar.dismiss.bind(snackbar);
                    }
                    var actionButton = document.createElement('button');
                    actionButton.className = 'action';
                    actionButton.innerHTML = actionText;
                    actionButton.addEventListener('click', action);
                    snackbar.appendChild(actionButton);
                }
                setTimeout(function () {
                    if (previous === this) {
                        previous.dismiss();
                    }
                }.bind(snackbar), 5000);

                snackbar.addEventListener('transitionend', function (event, elapsed) {
                    if (event.propertyName === 'opacity' && this.style.opacity == 0) {
                        this.parentElement.removeChild(this);
                        if (previous === this) {
                            previous = null;
                        }
                    }
                }.bind(snackbar));

                previous = snackbar;
                console.log(snackbar);
                document.body.appendChild(snackbar);
                // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
                getComputedStyle(snackbar).bottom;
                snackbar.style.bottom = '0px';
                snackbar.style.opacity = 1;
            };
        })();
    }
})();

angular.module('Yaka')

    .directive('casaContact', function (networkService, alertMsg) {
        return {
            restrict: 'E',
            scope: {
                user: '=',
                invite: '=?',
                clientRed: '=?',
                clientBlue: '=?',
                iconColor: '@'
            },
            link: function (scope, element, attr) {
                if (!scope.invite) {
                    scope.invite = false;
                }
                if (!scope.clientRed) {
                    scope.clientRed = false;
                }
                if (!scope.clientBlue) {
                    scope.clientBlue = false;
                }
                scope.invite = function (relation) {
                    networkService.invitePOST(scope.user.id, relation, function (res) {
                        scope.user.isInvited = true;
                        alertMsg.send("Vous avez bien invité " + scope.user.firstName + " " + scope.user.lastName, "success");
                    }, function (err) {
                        alertMsg.send("Impossible d'inviter cette personne", "danger");
                    }, true);
                };
            },
            templateUrl: "/modules/core/directives/views/casaContact.html"
        }
    })

    .directive('casaNameAndContact', function () {
        return {
            restrict: 'E',
            scope: {
                user: '=',
                invite: '=?',
                clientRed: '=?',
                clientBlue: '=?',
                iconColor: '@'
            },
            link: function (scope, element, attr) {
                if (!scope.invite) {
                    scope.invite = false;
                }
                if (!scope.clientRed) {
                    scope.clientRed = false;
                }
                if (!scope.clientBlue) {
                    scope.clientBlue = false;
                }
            },
            templateUrl: "/modules/core/directives/views/casaNameAndContact.html"
        }
    });

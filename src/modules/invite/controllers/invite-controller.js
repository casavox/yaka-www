(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('InviteController', InviteController);

    //
    //Controller login
    function InviteController($rootScope, $scope, alertMsg, CONFIG, gmailContacts) {

        $rootScope.pageName = "Mes contacts";
        $rootScope.updateProfile();

        var vm = this;

        vm.invite = function () {
            gmailContacts.getGmailContacts(function (contacts) {
                console.log(contacts);
            });
            $scope.$applyAsync();
        }
    }
})
();

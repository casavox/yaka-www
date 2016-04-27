(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ContactsController', ContactsController);

    //
    //Controller login
    ContactsController.$inject = ['$rootScope', '$scope', 'networkService', '$localStorage', '$state', 'alertMsg']
    function ContactsController($rootScope, $scope, networkService, $localStorage, $state, alertMsg) {

        $rootScope.showMenu = true;

        var vm = this;

        vm.MENU_ALL = "ALL";
        vm.MENU_PROS = "PROS";
        vm.MENU_FRIENDS = "FRIENDS";
        vm.MENU_INVIT_RECEIVED = "INVIT_RECEIVED";
        vm.MENU_INVIT_SENT = "INVIT_SENT";

        vm.currentMenuItem = vm.MENU_ALL;

        vm.contacts = [];
        vm.prosNumber = 0;
        vm.friendsNumber = 0;

        networkService.contactsGET(succesContactsGET, errorContactsGET);

        function succesContactsGET(res) {
            console.log(res);

            var prosNum = 0;
            var friendsNum = 0;
            angular.forEach(res, function (contact) {
                if (contact.user.professional) {
                    prosNum++;
                } else {
                    friendsNum++;
                }
            });

            vm.contacts = res;
            vm.prosNumber = prosNum;
            vm.friendsNumber = friendsNum;
        }

        function errorContactsGET() {
            alertMsg.send("Impossible de récupérer les contacts", "warning");
        }

        vm.showContactOrNot = function (contact) {
            if (contact.user.professional) {
                if (vm.currentMenuItem == vm.MENU_ALL) {
                    return true;
                } else if (vm.currentMenuItem == vm.MENU_PROS) {
                    return true;
                } else if (vm.currentMenuItem == vm.MENU_FRIENDS) {
                    return false;
                }
            } else {
                if (vm.currentMenuItem == vm.MENU_ALL) {
                    return true;
                } else if (vm.currentMenuItem == vm.MENU_PROS) {
                    return false;
                } else if (vm.currentMenuItem == vm.MENU_FRIENDS) {
                    return true;
                }
            }
        }
    }
})
();

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
        };

        vm.showInvitFriendPopup = false;

        vm.openFriendPopup = function () {
            vm.showInvitFriendPopup = true;
        };

        vm.closeFriendPopup = function () {
            vm.showInvitFriendPopup = false;
        };

        vm.showInvitProPopup = false;

        vm.openProPopup = function () {
            vm.showInvitProPopup = true;
        };

        vm.closeProPopup = function () {
            vm.showInvitProPopup = false;
        };

        vm.invitCustomer = "";

        vm.invitPro = {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            activities: [],
            address: {}
        };

        vm.sendCustomerInvit = function () {
            var invits = vm.invitCustomer.split(",");
            for (var i = 0; i < invits.length; i++) {
                invits[i] = invits[i].trim();
                if (!isEmailValid(invits[i])) {
                    alertMsg.send(invits[i] + " n'est pas un email valide", "warning");
                    return;
                }
            }

            networkService.inviteCustomerPOST(invits, succesinviteCustomerPOST, errorinviteCustomerPOST);
        };

        function succesinviteCustomerPOST(res) {
            console.log(res);
            vm.invitCustomer = "";
            vm.closeFriendPopup();
            alertMsg.send("Invitation effectuée", "success");
        }

        function errorinviteCustomerPOST() {
            alertMsg.send("Impossible d'effectuer l'invitation", "warning");
        }

        vm.sendProInvit = function () {
            networkService.inviteProPOST(vm.invitePro, succesinviteProPOST, errorinviteProPOST);
        };

        function succesinviteProPOST(res) {
            console.log(res);
            vm.closeProPopup();
            alertMsg.send("Invitation effectuée", "success");
        }

        function errorinviteProPOST() {
            alertMsg.send("Impossible d'effectuer l'invitation", "warning");
        }

        var isEmailValid = function (email) {
            return new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$").test(email);
        };

    }
})
();

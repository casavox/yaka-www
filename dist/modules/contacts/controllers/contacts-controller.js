(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ContactsController', ContactsController);

    //
    //Controller login
    ContactsController.$inject = ['$rootScope', '$scope', 'networkService', '$localStorage', '$state', 'alertMsg', '$translate']
    function ContactsController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate) {

        $rootScope.showMenu = false;

        var vm = this;

        vm.getMenuItemClass = function (state) {
            if (state == "contacts") {
                return "active-menu";
            }
            return "";
        };

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

        vm.invitationsReceived = [];
        vm.invitationsSent = [];

        networkService.invitationsReceivedGET(succesInvitationsReceivedGET, errorInvitationsReceivedGET);

        function succesInvitationsReceivedGET(res) {
            console.log(res);

            vm.invitationsReceived = res;
        }

        function errorInvitationsReceivedGET() {
            alertMsg.send("Impossible de récupérer les invitations", "warning");
        }

        networkService.invitationsSentGET(succesInvitationsSentGET, errorInvitationsSentGET);

        function succesInvitationsSentGET(res) {
            console.log(res);

            vm.invitationsSent = res;
        }

        function errorInvitationsSentGET() {
            alertMsg.send("Impossible de récupérer les invitations", "warning");
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

        vm.sendCustomerInvit = function () {
            var invits = vm.invitCustomer.split(",");
            for (var i = 0; i < invits.length; i++) {
                invits[i] = invits[i].trim();
                if (!vm.isEmailValid(invits[i])) {
                    alertMsg.send(invits[i] + " n'est pas un email valide", "warning");
                    return;
                }
            }

            networkService.inviteCustomerPOST(invits, succesInviteCustomerPOST, errorInviteCustomerPOST);
        };

        function succesInviteCustomerPOST(res) {
            console.log(res);
            vm.invitCustomer = "";
            vm.closeFriendPopup();
            alertMsg.send("Invitation(s) envoyée(s)", "success");
        }

        function errorInviteCustomerPOST() {
            alertMsg.send("Impossible d'envoyer l'invitation", "warning");
        }

        vm.invitPro = {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            activities: [],
            address: {}
        };

        vm.sendProInvit = function () {
            networkService.inviteProPOST(vm.invitPro, succesInviteProPOST, errorInviteProPOST);
        };

        function succesInviteProPOST(res) {
            console.log(res);
            vm.closeProPopup();
            vm.invitPro = {
                email: "",
                firstName: "",
                lastName: "",
                phone: "",
                activities: [],
                address: {}
            };
            vm.phoneNumber = "";
            alertMsg.send("Invitation envoyée", "success");
        }

        function errorInviteProPOST() {
            alertMsg.send("Impossible d'envoyer l'invitation", "warning");
        }

        vm.autocomplete = {
            options: {
                types: ['(cities)'],
                componentRestrictions: {country: 'fr'}
            }
        };

        vm.multiChoiceInput = {
            settings: {
                showCheckAll: false,
                showUncheckAll: false,
                scrollable: true,
                scrollableHeight: 265,
                displayProp: "labelTranslated",
                closeOnBlur: true
            },
            translation: {
                checkAll: "Tout sélectionner",
                uncheckAll: "Tout désélectionner",
                selectionCount: "choisis",
                searchPlaceholder: "Rechercher...",
                buttonDefaultText: "Domaines d'intervention",
                dynamicButtonTextSuffix: "domaine(s) d'intervention"
            },
            options: [
                {id: 0, label: "ELE_1000"},
                {id: 1, label: "PLU_2000"},
                {id: 2, label: "HEA_3000"},
                {id: 3, label: "CAR_4000"},
                {id: 4, label: "LOC_5000"},
                {id: 5, label: "PAI_6000"},
                {id: 6, label: "WAL_7000"},
                {id: 7, label: "INS_8000"},
                {id: 8, label: "COU_9000"},
                {id: 9, label: "KIT_10000"},
                {id: 10, label: "ROO_11000"},
                {id: 11, label: "GAT_12000"},
                {id: 12, label: "GAR_13000"},
                {id: 13, label: "CON_14000"}
            ],
            selected: []
        };

        angular.forEach(vm.multiChoiceInput.options, function (value) {
            value.labelTranslated = $translate.instant('ACTIVITY_' + value.label);
        });

        vm.isEmailValid = function (email) {
            return new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,99}").test(email);
        };

        vm.isNameValid = function (name) {
            if (name == undefined || name.length < 2 || !isNaN(name)) {
                return false;
            }
            return true;
        };

        vm.phoneNumber = "";

        vm.isPhoneNumberValid = false;

        $('#proInvitePhone').intlTelInput({
            utilsScript: "scripts/intlTelInputUtils.js",
            initialCountry: "fr",
            onlyCountries: ["fr"]
            //DOM-TOM : onlyCountries: ["fr", "mq", "gf", "re", "yt", "pm", "bl", "mf", "tf", "wf", "pf", "nc"]
        });
        $('#proInvitePhone').blur(function () {
            if ($.trim($('#proInvitePhone').val())) {
                if ($('#proInvitePhone').intlTelInput("isValidNumber")) {
                    vm.invitPro.phone = $('#proInvitePhone').intlTelInput("getNumber");
                    console.log("VALID");
                } else {
                    console.log("INVALID");
                }
            }
        });
        $('#proInvitePhone').keyup(function (e) {
            var code = (e.keyCode || e.which);

            if (code == 37 || code == 38 || code == 39 || code == 40) {
                return;
            }

            if ($.trim($('#proInvitePhone').val())) {
                if ($('#proInvitePhone').intlTelInput("isValidNumber")) {
                    vm.isPhoneNumberValid = true;
                } else {
                    vm.isPhoneNumberValid = false;
                }
                vm.phoneNumber = $('#proInvitePhone').val();
                vm.phoneNumber = vm.phoneNumber.replace(/\D/g, '');
                vm.phoneNumber = addCharEveryNChar(vm.phoneNumber, 2, ' ');
                if (vm.phoneNumber.length > 14) {
                    vm.phoneNumber = vm.phoneNumber.substring(0, 14);
                }
                $('#proInvitePhone').val(vm.phoneNumber);
                $scope.$apply();
            }
        });

        function addCharEveryNChar(str, n, char) {
            var ret = [];
            var i;
            var len;

            for (i = 0, len = str.length; i < len; i += n) {
                ret.push(str.substr(i, n));
            }

            return ret.join(char);
        };

        vm.formIsValid = function () {
            vm.invitPro.activities = angular.copy(vm.multiChoiceInput.selected);
            angular.forEach(vm.invitPro.activities, function (activity) {
                activity.code = vm.multiChoiceInput.options[activity.id].label;
                delete activity.id;
            });

            if (vm.invitPro.firstName == '' || !vm.isNameValid(vm.invitPro.firstName) ||
                vm.invitPro.lastName == '' || !vm.isNameValid(vm.invitPro.lastName) || !$('#proInvitePhone').intlTelInput("isValidNumber") || vm.invitPro.phone == '' ||
                vm.invitPro.email == '' || !vm.isEmailValid(vm.invitPro.email) ||
                vm.invitPro.activities.length == 0 ||
                vm.invitPro.address.address == undefined || vm.invitPro.address.address == ''
            ) {
                return false;
            }
            return true;
        };

        vm.refuseInvitation = function (invitationId) {
            networkService.refuseInvitationPOST(invitationId, succesRefuseInvitationPOST, errorRefuseInvitationPOST);
        };

        function succesRefuseInvitationPOST(res) {
            console.log(res);
            alertMsg.send("Invitation refusée avec succes", "success");
        }

        function errorRefuseInvitationPOST() {
            alertMsg.send("Impossible de refuser l'invitation", "warning");
        }

        vm.acceptInvitation = function (invitationId) {
            networkService.acceptInvitationPOST(invitationId, succesAcceptInvitationPOST, errorAcceptInvitationPOST);
        };

        function succesAcceptInvitationPOST(res) {
            console.log(res);
            alertMsg.send("Invitation acceptée avec succes", "success");
        }

        function errorAcceptInvitationPOST() {
            alertMsg.send("Impossible d'accepter l'invitation", "warning");
        }

    }
})
();

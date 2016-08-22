(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ContactsController', ContactsController);

    //
    //Controller login
    function ContactsController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        $rootScope.pageName = "Mes contacts";
        $rootScope.updateProfile();

        var vm = this;

        if (!angular.isUndefined($localStorage.invitationId) && $localStorage.invitationId && $localStorage.invitationId != '') {
            networkService.acceptInvitationPOST($localStorage.invitationId, succesAcceptInvitationPOST, errorAcceptInvitationPOST);
            $localStorage.invitationId = '';
        }

        vm.MENU_ALL = "ALL";
        vm.MENU_PROS = "PROS";
        vm.MENU_FRIENDS = "FRIENDS";
        vm.MENU_INVIT_RECEIVED = "INVIT_RECEIVED";
        vm.MENU_INVIT_SENT = "INVIT_SENT";

        vm.currentMenuItem = vm.MENU_ALL;

        vm.contactsMenuOpened = false;

        vm.contacts = [];
        vm.prosNumber = 0;
        vm.friendsNumber = 0;

        vm.getHumanReadableMenuItem = function () {
            if (vm.currentMenuItem == vm.MENU_ALL) {
                return "Mes Contacts";
            } else if (vm.currentMenuItem == vm.MENU_PROS) {
                if ($localStorage.user && $localStorage.user.professional) {
                    return "Collègues";
                } else {
                    return "Artisans";
                }
            } else if (vm.currentMenuItem == vm.MENU_FRIENDS) {
                return "Amis";
            } else if (vm.currentMenuItem == vm.MENU_INVIT_RECEIVED) {
                return "Invitations reçues";
            } else if (vm.currentMenuItem == vm.MENU_INVIT_SENT) {
                return "Invitations envoyées";
            }
        };

        vm.getCurrentContactListNumber = function () {
            var count = 0;
            angular.forEach(vm.contacts, function (contact) {
                if (vm.showContactOrNot(contact)) {
                    count++;
                }
            });
            return count;
        };

        function reloadContactsAndInvitations() {
            networkService.contactsGET(succesContactsGET, errorContactsGET);
            networkService.invitationsReceivedGET(succesInvitationsReceivedGET, errorInvitationsReceivedGET);
            networkService.invitationsSentGET(succesInvitationsSentGET, errorInvitationsSentGET);
        }

        networkService.contactsGET(succesContactsGET, errorContactsGET);

        function succesContactsGET(res) {

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

        function errorContactsGET(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de récupérer les contacts", 'danger');
            }
        }

        vm.invitationsReceived = [];
        vm.invitationsSent = [];

        networkService.invitationsReceivedGET(succesInvitationsReceivedGET, errorInvitationsReceivedGET);

        function succesInvitationsReceivedGET(res) {

            vm.invitationsReceived = res;
        }

        function errorInvitationsReceivedGET(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de récupérer les invitations", 'danger');
            }
        }

        networkService.invitationsSentGET(succesInvitationsSentGET, errorInvitationsSentGET);

        function succesInvitationsSentGET(res) {
            vm.invitationsSent = res;
        }

        function errorInvitationsSentGET(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de récupérer les invitations", 'danger');
            }
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
                    alertMsg.send(invits[i] + " n'est pas un email valide", "danger");
                    return;
                }
            }
            if (hasDuplicates(invits)) {
                alertMsg.send("Vous avez saisi plusieurs fois la même adresse email. Merci de corriger votre saisie", "danger");
                return;
            }

            networkService.inviteCustomerPOST(invits, succesInviteCustomerPOST, errorInviteCustomerPOST);
        };

        function hasDuplicates(array) {
            var valuesSoFar = Object.create(null);
            for (var i = 0; i < array.length; ++i) {
                var value = array[i];
                if (value in valuesSoFar) {
                    return true;
                }
                valuesSoFar[value] = true;
            }
            return false;
        }

        function succesInviteCustomerPOST(res) {
            vm.invitCustomer = "";
            vm.closeFriendPopup();
            vm.closeGmailPopup();
            reloadContactsAndInvitations();
            alertMsg.send("Invitation(s) envoyée(s)", "success");
        }

        function errorInviteCustomerPOST(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible d'envoyer l'invitation", 'danger');
            }
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
            vm.multiChoiceInput.selected = [];
            reloadContactsAndInvitations();
            alertMsg.send("Invitation envoyée", "success");
        }

        function errorInviteProPOST(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible d'envoyer l'invitation", 'danger');
            }
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
                closeOnBlur: true,
                buttonClasses: 'multiChoiceInputColor'
            },
            translation: {
                checkAll: "Tout sélectionner",
                uncheckAll: "Tout désélectionner",
                selectionCount: "choisis",
                searchPlaceholder: "Rechercher...",
                buttonDefaultText: "Préciser ses compétences",
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
                {id: 8, label: "BAT_10100"},
                {id: 9, label: "KIT_10000"},
                {id: 10, label: "ROO_11000"},
                {id: 11, label: "GAT_12000"},
                {id: 12, label: "GAR_13000"},
                {id: 13, label: "COU_13900"},
                {id: 14, label: "CON_14000"},
                {id: 15, label: "REN_500"}
            ],
            selected: []
        };

        vm.updateMultiChoiceInputColor = {
            onItemSelect: function (item) {
                $(".multiChoiceInputColor").css("color", "#2196f3");
            }, onItemDeselect: function (item) {
                if (!vm.multiChoiceInput.selected.length || vm.multiChoiceInput.selected.length == 0) {
                    $(".multiChoiceInputColor").css("color", "red");
                }
            }
        };

        angular.forEach(vm.multiChoiceInput.options, function (value) {
            value.labelTranslated = $translate.instant('ACTIVITY_' + value.label);
        });

        vm.isEmailValid = function (email) {
            return new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,99}$").test(email);
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
            utilsScript: "https://cdn.rawgit.com/jackocnr/intl-tel-input/master/build/js/utils.js",
            initialCountry: "fr",
            onlyCountries: ["fr"]
            //DOM-TOM : onlyCountries: ["fr", "mq", "gf", "re", "yt", "pm", "bl", "mf", "tf", "wf", "pf", "nc"]
        });
        $('#proInvitePhone').blur(function () {
            if ($.trim($('#proInvitePhone').val())) {
                if ($('#proInvitePhone').intlTelInput("isValidNumber")) {
                    vm.invitPro.phone = $('#proInvitePhone').intlTelInput("getNumber");
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
        }

        vm.formIsValid = function () {
            vm.invitPro.activities = angular.copy(vm.multiChoiceInput.selected);
            angular.forEach(vm.invitPro.activities, function (activity) {
                activity.code = vm.multiChoiceInput.options[activity.id].label;
                delete activity.id;
            });

            if (vm.invitPro.firstName == '' || !vm.isNameValid(vm.invitPro.firstName) ||
                vm.invitPro.lastName == '' || !vm.isNameValid(vm.invitPro.lastName) ||
                vm.invitPro.email == '' || !vm.isEmailValid(vm.invitPro.email) ||
                vm.invitPro.activities.length == 0 || !vm.invitPro.relation ||
                vm.invitPro.address.address == undefined || vm.invitPro.address.address == ''
            ) {
                return false;
            }
            return true;
        };

        vm.refuseInvitation = function (inviterId) {
            networkService.refuseInvitationPOST(inviterId, succesRefuseInvitationPOST, errorRefuseInvitationPOST);
        };

        function succesRefuseInvitationPOST(res) {
            reloadContactsAndInvitations();
            alertMsg.send("Invitation refusée avec succes", "success");
        }

        function errorRefuseInvitationPOST(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de refuser l'invitation", 'danger');
            }
        }

        vm.acceptInvitation = function (inviterId) {
            networkService.acceptInvitationPOST(inviterId, succesAcceptInvitationPOST, errorAcceptInvitationPOST);
        };

        function succesAcceptInvitationPOST(res) {
            reloadContactsAndInvitations();
            alertMsg.send("Invitation acceptée avec succes", "success");
        }

        function errorAcceptInvitationPOST(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible d'accepter l'invitation", 'danger');
            }
        }

        vm.contactsMenuFixed = false;

        $('.view').scroll(function () {
            var scroll = $('.view').scrollTop();
            if (scroll >= 270) {
                vm.contactsMenuFixed = true;
                $('.contactsMenu').addClass("fixed");
                $('.contactsContacts').addClass("menuFixed");
            } else {
                vm.contactsMenuFixed = false;
                $('.contactsMenu').removeClass("fixed");
                $('.contactsContacts').removeClass("menuFixed");
            }
        });

        vm.getOverlayClass = function () {
            if (vm.contactsMenuOpened) {
                return "overlayVisible";
            } else {
                return "overlayInvisible";
            }
        };

        vm.showGmailPopup = false;
        vm.gmailContacts = [];

        vm.loadGmailContacts = function () {
            vm.openGmailPopup();
            gmailContacts.getGmailContacts(function (contacts) {
                vm.gmailContacts = contacts;
                $scope.$applyAsync();
            });
        };

        vm.openGmailPopup = function () {
            vm.showGmailPopup = true;
        };

        vm.closeGmailPopup = function () {
            vm.showGmailPopup = false;
            vm.gmailContacts = [];
            vm.selectAll = false;
        };

        vm.setAllContactsSelected = function (selected) {
            if (vm.gmailContacts) {
                for (var i = 0; i < vm.gmailContacts.length; ++i) {
                    vm.gmailContacts[i].selected = selected;
                }
            }
        };

        vm.selectAllChanged = function () {
            if (vm.selectAll) {
                vm.setAllContactsSelected(true);
            } else {
                vm.setAllContactsSelected(false);
            }
        };

        vm.showGmailInviteButton = function () {
            if (vm.gmailContacts) {
                for (var i = 0; i < vm.gmailContacts.length; ++i) {
                    if (vm.gmailContacts[i].selected) {
                        return true;
                    }
                }
            }
            return false;
        };

        vm.sendGoogleCustomerInvit = function () {

            var invits = [];

            for (var i = 0; i < vm.gmailContacts.length; ++i) {
                if (vm.gmailContacts[i].selected) {
                    invits.push(vm.gmailContacts[i].address);
                }
            }

            networkService.inviteCustomerPOST(invits, succesInviteCustomerPOST, errorInviteCustomerPOST);
        };

        vm.getFacebookIframeUrl = function () {
            if ($localStorage.user) {
                return "https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2F" + window.location.hostname + "%2F%23%2F%3FinvitationId%3D" + $localStorage.user.id + "&layout=button&size=large&mobile_iframe=true&appId=" + CONFIG.FACEBOOK_CLIENT_ID + "&width=89&height=28";
            }
            return "";
        };
    }
})
();

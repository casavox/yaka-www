(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ContactsController', ContactsController);

    //
    //Controller login
    function ContactsController($rootScope, $scope, networkService, $timeout, $localStorage, screenSize, $state, alertMsg, $translate, gmailContacts, CONFIG, $stateParams) {


        $rootScope.pageName = "Mon entourage";
        $rootScope.updateProfile();

        var vm = this;

        if ($localStorage.invitationId) {
            if ($localStorage.projectShortId) {
                networkService.acceptInvitationWithProjectPOST($localStorage.invitationId, $localStorage.projectShortId, succesAcceptInvitationPOST, errorAcceptInvitationPOST);
            } else {
                networkService.acceptInvitationPOST($localStorage.invitationId, succesAcceptInvitationPOST, errorAcceptInvitationPOST);
            }
            vm.bigAlert = true;
            $localStorage.invitationId = '';
            $localStorage.projectShortId = '';
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
                return "Mes Contacts - " + (vm.contacts ? vm.contacts.length : 0);
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

        vm.user = $localStorage.user;

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
            networkService.contactsGET(succesContactsGET, errorContactsGET, true);
            networkService.invitationsReceivedGET(succesInvitationsReceivedGET, errorInvitationsReceivedGET, true);
            networkService.invitationsSentGET(succesInvitationsSentGET, errorInvitationsSentGET, true);
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
            vm.myContacts = res;
            vm.mails = [];

        }

        function errorContactsGET(err) {
            if ($state.current.name == "contacts") {
                if (err.error != undefined && err.error != "ERROR") {
                    alertMsg.send($translate.instant(err.error), 'danger');
                } else {
                    alertMsg.send("Impossible de récupérer les contacts", 'danger');
                }
            }
        }

        vm.invitationsReceived = [];
        vm.invitationsSent = [];

        networkService.invitationsReceivedGET(succesInvitationsReceivedGET, errorInvitationsReceivedGET);

        function succesInvitationsReceivedGET(res) {

            vm.invitationsReceived = res;
            if (vm.invitationsReceived.length == 0) {
                networkService.setContactsRead(function () {
                    vm.user.newContacts = false;
                }, function () {
                }, true);
            }

            if (vm.invitationsReceived.length == 1) {
                alertMsg.send("Vous avez une invitation en attente", 'orange');

            }
            if (vm.invitationsReceived.length > 1) {
                alertMsg.send("Vous avez plusieurs invitations en attente", 'orange');
            }
        }


        function errorInvitationsReceivedGET(err) {
            if ($state.current.name == "contacts") {
                if (err.error != undefined && err.error != "ERROR") {
                    alertMsg.send($translate.instant(err.error), 'danger');
                } else {
                    alertMsg.send("Impossible de récupérer les invitations", 'danger');
                }
            }
        }

        networkService.invitationsSentGET(succesInvitationsSentGET, errorInvitationsSentGET);

        function succesInvitationsSentGET(res) {
            vm.invitationsSent = res;
        }

        function errorInvitationsSentGET(err) {
            if ($state.current.name == "contacts") {
                if (err.error != undefined && err.error != "ERROR") {
                    alertMsg.send($translate.instant(err.error), 'danger');
                } else {
                    alertMsg.send("Impossible de récupérer les invitations", 'danger');
                }
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

        if ($stateParams.invite) {
            vm.showInvitFriendPopup = true;
        }

        vm.openFriendPopup = function () {
            vm.showInvitFriendPopup = true;
        };

        vm.closeFriendPopup = function () {
            vm.showInvitFriendPopup = false;
            vm.formCustInvitError = false;
            vm.invitMessage = "";
        };

        vm.showInvitProPopup = false;

        vm.openProPopup = function () {
            vm.showInvitProPopup = true;
        };

        vm.closeProPopup = function () {
            vm.showInvitProPopup = false;
            vm.formProInvitError = false;
            vm.invitPro.name = "";
            vm.invitPro.email = "";
            vm.invitPro.address.postalCode = "";
            vm.invitPro.phone = "";
            vm.invitProMessage = "";
        };

        vm.invitCustomer = "";

        vm.sendCustomerInvit = function () {
            if (vm.mails.length < 1) {
                vm.formCustInvitError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            } else {
                var invitation = {
                    emails: vm.mails,
                    message: vm.invitMessage
                };

                networkService.inviteCustomerPOST(invitation, succesInviteCustomerPOST, errorInviteCustomerPOST, true);
            }
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
            vm.formCustInvitError = false;
            vm.invitCustomer = "";
            vm.mails = [];
            vm.closeGmailPopup();
            vm.showInvitFriendPopup = false;
            reloadContactsAndInvitations();
            alertMsg.send("Invitation(s) envoyée(s)", "success");
        }

        function errorInviteCustomerPOST(err) {
            if ($state.current.name == "contacts") {
                if (err.error != undefined && err.error != "ERROR") {
                    alertMsg.send($translate.instant(err.error), 'danger');
                } else {
                    alertMsg.send("Impossible d'envoyer l'invitation", 'danger');
                }
            }
        }

        vm.invitPro = {
            email: "",
            name: "",
            phone: "",
            postalCode: "",
            message: vm.invitProMessage
        };

        vm.sendProInvit = function () {
            if (!vm.invitPro.name || !vm.invitPro.postalCode || !vm.invitPro.email) {
                vm.formProInvitError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            } else {
                if (!vm.isEmailValid(vm.invitPro.email)) {
                    vm.formProInvitEmailError = true;
                    alertMsg.send("L'email que vous souhaitez ajouter n'est pas valide", "danger");
                } else {
                    networkService.inviteProPOST(vm.invitPro, succesInviteProPOST, errorInviteProPOST, true);
                }
            }

        };

        function succesInviteProPOST(res) {
            vm.formProInvitError = false;
            vm.closeProPopup();
            vm.invitPro = {
                email: "",
                name: "",
                phone: "",
                activities: [],
                postalCode: ""
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
            if (vm.invitPro.name == '' || !vm.isNameValid(vm.invitPro.name) ||
                vm.invitPro.email == '' || !vm.isEmailValid(vm.invitPro.email)
            ) {
                return false;
            }
            return true;
        };

        vm.refuseInvitation = function (inviterId) {
            networkService.refuseInvitationPOST(inviterId, succesRefuseInvitationPOST, errorRefuseInvitationPOST, true);
        };

        function succesRefuseInvitationPOST(res) {
            vm.invitationRefused = true;
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
            networkService.acceptInvitationPOST(inviterId, succesAcceptInvitationPOST, errorAcceptInvitationPOST, true);
        };

        function succesAcceptInvitationPOST(res) {
            vm.invitationAccepted = true;
            reloadContactsAndInvitations();
            if (vm.bigAlert) {
                alertMsg.send("Félicitations ! " + res.user.firstName + " " + res.user.lastName + " fait maintenant partie de votre réseau de bouche-à-oreille CasaVox", "success");
            } else {
                swal("Félicitations !", res.user.firstName + " " + res.user.lastName + " fait maintenant partie de votre réseau de bouche-à-oreille CasaVox", "success")
            }
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
            vm.showInvitFriendPopup = true;
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
            if (vm.mails.length > 0) {
                for (var i = 0; i < vm.gmailContacts.length; ++i) {
                    if (vm.gmailContacts[i].selected) {
                        if (!_.includes(vm.mails, vm.gmailContacts[i].address)) {
                            vm.mails.push(vm.gmailContacts[i].address);
                        }
                    }
                }

            } else {
                for (var i = 0; i < vm.gmailContacts.length; ++i) {
                    if (vm.gmailContacts[i].selected) {
                        vm.mails.push(vm.gmailContacts[i].address);
                    }
                }
            }
            vm.closeGmailPopup();
            vm.showInvitFriendPopup = true;
        };

        vm.deleteContact = function (id) {
            swal({
                title: "Supprimer un contact",
                text: "Attention, vous ne pourrez plus bénéficier de son réseau de bouche-à-oreille !",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Confirmer",
                cancelButtonText: "Annuler"
            }, function (isConfirm) {
                if (isConfirm) {
                    networkService.contactDeletePOST(id,
                        function (res) {
                            alertMsg.send("Le contact a été supprimé", "info");
                            reloadContactsAndInvitations();
                        }, function () {
                            alertMsg.send("Impossible de supprimer le contact", "danger");
                        }, true
                    );

                }
            });
        };
        networkService.communitiesGET(successCommunitiesGET, errorCommunitiesGET);

        function successCommunitiesGET(res) {
            vm.communities = res;
        }

        vm.getCommunityByType = function (type) {
            if (vm.communities) {
                for (var i = 0; i < vm.communities.length; i++) {
                    if (type == vm.communities[i].type) {
                        if (!vm.communities[i].name && !vm.communities[i].address) {
                            vm.communities[i].name = " ";
                            vm.communities[i].address = " ";
                        }
                        return vm.communities[i];
                    }
                }
            }
        };

        function errorCommunitiesGET(res) {
            if ($state.current.name == "contacts") {
                alertMsg.send("Impossible de récupérer les communautés", "danger");
            }
        }

        vm.selectContactTab = "all";
        vm.selectTab = "received";

        vm.isXsmall = function () {
            return screenSize.is('xs');
        };

        vm.optionSelected = function () {
            if (vm.user.professional) {
                return 'COLLEAGUE';
            } else {
                return 'CLIENT';
            }
        };


        vm.onKeyPress = function (e) {
            vm.duplicateMail = false;
            if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 44 || e.keyCode == 59) {
                event.preventDefault();
                vm.addContactToMail('addOneContact');
            }
        };

        vm.addContactToMail = function (aim) {
            if (vm.mails.length > 0) {
                if (vm.invitCustomer) {
                    for (var i = 0; i < vm.mails.length; i++) {
                        if (vm.invitCustomer == vm.mails[i]) {
                            vm.duplicateMail = true;
                            alertMsg.send("L'email que vous souhaitez ajouter est déjà dans la liste", "danger");
                        }
                    }
                    if (!vm.duplicateMail) {
                        if (!vm.isEmailValid(vm.invitCustomer)) {
                            alertMsg.send("L'email que vous souhaitez ajouter n'est pas valide", "danger");
                        } else {
                            vm.mails.push(vm.invitCustomer);
                            vm.invitCustomer = "";
                        }
                    }
                }
                if (aim == 'send') {
                    if (vm.isEmailValid(vm.invitCustomer)) {
                        vm.sendCustomerInvit();
                    } else {
                        alertMsg.send("L'email du destinataire n'est pas valide", "danger");
                    }
                }
            } else {
                for (var i = 0; i < vm.mails.length; i++) {
                    if (vm.invitCustomer == vm.mails[i]) {
                        vm.duplicateMail = true;
                        alertMsg.send("L'email que vous souhaitez ajouter est déjà dans la liste", "danger");
                    }
                }
                if (!vm.duplicateMail) {
                    if (!vm.isEmailValid(vm.invitCustomer)) {
                        alertMsg.send("L'email que vous souhaitez ajouter n'est pas valide", "danger");
                    } else {
                        vm.mails.push(vm.invitCustomer);
                        vm.invitCustomer = "";
                        if (aim == "addOneContact") {
                            $timeout(function () {
                                $(".secondInputEmail").focus();
                            });
                        }
                        if (aim == "send") {
                            vm.sendCustomerInvit();
                        }
                    }
                }
            }

        };

        vm.deleteMailFromList = function (index) {
            vm.mails.splice(index, 1);
        };

        vm.openSMSorMailPopup = function (invited) {
            swal({
                title: "Comment souhaitez-vous envoyer l'invitation ?",
                text: "Depuis mon téléphone par SMS ou via CasaVox par Email",
                type: "info",
                allowOutsideClick: true,
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Inviter par SMS",
                cancelButtonText: "Inviter par Email"
            }, function (isConfirm) {
                if (isConfirm) {
                    var ua = navigator.userAgent.toLowerCase();
                    var url;
                    if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) {
                        url = "sms:&body=" + getSmsBody(invited);
                    } else {
                        url = "sms:?body=" + getSmsBody(invited);
                    }

                    location.href = url;
                } else {
                    if (invited == "customer") {
                        vm.showInvitFriendPopup = true;
                    } else {
                        vm.showInvitProPopup = true;
                    }
                    $scope.$applyAsync();
                }
            });
        };

        function getSmsBody(invited) {
            if ($localStorage.user) {
                if ($localStorage.user.professional) {
                    if (invited == "customer") {
                        // un Pro invite un Particulier
                        return "Je suis sur CasaVox ! " +
                            "Rejoignez-moi sur le 1er réseau de bouche-à-oreille et d'entraide pour tous les travaux : "
                            + getInviteUrl(invited) + "%0ABonne journée, " + $localStorage.user.firstName;
                    } else {
                        // un Pro invite un Pro
                        return "Je suis sur CasaVox ! 1er réseau de bouche-à-oreille pour les travaux, " +
                            "ça me permet de rester en contact avec mes clients, " +
                            "de me faire recommander personnellement à de nouveaux prospects, ... " +
                            "Tu peux rejoindre mon réseau de Pro du bâtiment ici : " + getInviteUrl(invited) + "%0ABonne journée, "
                            + $localStorage.user.firstName + " ;)";
                    }
                } else {
                    // un particulier invite un particulier
                    if (invited == "customer") {
                        return "Je suis sur CasaVox ! 1er réseau de bouche-à-oreille pour tous nos travaux, " +
                            "rejoins-moi et partageons nos meilleurs pros : " + getInviteUrl(invited) + "%0ABonne journée, "
                            + $localStorage.user.firstName + " ;)";
                    } else {
                        // un particulier invite un Pro
                        return "Je suis sur CasaVox ! " +
                            "Rejoignez-moi sur le 1er réseau de bouche-à-oreille et d'entraide pour tous les travaux : "
                            + getInviteUrl(invited) + "%0ABonne journée, " + $localStorage.user.firstName;
                    }
                }

            }
        }

        function getInviteUrl(invited) {
            if ($localStorage.user) {
                if (invited == "customer") {
                    return window.location.hostname + "/i/" + $localStorage.user.inviteId;
                } else {
                    return window.location.hostname + "/r/" + $localStorage.user.inviteId;
                }
            }
            return "";
        }

    }
})
();

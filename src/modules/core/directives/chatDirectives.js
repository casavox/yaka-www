angular.module('Yaka')

    .directive('yakaChat', function ($rootScope, networkService, alertMsg, $stomp, $localStorage, Upload, cloudinary, CONFIG) {
        return {
            restrict: 'E',
            scope: {
                chatId: '@',
                scrollBottom: '@',
                userMe: '=',
                userOther: '=',
                userPro: '=',
                proposalProfessional: "=",
                proposalStatus: '@'
            },
            link: function (scope, element, attr) {

                scope.$on('$destroy', function () {
                    $stomp.disconnect();
                });

                scope.loadingMessages = false;

                scope.newMessage = {
                    text: ""
                };

                scope.disableSending = false;

                scope.getProUser = function () {
                    if (scope.userMe == 'admin') {
                        return scope.userPro;
                    } else if ($localStorage.user && $localStorage.user.professional) {
                        return scope.userMe;
                    } else {
                        return scope.userOther;
                    }
                };

                scope.getProposalProfessionalCompany = function () {
                    return scope.proposalProfessional.company.name;
                };

                scope.getCustomerUser = function () {
                    if (scope.userMe == 'admin') {
                        return scope.userOther;
                    }
                    if ($localStorage.user && !$localStorage.user.professional) {
                        return scope.userMe;
                    } else {
                        return scope.userOther;
                    }
                };

                scope.sendMessage = function () {
                    if (scope.disableSending || (!scope.newMessage.text && !scope.newMessage.cloudinaryPublicId)) {
                        return;
                    }
                    var sendMessageApi;
                    if (scope.userMe == "admin") {
                        sendMessageApi = networkService.sendMessageAdmin;
                    } else if ($localStorage.user && !$localStorage.user.professional) {
                        sendMessageApi = networkService.sendMessage;
                    } else {
                        sendMessageApi = networkService.sendMessagePro;
                    }
                    sendMessageApi(scope.chatId, scope.newMessage, function (res) {
                        scope.newMessage = {
                            text: ""
                        };
                        if (scope.userMe == 'admin') {
                            setChatRead();
                        }
                    }, function (res) {
                        alertMsg.send("Impossible d'envoyer le message", "danger");
                    }, true)
                };

                scope.showRight = function (message) {
                    if (message.author && message.author == 'CUSTOMER') {
                        if (scope.userMe != "admin" && (!$localStorage.user || !$localStorage.user.professional)) {
                            return true;
                        }
                    } else if (message.author && message.author == 'PRO') {
                        if ($localStorage.user && $localStorage.user.professional) {
                            return true;
                        }
                    } else if (message.author && message.author == 'CASAVOX') {
                        if (scope.userMe == "admin") {
                            return true;
                        }
                    }
                    return false;
                };

                scope.createImageArray = function (cloudinaryPublicId) {
                    return [cloudinaryPublicId];
                };

                var noMoreMessages = false;

                function loadMoreMessages() {
                    if (noMoreMessages) {
                        return;
                    }

                    var apiGetMessages;
                    if (scope.userMe == 'admin') {
                        apiGetMessages = networkService.adminMessagesGET;
                    } else if ($localStorage.user && !$localStorage.user.professional) {
                        apiGetMessages = networkService.messagesGET;
                    } else {
                        apiGetMessages = networkService.messagesProGET;
                    }
                    scope.loadingMessages = true;
                    apiGetMessages(scope.chatId, parseInt((scope.messages.length / 20) + 1), 20, function (res) {
                        scope.loadingMessages = false;
                        if (res.totalPageNumber == res.page) {
                            noMoreMessages = true;
                        }
                        for (var i = 0; i < res.items.length; i++) {
                            scope.messages.push(res.items[i]);
                        }
                    }, function () {
                        alertMsg.send("Imposible de récupérer les messages", "danger");
                        scope.loadingMessages = false;
                    }, true);
                }

                function chatIdChanged() {
                    if (!scope.chatId) {
                        return;
                    }

                    var apiGetMessages;
                    if (scope.userMe == 'admin') {
                        apiGetMessages = networkService.adminMessagesGET;
                    } else if ($localStorage.user && !$localStorage.user.professional) {
                        apiGetMessages = networkService.messagesGET;
                    } else {
                        apiGetMessages = networkService.messagesProGET;
                    }

                    scope.loadingMessages = true;
                    apiGetMessages(scope.chatId, 1, 20, function (res) {
                        scope.loadingMessages = false;
                        scope.messages = res.items;
                        scrollDown();
                        if (scope.scrollBottom == 1) {
                            setChatRead();
                        }
                    }, function () {
                        alertMsg.send("Imposible de récupérer les messages", "danger");
                        scope.loadingMessages = false;
                    }, true);
                    setupStomp();
                    setupScrollTopDetection();
                }

                function scrollDown() {
                    setTimeout(
                        function () {
                            element.find('.lv-body').scrollTop(1E10);
                        }, 100);
                }

                function setupStomp() {

                    var subscription = null;

                    $stomp.connect(CONFIG.API_BASE_URL + '/connect',
                        {token: $localStorage.token})
                        .then(
                            function () {
                                if (subscription != null) {
                                    subscription.unsubscribe();
                                }
                                subscription = $stomp.subscribe('/chat/' + scope.chatId, function (payload, headers, res) {

                                    scope.messages.push(payload);

                                    scope.$apply(function () {
                                        scrollDown();
                                        if (scope.userMe != 'admin') {
                                            setChatRead();
                                        }
                                    });
                                }, {
                                    'token': $localStorage.token
                                });
                            }, function () {
                                alertMsg.send("Connexion au chat impossible, nouvelle tentative en cours...", "danger")
                            }
                        );
                }

                function setupScrollTopDetection() {
                    element.find('.lv-body').scroll(function () {
                        if ($(this).scrollTop() == 0) {
                            loadMoreMessages();
                        }
                    });
                }

                scope.uploadFiles = function (files, invalides) {
                    if (invalides.length > 0) {
                        if (invalides[0].$error == "maxSize")
                            alertMsg.send("Taille maximum : 20Mo", "danger");
                    }
                    if (!files) {
                        return
                    }
                    angular.forEach(files, function (file) {
                        if (file && !file.$error) {
                            file.upload = Upload.upload({
                                url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                                data: {
                                    upload_preset: cloudinary.config().upload_preset,
                                    tags: 'chat',
                                    context: 'photo=' + "Chat : " + scope.chatId,
                                    file: file
                                }
                            }).progress(function (e) {
                                file.progress = Math.round((e.loaded * 100.0) / e.total);
                                file.status = "Uploading... " + file.progress + "%";
                            }).success(function (data, status, headers, config) {
                                data.context = {custom: {photo: "Chat : " + scope.chatId}};
                                file.result = data;
                                scope.newMessage.cloudinaryPublicId = data.public_id;
                                scope.newMessage.filename = data.original_filename;
                                scope.newMessage.resourceType = data.resource_type;
                                scope.newMessage.format = data.format;

                                if (!data.format &&
                                    data.public_id.lastIndexOf(".") != -1) {
                                    scope.extension = data.public_id.substring(data.public_id.lastIndexOf(".") + 1);
                                } else {
                                    scope.extension = null;
                                }

                            }).error(function (data, status, headers, config) {
                                file.result = data;
                                alertMsg.send("Impossible d'envoyer ce fichier", "danger");
                            });
                        }
                    });
                };

                scope.cancelSending = function () {
                    scope.newMessage.cloudinaryPublicId = '';
                };

                attr.$observe('chatId', chatIdChanged);
                attr.$observe('proposalStatus', function () {
                    if (scope.userMe != 'admin' &&
                        scope.userOther != 'admin' &&
                        (scope.proposalStatus == "PRO_DECLINED" ||
                        scope.proposalStatus == "CUSTOMER_DECLINED" ||
                        scope.proposalStatus == "RECO_PRO_DECLINED" ||
                        scope.proposalStatus == "RECO_CUSTOMER_DECLINED" ||
                        scope.proposalStatus == "RATE_PRO" ||
                        scope.proposalStatus == "COMPLETED" ||
                        (
                            scope.userMe.professional &&
                            scope.proposalStatus == 'RECOMMENDATION'
                        ))) {
                        scope.disableSending = true;
                    }
                });
                attr.$observe('scrollBottom', function () {
                    if (scope.scrollBottom == 1 && scope.chatId) {
                        scrollDown();
                        if (scope.userMe != 'admin') {
                            setChatRead();
                        }
                    }
                });

                function setChatRead() {
                    var apiSetChatRead;
                    if (scope.userMe == 'admin') {
                        apiSetChatRead = networkService.adminSetChatRead;
                    } else if ($localStorage.user && !$localStorage.user.professional) {
                        apiSetChatRead = networkService.setChatRead;
                    } else {
                        apiSetChatRead = networkService.proSetChatRead;
                    }
                    apiSetChatRead(scope.chatId, function () {
                        $rootScope.updateProfile(true);
                    }, function () {
                    }, true);
                }

                scope.setRead = function () {
                    swal({
                        title: "Êtes-vous sûr ?",
                        text: "La conversation sera considérée comme lue",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#03a9f4",
                        confirmButtonText: "Confirmer",
                        cancelButtonText: "Annuler"
                    }, function (isConfirm) {
                        if (isConfirm) {
                            networkService.adminSetChatRead(scope.chatId, successSetChatRead, errorSetChatRead, true);
                        }
                    });
                };

                scope.setUnread = function () {
                    swal({
                        title: "Êtes-vous sûr ?",
                        text: "La conversation sera considérée comme NON lue",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#03a9f4",
                        confirmButtonText: "Confirmer",
                        cancelButtonText: "Annuler"
                    }, function (isConfirm) {
                        if (isConfirm) {
                            networkService.adminSetChatUnread(scope.chatId, successSetChatUnread, errorSetChatUnread, true);
                        }
                    });
                };

                function successSetChatRead() {
                    alertMsg.send("La discussion est considérée comme lue", "success");
                }

                function errorSetChatRead() {
                    alertMsg.send("Impossible de marquer la discussion comme lue", "danger");
                }

                function successSetChatUnread() {
                    alertMsg.send("La discussion est considérée comme NON lue", "success");
                }

                function errorSetChatUnread() {
                    alertMsg.send("Impossible de marquer la discussion comme NON lue", "danger");
                }

                scope.getPlaceholder = function () {
                    if (scope.disableSending && scope.userMe.professional && scope.proposalStatus == 'RECOMMENDATION') {
                        return 'Allez dans l\'onglet "Détails" pour prendre un 1er contact avec le client (si vous n\'êtes pas intéressé, cliquez sur le bouton "Refuser")';
                    } else if (scope.disableSending) {
                        return 'Cette discussion est close';
                    }
                    if (scope.userOther) {
                        if (scope.userOther == "admin") {
                            return 'Discutez en privé avec votre assistant CasaVox';
                        } else if (scope.userMe == "admin") {
                            return 'Discutez en privé avec ' + scope.userOther.firstName + ' ' + scope.userOther.lastName;
                        } else if (scope.userOther.firstName && scope.userOther.lastName) {
                            return 'Discutez en privé avec ' + scope.userOther.firstName + ' ' + scope.userOther.lastName;
                        }
                    }
                };

            },
            templateUrl: "/modules/core/directives/views/yakaChat.html"
        }
    })

    .directive("yakaKeepScroll", function () {

        return {
            controller: function ($scope) {
                var element = null;

                this.setElement = function (el) {
                    element = el;
                };

                this.addItem = function (item) {
                    element.scrollTop = (element.scrollTop + item.clientHeight + 1);
                };
            },

            link: function (scope, el, attr, ctrl) {
                ctrl.setElement(el[0]);
            }
        };
    })

    .directive("yakaScrollItem", function () {

        return {
            require: "^yakaKeepScroll",
            link: function (scope, el, att, scrCtrl) {
                scrCtrl.addItem(el[0]);
            }
        }
    });

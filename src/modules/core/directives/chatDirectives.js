angular.module('Yaka')

    .directive('yakaChat', function ($rootScope, networkService, alertMsg, $stomp, $localStorage, Upload, cloudinary, CONFIG) {
        return {
            restrict: 'E',
            scope: {
                chatId: '@',
                scrollBottom: '@',
                userMe: '=',
                userOther: '=',
                proposalStatus: '@'
            },
            link: function (scope, element, attr) {

                scope.loadingMessages = false;

                scope.newMessage = {
                    text: ""
                };

                scope.disableSending = false;

                scope.sendMessage = function () {
                    if (scope.disableSending || (!scope.newMessage.text && !scope.newMessage.cloudinaryPublicId)) {
                        return;
                    }
                    var sendMessageApi;
                    if (!$localStorage.user.professional) {
                        sendMessageApi = networkService.sendMessage;
                    } else {
                        sendMessageApi = networkService.sendMessagePro;
                    }
                    sendMessageApi(scope.chatId, scope.newMessage, function (res) {
                        scope.newMessage = {
                            text: ""
                        };
                    }, function (res) {
                        alertMsg.send("Impossible d'envoyer le message", "danger");
                    })
                };

                scope.showRight = function (message) {
                    if (message.author && message.author == 'CUSTOMER') {
                        if ($localStorage.user.professional) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if (message.author && message.author == 'PRO') {
                        if ($localStorage.user.professional) {
                            return true;
                        } else {
                            return false;
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
                    if (!$localStorage.user.professional) {
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
                    });
                }

                function chatIdChanged() {
                    if (!scope.chatId) {
                        return;
                    }

                    var apiGetMessages;
                    if (!$localStorage.user.professional) {
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
                    });
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
                    $stomp
                        .connect(CONFIG.API_BASE_URL + '/connect', {token: $localStorage.token})

                        .then(function () {
                            $stomp.subscribe('/chat/' + scope.chatId, function (payload, headers, res) {
                                scope.messages.push(payload);

                                scope.$apply(function () {
                                    scrollDown();
                                    setChatRead();
                                });
                            }, {
                                'token': $localStorage.token
                            });
                        }, function () {
                            alertMsg.send("Erreur de connection au chat.", "danger")
                        });
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
                            alertMsg.send("Taille maximum : 5Mo", "danger");
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
                            }).error(function (data, status, headers, config) {
                                file.result = data;
                            });
                        }
                    });
                };

                attr.$observe('chatId', chatIdChanged);
                attr.$observe('proposalStatus', function () {
                    if (scope.proposalStatus == "DECLINED" ||
                        scope.proposalStatus == "RATE_PRO" ||
                        scope.proposalStatus == "COMPLETED") {
                        scope.disableSending = true;
                    }
                });
                attr.$observe('scrollBottom', function () {
                    if (scope.scrollBottom == 1 && scope.chatId) {
                        scrollDown();
                        setChatRead();
                    }
                });

                function setChatRead() {
                    var apiSetChatRead;
                    if (!$localStorage.user.professional) {
                        apiSetChatRead = networkService.setChatRead;
                    } else {
                        apiSetChatRead = networkService.proSetChatRead;
                    }
                    apiSetChatRead(scope.chatId, function () {
                        $rootScope.updateProfile();
                    }, function () {
                    });
                }
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
(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('InboxController', InboxController);

    function InboxController($rootScope, $scope, networkService, alertMsg, Upload, cloudinary, $stomp, $stateParams, $localStorage, $state, Lightbox, CONFIG) {

        $rootScope.pageName = "Chat";
        $rootScope.showMenu = true;

        var vm = this;
        if (angular.isUndefined($stateParams) && !$stateParams.proposalId || $stateParams.proposalId == '') {
            $state.go("my-projects");
            alertMsg.send("Erreur de connection au chat. Redirection...", "danger");
        } else {
            if ($rootScope.state.name == "inbox") {
                vm.me = "CUSTOMER";
                networkService.proposalGET($stateParams.proposalId, function (res) {
                    vm.proposal = res;
                    vm.pro = vm.proposal.professional;
                    vm.project = vm.proposal.project;
                    networkService.messagesGET($stateParams.proposalId, 1, limit, function (res) {
                        vm.messages = res;
                        vm.glue = true;
                    }, function () {
                        alertMsg.send("Error to get the messages historic", "warning");
                    });
                }, function () {
                    alertMsg.send("Error to get the proposal's conversation", "warning");
                });
            }
            else {
                var connectHeaders = {token: $localStorage.token};
                vm.me = "PRO";
                networkService.proposalProGET($stateParams.proposalId, function (res) {
                    vm.proposal = res;
                    vm.pro = vm.proposal.professional;
                    vm.project = vm.proposal.project;
                    networkService.messagesProGET($stateParams.proposalId, 1, limit, function (res) {
                        vm.messages = res;
                        vm.glue = true;
                    }, function () {
                        alertMsg.send("Error to get the messages historic", "warning");
                    });
                }, function () {
                    alertMsg.send("Error to get the proposal's conversation", "warning");
                });
            }
            $stomp
                .connect(CONFIG.API_BASE_URL + '/connect', connectHeaders)

                // frame = CONNECTED headers
                .then(function (frame) {
                    var subscription = $stomp.subscribe('/chat/' + $stateParams.proposalId, function (payload, headers, res) {
                        vm.messages.items.push(payload);
                        vm.glue = true;
                    }, {
                        'token': $localStorage.token
                    });
                }, function () {
                    alertMsg.send("Erreur de connection au chat.", "warning")
                });
        }

        vm.glue = true;
        vm.msg = {};
        vm.send = false;
        vm.deleteImg = deleteImg;
        vm.uploadFiles = uploadFiles;
        vm.sendMessage = sendMessage;
        vm.loadMore = loadMore;
        vm.hire = hire;
        var limit = 20;

        function deleteImg() {
            delete vm.msg.cloudinaryPublicId;
        }

        function hire() {
            var formData = {
                id: vm.proposal.id,
                text: vm.hireMessage
            };
            networkService.proposalAcceptPOST(formData, succesProposalAcceptPOST, errorProposalAcceptPOST);
        }

        function succesProposalAcceptPOST(res) {
            vm.hireFlag = false;
            if (angular.isDefined($stateParams.proposalId) && $stateParams.proposalId)
                networkService.proposalGET($stateParams.proposalId, succesProposalGET, errorProposalGET);
            alertMsg.send("Proposal selected", "success");
        }

        function errorProposalAcceptPOST() {
            alertMsg.send("Error Proposal not selected", "danger");
        }

        function loadMore() {
            var page = Math.ceil(vm.messages.items.length / limit);
            networkService.messagesGET($stateParams.proposalId, page, limit, function (res) {
                vm.messages = vm.messages.concat(res);
            }, function () {
                alertMsg.send("Error to get the messages", "warning");
            });
        }

        vm.selectImagePreview = function (media) {
            $rootScope.simplePreview = true;
            var data = [{url: media.cloudinaryPublicId}];
            $rootScope.media = media;
            Lightbox.openModal(data, 0);
        };

        function uploadFiles(files, invalides) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Error : max size 5MB.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    file.upload = Upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                            upload_preset: cloudinary.config().upload_preset,
                            tags: 'myphotoalbum',
                            context: 'photo=' + $scope.title,
                            file: file
                        }
                    }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                    }).success(function (data, status, headers, config) {
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        vm.msg = vm.msg || {};
                        vm.msg.cloudinaryPublicId = data.public_id;
                    }).error(function (data, status, headers, config) {
                        file.result = data;
                    });
                }
            });
        }


        function sendMessage() {
            if (vm.msg.text && vm.msg.text.length > 0 || vm.msg.cloudinaryPublicId) {
                if (vm.send == false) {
                    vm.send = true;
                    if (vm.me == "CUSTOMER") {
                        networkService.sendMessage($stateParams.proposalId, vm.msg, function (res) {
                            vm.glue = true;
                            vm.send = false;
                            vm.msg = {};
                        }, function (res) {
                            vm.send = false;
                            alertMsg.send("Error to send message", "warning");
                        })
                    }
                    else {
                        networkService.sendMessagePro($stateParams.proposalId, vm.msg, function (res) {
                            vm.glue = true;
                            vm.send = false;
                            vm.msg = {};
                        }, function () {
                            vm.send = false;
                            alertMsg.send("Error to send message", "warning");
                        })
                    }
                }
            }
        }


    }
})();

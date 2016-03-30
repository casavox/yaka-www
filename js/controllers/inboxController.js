(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('InboxController', InboxController);

    InboxController.$inject = ['$rootScope', '$scope', 'networkService', 'alertMsg', 'Upload', 'cloudinary', '$stomp', '$stateParams', "$localStorage"];
    function InboxController($rootScope, $scope, networkService, alertMsg, $upload, cloudinary, $stomp, $stateParams, $localStorage) {
        if (angular.isUndefined($stateParams) && !$stateParams.proposalId)
            $state.go($rootScope.from);
        var vm = this;
        vm.glue = true;
        vm.msg = {};
        vm.send = false;
        vm.deleteImg = deleteImg;
        vm.uploadFiles = uploadFiles;
        vm.sendMessage = sendMessage;
        vm.loadMore = loadMore;
        var limit = 20;
        var connectHeaders = {token:$localStorage.token};
        console.log($rootScope.state);
        if ($rootScope.state.name == "inbox"){
            vm.me = "CUSTOMER";
            networkService.proposalGET($stateParams.proposalId, function(res){
                console.log(res);
                vm.proposal = res;
                vm.pro = vm.proposal.professional;
                vm.project = vm.proposal.project;
                networkService.messagesGET($stateParams.proposalId, 1, limit, function(res){
                    vm.messages = res;
                    console.log(res);
                }, function(){
                    alertMsg.send("Error to get the messages historic", "warning");
                });
            }, function(){
                alertMsg.send("Error to get the proposal's conversation", "warning");
            });
        }
        else{
            vm.me = "PRO";
            networkService.proposalProGET($stateParams.proposalId, function(res){
                console.log(res);
                vm.proposal = res;
                vm.pro = vm.proposal.professional;
                vm.project = vm.proposal.project;
                networkService.messagesProGET($stateParams.proposalId, 1, limit, function(res){
                    vm.messages = res;
                    console.log(res);
                }, function(){
                    alertMsg.send("Error to get the messages historic", "warning");
                });
            }, function(){
                alertMsg.send("Error to get the proposal's conversation", "warning");
            });
        }
        $stomp
            .connect('https://yaka-api.herokuapp.com/connect', connectHeaders)

            // frame = CONNECTED headers
            .then(function (frame) {
                var subscription = $stomp.subscribe('/chat/'+$stateParams.proposalId, function (payload, headers, res) {
                    vm.messages.items.push(payload);
                }, {
                    'token': $localStorage.token
                });
            });



        function deleteImg() {
            delete vm.msg.cloudinaryPublicId;
        }

        function loadMore() {
            var page = Math.ceil(vm.messages.items.length / limit);
            networkService.messagesGET($stateParams.proposalId, 1, limit, function(res){
                vm.messages = res;
                console.log(res);
            }, function(res){
                alertMsg.send("Error to get the messages", "warning");
            });
        }

        function uploadFiles(files, invalides){
            if (invalides.length > 0){
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Error : max size 5MB.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function(file){
                if (file && !file.$error) {
                    file.upload = $upload.upload({
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
                        console.log(vm.msg);
                    }).error(function (data, status, headers, config) {
                        file.result = data;
                    });
                }
            });
        }



        function sendMessage(){
            if (vm.msg.text && vm.msg.text.length > 0 || vm.msg.cloudinaryPublicId){
                if (vm.send == false){
                    vm.send = true;
                    console.log(vm.msg);
                    if (vm.me == "CUSTOMER"){
                        networkService.sendMessage($stateParams.proposalId, vm.msg, function(res){
                            vm.glue = true;
                            vm.send = false;
                            vm.msg = {};
                        }, function(res){
                            vm.send = false;
                            alertMsg.send("Error to send message", "warning");
                        })
                    }
                    else {
                        networkService.sendMessagePro($stateParams.proposalId, vm.msg, function(res){
                            vm.glue = true;
                            vm.send = false;
                            vm.msg = {};
                        }, function(){
                            vm.send = false;
                            alertMsg.send("Error to send message", "warning");
                        })
                    }
                }
            }
        }


    }
})();

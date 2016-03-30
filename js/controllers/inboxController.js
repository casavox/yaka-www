(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('InboxController', InboxController);

    InboxController.$inject = ['$scope', 'networkService', 'alertMsg', 'Upload', 'cloudinary', '$stomp', '$stateParams', "$localStorage"];
    function InboxController($scope, networkService, alertMsg, $upload, cloudinary, $stomp, $stateParams, $localStorage) {
        if (angular.isUndefined($stateParams) && !$stateParams.proposalId)
            $state.go($rootScope.from);
        var vm = this;
        vm.glue = true;
        vm.msg = {};
        vm.send = false;
        vm.uploadFiles = uploadFiles;
        vm.sendMessage = sendMessage;
        var connectHeaders = {token:$localStorage.token};
        $stomp
            .connect('https://yaka-api.herokuapp.com/connect', connectHeaders)

            // frame = CONNECTED headers
            .then(function (frame) {
                var subscription = $stomp.subscribe('/chat', function (payload, headers, res) {
                    console.log(payload);
                }, {
                    'token': $localStorage.token
                });
            });



        networkService.messagesGET($stateParams.proposalId, 1, 40, function(res){
            vm.messages = res;
            console.log(res);
        }, function(res){
            alertMsg.send("Error to get the messages", "warning");
        });

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
            if (vm.send == false){
                vm.send = true;
                console.log(vm.msg);
                networkService.sendMessage($stateParams.proposalId, vm.msg, function(res){
                    vm.glue = true;
                    vm.send = false;
                    vm.msg = {};
                }, function(res){
                    vm.send = false;
                    alertMsg.send("Error to send message", "warning");
                })
            }
        }


    }
})();

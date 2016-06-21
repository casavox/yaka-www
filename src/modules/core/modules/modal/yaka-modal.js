angular.module('Yaka')
    .factory('modalService', ['$uibModal', function ($uibModal) {
        return {
            cancelProposal: function (templateLink, windowAnimation, currentVm) {
                return $uibModal.open({
                    templateUrl: templateLink,
                    backdrop: true,
                    windowClass: windowAnimation,
                    size: '',
                    keyboard: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function (chatMessage) {
                            //Process OK Button Click
                            currentVm.cancelProposal(chatMessage);
                            $uibModalInstance.close("ok");
                        },
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        }
                    },
                    resolve: {
                        resCancelProposal: function () {
                            return "";
                        }
                    }
                });
            }
        };
    }]);

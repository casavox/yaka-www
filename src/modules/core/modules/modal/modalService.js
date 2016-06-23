angular.module('Yaka')
    .factory('modalService', ['$uibModal', function ($uibModal) {
        return {
            cancelProposal: function (templateLink, windowAnimation, onProposalCanceled) {
                return $uibModal.open({
                    templateUrl: "/modules/core/modules/modal/views/cancelProposal.html",
                    backdrop: true,
                    windowClass: windowAnimation,
                    size: '',
                    keyboard: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function (chatMessage) {
                            //Process OK Button Click
                            //currentVm.cancelProposal(chatMessage);
                            onProposalCanceled(chatMessage);
                            $uibModalInstance.close("ok");
                        };
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

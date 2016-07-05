angular.module('Yaka')
    .factory('modalService', ['$uibModal', function ($uibModal) {
        return {
            proCancelProposal: function (onOkClicked) {
                return $uibModal.open({
                    templateUrl: "/modules/core/modules/modal/views/proCancelProposal.html",
                    backdrop: true,
                    windowClass: "animated zoomIn",
                    size: '',
                    keyboard: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function (chatMessage) {
                            onOkClicked(chatMessage);
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
            },
            cancelProject: function (professionalName, onOkClicked) {
                return $uibModal.open({
                    templateUrl: "/modules/core/modules/modal/views/cancelProject.html",
                    backdrop: true,
                    windowClass: "animated zoomIn",
                    size: '',
                    keyboard: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.professionalName = professionalName;
                        $scope.ok = function (chatMessage) {
                            onOkClicked(chatMessage);
                            $uibModalInstance.close("ok");
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        }
                    },
                    resolve: {
                        resCancelProject: function () {
                            return "";
                        }
                    }
                });
            }
        };
    }]);

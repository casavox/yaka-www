(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('LightBoxController', LightBoxController);

    //
    //Controller login
    LightBoxController.$inject = ['$scope', '$rootScope'];
    function LightBoxController($scope, $rootScope) {

        $scope.simplePreview = false;
        $scope.url = $rootScope.media.cloudinaryPublicId;
        $scope.simplePreview = $rootScope.simplePreview;
    }
})();

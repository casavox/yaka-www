(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('DashboardMapController', DashboardMapController);

    DashboardMapController.$inject = ['$scope', 'networkService', 'socialNetworkService', 'uiGmapGoogleMapApi', '$rootScope']
    function DashboardMapController($scope, networkService, socialNetworkService, uiGmapGoogleMapApi, $rootScope) {

        var vm = this;
        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 45, longitude: -73
                },
                zoom: 8
            };
            $scope.mapOptions = {
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            }
        });
    }
})();

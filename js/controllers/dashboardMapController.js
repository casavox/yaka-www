(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('DashboardMapController', DashboardMapController);

    DashboardMapController.$inject = ['$scope', 'networkService', 'socialNetworkService', 'uiGmapGoogleMapApi', '$rootScope']
    function DashboardMapController($scope, networkService, socialNetworkService, uiGmapGoogleMapApi, $rootScope) {

        var vm = this;

        vm.geocoder = new google.maps.Geocoder();

        $scope.emergencies = [];
        $scope.emergenciesInfinite = [];
        $scope.carrouselSelectedItem = {index: -1};

        networkService.professionalGET(succesProfessionalGET, errorProfessionalGET);

        function succesProfessionalGET(res) {
            var emergencies = res.availableEmergencies;

            $scope.emergencies = geocodeEmergencies(emergencies);

        }

        function errorProfessionalGET() {

        }

        function geocodeEmergencies(emergencies) {
            var i = 0;
            angular.forEach(emergencies, function (emergency, key) {
                var address = emergency.address;

                vm.geocoder.geocode({'address': address.address}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        emergency.coords = {
                            latitude: results[0].geometry.location.lat(),
                            longitude: results[0].geometry.location.lng()
                        }
                        emergency.icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
                        $scope.map.center = {
                            latitude: emergency.coords.latitude,
                            longitude: emergency.coords.longitude
                        };
                    }
                });
                i++;
            });
            return emergencies;
        }

        $scope.$watch(function () {
            return $scope.carrouselSelectedItem.index;
        }, function (newValue, oldValue) {
            if (!angular.equals(oldValue, newValue)) {
                onEmergencySelected($scope.emergencies[newValue]);
            }
        }, true);

        function onEmergencySelected(emergency) {
            $scope.map.center = {
                latitude: emergency.coords.latitude,
                longitude: emergency.coords.longitude
            };
            setDefaultIconForAllMarkers();
            emergency.icon = "http://maps.google.com/mapfiles/kml/paddle/wht-blank.png";
        }

        function setDefaultIconForAllMarkers() {
            for (var i = 0; i < $scope.emergencies.length; i++) {
                $scope.emergencies[i].icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
            }
        }

        $scope.onMarkerClicked = function (mapMarker, event, emergency) {
            var carouselIndex = 0;
            for (var i = 0; i < $scope.emergencies.length; i++) {
                var emergencyTmp = $scope.emergencies[i];
                if (emergency.id == emergencyTmp.id) {
                    carouselIndex = i;
                    break;
                }
            }
            $scope.carrouselSelectedItem.index = carouselIndex;
        }

        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 0, longitude: 0
                },
                zoom: 12,
                bounds: {}
            };
            $scope.mapOptions = {
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                streetViewControl: false,
            }
        });
    }
})
();

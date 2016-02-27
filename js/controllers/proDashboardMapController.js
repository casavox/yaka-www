(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardMapController', ProDashboardMapController);

    ProDashboardMapController.$inject = ['$scope', 'networkService', 'uiGmapGoogleMapApi']
    function ProDashboardMapController($scope, networkService, uiGmapGoogleMapApi) {

        var vm = this;

        var geocoder = new google.maps.Geocoder();
        var currentCenter = {};

        vm.emergencies = [];
        vm.carrouselSelectedItem = {index: -1};
        vm.exploring = false;

        $scope.$on('onEmergenciesLoadedBroadcast', function (event, args) {
            onEmergenciesLoaded(args);
        });

        function onEmergenciesLoaded(emergencies) {
            vm.emergencies = geocodeEmergencies(emergencies);
        }

        function geocodeEmergencies(emergencies) {
            var i = 0;
            angular.forEach(emergencies, function (emergency, key) {
                var address = emergency.address;

                geocoder.geocode({'address': address.address}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        emergency.coords = {
                            latitude: results[0].geometry.location.lat(),
                            longitude: results[0].geometry.location.lng()
                        }
                        emergency.icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
                        vm.map.center = {
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
            return vm.carrouselSelectedItem.index;
        }, function (newValue, oldValue) {
            if (!angular.equals(oldValue, newValue)) {
                if (vm.emergencies[newValue] && vm.emergencies[newValue].coords) {
                    onEmergencySelected(vm.emergencies[newValue]);
                }
            }
        }, true);

        function onEmergencySelected(emergency) {
            vm.map.center = {
                latitude: emergency.coords.latitude,
                longitude: emergency.coords.longitude
            };
            vm.map.zoom = 15;
            vm.exploring = false;
            setDefaultIconForAllMarkers();
            emergency.icon = "http://maps.google.com/mapfiles/kml/paddle/wht-blank.png";
        }

        function setDefaultIconForAllMarkers() {
            for (var i = 0; i < vm.emergencies.length; i++) {
                vm.emergencies[i].icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
            }
        }

        vm.onMarkerClicked = function (mapMarker, event, emergency) {
            var carouselIndex = 0;
            for (var i = 0; i < vm.emergencies.length; i++) {
                var emergencyTmp = vm.emergencies[i];
                if (emergency.id == emergencyTmp.id) {
                    carouselIndex = i;
                    break;
                }
            }
            vm.carrouselSelectedItem.index = carouselIndex;
        }

        var resizeTimeoutId;
        uiGmapGoogleMapApi.then(function (maps) {
            vm.map = {
                center: {
                    latitude: 0, longitude: 0
                },
                zoom: 12,
                bounds: {},
                events: {
                    "idle": function () {
                        if (currentCenter.latitude != vm.map.center.latitude && currentCenter.longitude != vm.map.center.longitude) {
                            console.log("idle");
                            currentCenter = {
                                latitude: vm.map.center.latitude,
                                longitude: vm.map.center.longitude
                            }
                        }
                    },
                    "dragstart": function () {
                        vm.exploring = true;
                    }
                }
            };
            vm.mapOptions = {
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
            angular.element(window).on("resize", function () {
                clearTimeout(resizeTimeoutId);
                resizeTimeoutId = setTimeout(function () {
                    console.log("resize");
                    vm.map.center = {
                        latitude: currentCenter.latitude,
                        longitude: currentCenter.longitude
                    }
                }, 350);
            });
        });
    }
})
();
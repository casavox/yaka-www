(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardMapController', ProDashboardMapController)
        .controller('ProDashboardMapHomeControlController', ProDashboardMapHomeControlController);

    ProDashboardMapController.$inject = ['$rootScope', '$scope', 'networkService', 'uiGmapGoogleMapApi', 'uiGmapIsReady']
    function ProDashboardMapController($rootScope, $scope, networkService, uiGmapGoogleMapApi, uiGmapIsReady) {

        var vm = this;

        var currentCenter = {};

        vm.leads = [];
        vm.carrouselSelectedItem = {index: -1};
        vm.showSlider = false;
        vm.showWorkArea = true;

        $rootScope.$on('showTopViewEmit', function (event, show) {
            $rootScope.$broadcast('showTopViewBroadcast', show);
        });

        $rootScope.$on('showHomeControlEmit', function (event, show) {
            $rootScope.$broadcast('showHomeControlBroadcast', show);
        });

        $rootScope.$on('onLeadsLoadedBroadcast', function (event, args) {
            vm.leads = args;
            angular.forEach(vm.leads, function (lead, key) {
                lead.icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
            });

            //TODO REMOVE THIS
            if (vm.leads.length > 0) {
                vm.map.center = {
                    latitude: vm.leads[0].address.latitude,
                    longitude: vm.leads[0].address.longitude
                };
            }
            //TODO END REMOVE
        });

        $rootScope.$on('showHomeControlClickedBroadcast', function (event) {
            vm.showSlider = false;
            vm.showWorkArea = true;
            $rootScope.$emit('showTopViewEmit', true);
            $rootScope.$emit('showHomeControlEmit', false);
            angular.element('.gm-bundled-control').hide();
            angular.element('.gm-style-mtc').hide();
        });

        $scope.$watch(function () {
            return vm.carrouselSelectedItem.index;
        }, function (newValue, oldValue) {
            if (!angular.equals(oldValue, newValue)) {
                if (vm.leads[newValue] && vm.leads[newValue].address) {
                    onLeadSelected(vm.leads[newValue]);
                }
            }
        }, true);

        function onLeadSelected(lead) {
            for (var i = 0; i < vm.leads.length; i++) {
                vm.leads[i].icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
            }
            lead.icon = "http://maps.google.com/mapfiles/kml/paddle/wht-blank.png";
            vm.showSlider = true;
        }

        vm.onMarkerClicked = function (mapMarker, event, lead) {
            var carouselIndex = 0;
            for (var i = 0; i < vm.leads.length; i++) {
                var leadTmp = vm.leads[i];
                if (lead.id == leadTmp.id) {
                    carouselIndex = i;
                    break;
                }
            }

            if (carouselIndex == vm.carrouselSelectedItem.index) {
                vm.showSlider = true;
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
                            currentCenter = {
                                latitude: vm.map.center.latitude,
                                longitude: vm.map.center.longitude
                            }
                        }
                        console.log("Idle Hide");
                        if (vm.showWorkArea) {
                            angular.element('.gm-bundled-control').hide();
                            angular.element('.gm-style-mtc').hide();
                        }
                    },
                    "dragstart": function () {
                        vm.showSlider = false;
                        vm.showWorkArea = false;
                        $rootScope.$emit('showTopViewEmit', false);
                        $rootScope.$emit('showHomeControlEmit', true);
                        angular.element('.gm-bundled-control').show();
                        angular.element('.gm-style-mtc').show();
                    },
                    "zoom_changed": function () {
                        vm.showSlider = false;
                        vm.showWorkArea = false;
                        $rootScope.$emit('showTopViewEmit', false);
                        $rootScope.$emit('showHomeControlEmit', true);
                        angular.element('.gm-bundled-control').show();
                        angular.element('.gm-style-mtc').show();
                    }
                }
            };
            vm.mapOptions = {
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT,
                    position: google.maps.ControlPosition.TOP_RIGHT
                },
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_LEFT,
                    mapTypeIds: [
                        google.maps.MapTypeId.ROADMAP,
                        google.maps.MapTypeId.HYBRID
                    ]
                },
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                }
            }
            angular.element(window).on("resize", function () {
                clearTimeout(resizeTimeoutId);
                resizeTimeoutId = setTimeout(function () {
                    vm.map.center = {
                        latitude: currentCenter.latitude,
                        longitude: currentCenter.longitude
                    }
                }, 350);
            });
            waitForMapControlToLoad();
        });

        function waitForMapControlToLoad() {
            if (!angular.element(".gm-bundled-control").size()) {
                window.requestAnimationFrame(waitForMapControlToLoad);
            } else {
                angular.element('.gm-bundled-control').hide();
                angular.element('.gm-style-mtc').hide();
            }
        };
    }

    ProDashboardMapHomeControlController.$inject = ['$rootScope', '$scope']
    function ProDashboardMapHomeControlController($rootScope, $scope) {

        var vm = this;

        vm.showHomeControl = false;

        $rootScope.$on('showHomeControlClickedEmit', function (event, show) {
            $rootScope.$broadcast('showHomeControlClickedBroadcast', show);
        });

        vm.homeControlClicked = function () {
            $rootScope.$emit('showHomeControlClickedEmit');
        }

        $rootScope.$on('showHomeControlBroadcast', function (event, bool) {
            vm.showHomeControl = bool;
        });
    }
})
();
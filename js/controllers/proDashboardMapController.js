(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardMapController', ProDashboardMapController)
        .controller('ProDashboardMapHomeControlController', ProDashboardMapHomeControlController);

    ProDashboardMapController.$inject = ['$rootScope', '$scope', 'networkService', 'uiGmapGoogleMapApi', 'uiGmapIsReady']
    function ProDashboardMapController($rootScope, $scope, networkService, uiGmapGoogleMapApi, uiGmapIsReady) {

        var homeBounds = {};

        var lastBounds = {};

        var vm = this;

        var currentCenter = {};

        var loadingLeads = false;

        var disableExploringMode = true;

        var type = "all";

        vm.leads = [];
        vm.carrouselSelectedItem = {index: -1};
        vm.showSlider = false;
        vm.showWorkArea = true;

        $rootScope.$on('showHomeControlEmit', function (event, show) {
            $rootScope.$broadcast('showHomeControlBroadcast', show);
        });

        $rootScope.$on('reloadLeadsEmit', function (event, args) {
            $rootScope.$broadcast('reloadLeadsBroadcast', args);
        });

        $rootScope.$on('onLeadsLoadedBroadcast', function (event, args) {
            angular.forEach(args, function (lead, key) {
                lead.icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
            });
            vm.leads = args;

            loadingLeads = false;
            console.log(vm.leads.length);
        });

        $rootScope.$on('showHomeControlClickedBroadcast', function (event) {
            vm.showSlider = false;
            vm.showWorkArea = true;
            $rootScope.$emit('showHomeControlEmit', false);
            $('.gm-bundled-control').hide();
            $('.gm-style-mtc').hide();
            disableExploringMode = true;
            vm.map.bounds = angular.copy(homeBounds);
        });

        $rootScope.$on('changedTypeBroadcast', function (event, newType) {
            type = newType;
            lastBounds.type = type;
            $rootScope.$emit('reloadLeadsEmit', lastBounds);
        });

        $rootScope.$on('addCircleBroadcast', function (event, args) {
            vm.circle =
            {
                id: 1,
                center: {
                    latitude: args.latitude,
                    longitude: args.longitude
                },
                radius: args.radius,
                stroke: {
                    color: '#00aded',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#00aded',
                    opacity: 0.15
                },
                control: {}
            };
            homeBounds = {
                'southwest': {
                    'latitude': args.swLatitude,
                    'longitude': args.swLongitude
                },
                'northeast': {
                    'latitude': args.neLatitude,
                    'longitude': args.neLongitude
                }
            };
            vm.map.bounds = angular.copy(homeBounds);
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
                        if (vm.showWorkArea) {
                            $('.gm-bundled-control').hide();
                            $('.gm-style-mtc').hide();
                        }
                        if (!loadingLeads) {
                            loadingLeads = true;
                            setTimeout(function () {
                                if (vm.map.bounds.southwest && vm.map.bounds.northeast) {
                                    var bnds = {
                                        'sw_lat': vm.map.bounds.southwest.latitude,
                                        'sw_lng': vm.map.bounds.southwest.longitude,
                                        'ne_lat': vm.map.bounds.northeast.latitude,
                                        'ne_lng': vm.map.bounds.northeast.longitude
                                    };
                                    lastBounds = angular.copy(bnds);
                                    bnds.type = type;
                                    $rootScope.$emit('reloadLeadsEmit', bnds);
                                }
                            }, 50);
                        }
                    },
                    "dragstart": function () {
                        vm.showSlider = false;
                        vm.showWorkArea = false;
                        $rootScope.$emit('showHomeControlEmit', true);
                        $('.gm-bundled-control').show();
                        $('.gm-style-mtc').show();
                    },
                    "zoom_changed": function () {
                        if (!disableExploringMode) {
                            vm.showSlider = false;
                            vm.showWorkArea = false;
                            $rootScope.$emit('showHomeControlEmit', true);
                            $('.gm-bundled-control').show();
                            $('.gm-style-mtc').show();
                        } else {
                            disableExploringMode = false;
                        }
                    }
                }
            };
            vm.mapOptions = {
                minZoom: 6,
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
            $(window).on("resize", function () {
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
            if (!$(".gm-bundled-control").size()) {
                window.requestAnimationFrame(waitForMapControlToLoad);
            } else {
                $('.gm-bundled-control').hide();
                $('.gm-style-mtc').hide();
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
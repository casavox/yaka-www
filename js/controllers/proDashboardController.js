(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardController', ProDashboardController)
        .controller('ProDashboardMapHomeControlController', ProDashboardMapHomeControlController);

    ProDashboardController.$inject = ['$rootScope', '$scope', 'networkService', 'alertMsg', 'uiGmapGoogleMapApi', '$translate'];
    function ProDashboardController($rootScope, $scope, networkService, alertMsg, uiGmapGoogleMapApi, $translate) {
        $scope.showList = false;

        var vm = this;

        var homeBounds = {};
        var lastBounds = {};
        var currentCenter = {};
        var loadingLeads = false;
        var disableExploringMode = true;
        var type = "all";

        vm.showFilters = false;
        vm.type = "all";
        vm.tabIndex = 0;
        vm.leads = [];
        vm.carrouselSelectedItem = {index: -1};
        vm.showSlider = false;
        vm.showWorkArea = true;
        vm.workareaDiameter = 0;

        vm.getMenuItemClass = function (state) {
            if (state == "prodashboard") {
                return "active-menu";
            }
            return "";
        };

        vm.changeType = function (newType) {
            vm.type = newType;
            type = newType;
            lastBounds.type = type;
            loadLeads(lastBounds);
        };

        vm.getIcon = function (lead) {
            var icon = "";

            if (lead.activities !== undefined &&
                lead.activities[0] !== undefined &&
                lead.activities[0].code !== undefined) {
                switch (lead.activities[0].code) {
                    case "ELE_1000":
                        icon = "electrician";
                        break;
                    case "PLU_2000":
                        icon = "plumber";
                        break;
                    case "HEA_3000":
                        break;
                    case "CAR_4000":
                        break;
                    case "LOC_5000":
                        break;
                    case "PAI_6000":
                        break;
                    case "WAL_7000":
                        break;
                    case "INS_8000":
                        break;
                    case "COU_9000":
                        break;
                    case "KIT_10000":
                        break;
                    case "ROO_11000":
                        break;
                    case "GAT_12000":
                        break;
                    case "GAR_13000":
                        break;
                    case "CON_15000":
                        break;
                    default:
                        break;
                }
            }
            if (lead.type == 'EMERGENCY') {
                return "icons/mdpi/ic_" + icon + "_emergency.png";
            } else {
                return "icons/mdpi/ic_" + icon + ".png";
            }
        };

        $rootScope.$on('showHomeControlEmit', function (event, show) {
            $rootScope.$broadcast('showHomeControlBroadcast', show);
        });

        $rootScope.$on('showHomeControlClickedBroadcast', function () {
            vm.showSlider = false;
            vm.showWorkArea = true;
            $rootScope.$emit('showHomeControlEmit', false);
            $('.gm-bundled-control').hide();
            $('.gm-style-mtc').hide();
            disableExploringMode = true;
            vm.map.bounds = angular.copy(homeBounds);
        });

        function onLeadsLoaded(args) {
            angular.forEach(args, function (lead) {
                if (lead.type == 'EMERGENCY') {
                    lead.icon = "http://res.cloudinary.com/yaka/image/upload/v1459250431/yakaclub/pinEmergencyProject.png";
                } else {
                    lead.icon = "http://res.cloudinary.com/yaka/image/upload/v1459250431/yakaclub/pinSmallProject.png";
                }
                lead.translatedTitle = translateLeadTitle(lead);
            });
            vm.leads = args;

            loadingLeads = false;
        }

        function translateLeadTitle(lead) {
            var titleArray = lead.title.split(' ');
            for(var i = 0; i < titleArray.length; i++) {
                titleArray[i] = $translate.instant(titleArray[i]);
            }
            console.log(titleArray.join(' '));
            return titleArray.join(' ');
        }

        function addCircle(args) {
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
        };

        function loadLeads(args) {
            networkService.proLeadsGET(args.type, false, args.sw_lat, args.sw_lng, args.ne_lat, args.ne_lng,
                function succesProLeads(res) {
                    onLeadsLoaded(res);
                }, function errorProLeads() {
                    alertMsg.send("Pro get", "danger");
                }
            );
        }

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
                if (vm.leads[i].type == 'EMERGENCY') {
                    vm.leads[i].icon = "http://res.cloudinary.com/yaka/image/upload/v1459250431/yakaclub/pinEmergencyProject.png";
                } else {
                    vm.leads[i].icon = "http://res.cloudinary.com/yaka/image/upload/v1459250431/yakaclub/pinSmallProject.png";
                }
            }
            lead.icon = "http://res.cloudinary.com/yaka/image/upload/v1459254146/yakaclub/pinSelectedProject.png";
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
                zoom: 6,
                bounds: {},
                events: {
                    "idle": function () {
                        console.log("Idle !");
                        console.log(vm.map.control);
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
                                    loadLeads(bnds);
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
                        console.log("zoom_changed");
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
                },
                control: {}
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
            };
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

        networkService.proWorkAreaGET(
            function succesProLeads(res) {
                var bounds = {
                    'sw_lat': res.swLatitude,
                    'sw_lng': res.swLongitude,
                    'ne_lat': res.neLatitude,
                    'ne_lng': res.neLongitude
                };
                bounds.type = "all";
                addCircle(res);
                vm.workareaDiameter = Math.ceil((res.radius * 2) / 1000);
                loadLeads(bounds);
            }, function errorProLeads() {
                alertMsg.send("Pro get", "danger");
            }
        );
    }

    ProDashboardMapHomeControlController.$inject = ['$rootScope']
    function ProDashboardMapHomeControlController($rootScope) {

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
})();
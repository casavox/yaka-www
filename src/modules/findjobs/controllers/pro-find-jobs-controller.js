(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('FindJobsController', FindJobsController)
        .controller('ProDashboardMapHomeControlController', ProDashboardMapHomeControlController);

    function FindJobsController($rootScope, $scope, networkService, alertMsg, uiGmapGoogleMapApi, $localStorage, $state) {
        $scope.showList = false;

        if ($localStorage.invitationId) {
            $state.go("contacts");
        }

        $rootScope.pageName = "Carte des chantiers";
        $rootScope.updateProfile();

        var vm = this;

        var homeBounds = {};
        var lastBounds = {};
        var currentCenter = {
            latitude: 0,
            longitude: 0
        };
        var loadingLeads = false;
        var disableExploringMode = true;

        vm.showFilters = false;
        vm.tabIndex = 0;
        vm.leads = [];
        vm.carrouselSelectedItem = {index: -1};
        vm.showSlider = false;
        vm.showWorkArea = true;
        vm.workareaDiameter = 0;

        vm.getIcon = function (lead) {
            var icon = "";

            if (lead.activities !== undefined &&
                lead.activities[0] !== undefined &&
                lead.activities[0].code !== undefined) {
                switch (lead.activities[0].code) {
                    case "REN_500":
                        icon = "multitask";
                        break;
                    case "ELE_1000":
                        icon = "electrician";
                        break;
                    case "PLU_2000":
                        icon = "plumber";
                        break;
                    case "HEA_3000":
                        icon = "heater";
                        break;
                    case "CAR_4000":
                        icon = "carpenter";
                        break;
                    case "LOC_5000":
                        icon = "locksmith";
                        break;
                    case "PAI_6000":
                        icon = "painter";
                        break;
                    case "WAL_7000":
                        icon = "walling";
                        break;
                    case "INS_8000":
                        icon = "insulation";
                        break;
                    case "BAT_10100":
                        icon = "bathroom";
                        break;
                    case "KIT_10000":
                        icon = "kitchen";
                        break;
                    case "ROO_11000":
                        icon = "roofer";
                        break;
                    case "GAT_12000":
                        icon = "garage";
                        break;
                    case "GAR_13000":
                        icon = "landscaping";
                        break;
                    case "COU_13900":
                        icon = "architect";
                        break;
                    case "CON_14000":
                        icon = "construction";
                        break;
                    default:
                        break;
                }
            }
            return "icons/mdpi/ic_" + icon + "_blue.png";
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
                lead.icon = "https://res.cloudinary.com/yaka/image/upload/yakaclub/pinSmallProject.png";
            });
            vm.leads = args;

            loadingLeads = false;
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
                    color: '#03A9F4',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#03A9F4',
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
        }

        function loadLeads(args) {
            networkService.proLeadsGET(args.sw_lat, args.sw_lng, args.ne_lat, args.ne_lng,
                function succesProLeads(res) {
                    onLeadsLoaded(res);
                }, function errorProLeads() {
                    alertMsg.send("Imposible de récupérer les projets", "danger");
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
                vm.leads[i].icon = "https://res.cloudinary.com/yaka/image/upload/yakaclub/pinSmallProject.png";
            }
            lead.icon = "https://res.cloudinary.com/yaka/image/upload/yakaclub/pinSelectedProject.png";
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
        };

        var resizeTimeoutId;
        uiGmapGoogleMapApi.then(function (maps) {
            vm.map = {
                center: {
                    latitude: 0,
                    longitude: 0
                },
                zoom: 6,
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
                minZoom: 10,
                maxZoom: 14,
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
                addCircle(res);
                vm.workareaDiameter = Math.ceil((res.radius * 2) / 1000);
                loadLeads(bounds);
            }, function errorProLeads() {
                alertMsg.send("Imposible de récupérer les projets", "danger");
            }
        );

        networkService.proDashboardDataGET(
            function numberLeadProject(res) {
                vm.numberLeadProject = res.availableLeadsNumber;
            }, function errorProData() {
                alertMsg.send("Imposible de récupérer les projets", "danger");
            }
        );
    }

    function ProDashboardMapHomeControlController($rootScope) {

        var vm = this;

        vm.showHomeControl = false;

        $rootScope.$on('showHomeControlClickedEmit', function (event, show) {
            $rootScope.$broadcast('showHomeControlClickedBroadcast', show);
        });

        vm.homeControlClicked = function () {
            $rootScope.$emit('showHomeControlClickedEmit');
        };

        $rootScope.$on('showHomeControlBroadcast', function (event, bool) {
            vm.showHomeControl = bool;
        });
    }
})();

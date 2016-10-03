(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AdminProjectController', AdminProjectController);

    //
    //Controller login
    function AdminProjectController($scope, $localStorage, $state, networkService, alertMsg, Upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope, uiGmapGoogleMapApi, modalService, ngTableParams) {

        if ($localStorage.user && !$localStorage.user.isAdmin) {
            $state.go("home");
        }

        $rootScope.updateProfile();
        var vm = this;
        vm.pro = vm.disabledAddr = true;
        vm.newAddrFlag = vm.saveFlag = vm.editFlag = $rootScope.editMode = vm.proDetails = vm.editDescriptionFlag = false;
        vm.hireMessage = "Hi, I made my choice, I definitely choose you for my project.";
        vm.dateType = vm.child3 = vm.child2 = vm.child1 = vm.child0 = "";
        vm.imageFlag = vm.whereFlag = vm.whenFlag = vm.dateFlag = vm.imagePreviewFlag = vm.dateSelected = false;
        vm.project = {};
        vm.projectTmp = {};
        vm.dt = new Date();
        vm.default = angular.copy(vm.dt);
        vm.minDate = new Date();
        vm.now = new Date();
        vm.minDate.setDate(vm.minDate.getDate() + 2);
        vm.maxDate = new Date();
        vm.maxDate.setDate(vm.dt.getDate() + 180);
        vm.datepickerOptions = {
            minDate: vm.dt,
            maxDate: vm.maxDate,
            showWeeks: false
        };
        vm.newAddr = {};
        vm.error = {
            description: {flag: false, message: ""},
            address: {flag: false, message: ""},
            date: {flag: false, message: ""},
            material: {flag: false, message: ""}
        };
        $scope.options = {
            types: ['address'],
            componentRestrictions: {country: 'fr'}
        };
        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 46.5945259,
                    longitude: 2.4623584
                }, zoom: 6
            };
            $scope.mapOptions = {
                draggable: false,
                disableDoubleClickZoom: true,
                scrollwheel: false
            };
            $scope.address = {
                name: '',
                place: '',
                components: {
                    placeId: '',
                    streetNumber: '',
                    street: '',
                    city: '',
                    state: '',
                    countryCode: '',
                    country: '',
                    postCode: '',
                    district: '',
                    location: {
                        lat: '',
                        long: ''
                    }
                }
            };
        });
        vm.cleanAddress = angular.copy($scope.address);

        vm.deleteProject = function (message) {
            if (!angular.isUndefined($stateParams.projectId) && $stateParams.projectId) {
                networkService.adminDeleteProject($stateParams.projectId, message,
                    function () {
                        alertMsg.send("Votre projet à bien été annulé", "success");
                        $state.go("admin-projects");
                    },
                    function () {
                        alertMsg.send("Impossible d'annuler le projet, réessayez puis contactez le support si besoin", "danger");
                    }, true
                );
            }
        };

        vm.hire = function () {
            var formData = {
                id: vm.proposal.id,
                text: vm.hireMessage
            };
            networkService.adminProposalAcceptPOST(formData, succesProposalAcceptPOST, errorProposalAcceptPOST, true);
        };

        function succesProposalAcceptPOST(res) {
            vm.proposal = res;
            vm.hireFlag = false;
            alertMsg.send("La proposition à bien été sélectionnée", "success");
        }

        function errorProposalAcceptPOST() {
            alertMsg.send("Impossible de selectionner la proposition, réessayez puis contactez le support si besoin", "danger");
        }

        vm.verifNameAddr = function () {
            vm.continueAddressFlag = false;
            if (vm.newAddr.name.length > 0) {
                vm.disabledAddr = vm.continueAddress = false;
                vm.myAddress = "new";
                $scope.address = {
                    name: '',
                    place: '',
                    components: {
                        placeId: '',
                        streetNumber: '',
                        street: '',
                        city: '',
                        state: '',
                        countryCode: '',
                        country: '',
                        postCode: '',
                        district: '',
                        location: {
                            lat: '',
                            long: ''
                        }
                    }
                };
            }
            else {
                vm.newAddr.name = "";
                vm.disabledAddr = true;
            }
        };

        vm.indexOfObject = function (a, token, array) {
            var res = [];
            if (!angular.isUndefined(array)) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][token] == a) {
                        res.push(i);
                    }
                }
                return res;
            }
            return res;
        };

        vm.calculateExp = function (d) {
            var tmp = new Date(d);
            var ageDifMs = Date.now() - tmp.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        vm.limitLength = function (obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        };

        vm.updateImg = function () {
            for (var i = 0; i < vm.projectTmp.images.length; i++) {
                if (vm.projectTmp.images[i].cloudinaryPublicId == vm.imgTmp.cloudinaryPublicId) {
                    vm.projectTmp.images[i].description = vm.imgTmp.description;
                    vm.imageFlag = false;
                    break;
                }
            }
        };

        vm.selectImagePreview = function (index) {
            var data = [{url: vm.projectTmp.images[index].cloudinaryPublicId}];
            $rootScope.media = vm.projectTmp.images[index];
            $rootScope.deleteImg = vm.deleteImg;
            $rootScope.updateImg = vm.updateImg;
            Lightbox.openModal(data, 0);
        };

        vm.deleteImg = function () {
            for (var i = 0; i < vm.projectTmp.images.length; i++) {
                if (vm.projectTmp.images[i].cloudinaryPublicId == $rootScope.media.cloudinaryPublicId) {
                    vm.projectTmp.images.splice(i, 1);
                    vm.imageFlag = false;
                    break;
                }
            }
        };

        vm.editImage = function (media) {
            if (vm.editFlag) {
                vm.imgTmp = media;
                vm.imageFlag = true;
            }
            else {
                vm.imgTmpPreview = media;
                vm.imagePreviewFlag = true;
            }
        };

        vm.changeWhere = function () {
            if (vm.myAddress == "new") {
                vm.projectTmp.address.name = vm.newAddr.name;
                vm.projectTmp.address.address = $scope.address.name;
                vm.projectTmp.address.streetNumber = $scope.address.components.streetNumber;
                vm.projectTmp.address.route = $scope.address.components.street;
                vm.projectTmp.address.postalCode = $scope.address.components.postCode;
                vm.whereFlag = false;
            } else {
                for (var i = 0; i < vm.user.addresses.length; i++) {
                    if (vm.user.addresses[i].address == vm.myAddress) {
                        vm.projectTmp.address.name = vm.user.addresses[i].name;
                        vm.projectTmp.address.address = vm.myAddress;
                        vm.whereFlag = false;
                        break;
                    }
                }
            }
        };

        vm.setAddress = function () {
            if (vm.myAddress == "new") {
                vm.newAddrFlag = true;
                $scope.address.name = "";
                vm.continueAddress = false;
            } else {
                $scope.address.name = vm.myAddress;
                vm.continueAddress = true;
                vm.newAddrFlag = false;
                vm.newAddr.name = "";
            }
            vm.disabledAddr = true;
        };

        function succesProfileGET(res) {
            vm.user = res;
        }

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
        }

        if ($stateParams.projectId) {
            networkService.adminProjectGET($stateParams.projectId, succesProjectGET, errorProjectGET);
        }

        vm.editWhere = function () {
            vm.whereFlag = true;
        };

        vm.changeWhen = function () {
            vm.projectTmp.desiredDatePeriod = vm.dateType;
            if (vm.dateType == "SPECIFIC") {
                vm.projectTmp.desiredDate = $filter('date')(vm.dt, "yyyy-MM-dd");
            }
            vm.whenFlag = false;
        };

        vm.cancel = function () {
            vm.projectTmp = angular.copy(vm.project);
            vm.editDescriptionFlag = false;
            vm.editFlag = false;
            $rootScope.editMode = false;
            vm.whereFlag = false;
            vm.saveFlag = false;
        };

        vm.selectDateType = function (type) {
            vm.dateSelected = false;
            vm.dateFlag = false;
            vm.dateType = type;
            switch (vm.dateType) {
                case "SPECIFIC":
                    vm.projectTmp.desiredDatePeriod = "SPECIFIC";
                    vm.projectTmp.desiredDate = vm.dt;
                    break;
                case "WITHIN_A_MONTH":
                    vm.projectTmp.desiredDatePeriod = "WITHIN_A_MONTH";
                    vm.projectTmp.desiredDate = new Date(moment().add(1, 'months'));
                    break;
                case "NONE":
                    vm.projectTmp.desiredDatePeriod = "NONE";
                    vm.projectTmp.desiredDate = null;
                    break;
            }
        };

        vm.selectDate = function () {
            vm.dateFlag = true;
        };

        vm.unSelectdate = function () {
            vm.dateSelected = false;
            vm.dateFlag = true;
        };

        vm.update = function () {
            vm.projectTmp.tags = vm.projectTmp.tags || [];
            vm.projectTmp.images = vm.projectTmp.images || [];
            vm.projectTmp.availabilities = vm.projectTmp.availabilities || [];
            networkService.adminProjectPUT(vm.projectTmp, succesProfilePUT, errorProfilePUT, true);
        };

        function succesProfilePUT(res) {
            vm.cancel();
            alertMsg.send("Le projet à bien été modifié", "success");
            succesProjectGET(res);
            vm.newAddrFlag = false;
            networkService.adminProfileGET(succesProfileGET, errorProfileGET, true);
        }

        function errorProfilePUT() {
            vm.cancel();
            alertMsg.send("Impossible de modifier le projet, réessayez puis contactez le support si besoin", "danger");
        }

        vm.editWhen = function () {
            vm.whenFlag = true;
        };

        vm.uploadFiles = function (files, invalides, index) {
            if (invalides.length > 0) {
                if (invalides[0].$error == "maxSize")
                    alertMsg.send("Taille maximum : 20Mo.", "danger");
            }
            $scope.files = files;
            if (!$scope.files) return;
            angular.forEach(files, function (file) {
                if (file && !file.$error) {
                    file.upload = Upload.upload({
                        url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
                        data: {
                            upload_preset: cloudinary.config().upload_preset,
                            tags: 'project',
                            context: 'photo=' + $scope.title,
                            file: file,
                            resource_type: 'image'
                        }
                    }).progress(function (e) {
                        file.progress = Math.round((e.loaded * 100.0) / e.total);
                        file.status = "Uploading... " + file.progress + "%";
                    }).success(function (data, status, headers, config) {
                        vm.projectTmp.images = vm.projectTmp.images || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        vm.projectTmp.images.push({cloudinaryPublicId: data.public_id});
                    }).error(function (data, status, headers, config) {
                        alertMsg.send("Impossible d'envoyer l'image", "danger");
                    });
                }
            });
        };

        vm.editDescription = function () {
            vm.editDescriptionFlag = true;
        };

        vm.edit = function () {
            vm.editFlag = true;
            $rootScope.editMode = true;
        };

        vm.getTags = function () {
            var res = [];
            if (!angular.isUndefined(vm.project) && vm.project.activities) {
                for (var i = 0; i < vm.project.activities.length; i++) {
                    if (!_.includes(res, vm.project.activities[i].code)) {
                        res.push(vm.project.activities[i].code);
                    }
                }
                if (vm.project.hasMaterial) {
                    res.push("MATERIAL_TRUE");
                }
            }
            return res;
        };

        vm.getWhen = function () {
            switch (vm.projectTmp.desiredDatePeriod) {
                case "SPECIFIC":
                    return "à partir du " + moment(vm.projectTmp.desiredDate).format("D MMMM");
                case "WITHIN_A_MONTH":
                    return "dans le mois (avant le " + moment(vm.projectTmp.desiredDate).format("D MMMM") + ")";
                case "NONE":
                    return 'dès que possible';
            }
        };

        function succesProjectGET(res) {
            if (res.address.latitude && res.address.longitude) {
                $scope.map.center = {
                    latitude: res.address.latitude,
                    longitude: res.address.longitude
                };
                $scope.map.zoom = 15;
                vm.marker = {
                    coords: {
                        latitude: res.address.latitude,
                        longitude: res.address.longitude
                    },
                    options: {
                        icon: "https://res.cloudinary.com/yaka/image/upload/yakaclub/pinSmallProject.png"
                    }
                };
            }
            vm.project = res;

            if (!vm.project.proposals) {
                vm.project.proposals = [];
            }

            if (!vm.project.recoProposals) {
                vm.project.recoProposals = [];
            }

            vm.project.proposalsRecommendations = vm.project.proposals.concat(vm.project.recoProposals);
            console.log(vm.project.proposalsRecommendations);

            angular.forEach(vm.project.proposalsRecommendations, function (project) {
                project.name = project.professional.user.firstName + " " + project.professional.user.lastName;
            });
            projectSorting();


            angular.forEach(vm.project.compatiblePros, function (pro) {
                pro.name = pro.user.firstName + " " + pro.user.lastName;
                pro.contactRelation = pro.user.contactRelation;
                if (pro.company.address.postalCode == undefined) {
                    pro.company.address.postalCode = "";
                }
                pro.place = pro.company.address.postalCode + " " + pro.company.address.locality;

                if (pro.user.isInvited == undefined) {
                    pro.isInvited = "NON";
                } else {
                    pro.isInvited == "OUI";
                }
                pro.distance = (pro.distance / 1000).toFixed(2);
                pro.status = $filter('casaProfessionalStatus')(pro.status);

            });

            if (vm.project.address.address) {
                vm.project.address.address = vm.project.address.address.replace(/, /g, "\n");
            }

            $rootScope.pageName = vm.project.title;
            vm.projectTmp = angular.copy(vm.project);
            vm.dateType = vm.projectTmp.desiredDatePeriod;
            vm.dt = angular.copy(vm.now);
            if (!angular.isUndefined(vm.projectTmp.address) && vm.projectTmp.address) {
                vm.myAddress = vm.projectTmp.address.address;
                $scope.address.name = vm.projectTmp.address.address;
            }
            else {
                vm.newAddrFlag = true;
                vm.myAddress = "new";
            }
            vm.dateSelected = false;
            switch (vm.projectTmp.desiredDatePeriod) {
                case "SPECIFIC":
                    vm.child0 = "activate";
                    vm.dateSelected = true;
                    vm.projectTmp.desiredDatePeriod = "SPECIFIC";
                    vm.dt = vm.projectTmp.desiredDate;
                    break;
                case "WITHIN_A_MONTH":
                    vm.child2 = "activate";
                    vm.projectTmp.desiredDatePeriod = "WITHIN_A_MONTH";
                    vm.dt = vm.projectTmp.desiredDate;
                    break;
                case "NONE":
                    vm.projectTmp.desiredDatePeriod = "NONE";
                    vm.child3 = "activate";
                    break;
            }
            networkService.adminProfileGET(vm.project.user.id, succesProfileGET, errorProfileGET);
            proSorting();
            vm.tableData = [];
            vm.tableDataProject = [];
        }

        function projectSorting() {
            $scope.projectTable = new ngTableParams({
                page: 1,
                count: 99999999,
                sorting: {updated: "desc"}
            }, {
                total: vm.project.proposalsRecommendations.length,
                counts: [],
                getData: function ($defer, params) {
                    vm.tableDataProject = vm.project.proposalsRecommendations;
                    vm.tableDataProject = params.sorting() ? $filter('orderBy')(vm.tableDataProject, params.orderBy()) : vm.tableDataProject;
                    vm.tableDataProject = params.filter() ? $filter('filter')(vm.tableDataProject, params.filter()) : vm.tableDataProject;
                    vm.tableDataProject = vm.tableDataProject.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(vm.tableDataProject);
                }
            });
        }

        function proSorting() {
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 99999999,
                sorting: {distance: "asc"}
            }, {
                total: vm.project.compatiblePros.length,
                counts: [],
                getData: function ($defer, params) {
                    vm.tableData = vm.project.compatiblePros;
                    vm.tableData = params.sorting() ? $filter('orderBy')(vm.tableData, params.orderBy()) : vm.tableData;
                    vm.tableData = params.filter() ? $filter('filter')(vm.tableData, params.filter()) : vm.tableData;
                    vm.tableData = vm.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve(vm.tableData);
                }
            });
        }

        function errorProjectGET(res) {
            alertMsg.send("Impossible de récupérer ce projet, réessayez puis contactez le support si besoin", "danger");
            $state.go("admin-projects");
        }

        vm.saveComment = function () {
            $('html').trigger('click');
        };

        vm.descriptionChanged = function (image) {
            image.description = image.description.replace(/\n/g, ' ');
            if (image.length > 140) {
                image = image.substring(0, 140);
            }
        };

        vm.removeImage = function (imageIndex) {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Voulez-vous vraiment supprimer cette image ?",
                type: "warning",
                confirmButtonColor: "#f44336",
                confirmButtonText: "Oui, je veux la supprimer",
                showCancelButton: true,
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    vm.projectTmp.images.splice(imageIndex, 1);
                    $scope.$applyAsync();
                }
            });
        };

        vm.getStringLength = function (str) {
            if (!str) {
                return 0;
            }
            return str.length;
        };

        vm.openDeleteProjectPopup = function () {
            modalService.cancelProject(getProName(), function (chatMessage) {
                vm.deleteProject({text: chatMessage});
            });
        };

        function getProName() {
            var name = null;
            if (vm.project &&
                vm.project.proposal &&
                vm.project.proposal.professional &&
                vm.project.proposal.professional.user &&
                vm.project.proposal.professional.user.firstName &&
                vm.project.proposal.professional.user.lastName) {
                name = vm.project.proposal.professional.user.firstName + " " + vm.project.proposal.professional.user.lastName;
            }
            return name;
        }

        vm.openSavePopup = function () {
            swal({
                title: "Êtes-vous sûr ?",
                text: "Si des propositions vous ont déjà été faites, les Pro concernés en seront notifiés, et en fonction de vos modifications ils pourront décider de modifier ou retirer leur proposition.",
                type: "warning",
                confirmButtonColor: "#f44336",
                confirmButtonText: "Oui, mettre à jour mon projet",
                showCancelButton: true,
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    vm.update();
                }
            });
        };

        vm.showChat = false;
        vm.scrollBottom = 0;

        if ($stateParams.chat) {

            setTimeout(function() {
                vm.showChat = true;
                vm.scrollBottom = 1;
            }, 500);
        }
    }
})();

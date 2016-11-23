(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('NewProjectController', NewProjectController);

    //
    //Controller login
    function NewProjectController($scope, networkService, $rootScope, $stateParams, $timeout, $localStorage, $filter, $state, Upload, cloudinary, alertMsg, smoothScroll, $translate, $auth) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        var vm = this;
        vm.user = $localStorage.user;

        $rootScope.pageName = "Trouver un Pro";
        vm.multi = "";
        vm.newProject = {};
        vm.projectDescription = vm.dateType = vm.child2 = vm.child1 = vm.child3 = vm.child0 = "";
        vm.countdown = 5;
        vm.service = vm.continueAddressFlag = vm.continue = vm.dateFlag = vm.wait = false;
        if (vm.user) {
            vm.newAddrFlag = vm.continueImg = vm.popUpImg = false;
            vm.sendButton = 'ENVOYER';
        } else {
            vm.newAddrFlag = true;
            vm.sendButton = 'CONTINUER';
        }
        vm.selectCategory = vm.disabledAddr = true;
        vm.questions = [];
        vm.material = null;
        vm.img = [];
        vm.error = {
            description: {flag: false, message: ""},
            address: {flag: false, message: ""},
            date: {flag: false, message: ""},
            material: {flag: false, message: ""}
        };
        vm.dt = new Date(); // date picker binding
        vm.dt.setDate(vm.dt.getDate() + 2);
        vm.default = angular.copy(vm.dt);
        vm.maxDate = new Date();
        vm.maxDate.setDate(vm.dt.getDate() + 180);
        vm.desiredDateMonth = moment().add(1, 'months').toDate();
        vm.J1 = {date: new Date()};
        vm.time = vm.J1.date.getHours();
        vm.J2 = {date: new Date()};
        vm.J3 = {date: new Date()};
        vm.J2.date.setDate(vm.J2.date.getDate() + 1);
        vm.J3.date.setDate(vm.J3.date.getDate() + 2);

        vm.datepickerOptions = {
            minDate: vm.dt,
            maxDate: vm.maxDate,
            showWeeks: false
        };

        var d = new Date();
        $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
        vm.imageLoading = {
            0: false,
            1: false,
            2: false,
            3: false
        };
        $rootScope.photos = [];
        vm.newAddr = {};
        var scrollOptions = {containerId: 'main-scroll-container'};
        $scope.options = {
            types: ['address'],
            componentRestrictions: {country: 'fr'}
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
        vm.cleanAddress = angular.copy($scope.address);

        // ---------------------------------------


        if (vm.user) {
            $rootScope.updateProfile();
            networkService.profileGET(succesProfileGET, errorProfileGET);
        }

        networkService.activitiesGET(succesProjectsGET, errorProjectsGET);

        vm.limitLength = function (obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        };

        vm.verifDescription = function () {
            if (vm.projectDescription) {
                vm.projectDescription = vm.projectDescription.trim();
            }
            if (vm.projectDescription.length < 50) {
                vm.continue = false;
                vm.continueImg = false;
                vm.img = [];
                vm.continueAddressFlag = false;
                vm.error.description.flag = true;
                vm.error.description.message = "Dites-nous en plus sur votre besoin, vos contraintes : état du lieu des travaux, dimensions, le cas échéant le type de matériel fournit,...";
            }
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
                        $rootScope.photos = $rootScope.photos || [];
                        data.context = {custom: {photo: $scope.title}};
                        file.result = data;
                        $rootScope.photos.push({cloudinaryPublicId: data.public_id});
                    }).error(function (data, status, headers, config) {
                        alertMsg.send("Impossible d'envoyer l'image", "danger");
                    });
                }
            });
        };


        $scope.dragOverClass = function ($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items != null) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind == 'file') {
                        hasFile = true;
                        break;
                    }
                }
            } else {
                hasFile = true;
            }
            return hasFile ? "dragover" : "dragover-err";
        };


        // ------------


        vm.resetProject = function () {
            networkService.activitiesGET(succesProjectsGET, errorProjectsGET, true);
            vm.type = {};
            vm.continue = vm.continueImg = vm.service = vm.continueAddressFlag = false;
            vm.questions = [];
            vm.material = vm.subService = null;
            vm.title = vm.projectDescription = vm.child2 = vm.child1 = vm.child3 = vm.child0 = '';
            vm.error = {
                description: {flag: false, message: ""},
                address: {flag: false, message: ""},
                date: {flag: false, message: ""},
                material: {flag: false, message: ""}
            };
            if (!angular.isUndefined(vm.user) && vm.user.addresses) {
                if (vm.user.addresses.length > 0) {
                    vm.myAddress = vm.user.addresses[0].address;
                    $scope.address.name = vm.myAddress;
                    vm.continueAddress = true;
                }
                else {
                    vm.continueAddress = false;
                    vm.newAddrFlag = true;
                }
            }
            else {
                vm.user = {};
                vm.user.addresses = [];
            }
            for (var i = 0; i < vm.newProject.childrenActivities.length; i++) {
                vm.newProject.childrenActivities[i].selected = "";
            }
        };

        vm.publishProject = function () {
            if (angular.isUndefined($localStorage.token) == false && $localStorage.token) {
                vm.post();
            } else {
                vm.openPopup(false);
            }
        };

        vm.post = function () {
            var formData = {
                title: vm.title,
                description: vm.projectDescription,
                desiredDatePeriod: vm.dateType,
                address: {},
                hasMaterial: vm.material == 'yes',
                activities: []
            };
            for (var i = 0; i < vm.questions.length; i++) {
                if (vm.questions[i].code != "OTHER") {
                    formData.activities.push({code: vm.questions[i].code});
                }
            }
            if (vm.dateType == "SPECIFIC") {
                formData.desiredDate = $filter('date')(vm.dt, "yyyy-MM-dd");
            }
            if (vm.continueAddress) {
                for (var i = 0; i < vm.user.addresses.length; i++) {
                    if (vm.user.addresses[i].address == vm.myAddress) {
                        formData.address.name = vm.user.addresses[i].name;
                        formData.address.address = vm.myAddress;
                        break;
                    }
                }
            }
            else {
                if (angular.isUndefined(vm.newAddr) || !vm.newAddr.name || vm.newAddr.name.length < 3) {
                    vm.error.address.flag = true;
                    vm.error.address.message = "Merci d'indiquer un NOM pour cette adresse";
                    $timeout(function () {
                        var element = document.getElementById('slide5');
                        smoothScroll(element, scrollOptions);
                    }, 0);

                }
                else if (angular.isUndefined(vm.newAddr) || !vm.newAddr.address || vm.newAddr.address.length < 3) {
                    vm.error.address.flag = true;
                    vm.error.address.message = "Merci de saisir le debut de l'adresse puis de choisir dans la liste";
                    $timeout(function () {
                        var element = document.getElementById('slide5');
                        smoothScroll(element, scrollOptions);
                    }, 0);

                }
                formData.address.name = vm.newAddr.name;
                formData.address.address = vm.newAddr.address;
            }
            formData.images = $rootScope.photos;
            if (angular.isUndefined($localStorage.token) == false && $localStorage.token)
                networkService.projectPOST(formData, succesProjectsPOST, errorProjectsPOST, true);
            else {
                $rootScope.newProject = formData;
                $state.go('home');
            }
        };

        function succesProjectsPOST(res) {
            vm.continueAddressFlag = vm.continueImg = vm.continue = vm.service = vm.selectCategory = false;
            vm.questions = [];
            vm.end = true;
            swal({
                title: 'Félicitations, votre projet vient d’être envoyé aux meilleurs Pro autour de vous !',
                text: 'Suivez son avancement dans le menu « Mes projets »',
                type: 'success',
                confirmButtonColor: '#03A9F4',
                confirmButtonText: 'Continuer !',
                confirmButtonClass: 'btn btn-success'
            });
            $state.go("proposals", {projectId: res.id});
        }

        function errorProjectsPOST() {
            vm.end = false;
            alertMsg.send("Oups ! une erreur s'est produite, merci de vérifier votre saisie avant de cliquer de nouveau sur ENVOYER (contactez le support en cas de besoin)", "danger");
            if (vm.error.description.flag || vm.error.material.flag)
                $timeout(function () {
                    var element = document.getElementById('slide3');
                    smoothScroll(element, scrollOptions);
                }, 0);
            else if (vm.error.address.flag) {
                $timeout(function () {
                    var element = document.getElementById('slide5');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
            else if (vm.error.date.flag) {
                $timeout(function () {
                    var element = document.getElementById('slide6');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        }

        vm.selectDateType = function (type) {
            vm.dateFlag = vm.dateSelected = false;
            vm.dateType = type;
        };

        vm.selectDate = function () {
            vm.dateFlag = true;
        };

        vm.unSelectdate = function () {
            vm.dateSelected = false;
            vm.dateFlag = true;
        };

        vm.verifNameAddr = function () {
            vm.continueAddressFlag = false;
            if (vm.newAddr.name.length > 0) {
                vm.disabledAddr = vm.continueAddress = false;
                vm.myAddress = "new";
                $scope.address = angular.copy(vm.cleanAddress);
            }
            else {
                vm.disabledAddr = true;
            }
        };

        vm.continueAddr = function () {
            if (vm.continueAddress == false || !$localStorage.user) {
                if (!$scope.address.name || !vm.newAddr.name) {
                    vm.continueAddressFlag = false;
                    vm.formAddAddressError = true;
                    alertMsg.send("Merci de remplir les champs indiqués en rouge", "danger");
                }
                if (vm.newAddr.name) {
                    if ($scope.address.components.placeId && !angular.isUndefined($scope.address.components.street) && !angular.isUndefined($scope.address.components.city) && !angular.isUndefined($scope.address.components.countryCode) && $scope.address.components.countryCode == "FR") {
                        vm.newAddr.address = $scope.address.name;
                        vm.continueAddressFlag = vm.continueAdress = true;
                        vm.error.address.flag = false;
                        vm.error.address.message = "";
                        $timeout(function () {
                            var element = document.getElementById('slide6');
                            smoothScroll(element, scrollOptions);
                        }, 0);
                    }
                    else {
                        vm.continueAddressFlag = false;
                        vm.error.address.flag = true;
                        vm.error.address.message = "Merci de saisir le debut de l'adresse puis de choisir dans la liste";
                    }
                }
            }
            else {
                if (vm.myAddress == $scope.address.name) {
                    vm.continueAddressFlag = vm.continueAdress = true;
                    vm.error.address.flag = false;
                    vm.error.address.message = "";
                    $timeout(function () {
                        var element = document.getElementById('slide6');
                        smoothScroll(element, scrollOptions);
                    }, 0);
                }
                else {
                    vm.continueAddressFlag = false;
                    vm.error.address.message = "Merci de saisir le debut de l'adresse puis de choisir dans la liste";
                    vm.error.address.flag = true;
                }
            }
        };

        vm.setAddress = function () {
            if (vm.myAddress == "new") {
                vm.continueAddress = vm.continueAddressFlag = false;
                vm.newAddrFlag = true;
                $scope.address.name = "";
            }
            else {
                $scope.address.name = vm.myAddress;
                vm.error.address.flag = false;
                vm.continueAddress = true;
                vm.newAddrFlag = false;
                vm.newAddr.name = "";
            }
            vm.disabledAddr = true;
        };

        vm.verif = function () {
            if (vm.projectDescription.length < 50) {
                vm.continueImg = vm.continueAddressFlag = vm.continue = false;
                vm.img = [];
                vm.error.description.message = "Merci de précisez votre besoin et vos contraintes (état du lieu des travaux, dimensions, le cas échéant le type de matériel fournit, etc.).";
                vm.error.description.flag = true;
            }
            else {
                vm.error.description.message = "";
                vm.error.description.flag = false;
            }
        };

        vm.continueProject = function () {
            if (vm.material == null && vm.type.code != 'COU_13900' && vm.projectDescription.length < 50) {
                alertMsg.send("Merci de remplir les champs indiqués en rouge", "danger");
            }
            if (vm.material == null && vm.type.code != 'COU_13900') {
                vm.error.material.message = "Merci d'indiquez si vous souhaitez que le professionnel fournisse ou non les principaux matériaux";
                vm.formAddProjectError = true;
                vm.error.material.flag = true;
            }
            if (vm.projectDescription.length < 50) {
                vm.formAddProjectError = true;
                vm.error.description.message = "Dites-nous en plus sur votre besoin, vos contraintes : état du lieu des travaux, dimensions, le cas échéant le type de matériel fournit,...";
                vm.error.description.flag = true;
            } else if ((vm.material != null || vm.type.code == 'COU_13900') && vm.projectDescription.length >= 50) {
                vm.continue = vm.error.material.flag = true;
                vm.error.description.message = vm.error.material.message = "";
                vm.error.description.flag = false;
                $timeout(function () {
                    var element = document.getElementById('slide4');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        };

        vm.continueProjectImg = function () {
            if ($rootScope.photos && $rootScope.photos.length <= 0) {
                vm.continueImg = false;
                swal({
                    title: "Votre projet ne contient pas de photos !",
                    text: "Nous vous conseillons de joindre des photos pour améliorer la compréhension de votre besoin (vous pourrez à tout moment modifier votre projet pour rajouter des photos) !",
                    type: "warning",
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Ajouter une photo",
                    showCancelButton: true,
                    cancelButtonText: "Continuer"
                }, function (isConfirm) {
                    if (isConfirm) {
                        $('input[type=file]').first().click();
                    } else {
                        vm.continueImg = true;
                        $timeout(function () {
                            var element = document.getElementById('slide5');
                            smoothScroll(element, scrollOptions);
                        }, 0);
                    }
                });
            }
            else {
                vm.continueImg = true;
                $timeout(function () {
                    var element = document.getElementById('slide5');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        };

        vm.selectType = function (item, items) {
            vm.type = item;
            vm.questions = [];
            vm.continue = vm.continueImg = vm.continueAddressFlag = vm.service = false;
            vm.material = vm.subService = null;
            vm.projectDescription = vm.child1 = vm.child2 = vm.child3 = vm.child0 = "";
            for (var i = 0; i < vm.newProject.childrenActivities.length; i++) {
                vm.newProject.childrenActivities[i].selected = "";
            }

            vm.title = item.name;
            if (item.childrenActivities && item.childrenActivities.length > 0) {
                vm.questions.push(item);
                var childrenArray = [];
                for (var i = 0; i < item.childrenActivities.length; i++) {
                    childrenArray.push(item.childrenActivities[i]);
                }
                item.childrenActivities = childrenArray;
                for (var i = 0; i < item.childrenActivities.length; i++) {
                    item.childrenActivities[i].selected = "";
                }
                if (item.childrenActivities[item.childrenActivities.length - 1].code != "OTHER") {
                    var otherChild = {code: "OTHER"};
                    item.childrenActivities.push(otherChild);
                }
            }
            item.selected = "activate";
            if (!angular.isUndefined(vm.user) && vm.user.addresses) {
                if (vm.user.addresses.length > 0) {
                    vm.myAddress = vm.user.addresses[0].address;
                    $scope.address.name = vm.myAddress;
                    vm.continueAddress = true;
                } else {
                    vm.continueAddress = false;
                    vm.newAddrFlag = true;
                }
            } else {
                vm.user = {};
                vm.user.addresses = [];
            }
            $timeout(function () {
                var element = document.getElementById('subSlide0');
                smoothScroll(element, scrollOptions);
            }, 0);
        };

        vm.selectSubService = function (item, items, index) {
            if (index == 0)
                vm.title += " " + item.name;
            vm.questions[index + 1] = item;
            vm.service = false;
            for (var i = 0; i < items.length; i++) {
                items[i].selected = "";
            }
            item.selected = "activate";
            var tmp = angular.copy(vm.questions.slice(0, index + 2));
            vm.questions = tmp;
            item.selected = "activate";
            if (item.childrenActivities && item.childrenActivities.length > 0) {
                if (vm.questions[index + 1].childrenActivities[vm.questions[index + 1].childrenActivities.length - 1].code != "OTHER") {
                    var otherChild = {
                        code: "OTHER"
                    };
                    vm.questions[index + 1].childrenActivities.push(otherChild);
                }
                var childrenArray = [];
                for (var i = 0; i < vm.questions[index + 1].childrenActivities.length; i++) {
                    childrenArray.push(vm.questions[index + 1].childrenActivities[i]);
                }
                item.childrenActivities = childrenArray;
                for (var i = 0; i < vm.questions[index + 1].childrenActivities.length; i++) {
                    vm.questions[index + 1].childrenActivities[i].selected = "";
                }
                $timeout(function () {
                    var element = document.getElementById('subSlide' + (index + 1).toString());
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
            else {
                vm.service = true;
                $timeout(function () {
                    var element = document.getElementById('slide3');
                    smoothScroll(element, scrollOptions);
                }, 0);
            }
        };

        function succesProjectsGET(res) {
            var childrenArray = [];
            for (var i = 0; i < res.childrenActivities.length; i++) {
                childrenArray.push(res.childrenActivities[i]);
            }
            res.childrenActivities = childrenArray;
            vm.newProject = res;
            vm.wait = true;
        }

        function errorProjectsGET() {
            alertMsg.send("Oups ! une erreur s'est produite, merci de recharger la page depuis votre navigateur ('F5' ou 'cmd+R'), contactez le support CasaVox si nécessaire", "danger");
            $state.go("home", {'login': true});
        }

        function succesProfileGET(res) {
            vm.user = res;
            if (!angular.isUndefined(res.addresses) && res.addresses) {
                if (res.addresses.length > 0) {
                    vm.myAddress = res.addresses[0].address;
                    $scope.address.name = vm.myAddress;
                    vm.continueAddress = true;
                }
                else {
                    vm.continueAddress = false;
                    vm.newAddrFlag = true;
                    vm.myAddress = "new";
                }
            }
            else {
                vm.user.addresses = [];
                vm.continueAddress = false;
                vm.newAddrFlag = true;
                vm.myAddress = "new";
            }
        }

        function errorProfileGET() {
            vm.continueAddress = false;
            vm.newAddrFlag = true;
            vm.myAddress = "new";
        }

        vm.saveComment = function () {
            $('html').trigger('click');
        };

        vm.getStringLength = function (str) {
            if (!str) {
                return 0;
            }
            return str.length;
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
                    $rootScope.photos.splice(imageIndex, 1);
                    $scope.$applyAsync();
                }
            });
        };

        vm.openPopup = function (showLoginTab) {
            vm.loginTab = showLoginTab;
            vm.showLoginPopup = true;
        };

        vm.closePopup = function () {
            vm.showLoginPopup = false;
        };

        vm.newUser = {
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            googleId: "",
            facebookId: "",
            defaultAddress: {
                address: ""
            },
            recaptchaResponse: "",
            avatar: {
                cloudinaryPublicId: ""
            }
        };

        vm.loginUser = {
            password: "",
            email: ""
        };

        if ($stateParams.email) {
            vm.loginUser.email = $stateParams.email;
            vm.newUser.email = $stateParams.email;
        }

        vm.passwordConfirm = "";

        vm.autocomplete = {
            options: {
                types: ['(cities)'],
                componentRestrictions: {country: 'fr'}
            }
        };

        var doNotHide = false;

        vm.needToHideEmail = function () {
            if (doNotHide) {
                return false;
            }
            if ((!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") ||
                (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != "")) {
                if (vm.newUser.email == '') {
                    doNotHide = true;
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        };

        vm.isSocialRegister = function () {
            return !!((!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") ||
            (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != ""));

        };

        vm.registerFormIsValid = function () {
            return !(!vm.newUser.firstName || !vm.newUser.lastName || !vm.newUser.email ||
            vm.newUser.password == '' || vm.newUser.password < 6 ||
            vm.passwordConfirm == '' || vm.newUser.password != vm.passwordConfirm || vm.registering || !vm.newUser.defaultAddress.address || !vm.newUser.recaptchaResponse);
        };

        vm.loginFormIsValid = function () {
            return !(vm.loginUser.email == '' || vm.loginUser.password == '');
        };

        vm.login = function () {
            if (vm.loginFormIsValid()) {
                networkService.login(vm.loginUser, succesLogin, errorLogin, true);
            }
        };

        function succesLogin(res) {
            if (res.token && res.token != "") {
                $localStorage.user = res;
                $localStorage.token = res.token;
                vm.publishProject();
            }
        }

        function errorLogin(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de se connecter", 'danger');
            }
        }

        vm.googleLogin = function () {
            vm.socialNetwork = "Google";
            $auth.authenticate('googleLogin').then(function (res) {
                succesLogin(res.data);
            }).catch(function (res) {
                console.log(res);
                if (res.data.error == "ERROR_BAD_CREDENTIALS") {
                    vm.noSocialAccountMessage = true;
                } else if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Google", 'danger');
                }
            });
        };

        vm.facebookLogin = function () {
            vm.socialNetwork = "Facebook";
            $auth.authenticate('facebookLogin').then(function (res) {
                succesLogin(res.data);
            }).catch(function (res) {
                if (res.data.error == "ERROR_BAD_CREDENTIALS") {
                    vm.noSocialAccountMessage = true;
                } else if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Facebook", 'danger');
                }
            });
        };

        vm.googlePreRegister = function () {
            vm.socialNetwork = "Google";
            $auth.authenticate('googleRegister').then(function (res) {
                if (!angular.isUndefined(res.data.googleId) && res.data.googleId && res.data.googleId != "") {
                    onPreRegisterOK(res.data);
                }
            }).catch(function (res) {
                if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Google", 'danger');
                }
            });
        };

        vm.facebookPreRegister = function () {
            vm.socialNetwork = "Facebook";
            $auth.authenticate('facebookRegister').then(function (res) {
                if (!angular.isUndefined(res.data.facebookId) && res.data.facebookId && res.data.facebookId != "") {
                    onPreRegisterOK(res.data);
                }
            }).catch(function (res) {
                if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Facebook", 'danger');
                }
            });
        };

        function onPreRegisterOK(user) {
            vm.newUser.firstName = user.firstName;
            vm.newUser.lastName = user.lastName;
            if (user.email != undefined) {
                vm.newUser.email = user.email.toLowerCase();
            }
            vm.newUser.googleId = user.googleId;
            vm.newUser.facebookId = user.facebookId;
            vm.newUser.avatar = user.avatar;
        }

        vm.registering = false;

        vm.register = function () {
            if (vm.registerFormIsValid()) {
                vm.registering = true;
                networkService.register(vm.newUser, successRegister, failRegister, true);
            }
        };

        function successRegister(res) {
            vm.registering = false;
            $localStorage.token = res.token;
            $localStorage.user = res;
            vm.publishProject();
        }

        function failRegister(err) {
            vm.registering = false;
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de créer le compte", 'danger');
            }
        }

        vm.showForgottenPasswordPopup = false;

        vm.passwordForgottenMessageSent = false;

        vm.forgottenPasswordUser = {
            email: ""
        };

        vm.forgottenPassword = function () {
            if (vm.forgottenPasswordUser.email) {
                networkService.passwordForgottenPOST(vm.forgottenPasswordUser, successPasswordForgotten, failPasswordForgotten, true);
            }
        };

        function successPasswordForgotten(res) {
            vm.passwordForgottenMessageSent = true;
        }

        function failPasswordForgotten(err) {
            alertMsg.send("Impossible de réinitialiser le mot de passe", 'danger');
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config)
        .run(function ($rootScope, $location, $state) {
            console.log($state);
            $rootScope.$on("$locationChangeStart", function (event, next, current) {
                console.log(event);
                console.log(next);
                console.log(current);
                var isPro = true;
                if ($rootScope.isMobile && isPro) {
                }
            });
        });

    function config($stateProvider) {

        $stateProvider
            .state('ionic-home', {
                url: "/",
                templateUrl: "modules/home/views/pro/ionic-pro-home.html",
                controller: "IonicProHomeController",
                controllerAs: 'vm'
            })


        /*   .state('concours', {
         url: "/concours",
         onEnter: function ($window) {
         $window.open('http://res.cloudinary.com/yaka/image/upload/v1481207905/casavox/Reglement_Concours_Dec2016.pdf', '_self');
         }
         }) */

         //Customer

         .state('home', {
         url: "/?invitationId&login&email&register",
         templateUrl: "modules/home/views/customer/home.html",
         controller: 'HomeController',
         controllerAs: 'vm'
         })

        //Pro

           .state('pro-home', {
         url: "/pro?invitationId&login&email&register",
         templateUrl: "modules/home/views/pro/home-pro.html",
         controller: 'ProHomeController',
         controllerAs: 'vm'
         })

         // Help activities

         .state('help-activities', {
         url: "/travaux/:activity",
         templateUrl: "modules/home/views/public/help-activity.html",
         controller: 'HelpActivityController',
         controllerAs: 'vm'
         })
    }
})();

(function () {
  'use strict';

  angular
  .module('Yaka')
  .controller('AppController', AppController);

  AppController.$inject = ['$scope', 'networkService', 'alertMsg', '$localStorage', '$rootScope'];
  function AppController($scope, networkService, alertMsg, $localStorage, $rootScope) {

    var app = this;
    var vm = this;
    var menuOpened = false;
    $rootScope.rate_watcher = true;
    $scope.projectFlag = false;
    $scope.project = null;
    $scope.error = {criteria:{message:"", flag:true}};
    $scope.rating = {positive: true, comment: "", criteria: []};
    networkService.proToRate(function(res){
      if (res){
        $scope.project = res;
        $rootScope.rate_pro = true;
        console.log(res);
        $localStorage.projectGet = res;
        networkService.criteriaGET(function(res){
          $scope.criteria = res;
          $scope.projectFlag = true;
        }, function(res){
          alertMsg.send("Error impossible to rate the pro.", "danger");
        })
      }
    }, function(res){
    });

    $scope.$watch(function(){
      return $rootScope.rate_watcher;
    }, function(newVal, oldVal){
      if (newVal === oldVal)
      return;
      if (!$rootScope.rate_watcher){
        $scope.projectFlag = true;
        $rootScope.rate_watcher = true;
      }
    });

    $scope.selectCriteria = function(index){
      var flag = false;
      for (var i = 0; i < $scope.rating.criteria.length; i++) {
        if ($scope.rating.criteria[i].name == $scope.criteria[index]){
          $scope.rating.criteria.splice(i, 1);
          flag = true;
          break;
        }
      }
      if (!flag)
      $scope.rating.criteria.push({name: $scope.criteria[index]});
    };

     $scope.indexOfObject = function(a, token, array){
      var res = [];
      if (!angular.isUndefined(array)){
        for (var i = 0; i < array.length; i++) {
          if (array[i][token] == a){
            res.push(i);
          }
        }
        return res;
      }
      return res;
    };

    $scope.send = function(){
      if ($scope.rating.criteria.length > 2 && $scope.rating.positive || ($scope.rating.positive == false && $scope.rating.comment.length > 10)){
        $scope.error.criteria.flag = false;
        $scope.rating.id = $scope.project.proposal.id;
        networkService.ratePro($scope.rating, function(res){
          $scope.projectFlag = false;
          $rootScope.rate_pro = false;
          $scope.rating = {positive: true, comment: "", criteria: []};
        }, function(res){
          alertMsg.send("Error : impossible to rate the pro", "danger");
          $scope.projectFlag = false;
          $scope.rating = {positive: true, comment: "", criteria: []};
        })
      }
      else {
        $scope.error.criteria.message = "Please select at least 3 criteria";
        $scope.error.criteria.flag = true;
      }
    };


    app.menu = {
      openMenu: function () {
        menuOpened = true;
      },
      closeMenu: function () {
        menuOpened = false;
      },
      getMenuClass: function () {
        if (menuOpened) {
          return "opened";
        } else {
          return "closed";
        }
      },
      getOverlayClass: function () {
        if (menuOpened) {
          return "overlayVisible";
        } else {
          return "overlayInvisible";
        }
      },
      getMenuItemClass: function () {
        return "";
      }
    }
  }
})();

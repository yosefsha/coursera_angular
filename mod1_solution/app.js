(function(){
'use strict';

  var app = angular.module('LunchCheck', []);

  app.controller("LunchCheckController", LunchCheckController);

  mainController.$inject = ['$scope','$log'];

  function LunchCheckController($scope, $log){
    $scope.lunch_list = "aa";
    $scope.name_num_val = 0;
    $scope.displayLunchMessage = function(){
      $scope.name_num_val = count_lunch_list($scope.lunch_list);
    }

  };

  var calc_numeric = function(text){
    var i = 0;
    var num_val=0;
    while (text[i]) {
    num_val += text.charCodeAt(i);
    i++;
    }
    return num_val;
  }



})();

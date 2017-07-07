(function(){
'use strict';

  var app = angular.module('myApp', []);

  app.controller("mainController", mainController);

  mainController.$inject = ['$scope','$log'];

  function mainController($scope, $log){
    $scope.name = "";
    $scope.name_num_val = 0;
    $scope.displayNumeric = function(){
      $scope.name_num_val = calc_numeric($scope.name);
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

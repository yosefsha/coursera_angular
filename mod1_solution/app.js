(function(){
'use strict';

  var app = angular.module('LunchCheck', []);

  app.controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope','$log'];

  function LunchCheckController($scope, $log){
    $scope.lunch_list = "";
    $scope.lunch_message = "";
    $scope.DisplayLunchMessage = function(){
      var items_count = CountItems($scope.lunch_list);
    $scope.lunch_message = GetLunchMessage(items_count);
    };

    $scope.lunch_message_style = function(){
      if ($scope.lunch_message == "Enjoy!"){
        return "text-success"
      }
      if ($scope.lunch_message == "Too much!"){
        return "text-danger"
      }
    };

  };

function GetLunchMessage(items_count){
    switch (true) {
        case (items_count === 0): return "Please enter data first!";
          break;
        case (items_count <= 3): return "Enjoy!"
          break;
        case (items_count > 3): return "Too much!";
          break;
        default: return "wrong data" //only negative val will reach here !

      };
    };

function CountItems(data_string) {
  if (data_string == null){
    return 0;
  }
  if (data_string.length == 0){
    return 0;
  }
  return data_string.split(",").length
};

function GetLunchMessageStyle(text){
  if (text == "Enjoy!"){
    return "text-success"
  }
  if (text == "Too much!"){
    return "text-dange"
  }

}

})();

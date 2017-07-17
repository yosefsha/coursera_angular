//module 2 solution
(function(){
'use strict';

  //{ name: "cookies", quantity: 10 }
  var app = angular.module('ShoppingList', []);

  app.controller("ShoppingCheckController", ShoppingCheckController);
  app.controller("ToByListController", ToByListController);
  app.controller("AlreadyBoughtListController", AlreadyBoughtListController);
  app.factory('ShoppingListFactory',ShoppingListFactory);

  ShoppingCheckController.$inject = ['$scope','ShoppingListFactory'];

  function ShoppingCheckController($scope, ShoppingListFactory) {
    var vm = this;

    $scope.by_list = ShoppingListFactory();
    $scope.bought_list = ShoppingListFactory();

  };

  function ToByListController($log, $scope){
    var vm = this;
    $scope.currentItemName = "";
    $scope.currentItemQuantity = "";

    $log.log($scope.by_list);
    $log.log(vm);
    $log.log($scope.by_list.getItems());

    $scope.items = $scope.by_list.getItems();

    $scope.addItem = function(){
      $scope.by_list.addItem($scope.currentItemName, $scope.currentItemQuantity);
    };

    $scope.removeItem = function (itemIndex) {
      $scope.by_list.removeItem(itemIndex);
    };

    // check item means mark as alreadt bought
    $scope.checkItem = function (itemIndex) {
      var item = $scope.by_list.removeItem(itemIndex);
      $scope.bought_list.addItem(item.name, item.quantity);
    };

    var initial_items = [
      { name: "cookies", quantity: 10 },
      { name: "bananas", quantity: 4 },
      { name: "apples", quantity: 18 },
      { name: "soda", quantity: 8 },
      { name: "cheese", quantity: 10 }
    ]
    for ( var item of initial_items ){
      $scope.currentItemQuantity = item.quantity;
      $scope.currentItemName = item.name;
      $scope.by_list.addItem($scope.currentItemName, $scope.currentItemQuantity);
    };
    // vm.currentItemQuantity = "";
    // vm.currentItemName = "";

  };

  function AlreadyBoughtListController($scope){
    var vm = this;
    $scope.items = $scope.bought_list.getItems();

    $scope.uncheckItem = function(itemIndex){
      var item = $scope.$parent.bought_list.removeItem(itemIndex);
      $scope.by_list.addItem(item.name, item.quantity)
    };

  };


  function ShoppingListService(){
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    };

    service.removeItem = function (itemIdex) {
      var removed_item = items.splice(itemIdex, 1);
      return removed_item[0];
    };

    service.getItems = function () {
      return items;
    };
  };

  function ShoppingListFactory(){
    var factory = function(){
      return new ShoppingListService();
    };
    return factory;
  };

})();

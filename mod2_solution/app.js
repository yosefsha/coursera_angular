//module 2 solution
(function(){
'use strict';

  //{ name: "cookies", quantity: 10 }
  var app = angular.module('ShoppingList', []);

  app.controller("ToByListController", ToByListController);
  app.controller("AlreadyBoughtListController", AlreadyBoughtListController);
  app.service('ToByList', ToByList);
  app.service('AlreadyBoughtList', AlreadyBoughtList);

  ToByListController.$inject = ['$scope','$log','ToByList','AlreadyBoughtList'];
  AlreadyBoughtListController.$inject =['ToByList','AlreadyBoughtList'];

  function ToByListController($scope,$log,ToByList, AlreadyBoughtList){
    var to_by_list = this;
    to_by_list.currentItemQuantity = "";
    to_by_list.currentItemName = "";
    to_by_list.items = ToByList.getItems();

    to_by_list.addItem = function(){
      ToByList.addItem(to_by_list.currentItemName, to_by_list.currentItemQuantity);
    };

    to_by_list.removeItem = function (itemIndex) {
      ToByList.removeItem(itemIndex);
    };

    // check item means mark as alreadt bought
    to_by_list.checkItem = function (itemIndex) {
      var item = ToByList.removeItem(itemIndex);
      AlreadyBoughtList.addItem(item.name, item.quantity);
      $log.log(AlreadyBoughtList);
    };

    var initial_items = [
      { name: "cookies", quantity: 10 },
      { name: "bananas", quantity: 4 },
      { name: "apples", quantity: 18 }
    ]
    for ( var item of initial_items ){
      to_by_list.currentItemQuantity = item.quantity;
      to_by_list.currentItemName = item.name;
      to_by_list.addItem();
    };
    to_by_list.currentItemQuantity = "";
    to_by_list.currentItemName = "";

  };

  function AlreadyBoughtListController(ToByList, AlreadyBoughtList){
    var bought_list = this;
    bought_list.items = AlreadyBoughtList.getItems();

    bought_list.uncheckItem = function(itemIndex){
      var item = AlreadyBoughtList.removeItem(itemIndex);
      ToByList.addItem(item.name, item.quantity)
    };

  };


  function ToByList(){
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

  function AlreadyBoughtList(){
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


})();




//
// function ToByList(){
//   var service = new ShoppingListService();
//   return service;
// };
//
// function AlreadyBoughtList(){
//   var service = new ShoppingListService();
//   return service;
// };
//
// function ShoppingListService() {
// var service = this;
//
// // List of shopping items
// var items = [];
//
// service.addItem = function (itemName, quantity) {
//   var item = {
//     name: itemName,
//     quantity: quantity
//   };
//   items.push(item);
// };
//
// service.removeItem = function (itemIdex) {
//   items.splice(itemIdex, 1);
// };
//
// service.getItems = function () {
//   return items;
// };
// };

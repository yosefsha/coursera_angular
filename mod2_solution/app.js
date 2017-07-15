//module 2 solution
(function(){
'use strict';

  //{ name: "cookies", quantity: 10 }
  var app = angular.module('ShoppingList', []);

  app.controller("ToByListController", ToByListController);
  app.controller("AlreadyBoughtListController", AlreadyBoughtListController);
  app.service('ToByList', ToByList);
  app.service('AlreadyBoughtList', AlreadyBoughtList);

  ToByListController.$inject = ['ToByList','AlreadyBoughtList'];
  AlreadyBoughtListController.$inject =['ToByList','AlreadyBoughtList'];

  function ToByListController(ToByList, AlreadyBoughtList){
    var to_by_list = this;
    to_by_list.currentItemQuantity = "";
    to_by_list.currentItemName = "";
    to_by_list.items = ToByList.getItems();

    to_by_list.add_item = function(){
      ToByList.add_item(currentItemName, currentItemQuantity);
    };

    to_by_list.removeItem = function (itemIndex) {
      ToByList.removeItem(itemIndex);
    };

    // check item means mark as alreadt bought
    to_by_list.checkItem = function (itemIndex) {
      item = ToByList.removeItem(itemIndex);
      AlreadyBoughtList.add_item(item.name, item.quantity);
    };
  };

  function AlreadyBoughtListController(ToByList, AlreadyBoughtList){
    var already_bought_list = this;
    already_bought_list.items = AlreadyBoughtList.getItems();

    already_bought_list.uncheckItem = function(itemIndex){
      item = AlreadyBoughtList.removeItem(itemIndex);
      ToByList.add_item(item.name, item.quantity)
    };

  };


  function ToByList(){
    var service = ShoppingListService();
    return service;
  }

  function AlreadyBoughtList(){
    var service = ShoppingListService();
    return service;
  }

  function ShoppingListService() {
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
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };
};

})();

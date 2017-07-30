(function(){

'use strict';
angular.module('MenuApp').controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['menuItemsData'];
function CategoriesController(menuItemsData) {
  vm = this;
  vm.menuItemsData = menuItemsData;
  console.log(menuItemsData);
}


})();

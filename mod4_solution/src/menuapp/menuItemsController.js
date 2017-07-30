(function(){

'use strict';
angular.module('MenuApp').controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['menuItemsData'];
function MenuItemsController(menuItemsData) {
  vm = this;
  vm.menuItemsData = menuItemsData.menu_items;
  vm.categoryName = menuItemsData.category.name;
}


})();

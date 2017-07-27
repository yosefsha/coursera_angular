(function(){

angular.module('MenuApp').controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['categoriesData'];
function CategoriesController(categoriesData) {
  vm = this;
  vm.categoriesData = categoriesData;
}


})();

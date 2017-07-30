(function(){

  angular.module('MenuApp')
  .component('categoriesList',{
    templateUrl:'src/menuapp/templates/categoriesListComponent.html',
    bindings:{
      categories: '<'
    }
  })

  .component('itemsList',{
    templateUrl:'src/menuapp/templates/itemsListComponent.html',
    bindings:{
      menuItemsData: '<'
    }
  });


})();

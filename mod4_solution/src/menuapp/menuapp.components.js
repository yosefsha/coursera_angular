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
      menu_items: '<'
    }
  })

  .component('anotherList',{
    templateUrl:'src/menuapp/templates/anotherlist.html'
  });


})();

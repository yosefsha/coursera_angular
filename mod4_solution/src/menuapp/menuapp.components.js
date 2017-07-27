(function(){

  angular.module('MenuApp')
  .component('categoriesList',{
    templateUrl:'src/menuapp/templates/categoriesListComponent.html',
    bindings:{
      categories: '<'
    }
  })

  .component('anotherList',{
    templateUrl:'src/menuapp/templates/anotherlist.html'
  });


})();

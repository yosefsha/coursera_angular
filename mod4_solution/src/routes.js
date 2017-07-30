(function(){
  angular.module('MenuApp')
  .config(RouteConfig);

  RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RouteConfig($stateProvider, $urlRouterProvider) {
  // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');

      $stateProvider.state(
        // Home page
          'home', {
          url: '/',
          templateUrl: 'src/menuapp/templates/home.html'
        });

      $stateProvider.state(
        'categories',{
          url:'/categories',
          templateUrl:'src/menuapp/templates/categories.html',
          controller: 'CategoriesController as categories',
          resolve:{
            categoriesData: ['MenuSearchService', function(MenuSearchService){
                return MenuSearchService.getMenuCategories()
              }]
          }
        }
      )

      $stateProvider.state(
        'categories.items',{
          url:'/category_items/{category_short_name}',
          templateUrl:'src/menuapp/templates/menu_items.html',
          controller: 'MenuItemsController as menu_items',
          resolve:{
            categoryItemsData: ['MenuSearchService', function(MenuSearchService){
                return MenuSearchService.getMenuForCategory(category_short_name)
              }]
          }
        }
      )


  };

})();

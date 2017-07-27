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
            categoriesData: ['menueSerchService', function(menueSerchService){
                return menueSerchService.getMenuCategories();
              }]
          }
        }
      )
  };

})();

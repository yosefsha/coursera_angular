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
          url:'/categries',
          templateUrl:'src/menuapp/templates/categries.html'
        });

  }

})();

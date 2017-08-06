(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.register', {
      url: '/register',
      templateUrl: 'src/public/users/register.html',
      controller: 'RegistrationController',
      controllerAs: 'registerCtrl',

    })
    // .state('public.user_info', {
    //   url: '/user_info',
    //   templateUrl: 'src/public/users/user_info.html',
    //   controller: 'UserInfoController',
    //   controllerAs: 'userInfoCtrl'
    // });

    .state('public.user_info', {
      url: '/user_info',
      templateProvider: ['UsersService', function(UsersService){
        if (UsersService.users.length > 0){
          return '<user-info user=$ctrl.currentUser></user-info>'
          }
        else {
          return '<new-user-info></new-user-info>'
        }
      }],

    });



}
})();

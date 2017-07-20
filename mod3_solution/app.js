(function(){
'use strict';
  var ApiBasePath = "https://davids-restaurant.herokuapp.com"

  var app = angular.module('NarrowItDownApp', []);
  app.controller('NarrowItDownController', NarrowItDownController);
  app.service('MenuSearchService', MenuSearchService);
  app.service('MenueFromServerService', MenueFromServerService);
  // app.directive('foundItems', FoundItems);
  // app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
  //
  NarrowItDownController.$inject = ['$log', 'MenuSearchService'];

  function NarrowItDownController($log, MenuSearchService){
    var vm = this;

    vm.search_txt;
    vm.found = [];

    vm.getMenueItems = function(){
      vm.found = MenuSearchService.getMatchedMenuItems(vm.search_txt);
    };
  };

  MenuSearchService.inject = ['MenueFromServerService'];

  function MenuSearchService(MenueFromServerService){
    var service = this;
    service.allMenueItems = [];
    service.matched_items = [];

    service.getMatchedMenuItems = function(searchTerm) {

        var promise = MenueFromServerService.getMenuCategories();
        promise.then(function(response){
          service.allMenueItems = response.data;

          for (let item in service.allMenueItems){
            if (searchTerm in item.name)
            {
              service.matched_items.push(item);
            }
          }
        }).catch(function(error){
            console.log(error);
        });

        return service.matched_items;
      };
    };

    MenueFromServerService.inject = ['$http'];

    function MenueFromServerService($http){
      var service = this;

      service.getMenuCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      })
      return response;
    };

    service.getMenuForCategory = function (shortName) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: shortName
        }
      });

      return response;
    };

  };






})();






//
// (function(){
//   'use strict;'
//
//   var app = angular.module('NarrowItDownApp', []);
//
//   app.controller('NarrowItDownController', NarrowItDownController);
//   app.service('MenuSearchService', MenuSearchService);
//   app.directive('foundItems', FoundItems);
//   app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
//
//   NarrowItDownController.$inject = ['$log', 'MenuSearchService'];
//
//   NarrowItDownController = function(MenuSearchService){
//     var vm = this;
//
//     vm.search_txt;
//     vm.found = [];
//
//     vm.getMenueItems = function(){
//       vm.found = MenuSearchService.getMatchedMenuItems(vm.search_txt);
//     };
//
//
//   };
//
//   MenuSearchService.inject = ['$http'];
//
//   MenuSearchService = function($http){
//     var service = this;
//
//     service.getMatchedMenuItems = function(searchTerm) {
//         var response = getMenueFromServer();
//         var allMenueItems = response.data;
//         var matched_items = [];
//
//         for (let item in allMenueItems){
//           if (searchTerm in item.name)
//           {
//             matched_items.push(item);
//           }
//         }
//
//         return matched_items;
//     };
//
//     service.getMenueFromServer = function(){
//       var response = $http({
//         method: "GET",
//         url: (ApiBasePath + "/categories.json")
//       });
//
//       return response;
//     };
//
//   };
//
// });

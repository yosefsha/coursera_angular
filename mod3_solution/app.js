(function(){
'use strict';
  var ApiBasePath = "https://davids-restaurant.herokuapp.com"

  var app = angular.module('NarrowItDownApp', []);
  app.controller('NarrowItDownController', NarrowItDownController);
  app.service('MenuSearchService', MenuSearchService);
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

  MenuSearchService.inject = ['$http'];

  function MenuSearchService($http){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        var response = getMenueFromServer();
        var allMenueItems = response.data;
        var matched_items = [];

        for (let item in allMenueItems){
          if (searchTerm in item.name)
          {
            matched_items.push(item);
          }
        }

        return matched_items;
    };

    function getMenueFromServer(){
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
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

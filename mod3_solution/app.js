(function(){
'use strict';
  var ApiBasePath = "https://davids-restaurant.herokuapp.com"

  var app = angular.module('NarrowItDownApp', []);
  app.controller('NarrowItDownController', NarrowItDownController);
  app.service('MenuSearchService', MenuSearchService);
  app.service('MenueFromServerService', MenueFromServerService);
  app.directive('foundItems', FoundItems);
  // app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
  //
  NarrowItDownController.$inject = ['$log', 'MenuSearchService'];

  function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundList: '<'
      }
    }
    return ddo;
  }
      // onRemove: '&'  }
    // controller: ShoppingListDirectiveController,
    // controllerAs: 'list',
    // bindToController: true


  function NarrowItDownController($log, MenuSearchService){
    var vm = this;
    vm.search_txt;
    vm.found = [];

    vm.getMenueItems = function(){
      var promise = MenuSearchService.getMatchedMenuItems(vm.search_txt);
      promise.then(function(result){
        vm.found = result.matched_items
      }).catch((error)=>{
        console.log(error);
      });
    };
  };


  MenuSearchService.inject = ['$q', 'MenueFromServerService'];
  function MenuSearchService($q, MenueFromServerService){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {

        var defered = $q.defer();

        var result = {
          matched_items: []
        }

        var promise = MenueFromServerService.getMenuCategories();
        promise.then(function(response){
          var allMenueItems = response.data;

          for (var i=0; i < allMenueItems.length; i++){
            let item = allMenueItems[i];
            if (item.name.indexOf(searchTerm) !== -1)
            {
              result.matched_items.push(item);
            }
          }

          if (result.matched_items.length > 0){
            defered.resolve(result);
          }
          else {
            defered.reject(result);
          }
      })

      return defered.promise
    }
  }

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


(function(){

angular.module('MenuApp').service('MenuSearchService', MenuSearchService);
angular.module('MenuApp').service('MenueFromServerService', MenueFromServerService);

MenuSearchService.$inject = ['$q', 'MenueFromServerService'];

function MenuSearchService($q, MenueFromServerService){
    var service = this;

    service.getMenuCategories = function() {
      // return MenueFromServerService.getMenuCategories()
      var defered = $q.defer();
      var data;

      MenueFromServerService.getMenuCategories()
      .then(function(response){
        data = response.data

        if (response.status == 200){
          defered.resolve(data);
        }
        else {
          defered.reject(data);
        }
      })
    return defered.promise
    }
    
    service.getMenuForCategory = function(category_short_name){
      var defered = $q.defer();
      var data;

      MenueFromServerService.getMenuForCategory(category_short_name)
      .then(function(response){
        data = response.data

        if (response.status == 200){
          defered.resolve(data);
        }
        else {
          defered.reject(data);
        }
      })
    return defered.promise
    }
    service.getMatchedMenuItems = function(searchTerm) {
        var defered = $q.defer();

        var result = {
          matched_items: []
        }

        MenueFromServerService.getMenuItems()
        .then(function(response){
          var allMenueItems = response.data.menu_items;

          for (var i=0; i < allMenueItems.length; i++){
            let item = allMenueItems[i];
            if (item.description.indexOf(searchTerm) !== -1)
            {
              result.matched_items.push(item);
            }
          }

          if (result.matched_items.length > 0 && searchTerm.length > 0){
            defered.resolve(result);
          }
          else {
            defered.reject(result);
          }
        })
      return defered.promise
    }
  }

  MenueFromServerService.$inject = ['$http'];
  function MenueFromServerService($http){
    var service = this;
    ApiBasePath = "https://davids-restaurant.herokuapp.com"
    service.getMenuCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
        })
      return response;
      };

    service.getMenuItems = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
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

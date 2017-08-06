(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http','$q', 'ApiPath'];
function MenuService($http, $q, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getSingelMenuItem = function(item_short_name){

    var defered = $q.defer();
    var data;

    $http.get(ApiPath + '/menu_items/'+ item_short_name + '.json')
    .then(function(response){
      data = response.data;

      if (response.status == 200){
        defered.resolve(data);
      }
      else {
        console.log("status: " + response.status)
        defered.reject(data);
      }
    })

  return defered.promise

  }
}






})();

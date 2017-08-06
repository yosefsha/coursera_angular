(function (){
'use strict;'

angular.module('common')
.service('UsersService', UsersService);

UsersService.$inject = [''];

function UsersService() {
  var service = this;

  service.users = [];

  service.addUser = function(first_name, last_name, email, phone, favorite_item){
    // add data validation here!

    var user = {
      "first_name": first_name,
      "last_name":last_name,
      "email": email,
      "phone": phone,
      "favorite_item": favorite_item
    }
    service.users.push(user)
  }

  service.getUser = function(){
    //currently returns last element further dev to get by name or other params
    if (service.users.length > 0){
      return service.users[service.users.length - 1];
      }
    }


  service.getAll = function(){
    return service.users;
  }
//
}


})()
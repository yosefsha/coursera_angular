(function (){
'use strict;'

angular.module('public')
.service('UsersService', UsersService);

// UsersService.$inject = [''];

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
    console.log("user added: " + service.users)
    console.log(service.users);
  }
  service.getAll = function(){
    return service.users;
  }

  service.getUser = function(){
    if (service.users.length > 0){
      return service.users[0]
    }
  }

}


})()
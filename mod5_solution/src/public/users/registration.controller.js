(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['UsersService','MenuService'];

function RegistrationController(UsersService, MenuService) {
  var $ctrl = this;

  $ctrl.newUser = {
    "first_name": undefined,
    "last_name":undefined,
    "email": undefined,
    "phone": undefined,
    "favorite_item": undefined
  };

  $ctrl.submit = function(){
      MenuService.getSingelMenuItem($ctrl.newUser.favorite_item).then(
        function(resolved){
          UsersService.addUser($ctrl.newUser.first_name,
                              $ctrl.newUser.last_name,
                              $ctrl.newUser.email,
                              $ctrl.newUser.phone,
                              $ctrl.newUser.favorite_item);

        }, function(rejected){
          console.log("wrong user data");
        }
      )
  }
}


})();

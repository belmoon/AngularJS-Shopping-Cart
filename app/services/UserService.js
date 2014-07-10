'use strict';
angular.module('store.UserService', []).
    factory('UserService', function(){
       var current_user;

        return{
            getCurrentUser: function(){
                return current_user;
            },
            setCurrentUser: function(user){
                current_user = user;
            },
            logout: function () {
                current_user = null;
            }
        }
    });
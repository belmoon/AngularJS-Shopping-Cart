/**
 * Created by Lei on 2014/6/18.
 */
'use strict';
angular.module("store")
    .constant("authUrl", "http://localhost:2403/users")
    .controller("LoginCtrl", function ($scope, $http, $location, authUrl, UserService) {
        $scope.authFunc = function (username, password) {
            var url = "http://localhost:2403/users?callback=JSON_CALLBACK";
            /**
             * For some reason, Deployd is not able to pull password, so I can only validate username
             */
            $http.get(url).then(function (resp) {
                angular.forEach(resp.data, function (user) {
                    if (username == user.username){
                        UserService.setCurrentUser(user);
                        $location.path("/cart");
                    }
                });
                $scope.store.error = "Invalid username or password !";
            })
        }
    })
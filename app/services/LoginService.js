/**
 * Created by Lei on 2014/6/18.
 */
'use strict';
angular.module("store.LoginService")
    .constant("authUrl", "http://localhost:5500/users/login")
.controller("AuthCtrl", function ($scope, $http, $location, authUrl) {
        $scope.authenticate = function (username, password) {
            $http.post(authUrl, {
                username: username,
                password: password
            }, {
                withCredentials: true
            }).success(function (data) {
                $location.path("/cart");
            }).error(function (error) {
                $scope.authenticationError = error;
            })
        }
    })
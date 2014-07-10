/**
 * Created by Lei on 7/5/2014.
 */
'use strict';
angular.module('store')
    .controller('MainCtrl', ['$scope', '$http', '$location','UserService',function($scope, $http, $location, UserService){
        //name, desc, sku, price, quantity, recommended, rating
        $scope.store = {};
        $scope.cart = {};
        /**
         * Data for array in shopping cart
         * @type {Array}
         */
        $scope.store.userProducts = [];
        $scope.cart.total = 0.00;
        $scope.cart.totalQuantity = 0;
        $scope.cart.standardShippingPrice = 5.99;
        /**
         * Loading all the products from JSON
         */
        $scope.getProducts = function () {
            var url = "http://localhost:2403/products?callback=JSON_CALLBACK"
            $http.get(url).success(function (data) {
                $scope.store.products = data;
            }).error(function (error) {
                $scope.store.error = error;
            })
        }
        $scope.getProducts();

        /**
         * Check if user is logged in, if not, redirect to login page
         */
        $scope.isUserLoggedIn = function () {
            var user = UserService.getCurrentUser();
            if (user == null || user.username == null){
                $location.path("/login");
            }else{
                $location.path("/cart");
            }
        }

        /**
         * Once user clicks logout, redirect user to home page and make sure object empty.
         */
        $scope.logoutClick = function () {
            UserService.logout();
            $location.path('/');
        }

        $scope.getCurrentPath = function (currentPath) {
            return $location.path() == currentPath;
        }
    }]);

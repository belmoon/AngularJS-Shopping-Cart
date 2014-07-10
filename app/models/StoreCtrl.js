/**
 * Created by Lei on 7/5/2014.
 */
'use strict';

angular.module('store')
    .constant("selectedSkuStyle", "btn-primary")
    .controller('StoreCtrl', ['$scope','$location','UserService', function($scope, $location, UserService, selectedSkuStyle){

        /**
         * Getting called when page loads, this function will display unique categories on the navigation bar
         */
        $scope.init = function () {
            $scope.uniqueSkus = [];
            var keys = {};
            for (var i = 0; i < $scope.store.products.length; i++){
                var val = $scope.store.products[i].sku;
                if (angular.isUndefined(keys[val])){
                    keys[val] = true;
                    $scope.uniqueSkus.push(val);
                }
            }
        }


        var selectedCategory = null;
        $scope.selectCategory = function (sku) {
            selectedCategory = sku;
        }

        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.sku == selectedCategory;
        }

        $scope.markSelectedSku = function (sku) {
            return selectedCategory == sku ? selectedSkuStyle : "";
        }

        $scope.addToCart = function(name, quantity, price){
            /**
             * Check if user is logged in, if not redirect user to login.html
             */
            var user = UserService.getCurrentUser();
            if (user == null || user.username == null)
                $location.path("/login");

            $scope.cart.total = $scope.cart.total + parseFloat(price);
            $scope.cart.totalQuantity = $scope.cart.totalQuantity + 1;

            if ($scope.store.userProducts.length == 0){//If user's shopping cart is empty
                angular.forEach($scope.store.products, function(product){
                    if (product.name === name){
                        $scope.store.userProducts.push(product);
                        product.quantity = product.quantity - 1;
                        product.checkedQuantity = parseInt(product.checkedQuantity) + 1;
                    }
                });
            }else{
                angular.forEach($scope.store.products, function(product){
                    if(product.name === name){
                        var notFound = true;
                        angular.forEach($scope.store.userProducts, function(userProduct){
                            if (userProduct.name === name){
                                notFound = false;
                            }
                        });
                        if(notFound){
                            $scope.store.userProducts.push(product);
                        }
                        product.checkedQuantity = parseInt(product.checkedQuantity) + 1;
                        product.quantity = product.quantity - 1;
                    }
                });
            }
        }
        
        //Pagination for the products
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
        $scope.totalItems = 25;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.numPages = function () {
            return Math.ceil($scope.store.products.length / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function(){
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
            $scope.filteredProducts = $scope.store.products.slice(begin, end);
        });
    }]);


'use strict';
angular.module('store').
    controller('CartCtrl', ['$scope', function($scope){
        var bodyRef = angular.element(angular.$document);

        $scope.backToStoreClick = function(){
        }

        $scope.clearCartClick = function(){
            var products = angular.copy($scope.store.userProducts);
            angular.forEach(products, function(product){
                $scope.removeFromCartClick(product);
            });
        }

        $scope.removeFromCartClick = function(product){
            var curQuantity = product.checkedQuantity;
            for (var i = 0; i < curQuantity; i++){
                $scope.changeQuantityClick(product.name, product.price, 'decrease');
            }
            $scope.store.userProducts.splice($scope.store.userProducts.indexOf(product),1);
        }

        $scope.changeQuantityClick = function(name, price, action){
            if (action === 'increase'){
                $scope.cart.total = $scope.cart.total + parseFloat(price);
                $scope.cart.totalQuantity++;
            }else if (action === 'decrease'){
                $scope.cart.total = $scope.cart.total - parseFloat(price);
                $scope.cart.totalQuantity--;
            }

            //Change the quantity for the corresponding product
            angular.forEach($scope.store.products, function(product){
                if (name === product.name){
                    if (action === 'increase'){
                        product.checkedQuantity++;
                        product.quantity--;
                    }else if (action === 'decrease'){
                        product.checkedQuantity--;
                        product.quantity++;
                    }
                }
            });
        }

        $scope.orderSummaryClick = function(){
            $scope.isCollapsed = !$scope.isCollapsed;
        }

        $scope.isCollapsed = true;
    }]);

'use strict';
angular.module('store').
    controller('ProductCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http){
        var baseUrl = "http://localhost:2403/products/";
        $scope.product = {};

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];

        $scope.getProduct = function(name){
            angular.forEach($scope.store.products, function(product){
                if (name == product.name){
                    $scope.product = product;
                }
            });
        }

        $scope.getProduct($routeParams.name);

        $scope.rateMe = function (product, rating, index) {
            var prodId = $scope.product.id;
            rating = parseInt(rating);

            if (rating == index + 1){
                product.rating--;
            }

            if (rating == index){
                product.rating++;
            }

            $http({
                url: baseUrl + prodId,
                method: "PUT",
                data: product
            }).success(function (newProd) {
                $scope.getProduct(newProd.name);
            });
        }

    }])

//    filter('range', function(){
//       return function(output, total, rating){
//           total = parseInt(total);
//           rating = parseInt(rating);
//
//           for (var i= 0; i<rating; i++)
//               output.push(1);
//           for (var i = 0; i < total - rating; i++)
//               output.push(0);
//           return output;
//       };
//    });

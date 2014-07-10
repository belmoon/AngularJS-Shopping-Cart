/**
 * Created by Lei on 7/8/2014.
 */

'use strict';

angular.module('store')
.controller('CheckoutCtrl', ['$scope', function ($scope) {
        $scope.isPay = true;
        $scope.transactionComplete = false;

        $scope.complete = function () {
            $scope.transactionComplete = true;
            //Once user checks out, make the shopping cart empty
            $scope.store.userProducts = [];
            $scope.cart.total = 0.00;
        }
    }]);
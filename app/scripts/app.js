/**
 * Created by Lei on 7/5/2014.
 */
'use strict';

angular.module('store', ['store.StoreService', 'store.UserService','store.Filters', 'store.Directives', 'ui.bootstrap']);

angular.module('store').config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider){
    $routeProvider.
        when('/', {
            templateUrl: 'models/store.html',
            controller: 'StoreCtrl',
            requireLogin: false
        }).
        when('/login', {
            templateUrl: 'models/login.html',
            controller: 'LoginCtrl'
        }).
        when('/cart', {
            templateUrl: 'models/cart.html',
            controller: 'CartCtrl',
            requireLogin: true
        }).
        when('/checkout',{
            templateUrl: 'models/checkout.html',
            controller: 'CheckoutCtrl'
        })
        .when('/product/:name', {
            templateUrl: 'models/product.html',
            controller: 'ProductCtrl',
            requireLogin: false
        }).
        otherwise({
            redirectTo: '/'
        });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers
        .common['X-Requested-With'];
}]);

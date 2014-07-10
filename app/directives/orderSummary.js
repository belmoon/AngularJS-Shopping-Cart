/**
 * Created by Lei on 7/8/2014.
 */
'use strict';
angular.module('store.Directives',[])
.directive('orderSummary', function () {
        return{
            scope:{
                standardShippingPrice: "=stdShipping"  ,
                total: "=total",
                pay: "=isPay"
            },
            link: function (scope, element, attrs) {
                scope.checkoutClick = function () {
                }

                scope.$watch('total', function(){
                    if (scope.total <= 0.00){
                        scope.orderSummaryPanelHide = true;
                    }
                });
            },
            restrict: 'E',
            templateUrl: 'directives/summary.html'
        }
    })
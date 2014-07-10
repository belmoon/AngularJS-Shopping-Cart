/**
 * Created by Lei on 7/8/2014.
 */
'use strict';

angular.module("store.Filters",[])
.filter('capitalize', function () {
        return function (data) {
            if (angular.isString(data)){
                return data.substring(0,1).toUpperCase() + data.substring(1);
            }else{
                return data;
            }
        }
    })
.filter('range', function(){
        return function(output, total, rating){
            total = parseInt(total);
            rating = parseInt(rating);

            for (var i= 0; i<rating; i++)
                output.push(1);
            for (var i = 0; i < total - rating; i++)
                output.push(0);
            return output;
        };
    });
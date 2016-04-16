/**
 * Created by Luis Ivan on 16/04/2016.
 */

var moviesWebServices = angular.module('moviesWebServices', ['ngResource']);

moviesWebServices.factory('moviePost', ['$resource',
    function($resource){
        return $resource('moviePost/:movies.json', {}, {
            query: {method:'POST', params:{movie_info:'back to the future'}, isArray:true}
        });
    }]);
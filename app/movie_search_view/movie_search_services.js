/**
 * Created by Luis Ivan on 16/04/2016.
 */

var moviesWebServices = angular.module('moviesWebServices', ['ngResource']);
/*
moviesWebServices.factory('moviePost', ['$resource',
    function($resource){
        return $resource('http://localhost:120/admin/movies/get_movie', {}, {
            query: {
                method: 'POST',
                params: {data: JSON.stringify({movie_info: '%Tony%'})},
                isArray: false,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }});
    }]);
*/
moviesWebServices.factory('moviePost', ['$resource',
    function($resource){
        return $resource('', {}, {
            get: {
                url: 'http://localhost:120/admin/movies/get_movie',
                method: 'POST',
                params: {data: '@data'},
                isArray: false,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            },
            add: {
                url: 'http://localhost:120/admin/insert/new_movie',
                method: 'POST',
                params: {data: '@data'},
                isArray: false,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            },
            get_movies_json: {
                url: 'movie_search_view/movies_json/movies.json',
                method: 'GET',
                params: {},
                isArray: true,
            },
        });
    }]);
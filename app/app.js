'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'movie_search_view',
  'myApp.version',
  'movie_home_view'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).run(function($rootScope)
{
  $rootScope.response = [];
});

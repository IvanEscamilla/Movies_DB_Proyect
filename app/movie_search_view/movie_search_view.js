/**
 * Created by Luis Ivan on 14/04/2016.
 */

'use strict';

angular.module('myApp.movie_search_view', ['ngRoute','ngMaterial'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'movie_search_view/movie_search_view.html',
            controller: 'movieSearchViewCtrl'
        });
    }])
    .controller('movieSearchViewCtrl',function ($scope, $mdSidenav) {
        $scope.openSettingsSideNav = function()
        {
            var settingsSN = $mdSidenav('settingsSideNav');
            settingsSN.open();
        };
    })
    .controller('settingsSideNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        $(document).off('mouseenter');
        $(document).on('mouseenter','md-list-item',function() {
            var svg = document.getElementById('movie_film');
            var element = svg.getElementById("film_path");
            element.setAttribute("fill", "rgb(216, 0, 39)");

            });
    });
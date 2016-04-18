/**
 * Created by Luis Ivan on 14/04/2016.
 */

'use strict';

    var test = angular.module('movie_search_view', ['ngRoute','ngMaterial', 'moviesWebServices'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'movie_search_view/movie_search_view.html'
        });
    }]);

    test.controller('movieSearchViewCtrl',function ($scope, $rootScope, $mdSidenav, moviePost) {
        $scope.movieArr = [];
        moviePost.get({data:JSON.stringify({movie_info: '%back to the future%'})}).$promise.then(function(response) {
            // success
            if(response.status == "OK")
            {
                $scope.movieArr = response.result;
            }
        }, function(errResponse) {
            // fail
        });

        $scope.openSettingsSideNav = function()
        {
            var settingsSN = $mdSidenav('settingsSideNav');
            settingsSN.open();
        };

        $scope.openSearchTextField = function()
        {
            var settingsSN = $mdSidenav('settingsSideNav');
            settingsSN.open();
        };

        $scope.searchMovie = function()
        {
            console.log($scope.search);
           moviePost.get({data:JSON.stringify({movie_info: '%'+$scope.search+'%'})}).$promise.then(function(response) {
                // success
                if(response.status == "OK")
                {
                    $scope.movieArr = response.result;
                }
            }, function(errResponse) {
                // fail
            });
        };

        $scope.returnGenders = function(gendersObj)
        {
            var genders = "";

            for(var i = 0; i < gendersObj.length; i++)
            {
                genders += gendersObj[i].gender + " ";
            }

            return genders;
        };

        $scope.returnCountries = function(countriesObj)
        {
            var countries = "";

            for(var i = 0; i < countriesObj.length; i++)
            {
                countries += countriesObj[i].country + " ";
            }

            return countries;
        };

        $scope.returnLanguages = function(languagesObj)
        {
            var languages = "";

            for(var i = 0; i < languagesObj.length; i++)
            {
                languages += languagesObj[i].language + " ";
            }

            return languages;
        };

    });

    test.directive('doSearch', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.doSearch);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    test.controller('settingsSideNavCtrl', function ($scope, $timeout, $mdSidenav, moviePost) {

        var mov = moviePost.get_movies_json();

        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        $scope.initMovies = function()
        {
            for(var i = 0; i<mov.length;i++)
            {
                moviePost.add({data:JSON.stringify({movie: mov[i]})});
            }
        };


        $(document).off('mouseenter');
        $(document).on('mouseenter','md-list-item',function() {
            var svg = document.getElementById('movie_film');
            var element = svg.getElementById("film_path");
            element.setAttribute("fill", "rgb(216, 0, 39)");

            });
    });


    test.config(function($mdThemingProvider) {
        //change default color for warn
        var white = $mdThemingProvider.extendPalette('grey', {
            '500': 'ffffff'
        });
        $mdThemingProvider.definePalette('grey', white);
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('blue-grey').dark().foregroundPalette[3]  ='rgba(198,198,198,0.9)';

        $mdThemingProvider.theme('toolbar', 'default')
            .primaryPalette('light-blue').dark().foregroundPalette[3]  ='rgba(255,255,255,0.9)';

        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('grey')
            .dark();
    });

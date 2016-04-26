/**
 * Created by Luis Ivan on 14/04/2016.
 */

'use strict';

    var test = angular.module('movie_search_view', ['ngRoute','ngMaterial', 'moviesWebServices','json-print'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'movie_search_view/movie_search_view.html'
        });
    }]);

    test.controller('movieSearchViewCtrl',function ($scope, $rootScope, $mdDialog, $mdSidenav, moviePost) {
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

        $scope.getFromOmdb = function()
        {
            moviePost.getOmdb({t:$scope.search, plot:"short", r:"json"}).$promise.then(function(response) {
                // success
                var response = response;
                if(response.Response != "False") {
                    // insert to database
                    moviePost.add({data: JSON.stringify({movie: response})}).$promise.then(function(response) {
                        // success
                        moviePost.get({data:JSON.stringify({movie_info: $scope.search})}).$promise.then(function(response) {
                            // success
                            if(response.status == "OK")
                            {
                                $scope.movieArr = response.result;
                            }
                        }, function(errResponse) {
                            // fail
                        });
                    }, function(errResponse) {
                        // fail
                    });

                }
            }, function(errResponse) {
                // fail
            });
        };

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

    function DialogController($scope, $mdDialog, moviePost) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        $scope.stopLoader = function () {
            console.log("Stop Loader!!");

        };

        $scope.testPost = function () {
            console.log("Test Post whit loader!!");
            $scope.myVar = 'spinner-container';
            $scope.finished = false;

            moviePost.dumpdb().$promise.then(function(response) {
                // success
                if(response.status == "OK")
                {
                    console.log(response.schema_json);
                    $scope.myVar = 'spinner-container-finished';
                    $scope.finished = true;
                }
            }, function(errResponse) {
                // fail
                console.log("algo salio mal!!");
                $scope.myVar = 'spinner-container-failed';
                $scope.finished = true;
            });
        };

        $scope.testFailure = function () {
            console.log("Test Post whit loader failure case!!");
            $scope.myVar = 'spinner-container';
            $scope.finished = false;

            moviePost.dumpdb().$promise.then(function(response) {
                // success
                if(response.status == "OK")
                {
                    console.log(response.schema_json);
                    $scope.myVar = 'spinner-container-failed';
                    $scope.finished = true;
                }
            }, function(errResponse) {
                // fail
                console.log("algo salio mal!!");
                $scope.myVar = 'spinner-container-failed';
                $scope.finished = true;
            });
        };

        $scope.dumpDb = function (input) {
            console.log("Dump!!");
            $scope.indent = 4;
            $scope.jsonObj = {};
            moviePost.dumpdb().$promise.then(function(response) {
                // success
                if(response.status == "OK")
                {
                    //console.log(response.schema_json);
                    //console.log(response.schema_xml);
                    $scope.jsonObj = response.schema_json;
                    $scope.jsonStr = JSON.stringify($scope.jsonObj, null, 4);
                    //$scope.xml = response.schema_xml;
                }
            }, function(errResponse) {
                // fail
            });
        };

        $scope.processWar = function (input) {
            console.log("war begin");

            moviePost.wargame({data:JSON.stringify({data: input})}).$promise.then(function(response) {
                // success
                if(response.status == "OK")
                {
                    console.log(response.endWar);
                    $scope.output = response.endWar;
                }
            }, function(errResponse) {
                // fail
            });
        };


    }

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

    test.controller('settingsSideNavCtrl', function ($scope, $timeout, $mdDialog, $mdMedia,$mdSidenav, moviePost) {

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

        $scope.exportarBD = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'movie_search_view/movies_dialogs_templates/dump_db.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            }).then(function(answer) {
                console.log(answer);
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        $scope.testSpinner = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'movie_search_view/movies_dialogs_templates/BM_spinnerdialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            }).then(function(answer) {
                console.log(answer);
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        $scope.showPrompt = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'movie_search_view/movies_dialogs_templates/war_game.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            }).then(function(answer) {
                console.log(answer);
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
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

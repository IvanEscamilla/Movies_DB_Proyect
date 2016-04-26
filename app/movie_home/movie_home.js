/**
 * Created by Luis Ivan on 25/04/2016.
 */

/**
 * Created by Luis Ivan on 14/04/2016.
 */

'use strict';

var homeModule = angular.module('movie_home_view', ['ngRoute','ngMaterial', 'moviesWebServices'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'movie_home/movie_home.html'
        });
    }]);

homeModule.controller('movieHomeViewCtrl',function ($scope, $rootScope, $mdDialog, $mdSidenav, moviePost) {

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

homeModule.config(function($mdThemingProvider) {
    var customPrimary = {
        '50': '#5097dd',
        '100': '#3b8ad9',
        '200': '#287dd2',
        '300': '#2470bd',
        '400': '#2064a7',
        '500': '#1C5792',
        '600': '#184a7d',
        '700': '#143d67',
        '800': '#103152',
        '900': '#0c243c',
        'A100': '#65a3e2',
        'A200': '#7bb0e6',
        'A400': '#90bdea',
        'A700': '#071727'
    };
    $mdThemingProvider
        .definePalette('customPrimary',
            customPrimary);

    var customAccent = {
        '50': '#000a08',
        '100': '#00231d',
        '200': '#003d31',
        '300': '#005646',
        '400': '#00705a',
        '500': '#00896f',
        '600': '#00bc97',
        '700': '#00d6ac',
        '800': '#00efc0',
        '900': '#0affcf',
        'A100': '#00bc97',
        'A200': '#00a383',
        'A400': '#00896f',
        'A700': '#23ffd4'
    };
    $mdThemingProvider
        .definePalette('customAccent',
            customAccent);

    var customWarn = {
        '50': '#ffb280',
        '100': '#ffa266',
        '200': '#ff934d',
        '300': '#ff8333',
        '400': '#ff741a',
        '500': '#ff6400',
        '600': '#e65a00',
        '700': '#cc5000',
        '800': '#b34600',
        '900': '#993c00',
        'A100': '#ffc199',
        'A200': '#ffd1b3',
        'A400': '#ffe0cc',
        'A700': '#803200'
    };
    $mdThemingProvider
        .definePalette('customWarn',
            customWarn);

    var customBackground = {
        '50': '#404040',
        '100': '#333333',
        '200': '#262626',
        '300': '#1a1a1a',
        '400': '#0d0d0d',
        '500': '#000',
        '600': '#000000',
        '700': '#000000',
        '800': '#000000',
        '900': '#000000',
        'A100': '#4d4d4d',
        'A200': '#595959',
        'A400': '#666666',
        'A700': '#000000'
    };
    $mdThemingProvider
        .definePalette('customBackground',
            customBackground);

    $mdThemingProvider.theme('default')
        .primaryPalette('customPrimary')
        .accentPalette('customAccent')
        .warnPalette('customWarn')
        .backgroundPalette('customBackground');
});


(function(angular) {
    'use strict';

    // window.Util = new UtilConstructor();

    var musicApp = angular.module('musicApp', [
            'ngRoute',
            'ngResource',
            'angularUtils.directives.dirPagination'
    ]);


    musicApp
        .config([
            '$routeProvider',
            '$locationProvider',
            '$resourceProvider',
            '$interpolateProvider',
            '$httpProvider',
            function(
                $routeProvider,
                $locationProvider,
                $resourceProvider,
                $interpolateProvider,
                $httpProvider) {

            var partials_dir = '/static/views';
            $resourceProvider.defaults.stripTrailingSlashes = false;

            $routeProvider.
            when('/music_app/', {
                templateUrl: partials_dir + '/home.html',
                controller: 'HomeCtrl'
            }).
            when('/music_app/genres/', {
                templateUrl: partials_dir + '/genres.html',
                controller: 'GenreCtrl'
            }).
            when('/music_app/update_track/:track_id', {
                templateUrl: partials_dir + '/update_track.html',
                controller: 'HomeCtrl'
            }).
            when('/music_app/update_genre/:genre_id', {
                templateUrl: partials_dir + '/update_genre.html',
                controller: 'GenreCtrl'
            }).
            otherwise({
                controller : function(){
                    window.location.replace('/music_app/');
                },
                template : '<div></div>'

            });

            $interpolateProvider.startSymbol('{[{');
            $interpolateProvider.endSymbol('}]}');

            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });

            // $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }]);
})(angular);

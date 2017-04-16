(function(angular) {
    'use strict';

    // window.Util = new UtilConstructor();

    var musicApp = angular.module('musicApp', [
            'ngRoute',
            'ngResource'
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
            otherwise({
                controller : function(){
                    window.location.replace('/music_app');
                },
                template : '<div></div>'

            });

            $interpolateProvider.startSymbol('{[{');
            $interpolateProvider.endSymbol('}]}');

            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });

            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }]);

        // .run(['$rootScope', '$location', '$cookieStore', '$http',
        //     function ($rootScope, $location, $cookieStore, $http) {
        //     // keep user logged in after page refresh
        //     $rootScope.globals = $cookieStore.get('globals') || {};
            
        //     if ($rootScope.globals.currentUser) {
        //         $http.defaults.headers.common['Authorization'] = 'Token ' + $rootScope.globals.currentUser.token; // jshint ignore:line
        //     }

        //     $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //         // redirect to login page if not logged in
        //         if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
        //             $location.path('/login');
        //         }
        //     });
        // }]);

})(angular);

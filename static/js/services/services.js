(function(angular) {
    'use strict';

    var musicApp = angular.module('musicApp');
    
        musicApp

        // Order resources
        .factory('TrackResource', ['$resource',
            function($resource) {
                return $resource('/music_app/tracks/', {}, {
                    get: {
                        method: 'GET',
                        isArray: false
                    }
                });
            }
        ])

})(angular);
(function(angular) {
    'use strict';

    var musicApp = angular.module('musicApp');
    
        musicApp

        // Track resources
        .factory('TrackResource', ['$resource',
            function($resource) {
                return $resource('/music_api/tracks/', {}, {
                    get: {
                        method: 'GET'
                    }
                });
            }
        ])

        .factory('TrackRetrieveResource', ['$resource',
            function($resource) {
                return $resource('/music_api/tracks/:trackId/', {}, {
                    get: {
                        method: 'GET'
                    },
                    update: {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        isArray: false
                    }
                });
            }
        ])

})(angular);
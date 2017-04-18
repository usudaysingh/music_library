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
                    },
                    create:{
                        method: 'POST'
                    }
                });
            }
        ])

        // Track resources
        .factory('genreResource', ['$resource',
            function($resource) {
                return $resource('/music_api/genres/', {}, {
                    get: {
                        method: 'GET'
                    },
                    create:{
                        method: 'POST'
                    }
                });
            }
        ])

        .factory('TrackRetrieveResource', ['$resource',
            function($resource) {
                return $resource('/music_api/tracks/:trackId', {}, {
                    get: {
                        method: 'GET',
                        params: {
                            trackId: '@trackId'
                        },
                    },
                    update: {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            trackId: '@trackId'
                        },
                    }
                });
            }
        ])

        .factory('GenreRetrieveResource', ['$resource',
            function($resource) {
                return $resource('/music_api/genres/:genreId', {}, {
                    get: {
                        method: 'GET',
                        params: {
                            genreId: '@genreId'
                        },
                    },
                    update: {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            genreId: '@genreId'
                        },
                    }
                });
            }
        ])

        .factory('AddTrackGenreResource', ['$resource',
            function($resource) {
                return $resource('/music_api/add_track_genre/', {}, {
                    add: {
                        method: 'POST'
                    }
                });
            }
        ])

        .factory('DeleteTrackGenreResource', ['$resource',
            function($resource) {
                return $resource('/music_api/delete_track_genre/', {}, {
                    delete: {
                        method: 'POST'
                    }
                });
            }
        ])

})(angular);
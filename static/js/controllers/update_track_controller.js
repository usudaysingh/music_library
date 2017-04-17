(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('UpdateTrackCtrl',
        ['$scope','TrackRetrieveResource',
        function($scope,TrackRetrieveResource) {


            function getTrack() {
		    	TrackRetrieveResource.get({
		    		'trackId': window.location.pathname.split('/')[3]
		    	}, function(resp) {
		    		console.log(resp)
	                $scope.track = resp;
	                $scope.track_genres = resp.genres;
	            });
		    	return true;
		    }

		    getTrack();
		    $scope.updateTracks = function() {
		       	updateTrack();
		    };
            
    }]);

})(angular);




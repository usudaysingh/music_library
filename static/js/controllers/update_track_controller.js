(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('UpdateTrackCtrl',
        ['$scope','TrackRetrieveResource','AddTrackGenreResource','DeleteTrackGenreResource',
        function($scope,TrackRetrieveResource,AddTrackGenreResource,DeleteTrackGenreResource) {


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

		    $scope.updateTrack = function(form) {
		    	$scope.form.$submitted=true;
		       	if ($scope.form.$valid) {
		       		TrackRetrieveResource.update({
		    			"trackId": window.location.pathname.split('/')[3],
		    			"track_name": $scope.edit_title,
        				"singer": $scope.edit_singer,
        				"rating": $scope.edit_rating	
		    	}, function(resp) {
	                $scope.track = resp;
	                $scope.form.$submitted=false;
	                $('#updateTrack').modal('hide'); 
	                $scope.edit_title = '';
	                $scope.edit_singer = '';
	                $scope.edit_rating = '';
	            },
	            function(error) {
	            	// TODO: Show error messgae here.
				});
		    	return true;
		       	}
		    };

		    $scope.deleteTrack = function(genre_id){
		    	DeleteTrackGenreResource.delete({
		    			"track_id": window.location.pathname.split('/')[3],
		    			"genre_id": [genre_id],	
		    	}, function(resp) {
	                console.log(resp);
	                debugger;
	            },
	            function(error) {
	            	// TODO: Show error messgae here.
				});
		    }
            
    }]);

})(angular);




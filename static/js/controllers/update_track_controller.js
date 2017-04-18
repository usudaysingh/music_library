(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('UpdateTrackCtrl',
        ['$scope','TrackRetrieveResource','AddTrackGenreResource','DeleteTrackGenreResource',
        function($scope,TrackRetrieveResource,AddTrackGenreResource,DeleteTrackGenreResource) {

        	$scope.track_id = window.location.pathname.split('/')[3]

            function getTrack() {
		    	TrackRetrieveResource.get({
		    		'trackId': $scope.track_id
		    	}, function(resp) {
	                $scope.track = resp;
	                $scope.track_genres = resp.genres;
	            });
		    	return true;
		    }

		    getTrack();

		    $scope.resetUpdateTrackForm = function(form){
		    		$scope.form.$submitted=false;
		    		$scope.edit_title = '';
	                $scope.edit_singer = '';
	                $scope.edit_rating = '';
		    }

		    $scope.updateTrack = function(form) {
		    	$scope.form.$submitted=true;
		       	if ($scope.form.$valid) {
		       		TrackRetrieveResource.update({
		    			"trackId": $scope.track_id,
		    			"track_name": $scope.edit_title,
        				"singer": $scope.edit_singer,
        				"rating": $scope.edit_rating	
		    	}, function(resp) {
	                $scope.track = resp;
	                $('#updateTrack').modal('hide');
	                $scope.resetUpdateTrackForm(form); 
	            },
	            function(error) {
	            	// TODO: Show error messgae here.
				});
		    	return true;
		       	}
		    };

		    // $scope.myCartItems.push(item);

		    $scope.deleteTrack = function(genre_id){
		    	DeleteTrackGenreResource.delete({
		    			"track_id": $scope.track_id,
		    			"genre_id": [genre_id],	
		    	}, function(resp) {
		    		location.reload();
	                console.log(resp);
	            },
	            function(error) {
	            	console.log(error);
				});
		    }

		    $scope.addGenre = function(genre_id){
		    	$scope.form.$submitted=true;
		       	if ($scope.form.$valid) {
			    	AddTrackGenreResource.add({
			    			"track_id": $scope.track_id,
			    			"genre_id": $scope.genre_ids,	
			    	}, function(resp) {
		                location.reload();
		            },
		            function(error) {
		            	var kl = error.data.invalid_genres[0];
		            	error = angular.toJson(kl);
		            	alert(error);
					});
			    }//valid
		    }
            
    }]);

})(angular);




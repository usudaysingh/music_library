(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('UpdateTrackCtrl',
        ['$scope','TrackRetrieveResource','AddTrackGenreResource','DeleteTrackGenreResource','genreResource',
        function($scope,TrackRetrieveResource,AddTrackGenreResource,DeleteTrackGenreResource,genreResource) {

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

		    function loadGenres(){
            	genreResource.get({
		    		'limit': 1000
		    	}, function(resp) {
	                $scope.genres = resp.results;
	            });
		    	return true;
            }
            loadGenres()

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

		    function Update_genre(valid_genres, action) {
		    	$('#addGenre').modal('hide');
		    	for(var j =0; j < valid_genres.length; j++){
			    	for (var i=0; i<$scope.genres.length; i++)
					{
						if(valid_genres[j] == $scope.genres[i].genre_id)
						{
							if (action == 'Add')
							{
								$scope.track_genres.push($scope.genres[i])
							}
							else
							{
								
							}
						}
					}
				}
		    }

		    $scope.deleteTrack = function(genre_id){
		    	DeleteTrackGenreResource.delete({
		    			"track_id": $scope.track_id,
		    			"genre_id": [genre_id],	
		    	}, function(resp) {
		    		location.reload();
		    		Update_genre(resp.valid_genres, 'Remove');
	            },
	            function(error) {
	            	Update_genre(error.valid_genres, 'Remove');
	            	console.log(error);var kl = error.data.invalid_genres[0];
		            error = angular.toJson(kl);
		            alert(error);
				});
		    }

		    $scope.addGenre = function(genre_id){
		    	$scope.form.$submitted=true;
		       	if ($scope.form.$valid) {
			    	AddTrackGenreResource.add({
			    			"track_id": $scope.track_id,
			    			"genre_id": $scope.genre_ids,	
			    	}, function(resp) {
			    		console.log($scope.genres);
			    		Update_genre(resp.valid_genres, 'Add');
		            },
		            function(error) {
		            	Update_genre(error.valid_genres, 'Add');
		            	var kl = error.data.invalid_genres[0];
		            	error = angular.toJson(kl);
		            	alert(error);
					});
			    }//valid
		    }
            
    }]);

})(angular);




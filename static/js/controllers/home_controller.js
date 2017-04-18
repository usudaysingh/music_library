(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('HomeCtrl',
        ['$scope','TrackResource','genreResource',
        function($scope,TrackResource,genreResource) {
            $scope.message = "yeah baby it is correct message."

            $scope.trackPerPage = 5;

            function loadGenres(){
            	genreResource.get({
		    		'limit': 1000
		    	}, function(resp) {
	                $scope.genres = resp.results;
	            });
		    	return true;
            }
            loadGenres()

            function getTracks(pageNumber) {
		    	TrackResource.get({
		    		'offset': (pageNumber - 1) * $scope.trackPerPage,
		    		'limit': $scope.trackPerPage
		    	}, function(resp) {
	                $scope.tracks = resp.results;
	                $scope.totalTracks = resp.count;

	            });
		    	return true;
		    }
		    getTracks(1);

		    $scope.searchTrack = function(form){
		    	TrackResource.get({
		    		'title': $scope.searchTrackName
		    	}, function(resp) {
	                $scope.tracks = resp.results;
	                $scope.totalTracks = resp.count;

	            });
		    };

		    $scope.updateTracks = function(newPage) {
		        getTracks(newPage);
		    };

		    $scope.addTrack = function(form){
		    	$scope.form.$submitted=true;
		    	if ($scope.form.$valid) {
					TrackResource.create({
		    		"track_name": $scope.title,
            		"singer": $scope.singer,
            		"rating": $scope.rating,
            		"genres": $scope.load_genres,
            		"multiple_genres":true
		    	}, function(resp) {
	                console.log(resp);
	                $('#add_track_modal').modal('hide'); 
	            },function(error) {
	            	console.log(error);
				});
		    	} //valid form
		    };
            
    }]);

})(angular);




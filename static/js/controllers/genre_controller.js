(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('GenreCtrl',
        ['$scope','genreResource',
        function($scope,genreResource) {
            
            $scope.addGenre = function(form) {
		    	$scope.form.$submitted=true;
		    	if ($scope.form.$valid) {
				genreResource.create({
		    		"genre_name": $scope.genre_name,
	    			"genre_type": $scope.genre_type
		    	}, function(resp) {
	                console.log(resp);
	                $('#add_genre_modal').modal('hide');
	            },function(error) {
	            	console.log(error);
				});
		    	} //valid form
		    };

		    $scope.searchGenre = function(form){

		    	genreResource.get({
		    		'title': $scope.searchGenreName
		    	}, function(resp) {
	                $scope.genres = resp.results;
	                $scope.totalGenres = resp.count;
	            });
		    };
            
    }]);

})(angular);




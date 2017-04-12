var count = 1;
var genre_count = 1;

function Load_tracks() {
	$.ajax({
        type: 'GET',
        url:'/music_app/tracks/?limit=10000',
        success: function (responseData, textStatus, jqXHR) {
        	tracks = responseData.results;
        	for(var i=0; i<tracks.length;i++)
        	{
        		$('#track_table').dataTable().fnAddData([
                        count++,
                        '<a href="#">'+tracks[i].track_name+'</a>',
                        tracks[i].singer,
                        tracks[i].genres.genre_name,
                        tracks[i].rating
                    ]);
        	}
        },
        error:function (jqXHR, textStatus, errorThrown){
         alert(errorThrown);
        }
    });
}

function addTrack() {
	var title = $('#title').val();
	var singer = $('#singer').val();
	var rating = $('#rating').val();
	var genre_name = $('#genre_name').val();
	var genre_type = $('#genre_type').val();

	if(title.length == 0 || singer.length == 0 || rating.length == 0 || genre_name.length == 0 || genre_type.length == 0)
	{
		alert('Please all fields of form.')
		return 0;
	}
	var pdata = {
	    "track_name": title,
	    "singer": singer,
	    "rating": rating,
	    "genres": {
	        "genre_name": genre_name,
	        "genre_type": genre_type
	    }
	}


	$.ajax({
            type: 'POST',
            headers: {
	            'Content-Type': 'application/json'
	        },
        	data: JSON.stringify(pdata),
            url:'/music_app/tracks/',
            success: function (responseData, textStatus, jqXHR) {
            	$('#track_table').dataTable().fnAddData([
                    count++,
                    '<a href="#">'+responseData.track_name+'</a>',
                    responseData.singer,
                    responseData.genres.genre_name,
                    responseData.rating
                ]);
                $('#add_track_modal').modal('hide'); 
            },
            error: function (jqXHR, errorThrown) {
                alert(errorThrown);
            } //error ends
        }); //request ends
}

function loadGenres() {
	$.ajax({
        type: 'GET',
        url:'/music_app/genres/',
        success: function (responseData, textStatus, jqXHR) {
        	genres = responseData.results;
        	for(var i=0; i<genres.length;i++)
        	{
        		$('#genre_table').dataTable().fnAddData([
                        genre_count++,
                        '<a href="#">'+genres[i].genre_name+'</a>',
                        genres[i].genre_type
                    ]);
        	}
        },
        error:function (jqXHR, textStatus, errorThrown){
         alert(errorThrown);
        }
    });
}

function addGenre(){

	var genrename = $('#genrename').val();
	var genretype = $('#genretype').val();

	if(genrename.length == 0 || genretype.length == 0)
	{
		alert('Please all fields of form.')
		return 0;
	}

	var genre_data = {
	    "genre_name": genrename,
	    "genre_type": genretype
	};

	$.ajax({
            type: 'POST',
            headers: {
	            'Content-Type': 'application/json'
	        },
        	data: JSON.stringify(genre_data),
            url:'/music_app/genres/',
            success: function (responseData, textStatus, jqXHR) {
            	$('#genre_table').dataTable().fnAddData([
                    genre_count++,
                    '<a href="#">'+responseData.genre_name+'</a>',
                    responseData.genre_type
                ]);
                $('#add_genre_modal').modal('hide'); 
            },
            error: function (jqXHR, errorThrown) {
                alert(errorThrown);
            } //error ends
        }); //request ends
}
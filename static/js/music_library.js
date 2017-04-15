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
                        '<a href="/music_app/update_track/'+tracks[i].track_id+'">'+tracks[i].track_name+'</a>',
                        tracks[i].singer,
                        tracks[i].rating
                    ]);
        	}
        },
        error:function (jqXHR, textStatus, errorThrown){
         alert(errorThrown);
        }
    });
}

function Load_genres()
{
    var html = '';
    $.ajax({
        type: 'GET',
        url:'/music_app/genres/?limit=10000',
        success: function (responseData, textStatus, jqXHR) {
            genres = responseData.results;
            for (var i=0; i<genres.length; i++){
                temp = '<option value="'+genres[i].genre_id+'">' + genres[i].genre_name + '</option>';
                html += temp;
              }
              temp = '<option selected="selected" value="0">New Genre</option>';
              html+= temp;
            $('#load_genres').html(html);
        },
        error:function (jqXHR, textStatus, errorThrown){
         alert(errorThrown);
        }
    });
}

function emptyTrackForm(){
    $('#title').val('');
    $('#singer').val('');
    $('#rating').val('');
    $('#genre_name').val('');
    $('#genre_type').val('');
    $('#genre2_name').val('');
    $('#genre2_type').val('');
    $('#load_genres').val('0');
    $('#manual_genre_block').css('display','block');
}

function get_genre_value(genre_id)
{
    var values = '';

    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        url:'/music_app/genres/'+String(genre_id),
        async:false,
        success: function (responseData, textStatus, jqXHR) {
            values = responseData;
        },
        error: function (jqXHR, errorThrown) {
            alert(errorThrown);
            value = errorThrown;
        } //error ends
    }); //request ends
    return values
}

function addTrack() {
	var title = $('#title').val();
	var singer = $('#singer').val();
	var rating = $('#rating').val();
	var genre_name = $('#genre_name').val();
	var genre_type = $('#genre_type').val();
    var genre2_name = $('#genre2_name').val();
    var genre2_type = $('#genre2_type').val();
    var multiple_genre = $('#multiple').val();

    if($('#load_genres').val().length == 1 && $('#load_genres').val()[0] == '0')
    {
        if(title.length == 0 || singer.length == 0 || rating.length == 0 || genre_name.length == 0 || genre_type.length == 0)
        {
            alert('Please all fields of form.')
            return 0;
        }
    }

    if (($('#load_genres').val()[0] == '0' && $('#load_genres').val().length == 1) && (genre2_type.length == 0 || genre2_name.length == 0))
    {
        var pdata = {
            "track_name": title,
            "singer": singer,
            "rating": rating,
            "genres": [{
                "genre_name": genre_name,
                "genre_type": genre_type
            } ],
            "multiple_genres":false
        }   
    }
    else if($('#load_genres').val().length > 1){
        var pdata = {
            "track_name": title,
            "singer": singer,
            "rating": rating,
            "genres": $('#load_genres').val(),
            "multiple_genres":true
        }
    }
    else
    {
        var pdata = {
            "track_name": title,
            "singer": singer,
            "rating": rating,
            "genres": [{
                "genre_name": genre_name,
                "genre_type": genre_type
            },{
                "genre_name": genre2_name,
                "genre_type": genre2_type
            }],
            "multiple_genres":false
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
                    '<a href="/music_app/update_track/'+responseData.track_id+'">'+responseData.track_name+'</a>',
                    responseData.singer,
                    responseData.rating
                ]);
                $('#add_track_modal').modal('hide'); 
                emptyTrackForm();
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
                        '<a href="/music_app/update_genre/'+genres[i].genre_id+'">'+genres[i].genre_name+'</a>',
                        genres[i].genre_type
                    ]);
        	}
        },
        error:function (jqXHR, textStatus, errorThrown){
         alert(errorThrown);
        }
    });
}

function emptyGenreForm()
{
    $('#genrename').val('');
    $('#genretype').val('');
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
                    '<a href="/music_app/update_genre/'+responseData.genre_id+'">'+responseData.genre_name+'</a>',
                    responseData.genre_type
                ]);
                $('#add_genre_modal').modal('hide'); 
                emptyGenreForm();
            },
            error: function (jqXHR, errorThrown) {
                alert(errorThrown);
            } //error ends
        }); //request ends
}

function emptyEditTrackForm(name, singer, rating){
    $('#edit_title').val('');
    $('#edit_singer').val('');
    $('#edit_rating').val('');
    $('#edit_title').attr("placeholder", name);
    $('#edit_singer').attr("placeholder", singer);
    $('#edit_rating').attr("placeholder", rating);
    $('#edit_track_name').html(name);
    $('#edit_track_singer').html(singer);
    $('#edit_track_rating').html(rating);
}

function update_track(track_id)
{
    var new_track_name = $('#edit_title').val();
    var new_track_singer = $('#edit_singer').val();
    var new_track_rating = $('#edit_rating').val();

    var update_track_data = {
        "track_name": new_track_name,
        "singer": new_track_singer,
        "rating": new_track_rating
    }

    if(new_track_rating.length == 0 && new_track_singer.length == 0 && new_track_name.length == 0)
    {
        alert('Please fill fields.')
        return 0;
    }

    if(new_track_rating.length == 0)
    {
        delete update_track_data['rating']
    }

    if(new_track_singer.length == 0)
    {
        delete update_track_data['singer'];
    }

    if(new_track_name.length == 0)
    {
        delete update_track_data['track_name']
    }    

    $.ajax({
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(update_track_data),
        url:'/music_app/tracks/' + String(track_id),
        success: function (responseData, textStatus, jqXHR) {
            emptyEditTrackForm(new_track_name, new_track_singer, new_track_rating);
            $('#edit_track_modal').modal('hide');
        },
        error: function (jqXHR, errorThrown) {
            alert(errorThrown);
        } //error ends
    }); //request ends
}

function emptyEditGenreForm(new_genre_name, new_genre_type)
{
    $('#edit_genre_type').val(new_genre_type);
    $('#edit_genre_name').val(new_genre_name);
    $("#label_genre_type").html(new_genre_type);
    $("#label_genre_name").html(new_genre_name);
}

function update_genre(genre_id)
{
    var new_genre_name = $('#edit_genre_type').val();
    var new_genre_type = $('#edit_genre_name').val();

    var update_genre_data = {
        "genre_name": new_genre_name,
        "genre_type": new_genre_type
    }

    if(new_genre_name.length == 0 && new_genre_type.length == 0)
    {
        alert('Please fill fields.')
        return 0;
    }  

    $.ajax({
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(update_genre_data),
        url:'/music_app/genres/' + String(genre_id),
        success: function (responseData, textStatus, jqXHR) {
            emptyEditGenreForm(new_genre_name, new_genre_type);
            $('#edit_genre_modal').modal('hide');
            location.reload();
        },
        error: function (jqXHR, errorThrown) {
            alert(errorThrown);
        } //error ends
    }); //request ends
}

function check_genre()
{
    if ($('#load_genres').val() == '0')
    {
        $('#manual_genre_block').css('display','block');
    }
    else
    {
        $('#manual_genre_block').css('display','none');
    }
}

function delete_track_genre(genre_id,track_id){
    var delete_genre_data = {
        "genre_id": [genre_id],
        "track_id": String(track_id)
    }

    var table = $('#track_genre_table').DataTable();

    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(delete_genre_data),
        url:'/music_app/delete_track_genre/',
        success: function (responseData, textStatus, jqXHR) {

            table.row($('tr:contains('+genre_id+')')).remove();
            table.draw();
            alert('Genre deleted')
        },
        error: function (jqXHR, errorThrown) {
            alert(errorThrown);
        } //error ends
    }); //request ends
}

function Track_Load_genres()
{
    var html = '';
    $.ajax({
        type: 'GET',
        url:'/music_app/genres/?limit=10000',
        success: function (responseData, textStatus, jqXHR) {
            genres = responseData.results;
            for (var i=0; i<genres.length; i++){
                temp = '<option value="'+genres[i].genre_id+'">' + genres[i].genre_name + '</option>';
                html += temp;
              }
            $('#track_load_genres').html(html);
        },
        error:function (jqXHR, textStatus, errorThrown){
         alert(errorThrown);
        }
    });
}

function track_add_genres(track_id){
    if($('#track_load_genres').val() == '0')
    {
        alert('Please select genre');
        return 0;
    }

    var add_genre_data = {
        "genre_id": $('#track_load_genres').val(),
        "track_id": String(track_id)
    };

    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(add_genre_data),
        url:'/music_app/add_track_genre/',
        success: function (responseData, textStatus, jqXHR) {
            location.reload();
        },
        error: function (jqXHR, errorThrown) {
            alert(errorThrown);
        } //error ends
    }); //request ends   
}
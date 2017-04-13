import json
import requests
from django.core.cache import cache
from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import render
from music_app.models import Tracks, Genres
from django.conf import settings
from django.views.generic import TemplateView, View

class HomeView(View):
	template = 'home.html'

	def get(self, request, *args, **kwargs):
		return render(request, self.template)

class GenreView(View):
	template = 'genre.html'

	def get(self, request, *args, **kwargs):
		return render(request, self.template)

class EditTrackView(View):
	template = 'update_track.html'

	def get(self, request, *args, **kwargs):
		track_id = kwargs.get('track_id')
		track_url = 'http://'+request.get_host()+'/music_app/tracks/'+track_id
		resp = requests.get(track_url)
		return render(request, self.template, {'track':resp.json()})

class EditGenreView(View):
	template = 'update_genre.html'

	def get(self, request, *args, **kwargs):
		genre_id = kwargs.get('genre_id')
		genre_url = 'http://'+request.get_host()+'/music_app/genres/'+ genre_id
		resp = requests.get(genre_url)
		return render(request, self.template, {'genre':resp.json()})
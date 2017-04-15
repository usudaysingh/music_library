import json
import datetime

from django.utils import timezone 
from rest_framework import viewsets
from .models import Tracks, Genres
from .serializers import GetTrackListSerializer,  CreateTrackSerializer, UpdateTrackSerializer,\
	GetGenreListSerializer,  CreateGenreSerializer, UpdateGenreSerializer, RetrieveTrackSerializer, \
	CreateTrackMultipleGenreSerializer, GenreOperationTrackSerializer
from rest_framework.response import Response
from rest_framework import permissions
from django.core.exceptions import PermissionDenied

class TrackViewset(viewsets.ModelViewSet):
	model = Tracks
	serializer_class = GetTrackListSerializer

	def get_serializer_class(self):
		serializer_action_classes = {
		    'create': CreateTrackSerializer,
		    'list': GetTrackListSerializer,
		}
		if hasattr(self, 'action'):
		    return serializer_action_classes.get(self.action, self.serializer_class)
		return self.serializer_class


	def get_queryset(self):
		queryset = self.model.objects.all()
		title = self.request.query_params.get('title')
		if title:
			queryset = queryset.filter(track_name = title)
			return queryset
		return queryset

	def create(self, request, *args, **kwargs):
		if request.data['multiple_genres']:
			serializer = CreateTrackMultipleGenreSerializer(data=request.data)
		else:
			serializer = self.get_serializer(data=request.data)
		
		if serializer.is_valid():
			track_instance = serializer.create(serializer.data)
			return Response(GetTrackListSerializer(track_instance).data)
		return Response(serializer.errors, status=500)

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		page = self.paginate_queryset(queryset)
		if page is not None:
			serialize = self.get_serializer(queryset, many=True)
			return self.get_paginated_response(serialize.data)
		
		serialize = self.get_serializer(queryset, many=True)
		return Response(serialize.data)


class UpdateRetrieveTrack(viewsets.ModelViewSet):
	'''
		Retrieve and update track
	'''

	model = Tracks
	serializer_class = RetrieveTrackSerializer

	def get_serializer_class(self):
		serializer_action_classes = {
		    'retrieve': RetrieveTrackSerializer,
		    'update': UpdateTrackSerializer,
		}
		if hasattr(self, 'action'):
		    return serializer_action_classes.get(self.action, self.serializer_class)
		return self.serializer_class


	def retrieve(self, request, *args, **kwargs):
		track_id = kwargs.get('track_id')
		try:
			data = self.model.objects.get(track_id=track_id)
			serializer = self.get_serializer(data)
			return Response(serializer.data)
		except Exception as ObjectDoesNotExist:
			error = {
				'error' :'Track does not exist please enter correct track id.'
			}
			return Response(error, status=500)

	def update(self, request, *args, **kwargs):
		track_id = kwargs.get('track_id')
		tracks = self.model.objects.filter(track_id=track_id)
		if tracks:
			serializer = self.get_serializer(data = request.data)
			if serializer.is_valid():
				request_data = serializer.data
				tracks.update(**request_data)
				return Response(serializer.data)
		else:
			error = {
				'error' :'Track does not exist please enter correct book id.'
			}
			return Response(error, status=500)
		return Response(serializer.errors, status=500)


class GenreViewSet(viewsets.ModelViewSet):
	model = Genres
	serializer_class = GetGenreListSerializer
	# queryset = Genres.objects.all()

	def get_serializer_class(self):
		serializer_action_classes = {
		    'create': CreateGenreSerializer,
		    'list': GetGenreListSerializer,
		}
		if hasattr(self, 'action'):
		    return serializer_action_classes.get(self.action, self.serializer_class)
		return self.serializer_class

	def get_queryset(self):
		queryset = self.model.objects.all()
		title = self.request.query_params.get('title')
		if title:
			queryset = queryset.filter(genre_name = title)
			return queryset
		return queryset

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			genre_instance = serializer.create(serializer.data)
			return Response(GetGenreListSerializer(genre_instance).data)
		return Response(serializer.errors, status=500)

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		page = self.paginate_queryset(queryset)
		if page is not None:
			serialize = self.get_serializer(queryset, many=True)
			return self.get_paginated_response(serialize.data)
		
		serialize = self.get_serializer(queryset, many=True)
		return Response(serialize.data)

class UpdateRetrieveGenre(viewsets.ModelViewSet):
	'''
		Retrieve and update track
	'''

	model = Genres
	serializer_class = GetGenreListSerializer

	def get_serializer_class(self):
		serializer_action_classes = {
		    'retrieve': GetGenreListSerializer,
		    'update': UpdateGenreSerializer,
		}
		if hasattr(self, 'action'):
		    return serializer_action_classes.get(self.action, self.serializer_class)
		return self.serializer_class


	def retrieve(self, request, *args, **kwargs):
		genre_id = kwargs.get('genre_id')
		try:
			data = self.model.objects.get(genre_id=genre_id)
			serializer = self.get_serializer(data)
			return Response(serializer.data)
		except Exception as ObjectDoesNotExist:
			error = {
				'error' :'Genre does not exist please enter correct genre id.'
			}
			return Response(error, status=500)

	def update(self, request, *args, **kwargs):
		genre_id = kwargs.get('genre_id')
		genres = self.model.objects.filter(genre_id=genre_id)
		if genres:
			serializer = self.get_serializer(data = request.data)
			if serializer.is_valid():
				request_data = serializer.data
				data_keys = request_data.keys()
				genres.update(**request_data)
				return Response(serializer.data)
		else:
			error = {
				'error' :'Genre does not exist please enter correct genre id.'
			}
			return Response(error, status=500)
		return Response(serializer.errors, status=500)

class EditTrackGenreViewset(viewsets.ModelViewSet):
	serializer_class = GenreOperationTrackSerializer
	model = Tracks
	queryset = Tracks.objects.all()

	def add_genre(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			add_message = serializer.add_genre(serializer.data)
			return Response(add_message, status=add_message.get('status'))
		return Response(serializer.errors, status=500)

	def delete_genre(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			delete_message = serializer.delete_genre(serializer.data)
			return Response(delete_message, status=delete_message.get('status'))
		return Response(serializer.errors, status=500)

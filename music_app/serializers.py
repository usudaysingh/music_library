from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.utils import timezone 

from .models import Tracks, Genres

class CreateGenreSerializer(serializers.Serializer):
	genre_name = serializers.CharField(max_length=500, required=True)
	genre_type = serializers.CharField(max_length=500, required=True)

	def create(self, validated_data):
		genre_instance = Genres(**validated_data)
		genre_instance.save()
		return genre_instance

class GetGenreListSerializer(serializers.Serializer):
	genre_id = 	serializers.CharField()
	genre_name = serializers.CharField()
	genre_type = serializers.CharField()

class UpdateGenreSerializer(serializers.Serializer):
	genre_name = serializers.CharField(max_length=500, required=True)
	genre_type = serializers.CharField(max_length=500, required=True)

class CreateTrackMultipleGenreSerializer(serializers.Serializer):
	track_name = serializers.CharField(max_length=500, required=True)
	singer = serializers.CharField(max_length=500, required=True)
	rating = serializers.IntegerField(required=True, max_value=5, min_value=1)
	genres = serializers.ListField()
	multiple_genres = serializers.BooleanField(default=False)

	def create(self, validated_data):
		genre = validated_data.pop('genres')
		del validated_data['multiple_genres']
		track_instance = Tracks(**validated_data)
		track_instance.save()
		for gn in genre:
			genre_instance = Genres.objects.filter(genre_id = gn)
			if genre_instance:
				track_instance.genres.add(genre_instance[0])
		return track_instance

class CreateTrackSerializer(serializers.Serializer):
	track_name = serializers.CharField(max_length=500, required=True)
	singer = serializers.CharField(max_length=500, required=True)
	rating = serializers.IntegerField(required=True, max_value=5, min_value=1)
	genres = CreateGenreSerializer(many=True)
	multiple_genres = serializers.BooleanField(default=False)

	def create(self, validated_data):
		genre = validated_data.pop('genres')
		del validated_data['multiple_genres']
		track_instance = Tracks(**validated_data)
		track_instance.save()
		for gn in genre: 
			serialize_data = UpdateGenreSerializer(gn).data
			genre_instance = Genres.objects.get_or_create(genre_name = serialize_data['genre_name'], genre_type = serialize_data['genre_type'])
			track_instance.genres.add(genre_instance[0])
		return track_instance
		

class GetTrackListSerializer(serializers.Serializer):
	track_id = serializers.CharField()
	track_name = serializers.CharField(max_length=500)
	singer = serializers.CharField(max_length=500)
	rating = serializers.IntegerField()

class RetrieveTrackSerializer(serializers.Serializer):
	track_name = serializers.CharField(max_length=500)
	track_id = serializers.CharField()
	genres = GetGenreListSerializer(many=True)
	singer = serializers.CharField(max_length=500)
	rating = serializers.IntegerField()	

class UpdateTrackSerializer(serializers.Serializer):
	track_name = serializers.CharField(max_length=500, required=False)
	singer = serializers.CharField(max_length=500, required=False)
	rating = serializers.IntegerField(required=False, max_value=5, min_value=1)

class GenreOperationTrackSerializer(serializers.Serializer):
	genre_id = serializers.ListField(required=True)
	track_id = serializers.CharField(max_length=10, required=True)

	def add_genre(self, validated_data):
		validated_data['invalid_genres'] = []
		try:
			Track = Tracks.objects.get(track_id = validated_data.get('track_id'))
		except Tracks.DoesNotExist:
			raise serializers.ValidationError({validated_data.get('track_id'):"Track Does not exist please enter correct track id."})

		for genre in validated_data.get('genre_id'):
			try:
				Genre = Genres.objects.get(genre_id = genre)
				if Track.genres.filter(genre_id=genre).exists():
					validated_data['invalid_genres'].append({genre:'Genre is already present in the list.'})
				else:
					Track.genres.add(Genre)
			except Genres.DoesNotExist:
				validated_data['invalid_genres'].append({genre:'Genre Does not exist please enter correct genre id.'})
		
		del validated_data['genre_id']

		if len(validated_data['invalid_genres']):
			validated_data['status'] = 500
		else:
			validated_data['status'] = 200
		return validated_data

	def delete_genre(self, validated_data):
		validated_data['invalid_genres'] = []
		try:
			Track = Tracks.objects.get(track_id = validated_data.get('track_id'))
		except Tracks.DoesNotExist:
			raise serializers.ValidationError('Track Does not exist please enter correct track id.')

		for genre in validated_data.get('genre_id'):
			try:
				Genre = Genres.objects.get(genre_id = genre)
				if Track.genres.filter(genre_id=genre).exists():
					Track.genres.remove(Genre)
				else:
					validated_data['invalid_genres'].append({genre:'Genre Does not exist in this track.Please enter correct genre id.'})
			except Genres.DoesNotExist:
				validated_data['invalid_genres'].append({genre:'Genre Does not exist please enter correct genre id.'})
		del validated_data['genre_id']
		
		if len(validated_data['invalid_genres']):
			validated_data['status'] = 500
		else:
			validated_data['status'] = 200
		return validated_data
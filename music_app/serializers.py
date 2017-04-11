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

class CreateTrackSerializer(serializers.Serializer):
	track_name = serializers.CharField(max_length=500, required=True)
	singer = serializers.CharField(max_length=500, required=True)
	rating = serializers.IntegerField(required=True, max_value=5, min_value=1)
	# genres = serializers.CharField(max_length=500, required=True)
	genres = CreateGenreSerializer()

	def create(self, validated_data):
		genre = validated_data.pop('genres')
		track_instance = Tracks(**validated_data)
		genre_instance = Genres.objects.get_or_create(genre_name = genre.get('genre_name'), genre_type = genre.get('genre_type'))
		track_instance.genres = genre_instance[0]
		track_instance.save()
		return track_instance
		

class GetTrackListSerializer(serializers.Serializer):
	track_name = serializers.CharField(max_length=500)
	track_id = serializers.CharField()
	genres = CreateGenreSerializer()
	singer = serializers.CharField(max_length=500)
	rating = serializers.IntegerField()

class UpdateTrackSerializer(serializers.Serializer):
	track_name = serializers.CharField(max_length=500, required=False)
	singer = serializers.CharField(max_length=500, required=False)
	rating = serializers.IntegerField(required=False, max_value=5, min_value=1)
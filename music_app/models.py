from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Genres(models.Model):
	genre_name = models.CharField(max_length=100, unique=True)
	genre_type = models.CharField(max_length=500)
	genre_id = models.AutoField(primary_key=True)

class Tracks(models.Model):
	track_name = models.CharField(max_length=500)
	track_id = models.AutoField(primary_key=True)
	genres = models.ManyToManyField(Genres)
	singer = models.CharField(max_length=500)
	rating = models.IntegerField()
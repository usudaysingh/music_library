'''
___author__ ="uday"
'''

from django.conf.urls import url
from .apis import TrackViewset, UpdateRetrieveTrack, UpdateRetrieveGenre, GenreViewSet
from .views import HomeView

urlpatterns = [
    url(r'^tracks/$', TrackViewset.as_view({'post': 'create', 'get': 'list'}), name='tracks'),
    url(r'^tracks/(?P<track_id>\d+)$', UpdateRetrieveTrack.as_view({'put': 'update', 'get': 'retrieve'}), name='track-update'),
    url(r'^genres/$', GenreViewSet.as_view({'post': 'create', 'get': 'list'}), name='genres'),
    url(r'^genres/(?P<genre_id>\d+)$', UpdateRetrieveGenre.as_view({'put': 'update', 'get': 'retrieve'}), name='genre-update'),
    url(r'home/$', HomeView.as_view(), name='homeview')
]

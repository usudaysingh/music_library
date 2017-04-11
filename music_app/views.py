
import requests
from django.core.cache import cache
from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import render
from django.views.generic import TemplateView, View

class HomeView(View):
	template = 'home.html'

	def get(self, request, *args, **kwargs):
		return render(request, self.template)
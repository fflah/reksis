from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from reksis_dosbing import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),    
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('api/keyword', views.KeywordListView.as_view()),
    path('api/dosen', views.DosenListView.as_view()),
    path('api/reksis', views.ReksisDosbing.as_view()),
]

format_suffix_patterns(urlpatterns)
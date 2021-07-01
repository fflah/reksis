from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from rest_auth.registration.views import SocialLoginView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from . import helper

class GoogleLogin(SocialLoginView):
    authentication_classes = [] # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000"
    client_class = OAuth2Client

class KeywordListView(generics.ListCreateAPIView):
    search_fields = ['text']
    filter_backends = (filters.SearchFilter,)
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

class DosenListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Dosen.objects.all()
    serializer_class = DosenSerializer

class ReksisDosbing(APIView):    
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        input1 = request.data['input']
        data = {
            'data':request.data['input'],
            'input':request.data['input'],
        }
        reksis = helper.reksis_dosbing(input1)
        return Response(reksis, status=status.HTTP_202_ACCEPTED)
from .models import *
from rest_framework import serializers


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ['text']

class DosenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dosen
        fields = ['nama', 'fname', 'lname', 'nip', 'home_base', 'pendidikan', 'alumni', 'foto', 'deskripsi', 'link_scholar', 'email']
        
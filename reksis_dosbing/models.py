from django.db import models

class Dosen(models.Model):
    nama = models.CharField(max_length=255, default=None, null=True)
    fname = models.CharField(max_length=255, default=None, null=True)
    lname = models.CharField(max_length=255, default=None, null=True)
    nip =  models.CharField(max_length=255, default=None, null=True)
    home_base = models.CharField(max_length=255, default=None, null=True)
    pendidikan = models.CharField(max_length=255, default=None, null=True)
    alumni = models.CharField(max_length=255, default=None, null=True)
    foto = models.CharField(max_length=255, default=None, null=True)
    deskripsi = models.TextField(default=None, null=True, blank=True)
    link_scholar = models.CharField(max_length=255, default=None, null=True)
    email = models.CharField(max_length=255, default=None, null=True)
    
    def __str__(self):
       return"{}".format(self.nama)

class Keyword(models.Model):
    text = models.CharField(max_length=255, default=None, null=True)

    def __str__(self):
       return"{}".format(self.text)

class interests(models.Model):
    text = models.CharField(max_length=255,  default=None, null=True)

    def __str__(self):
       return"{}".format(self.text)

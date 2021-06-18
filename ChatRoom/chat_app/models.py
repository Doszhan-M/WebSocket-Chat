from django.db import models
from django.contrib.auth.models import User
from random import choice
from .random_vals import descriptions_list, locations_list, age_list


# Представление пользователя
class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    name=models.CharField(max_length=30, default='lambda:choice(locations_list)')
    # description=models.TextField(blank=True, default=lambda:choice(descriptions_list))
    description=models.TextField(blank=True, default='lambda:choice(descriptions_list)')
    # location=models.CharField(max_length=30, default=lambda:choice(locations_list))
    location=models.CharField(max_length=30, default='lambda:choice(locations_list)')
    # age = models.IntegerField(default=lambda:choice(age_list))
    age = models.IntegerField(default=25)
    date_joined=models.DateTimeField(auto_now_add=True)
    avatar = models.ImageField(upload_to='images/', blank=True)
    
    
    def __str__(self):
        return self.user.username


# Представление комнат
class Room(models.Model):
    # user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, null=True, blank=True,)
    room = models.CharField(max_length=30,blank=True)
    
    def __str__(self):
        return self.room


class Photo(models.Model):
    img = models.ImageField(upload_to='images/', blank=True)
    text = models.CharField(max_length=254, blank=True)
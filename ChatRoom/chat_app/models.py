from django.db import models
from django.contrib.auth.models import User
from random import choice
from .random_vals import descriptions_list, locations_list, age_list


# Представление пользователя
class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    description=models.TextField(blank=True, default=lambda:choice(descriptions_list))
    location=models.CharField(max_length=30, default=lambda:choice(locations_list))
    age = models.IntegerField(default=lambda:choice(age_list))
    date_joined=models.DateTimeField(auto_now_add=True)
    organizer=models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


# Представление комнат
class Room(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, null=True, blank=True,)
    room = models.CharField(max_length=30,blank=True)
    
    def __str__(self):
        return self.room
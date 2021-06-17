from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile, Room


admin.site.register(UserProfile)
admin.site.register(Room)


from django.urls import path
from django.conf.urls import include
from allauth.account.views import LoginView, LogoutView
from chat_app.views import index, room, profile
from chat_app.api import ProfileViewApi, ProfileUpdateApi, RoomUpdateApi
from rest_framework import routers


urlpatterns = [
    path('', index, name='index'),
    path('profile/', profile, name='profile'),
    path('chat/<str:room_name>/', room, name='room'),
    path('login/', LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),

    path('profile_data/', ProfileViewApi.as_view(), name='profile_data'),
    path('profile_update/', ProfileUpdateApi.as_view(), name='profile_update'),
    path('room_create/', RoomUpdateApi.as_view(), name='room_create'),

]
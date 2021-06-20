from django.urls import path
from django.conf.urls import include
from allauth.account.views import LoginView, LogoutView
from chat_app.views import index, room, profile, photo
from chat_app.api import ProfileViewApi, ProfileUpdateApi, PhotoCreateApi, PhotoGetApi, AllUsersApi, \
    CreateRoomApi, CompanionApi, RoomGetApi, MessageCreateApi, MessagesGetApi
from rest_framework import routers


urlpatterns = [
    path('', index, name='index'),
    path('profile/', profile, name='profile'),
    # path('chat/room/', room, name='room'),
    path('chat_with/<str:room_name>/', room, name='room'),
    path('login/', LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),
    path('photo/', photo, name='photo',),

    path('profile_data/', ProfileViewApi.as_view(), name='profile_data'),
    path('profile_update/', ProfileUpdateApi.as_view(), name='profile_update'),
    path('all_users/', AllUsersApi.as_view(), name='all_users'),
    path('create_room/', CreateRoomApi.as_view(), name='create_room'),
    path('get_user/', CompanionApi.as_view(), name='get_user'),
    path('room_get/', RoomGetApi.as_view(), name='room_get'),
    path('message_create/', MessageCreateApi.as_view(), name='message_create'),
    path('message_get/', MessagesGetApi.as_view(), name='message_get'),

    path('photo_create/', PhotoCreateApi.as_view(), name='photo_create'),
    path('photo_get/', PhotoGetApi.as_view(), name='photo_get'),

]

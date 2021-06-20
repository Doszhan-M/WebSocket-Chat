from .models import Message, UserProfile, Photo, Room
from .serializers import ProfileSerializer, RoomSerializer, PhotoSerializer, RoomSerializer, MessageSerializer
from rest_framework import generics
from django.contrib.auth.models import User


class ProfileViewApi(generics.RetrieveAPIView):
    """Получить данные профиля"""
    serializer_class = ProfileSerializer

    def get_object(self):
        user = UserProfile.objects.get(user=self.request.user)
        return user


class ProfileUpdateApi(generics.RetrieveUpdateAPIView):
    """Изменить данные профиля"""
    serializer_class = ProfileSerializer

    def get_object(self):
        user = UserProfile.objects.get(user=self.request.user)
        return user


class AllUsersApi(generics.ListAPIView):
    """Достать все профили"""
    serializer_class = ProfileSerializer
    queryset = UserProfile.objects.all()


class CreateRoomApi(generics.CreateAPIView):
    """Создать комнату"""
    serializer_class = RoomSerializer

    def perform_create(self, serializer):
        owner = UserProfile.objects.get(user=self.request.user)
        serializer.save(owner=owner)


class CompanionApi(generics.RetrieveUpdateAPIView):
    """получить профиль собеседника"""
    serializer_class = ProfileSerializer

    def get_object(self):
        user = self.request.query_params.get('companion')
        user = UserProfile.objects.get(name=user)
        return user


class RoomGetApi(generics.RetrieveUpdateAPIView):
    """Получить запрашиваюмую комнату"""
    serializer_class = RoomSerializer

    def get_object(self):
        room = self.request.query_params.get('room')
        room = Room.objects.get(room=room)
        return room


class MessageCreateApi(generics.CreateAPIView):
    """Создать сообщение"""
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        # получуть данные из post запроса
        param = serializer.validated_data['room_blank']
        room = Room.objects.get(room=param)
        print('room', room)
        serializer.save(room=room)


class MessagesGetApi(generics.ListAPIView):
    """Создать сообщение"""
    serializer_class = MessageSerializer
    queryset = Message.objects.all()





# __________________________________________________________________________

class PhotoCreateApi(generics.CreateAPIView):
    """Создать картинку"""
    serializer_class = PhotoSerializer


class PhotoGetApi(generics.ListAPIView):
    """Показать картинку"""
    serializer_class = PhotoSerializer
    queryset = Photo.objects.all()
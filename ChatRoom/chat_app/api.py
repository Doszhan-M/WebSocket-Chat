from .models import UserProfile, Photo
from .serializers import ProfileSerializer, RoomSerializer, PhotoSerializer
from rest_framework import generics


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


class RoomUpdateApi(generics.CreateAPIView):
    """Создать комнату"""
    serializer_class = RoomSerializer

class PhotoCreateApi(generics.CreateAPIView):
    """Создать картинку"""
    serializer_class = PhotoSerializer


class PhotoGetApi(generics.ListAPIView):
    """Показать картинку"""
    serializer_class = PhotoSerializer
    queryset = Photo.objects.all()
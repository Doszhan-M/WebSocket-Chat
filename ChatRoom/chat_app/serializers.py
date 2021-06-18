from rest_framework import serializers
from .models import UserProfile, Room, Photo


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    # date_joined = serializers.DateTimeField(format="%d.%m.%Y")

    class Meta:
        model = UserProfile
        fields = ('user', 'name', 'description', 'location', 'age', 'avatar',)



class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ('room',)



class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ('img', 'text',)
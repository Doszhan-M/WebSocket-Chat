from re import T
from rest_framework import serializers
from .models import UserProfile, Room, Message, Photo


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)


    class Meta:
        model = UserProfile
        fields = ('user', 'name', 'description', 'location', 'age', 'avatar',)


class RoomSerializer(serializers.ModelSerializer):    
    owner = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Room
        fields = ('room', 'owner',)


class MessageSerializer(serializers.ModelSerializer):
    room = serializers.SlugRelatedField(slug_field='room', read_only=True)
    
    class Meta:
        model = Message
        fields = ('author', 'message', 'room', 'room_blank')





# __________________________________________________________________________

class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ('img', 'text',)
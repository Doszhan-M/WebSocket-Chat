from re import T
from .models import UserProfile
from rest_framework import serializers
from .models import UserProfile, Room, Message, Photo


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = UserProfile
        fields = ('user', 'name', 'description', 'location', 'age', 'avatar',)


class RoomSerializer(serializers.ModelSerializer):    
    owner = serializers.SlugRelatedField(slug_field='name', read_only=True)
    my_field  = serializers.SerializerMethodField()

    def get_my_field(self, obj):
        owner = str(obj.owner)
        my_field = 'http://127.0.0.1:8000/media/' + str(UserProfile.objects.get(name=owner).avatar)
        return my_field

    class Meta:
        model = Room
        fields = ('room', 'owner', 'my_field',)


class RoomCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Room
        fields = ('room', 'owner',)

class CommonRoomCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Room
        fields = ('room', 'owner', 'is_common')


class GetRoomSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Room
        fields = ('room',)


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
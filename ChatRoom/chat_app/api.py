from re import template
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer

from .models import UserProfile, Room
from .serializers import ProfileSerializer


class ProfileViewApi(APIView):

    # renderer_classes = [TemplateHTMLRenderer]
    # template_name = 'chat/profile_list.html'

    # Вывод профайла
    def get(self, request):
        user = UserProfile.objects.get(user=request.user)
        serializer = ProfileSerializer(user, many = False)
        return Response(serializer.data)
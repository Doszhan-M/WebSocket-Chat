from django.urls import path
from django.conf.urls import include
from allauth.account.views import LoginView, LogoutView
from chat_app.views import index, room, profile
from chat_app.api import ProfileViewApi
from rest_framework import routers


# router = routers.DefaultRouter()
# router.register(r'profile', ProfileViewSet)


urlpatterns = [
    path('', index, name='index'),
    path('profile/', profile, name='profile'),
    path('chat/<str:room_name>/', room, name='room'),
    path('login/', LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),

    path('profile_data/', ProfileViewApi.as_view(), name='profile1'),
    # path('api', include(router.urls)),
]
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('accounts/', include('allauth.urls')),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    path('', include('chat_app.urls')),
]

if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.contrib import admin
from django.urls import path,include
from App.views import google_login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('App.urls')),
    path('api/auth/google/', google_login),  # ✅ moved to main urls
]

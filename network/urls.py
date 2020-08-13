
from django.urls import path, include
from knox import views as knox_views

from . import views
from .auth import (
    RegisterAPI,
    LoginAPI,
    UserAPI
)

urlpatterns = [
    path('auth', include('knox.urls')),
    path("", views.index, name="index"),
    path("api/auth/register", RegisterAPI.as_view(), name="auth_register"),
    path("api/auth/login", LoginAPI.as_view(), name="auth_login"),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name="auth_logout"),
    path("api/auth/user", UserAPI.as_view(), name="auth_user"),
]

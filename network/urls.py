
from django.urls import path, include
from knox import views as knox_views
from rest_framework import routers

from . import api
from . import views
from .auth import (
    RegisterAPI,
    LoginAPI,
    UserAPI,
)

router = routers.DefaultRouter()

router.register("api/posts", api.PostViewSet, 'posts')
#router.register("api/post_medias", api.PostMediaViewSet, 'post_media')

urlpatterns = [
    path('auth', include('knox.urls')),
    path("", views.index, name="index"),
    path("login", views.index, name="login"),
    path("logout", views.index, name="logout"),
    path("register", views.index, name="register"),
    path("api/auth/register", RegisterAPI.as_view(), name="auth_register"),
    path("api/auth/login", LoginAPI.as_view(), name="auth_login"),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name="auth_logout"),
    path("api/auth/user", UserAPI.as_view(), name="auth_user"),
    path("api/user/<int:user_id>/followers",
         api.UserFollowerAPIView.as_view(), name="user_follower"),
    path("api/user/<int:user_id>/followers/<int:pk>",
         api.UserFollowerAPIView.as_view(), name="user_follower_2"),
    path("api/user/<int:user_id>/posts",
         api.UserPostsAPIView.as_view(), name="user_posts"),
    path("api/posts/<int:post_id>/medias",
         api.PostMediaAPIView.as_view(), name="post_medias"),
    path("api/posts/<int:post_id>/comments",
         api.CommentAPIView.as_view(), name="post_comments"),
    path("api/posts/<int:post_id>/comments/<int:pk>",
         api.CommentAPIView.as_view(), name="post_comments"),
] + router.urls

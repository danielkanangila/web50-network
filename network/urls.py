
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
    path("api/auth/users", UserAPI.as_view(), name="auth_user"),
    path("api/users/<int:user_id>/profile",
         api.UserProfileAPI.as_view(), name="user_profile"),
    path("api/users/<int:user_id>/timeline",
         api.TimeLineAPIView.as_view(), name="timeline"),
    path("api/users/<int:user_id>/followers",
         api.FriendshipAPIView.as_view(), name="user_follower"),
    path("api/users/<int:user_id>/followers/<int:pk>",
         api.FriendshipAPIView.as_view(), name="user_follower_2"),
    path("api/users/<int:user_id>/posts",
         api.UserPostsAPIView.as_view(), name="user_posts"),
    path("api/posts/<int:post_id>/medias",
         api.PostMediaAPIView.as_view(), name="post_medias"),
    path("api/posts/<int:post_id>/like", api.LikeAPIView.as_view(), name="like"),
    path("api/posts/<int:post_id>/unlike",
         api.UnlikeAPIView.as_view(), name="unlike"),
    path("api/posts/<int:post_id>/comments",
         api.CommentAPIView.as_view(), name="post_comments"),
    path("api/posts/<int:post_id>/comments/<int:pk>",
         api.CommentAPIView.as_view(), name="post_comments"),
    path("api/posts/explorer", api.ExplorerAPIView.as_view(), name="explorer")
] + router.urls

from django.http import Http404
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import viewsets, permissions, generics, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .utils.permissions import HasPermission
from .utils.pagination import PostPagination
from .models import (
    PostMedia,
    Post,
    Comment,
    User_Followers,
    User
)

from .serializers import (
    PostMediaSerializer,
    PostSerializer,
    CommentSerializer,
    UserFollowerSerializer,
    FollowerFollowingSerializer,
    FollowerDetailSerializer,
    UserSerializer
)


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    pagination_class = PostPagination


class UserPostsAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def get_queryset(self, *args, **kwargs):
        user_id = self.kwargs.get("user_id")
        return super().get_queryset(*args, **kwargs).filter(owner=user_id)


class TimeLineAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def get_queryset(self, *args, **kwargs):
        following = User_Followers.objects.filter(
            user=self.kwargs.get("user_id"))
        all_posts = Post.objects.all()
        posts = []

        for user in following:
            user_posts = all_posts.filter(owner=user.follower.pk)
            posts = posts + list(user_posts)
        return posts


class PostMediaAPIView(generics.CreateAPIView, generics.DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    serializer_class = PostMediaSerializer
    parser_classes = [FormParser, MultiPartParser]

    def create(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id, owner=request.user)
        data = request.data
        data["post"] = post_id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        medias = serializer.save()
        return Response({
            "post_medias": PostMediaSerializer(medias).data
        })


class CommentAPIView(generics.CreateAPIView, generics.DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    serializer_class = CommentSerializer

    def create(self, request, post_id):
        data = request.data
        data['post'] = post_id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        return Response({
            "comment": CommentSerializer(comment).data
        })

    def destroy(self, request, *args, **kwargs):
        comment = Comment.objects.get(
            pk=kwargs.get("pk"),
            owner=request.user,
            post=kwargs.get("post_id")
        )
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENTr)


class UserProfileAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, *args, **kwargs):
        # get user
        user = request.user
        if kwargs.get("user_id") != user.pk:
            user = get_object_or_404(User, pk=kwargs.get("user_id"))
        # user serializer
        u_serializer = UserSerializer(user, context={"request": request})

        # Get follower and following
        user_followers = User_Followers.objects.all()
        following = user_followers.filter(user=kwargs.get("user_id"))
        followers = user_followers.filter(follower=kwargs.get("user_id"))
        # Follower serializer
        f_serializer = FollowerFollowingSerializer({
            "followers": followers,
            "following": following,
            "followers_count": len(followers),
            "following_count": len(following)
        }, context={"request": request})

        return Response({
            **u_serializer.data,
            **f_serializer.data,
        })


class UserFollowerAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission,
    ]

    serializer_class = UserFollowerSerializer

    def get(self, request, *args, **kwargs):
        user_followers = User_Followers.objects.all()
        following = user_followers.filter(user=kwargs.get("user_id"))
        followers = user_followers.filter(follower=kwargs.get("user_id"))
        serializer = FollowerFollowingSerializer({
            "followers": followers,
            "following": following,
            "followers_count": len(followers),
            "following_count": len(following)
        }, context={"request": request})

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        data["user"] = kwargs.get("user_id")
        serializer = UserFollowerSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user_follower = serializer.save()
        return Response({
            "follower": UserFollowerSerializer(user_follower, context={"request": request}).data
        })

    def delete(self, request, *args, **kwargs):
        user_follower = get_object_or_404(
            User_Followers, pk=kwargs.get("pk"), user=request.user)
        user_follower.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

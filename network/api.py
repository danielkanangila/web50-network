from django.http import Http404
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import viewsets, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .utils.permissions import HasPermission
from .models import (
    PostMedia,
    Post,
    Comment
)

from .serializers import (
    PostMediaSerializer,
    PostSerializer,
    CommentSerializer
)


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class UserPostsAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    serializer_class = PostSerializer

    def get(self, request, user_id):
        post = get_list_or_404(Post, owner=user_id)

        return Response({
            "post": PostSerializer(post, many=True).data
        })


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
        return Response(status=status.HTTP_204_NO_CONTENT)

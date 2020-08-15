from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .utils.permissions import HasPermission
from .models import (
    PostMedia,
    Post,
)

from .serializers import (
    PostMediaSerializer,
    PostSerializer,
)


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class UserPostsAPIView(APIView):
    permissions = [
        permissions.IsAuthenticated,
        HasPermission
    ]

    def get(self, request, user_id):
        print(user_id)
        return Response({"ok": True})


class PostMediaViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasPermission
    ]
    queryset = PostMedia.objects.all()
    serializer_class = PostMediaSerializer
    parser_classes = [FormParser, MultiPartParser]

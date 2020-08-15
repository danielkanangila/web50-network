from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser

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
        permissions.IsAuthenticated
    ]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostMediaViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = PostMedia.objects.all()
    serializer_class = PostMediaSerializer
    parser_classes = [FormParser, MultiPartParser]

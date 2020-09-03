from django.contrib.auth import login
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.models import AuthToken

from .serializers import (
    RegisterSerializer,
    UserSerializer
)

from .models import User


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class LoginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        _, token = AuthToken.objects.create(user)

        login(request, user)

        return Response({
            "user": UserSerializer(user, context={"request": request}).data,
            "token": token
        })


class UserAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = UserSerializer

    def get(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        serializer = UserSerializer(
            request.user, data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

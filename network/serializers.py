from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import (User, Post, PostMedia)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'bio', 'avatar', 'date_joined')
        extra_kwargs = {'date_joined': {'read_only': True}}

    def update(self, request, *args, **kwargs):
        if self.instance.avatar and "avatar" in args[0]:
            self.instance.avatar.delete()
        return super().update(request, *args, **kwargs)


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    medias = PostMediaSerializer(many=True)

    class Meta:
        model: Post
        fields: ('id', 'owner', 'content', 'like_count',
                 'unlike_count', 'created_at')

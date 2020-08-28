from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator, UniqueTogetherValidator

from .models import (User, Post, PostMedia, Comment, User_Followers)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {
                'required': True,
                'validators': [
                    UniqueValidator(queryset=User.objects.all())
                ]
            }
        }

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
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'bio', 'avatar', 'avatar_url', 'date_joined')
        extra_kwargs = {'date_joined': {'read_only': True}}

    def update(self, request, *args, **kwargs):
        if self.instance.avatar and "avatar" in args[0]:
            self.instance.avatar.delete()
        return super().update(request, *args, **kwargs)

    def get_avatar_url(self, user):
        if not user.avatar:
            return None
        request = self.context.get("request")
        avatar_url = user.avatar.url
        return request.build_absolute_uri(avatar_url)


class CommentSerializer(serializers.ModelSerializer):
    owner_detail = UserSerializer(source="owner", read_only=True)

    class Meta:
        model = Comment
        fields = ("id", "owner", "owner_detail", "post", "content", "like_count",
                  "unlike_count", "created_at")


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    owner_detail = UserSerializer(source="owner", read_only=True)
    medias = PostMediaSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'owner', 'owner_detail', 'content', 'like_count',
                  'unlike_count', 'comments', 'medias', 'created_at')


class UserFollowerSerializer(serializers.ModelSerializer):
    follower_detail = UserSerializer(source="follower", read_only=True)

    def validate(self, attrs):
        if attrs["user"] == attrs["follower"]:
            raise serializers.ValidationError(
                "Follower ID should  be different with the authenticated user ID.")
        return attrs

    class Meta:
        model = User_Followers
        fields = ('id', 'user', 'follower', 'follower_detail')
        validators = [
            UniqueTogetherValidator(
                queryset=User_Followers.objects.all(),
                fields=['user', 'follower']
            )
        ]


class FollowerDetailSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'bio', 'avatar_url')

    def get_avatar_url(self, user):
        if not user.avatar:
            return None
        request = self.context.get("request")
        avatar_url = user.avatar.url
        return request.build_absolute_uri(avatar_url)


class FollowerSerializer(serializers.ModelSerializer):
    detail = FollowerDetailSerializer(source="user")

    class Meta:
        model = User_Followers
        fields = ('id', 'detail')


class FollowingSerializer(serializers.ModelSerializer):
    detail = FollowerDetailSerializer(source="follower")

    class Meta:
        model = User_Followers
        fields = ('id', 'detail')


class FollowerFollowingSerializer(serializers.Serializer):
    followers_count = serializers.IntegerField()
    following_count = serializers.IntegerField()
    followers = FollowerSerializer(many=True)
    following = FollowingSerializer(many=True)

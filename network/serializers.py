from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator, UniqueTogetherValidator

from .models import (User, Post, PostMedia, Comment,
                     Friendship, Like, UnLike)


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
        extra_kwargs = {
            "like_count": {"read_only": True},
            "unlike_count": {"read_only": True}
        }


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = "__all__"


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Like.objects.all(), fields=['post', 'user']),
            UniqueTogetherValidator(
                queryset=UnLike.objects.all(), fields=['post', 'user']),
        ]


class UnLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnLike
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Like.objects.all(), fields=['post', 'user']),
            UniqueTogetherValidator(
                queryset=UnLike.objects.all(), fields=['post', 'user']),
        ]


class PostSerializer(serializers.ModelSerializer):
    owner_detail = UserSerializer(source="owner", read_only=True)
    medias = PostMediaSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    unlike_count = serializers.SerializerMethodField()
    # post liked by the current auth user
    liked = serializers.SerializerMethodField()
    # post unlike by the current auth user
    unlike = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'owner', 'owner_detail', 'content',
                  'comments', 'medias', 'created_at', 'unlike_count', 'like_count', 'liked', 'unlike']

    def get_like_count(self, obj):
        return obj.like_set.count()

    def get_unlike_count(self, obj):
        return obj.unlike_set.count()

    def get_liked(self, obj):
        like = Like.objects.all().filter(
            post=obj.pk, user=self.context.get("request").user.pk)
        return False if not like else True

    def get_unlike(self, obj):
        unlike = UnLike.objects.all().filter(
            post=obj.pk, user=self.context.get("request").user.pk)
        return False if not unlike else True

    def get_comments(self, obj):
        comments = obj.comments.order_by("-created_at")
        return CommentSerializer(comments, many=True, context=self.context).data


class FriendshipDetailSerializer(serializers.ModelSerializer):
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
    detail = FriendshipDetailSerializer(source="user")

    class Meta:
        model = Friendship
        fields = ('id', 'detail')


class FollowingSerializer(serializers.ModelSerializer):
    detail = FriendshipDetailSerializer(source="follower")

    class Meta:
        model = Friendship
        fields = ('id', 'detail')


class UserProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    followers = FollowerSerializer(many=True)
    following = FollowingSerializer(many=True, source="user_to_users")
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'bio',
            'avatar',
            'avatar_url',
            'date_joined',
            'followers',
            'following',
            'followers_count',
            'following_count'
        ]

    def get_followers_count(self, obj):
        # obj = user object
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.user_to_users.count()

    def get_avatar_url(self, user):
        if not user.avatar:
            return None
        request = self.context.get("request")
        avatar_url = user.avatar.url
        return request.build_absolute_uri(avatar_url)


class FriendshipSerializer(serializers.ModelSerializer):
    follower_detail = UserSerializer(source="follower", read_only=True)

    def validate(self, attrs):
        if attrs["user"] == attrs["follower"]:
            raise serializers.ValidationError(
                "Follower ID should  be different with the authenticated user ID.")
        return attrs

    class Meta:
        model = Friendship
        fields = ('id', 'user', 'follower', 'follower_detail')
        validators = [
            UniqueTogetherValidator(
                queryset=Friendship.objects.all(),
                fields=['user', 'follower']
            )
        ]

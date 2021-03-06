from django.contrib.auth.models import AbstractUser
from django.db import models
from .utils.upload_to import upload_to


class User(AbstractUser):
    first_name = models.CharField(blank=True, null=True, max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(blank=True, null=True, upload_to=upload_to)


class Friendship(models.Model):
    user = models.ForeignKey(
        User, related_name="user_to_users", on_delete=models.CASCADE)
    follower = models.ForeignKey(
        User, related_name="followers", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["user", "follower"]


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    like = models.IntegerField(default=0, blank=True)

    class Meta:
        unique_together = ["user", "post"]


class UnLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    unlike = models.IntegerField(default=0, blank=True)

    class Meta:
        unique_together = ["user", "post"]


class PostMedia(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="medias")
    media = models.FileField(upload_to=upload_to)
    media_type = models.CharField(max_length=50)


class Comment(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    like_count = models.IntegerField(blank=True, default=0)
    unlike_count = models.IntegerField(blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

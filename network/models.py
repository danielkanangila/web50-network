import os
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class User(AbstractUser):
    first_name = models.CharField(blank=True, null=True, max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(blank=True, null=True, upload_to=upload_to)

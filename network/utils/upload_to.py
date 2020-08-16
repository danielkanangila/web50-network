import os
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone


def upload_to(instance, filename):
    base_name = get_basename(instance)
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{base_name}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


def get_basename(instance):
    model_name = ContentType.objects.get_for_model(instance).model
    base_name = instance.pk
    if model_name == "postmedia":
        base_name = f"{instance.post.owner.pk}/posts/{instance.post.pk}"
    return base_name

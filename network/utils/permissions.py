from rest_framework import permissions
from django.contrib.contenttypes.models import ContentType

from ..models import Post


class HasPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        model = view.serializer_class.Meta.model
        model_name = ContentType.objects.get_for_model(model).model
        if model_name == "post":
            return self.check_posts_permission(request, view)
        return False

    def check_posts_permission(self, request, view):
        auth_user = request.user
        self.message = "You do not have permission to perform this action. Incorrect owner id"

        if request.method == "POST" and auth_user.id != request.data["owner"]:
            return False
        if request.method == "PUT":
            post = Post.objects.filter(
                pk=view.kwargs.get("pk"), owner=auth_user)
            if not post or auth_user.id != request.data["owner"]:
                return False
        if request.method == "DELETE":
            post = Post.objects.filter(
                pk=view.kwargs.get("pk"), owner=auth_user)
            if not post:
                return False
        return True

from rest_framework import permissions
from django.contrib.contenttypes.models import ContentType

from ..models import Post, Comment


class HasPermission(permissions.BasePermission):
    message = "You do not have permission to perform this action. Invalid owner id"

    def has_permission(self, request, view):
        model = view.serializer_class.Meta.model
        model_name = ContentType.objects.get_for_model(model).model

        if model_name == "post":
            return self.check_posts_permissions(request, view)
        if model_name == "postmedia":
            return self.check_postmedias_permissions(request, view)
        if model_name == "comment":
            return self.check_comments_permissions(request, view)
        if model_name == "friendship":
            return self.check_user_followers_permissions(request, view)
        return False

    def check_posts_permissions(self, request, view):
        auth_user = request.user

        if request.method == "POST" and not "owner" in request.data:
            self.message = "No post owner key found"
            return False

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

    def check_postmedias_permissions(self, request, view):
        post = Post.objects.filter(
            pk=view.kwargs.get("post_id"), owner=request.user)
        if not post:
            return False
        return True

    def check_comments_permissions(self, request, view):
        self.message = "You do not have permission to perform this action. Invalid owner id or Resource not found."
        post = Post.objects.filter(pk=view.kwargs.get("post_id"))
        if not post:
            return False
        if request.method == "DELETE":
            comment = Comment.objects.filter(
                pk=view.kwargs.get("pk"),
                post=view.kwargs.get("post_id"),
                owner=request.user.pk
            )
            if not comment:
                return False
        return True

    def check_user_followers_permissions(self, request, view):
        # self.message = "Unauthorized Action."

        # if request.user.pk != view.kwargs.get("user_id"):
        #     return False
        return True

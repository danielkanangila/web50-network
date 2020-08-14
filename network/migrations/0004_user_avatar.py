# Generated by Django 3.0.8 on 2020-08-14 02:42

from django.db import migrations, models
import network.models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_remove_user_display_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to=network.models.upload_to),
        ),
    ]

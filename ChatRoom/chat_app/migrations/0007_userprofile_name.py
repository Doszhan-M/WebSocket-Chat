# Generated by Django 3.2.4 on 2021-06-16 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0006_auto_20210616_0223'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='name',
            field=models.CharField(default='lambda:choice(locations_list)', max_length=30),
        ),
    ]

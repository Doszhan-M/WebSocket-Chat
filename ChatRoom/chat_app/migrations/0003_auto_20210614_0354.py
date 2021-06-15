# Generated by Django 3.2.4 on 2021-06-14 03:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0002_alter_userprofile_rooms'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room', models.CharField(blank=True, max_length=30)),
            ],
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='rooms',
        ),
        migrations.DeleteModel(
            name='UserRoom',
        ),
        migrations.AddField(
            model_name='room',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chat_app.userprofile'),
        ),
    ]

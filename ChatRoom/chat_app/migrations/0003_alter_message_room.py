# Generated by Django 3.2.4 on 2021-06-20 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0002_auto_20210620_0903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat_app.room'),
        ),
    ]
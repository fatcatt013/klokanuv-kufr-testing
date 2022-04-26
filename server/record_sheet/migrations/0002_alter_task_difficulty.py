# Generated by Django 4.0.3 on 2022-04-04 11:54

from django.db import migrations, models
import record_sheet.models


class Migration(migrations.Migration):

    dependencies = [
        ('record_sheet', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='difficulty',
            field=models.CharField(choices=[('easier', '-'), ('same', '='), ('harder', '+')], max_length=50, null=True),
        ),
    ]

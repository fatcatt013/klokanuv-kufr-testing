# Generated by Django 4.0.4 on 2022-05-19 01:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('record_sheet', '0001_initial'),
        ('invitations', '0003_auto_20151126_1523'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='school',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s', to='record_sheet.school'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='invitation',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]

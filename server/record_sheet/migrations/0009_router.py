# Generated by Django 4.0.4 on 2022-06-06 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('record_sheet', '0008_alter_invoice_options_alter_parameter_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Router',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specifications', models.FileField(upload_to='router_specifications')),
            ],
        ),
    ]

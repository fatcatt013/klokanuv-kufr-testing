from django.core.management.base import BaseCommand
from record_sheet import models


class Command(BaseCommand):
    help = "Creates invoices for using the app for each school"

    def handle(self, *args, **options):

        params = {param.name: param.value for param in models.Parameter.objects.all()}

        for school in models.School.objects.filter(is_subscriber=True):

            if school.is_prepaid:
                school.is_prepaid = False
                school.save()
            else:
                models.Invoice.objects.create_invoice(school, params)

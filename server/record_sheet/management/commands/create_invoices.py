from django.core.management.base import BaseCommand
from record_sheet import models


class Command(BaseCommand):
    help = "Creates invoices for using the app for each school"

    params = {param.name: param.value for param in models.Parameter.objects.all()}

    def handle(self, *args, **options):
        for school in models.School.objects.exclude(name="SVČ Lužánky").filter(
            is_subscriber=True
        ):

            if school.is_prepaid:
                school.is_prepaid = False
            else:
                models.Invoice.objects.create_invoice(school, self.params)

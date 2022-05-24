from django.core.management.base import BaseCommand, CommandError
from record_sheet import models

import time
import decimal


class Command(BaseCommand):
    help = "Creates invoices for using the app for each school"

    def handle(self, *args, **options):
        for school in models.School.objects.exclude(name="SVČ Lužánky"):
            invoice = school.invoices.create(
                note="Fakturace 2",
                created_at=time.localtime(),
                serial_number=int(
                    models.Parameter.objects.get(name="invoice_number_prefix").value
                    + time.strftime("%y", time.localtime())
                    + str(models.Invoice.objects.count() + 1).zfill(4)
                ),
            )
            vat_rate = float(models.Parameter.objects.get(name="vat_rate").value)
            unit_price_app = float(
                models.Parameter.objects.get(name="unit_price_app").value
            )
            item_app = invoice.items.create(
                title="provoz aplikace",
                amount=1,
                vat_rate=vat_rate,
                unit_price=unit_price_app,
                total_vat=unit_price_app * vat_rate,
                total_price=unit_price_app + unit_price_app * vat_rate,
            )
            num_children = school.children.count()
            unit_price_children = float(
                models.Parameter.objects.get(name="unit_price_children").value
            )
            item_children = invoice.items.create(
                title="evidované děti",
                amount=num_children,
                vat_rate=vat_rate,
                unit_price=unit_price_children,
                total_vat=unit_price_children * num_children * vat_rate,
                total_price=unit_price_children * num_children
                + unit_price_children * num_children * vat_rate,
            )
            invoice.total_price = item_app.total_price + item_children.total_price
            invoice.save()

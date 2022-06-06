import time
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone
from record_sheet import models


class Command(BaseCommand):
    help = "Creates invoices for using the app for each school"

    params = {param.name: param.value for param in models.Parameter.objects.all()}

    def handle(self, *args, **options):
        for school in models.School.objects.exclude(name="SVČ Lužánky"):

            if school.invoices.filter(
                created_at__range=[timezone.now().replace(day=1), timezone.now()]
            ).exists():
                continue

            invoice = school.invoices.create(
                note=self.params["invoice_note"],
                created_at=timezone.now(),
                due_date=timezone.now() + timedelta(days=14),
                serial_number=int(
                    self.params["invoice_number_prefix"]
                    + time.strftime("%y", time.localtime())
                    + str(models.Invoice.objects.count() + 1).zfill(4)
                ),
            )
            vat_rate = float(self.params["vat_rate"])
            unit_price_app = float(self.params["unit_price_app"])
            item_app = invoice.items.create(
                title="provoz aplikace",
                amount=1,
                vat_rate=vat_rate,
                unit_price=unit_price_app,
                total_vat=unit_price_app * vat_rate,
                base_price=unit_price_app,
                total_price=unit_price_app + unit_price_app * vat_rate,
            )
            num_children = school.children.count()
            unit_price_children = float(self.params["unit_price_children"])
            item_children = invoice.items.create(
                title="evidované děti",
                amount=num_children,
                vat_rate=vat_rate,
                unit_price=unit_price_children,
                total_vat=unit_price_children * num_children * vat_rate,
                base_price=unit_price_children * num_children,
                total_price=unit_price_children * num_children
                + unit_price_children * num_children * vat_rate,
            )
            invoice.base_price = item_app.base_price + item_children.base_price
            invoice.total_vat = item_app.total_vat + item_children.total_vat
            invoice.total_price = item_app.total_price + item_children.total_price
            invoice.save()

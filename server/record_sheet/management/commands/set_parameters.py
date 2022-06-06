from django.core.management.base import BaseCommand, CommandError
from record_sheet import models


class Command(BaseCommand):
    help = "fills the Parameters table with default values"

    def handle(self, *args, **options):
        models.Parameter.objects.create(name="invoice_number_prefix", value="701")
        models.Parameter.objects.create(name="invoice_issued_by", value="Lenka Vrbacká")
        models.Parameter.objects.create(name="luzanky_web", value="www.luzanky.cz")
        models.Parameter.objects.create(name="luzanky_tel", value="+420545211336")
        models.Parameter.objects.create(
            name="luzanky_address", value="Lidická 1880/50 6020 Brno"
        )
        models.Parameter.objects.create(
            name="luzanky_title",
            value="Lužánky - středisko volného času Brno, příspěvková organizace",
        )
        models.Parameter.objects.create(
            name="invoice_note", value="Fakturujeme Vám užívání aplikace Klokanův kufr."
        )
        models.Parameter.objects.create(
            name="luzanky_description",
            value="Příspěvková organizace zřízená Jihomoravským krajem,zřizovací listina ze dne 21.6.2001 pod č.j. 16/39 Plný název dodavatele: Lužánky - středisko volného času Brno, příspěvková organizaceŽL vydaný Živnostenským úřadem Magistrátu města Brna",
        )
        models.Parameter.objects.create(name="luzanky_ic", value="00401803")
        models.Parameter.objects.create(
            name="luzanky_bank_account", value="2300553212/2010"
        )
        models.Parameter.objects.create(name="vat_rate", value="0.21")
        models.Parameter.objects.create(name="unit_price_app", value="100")
        models.Parameter.objects.create(name="unit_price_children", value="5")

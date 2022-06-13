from django.apps import AppConfig


class RecordSheetConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "record_sheet"
    verbose_name = "Klokanův kufr"

    def ready(self):
        import record_sheet.signals

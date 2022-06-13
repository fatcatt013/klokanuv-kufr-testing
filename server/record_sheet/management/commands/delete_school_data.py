import time
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db.models import Q
from django.utils import timezone
from record_sheet import models


class Command(BaseCommand):
    help = "Delete data of non-paying school"

    # děti, třídy a assessments, pak teacher_classroom link, poznámky
    def handle(self, *args, **options):
        nonpaying_schools = {
            invoice.school
            for invoice in models.Invoice.objects.filter(
                Q(is_paid=False, due_date__lte=timezone.now() - timedelta.days(45))
                | Q(is_subscribed=False)
            )
        }

        for school in nonpaying_schools:
            if school.is_subscriber:
                models.Assessment.objects.filter(child__school=school).delete()
                models.ChildNote.objects.filter(child__school=school).delete()
                models.Child.objects.filter(school=school).delete()
                models.ClassroomNote.objects.filter(classroom__school=school)
                models.Classroom.objects.filter(school=school).delete()
                school.is_subscriber = False
                school.save()

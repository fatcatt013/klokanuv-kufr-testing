from datetime import timedelta

from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.utils import timezone
from record_sheet import models


class Command(BaseCommand):
    help = "Delete data of non-paying school"

    # děti, třídy a assessments, pak teacher_classroom link, poznámky
    def handle(self, *args, **options):
        nonpaying_schools = {
            invoice.school
            for invoice in models.Invoice.objects.filter(
                is_paid=False,
                due_date__lte=timezone.now() - timedelta.days(45),
                school__is_subscriber=True,
            )
        }

        for school in nonpaying_schools:
            models.Assessment.objects.filter(child__school=school).delete()
            models.ChildNote.objects.filter(child__school=school).delete()
            models.Child.objects.filter(school=school).delete()
            models.ClassroomNote.objects.filter(classroom__school=school).delete()
            models.Classroom.objects.filter(school=school).delete()
            Group.objects.get(name="Teachers").user_set.filter(school=school).delete()
            school.is_subscriber = False
            school.save()

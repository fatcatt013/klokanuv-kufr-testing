from django.core.management.base import BaseCommand
from record_sheet.models import School, Classroom, Child, User
from faker import Faker
from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password as mkpwd
import random


def truncate_existing_data():
    School.objects.all().delete()
    Classroom.objects.all().delete()
    Child.objects.all().delete()
    User.objects.all().delete()


class Command(BaseCommand):
    help = "Creates test schools, classrooms, children, teachers, headmasters"

    def handle(self, **options):
        truncate_existing_data()
        fake = Faker()

        school1 = School.objects.create(name="Test School 1", address="Test School 1")
        school2 = School.objects.create(name="Test School 2", address="Test School 2")

        classroom1 = school1.classrooms.create(label="Třída 1")
        classroom2 = school1.classrooms.create(label="Třída 2")
        classroom3 = school1.classrooms.create(label="Třída 3")
        classroom4 = school2.classrooms.create(label="Třída 4")
        classroom5 = school2.classrooms.create(label="Třída 5")

        for classroom in [classroom1, classroom2, classroom3, classroom4, classroom5]:
            for suffix in range(1, random.randrange(18, 28)):
                classroom.children.create(
                    first_name="Jméno %s" % suffix,
                    last_name="Příjmení",
                    birthdate=fake.date_between(start_date="-6y", end_date="-3y"),
                    school=classroom.school,
                )

        pwd = mkpwd("password")

        teacher1 = school1.users.create(email="teacher1@mail.com", password=pwd)
        teacher2 = school1.users.create(email="teacher2@mail.com", password=pwd)
        teacher3 = school1.users.create(email="teacher3@mail.com", password=pwd)
        teacher4 = school2.users.create(email="teacher4@mail.com", password=pwd)
        teacher5 = school2.users.create(email="teacher5@mail.com", password=pwd)
        teacher6 = school2.users.create(email="teacher6@mail.com", password=pwd)
        Group.objects.get(name="Teachers").user_set.add(
            teacher1, teacher2, teacher3, teacher4, teacher5, teacher6
        )

        headmaster1 = school1.users.create(email="headmaster1@mail.com", password=pwd)
        headmaster2 = school2.users.create(email="headmaster2@mail.com", password=pwd)
        Group.objects.get(name="Headmasters").user_set.add(headmaster1, headmaster2)

        classroom1.teachers.add(headmaster1, teacher1, teacher3)
        classroom2.teachers.add(headmaster1, teacher2, teacher3)
        classroom3.teachers.add(headmaster1, teacher4, teacher5)
        classroom4.teachers.add(headmaster2, teacher5)
        classroom5.teachers.add(headmaster2, teacher6, teacher4)

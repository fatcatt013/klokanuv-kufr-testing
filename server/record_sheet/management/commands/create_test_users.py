from django.core.management.base import BaseCommand
from record_sheet.models import School, Classroom, Child, User, ClassroomTeacher
from faker import Faker
from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password as mkpwd

fake = Faker()  # TODO delete once this command is not needed


# truncate everything before we start populating database
def truncate_existing_data():
    School.objects.all().delete()
    Classroom.objects.all().delete()
    Child.objects.all().delete()
    User.objects.all().delete()
    ClassroomTeacher.objects.all().delete()


# zatial command, pojde do migrations
class Command(BaseCommand):
    help = "Creates test schools, classrooms, children, teachers, headmasters"

    truncate_existing_data()

    def handle(self, **options):
        school1 = School(name="Test School 1", address="Test School 1")
        school1.save()
        school2 = School(name="Test School 2", address="Test School 2")
        school2.save()

        classroom1 = Classroom(label="Test Classroom 1", school=school1)
        classroom1.save()
        classroom2 = Classroom(label="Test Classroom 2", school=school1)
        classroom2.save()
        classroom3 = Classroom(label="Test Classroom 3", school=school2)
        classroom3.save()
        classroom4 = Classroom(label="Test Classroom 4", school=school2)
        classroom4.save()
        classroom5 = Classroom(label="Test Classroom 5", school=school2)
        classroom5.save()

        headmasters_group = Group.objects.get(name="Headmasters")
        teachers_group = Group.objects.get(name="Teachers")

        teacher1 = User(
            email="teacher1@mail.com", password=mkpwd("password"), school=school1
        )
        teacher1.save()
        teacher2 = User(
            email="teacher2@mail.com", password=mkpwd("password"), school=school1
        )
        teacher2.save()
        teacher3 = User(
            email="teacher3@mail.com", password=mkpwd("password"), school=school1
        )
        teacher3.save()
        teacher4 = User(
            email="teacher4@mail.com", password=mkpwd("password"), school=school2
        )
        teacher4.save()
        teacher5 = User(
            email="teacher5@mail.com", password=mkpwd("password"), school=school2
        )
        teacher5.save()
        teacher6 = User(
            email="teacher6@mail.com", password=mkpwd("password"), school=school2
        )
        teacher6.save()

        headmaster1 = User(
            email="headmaster1@mail.com",
            password=mkpwd("password"),
            school=school1,
        )
        headmaster1.save()
        headmaster2 = User(
            email="headmaster2@mail.com", password=mkpwd("password"), school=school2
        )
        headmaster2.save()

        headmaster1.groups.add(headmasters_group)
        headmaster2.groups.add(headmasters_group)
        teacher1.groups.add(teachers_group)
        teacher2.groups.add(teachers_group)
        teacher3.groups.add(teachers_group)
        teacher4.groups.add(teachers_group)
        teacher5.groups.add(teachers_group)
        teacher6.groups.add(teachers_group)

        classrooms = [
            {"classroom": classroom1, "no_of_children": 21},
            {"classroom": classroom2, "no_of_children": 18},
            {"classroom": classroom3, "no_of_children": 28},
            {"classroom": classroom4, "no_of_children": 25},
            {"classroom": classroom5, "no_of_children": 15},
        ]

        for clsrm_dict in classrooms:
            for suffix in range(1, clsrm_dict["no_of_children"]):
                Child(
                    first_name="Test first name %s" % suffix,
                    last_name="Test last name %s" % suffix,
                    birthdate=fake.date_between(start_date="-6y", end_date="-3y"),
                    classroom=clsrm_dict["classroom"],
                ).save()

        ClassroomTeacher(classroom=classroom1, teacher=headmaster1).save()
        ClassroomTeacher(classroom=classroom2, teacher=headmaster1).save()
        ClassroomTeacher(classroom=classroom3, teacher=headmaster2).save()
        ClassroomTeacher(classroom=classroom4, teacher=headmaster2).save()
        ClassroomTeacher(classroom=classroom5, teacher=headmaster2).save()

        ClassroomTeacher(classroom=classroom1, teacher=teacher1).save()
        ClassroomTeacher(classroom=classroom1, teacher=teacher3).save()
        ClassroomTeacher(classroom=classroom2, teacher=teacher2).save()
        ClassroomTeacher(classroom=classroom2, teacher=teacher3).save()
        ClassroomTeacher(classroom=classroom3, teacher=teacher4).save()
        ClassroomTeacher(classroom=classroom3, teacher=teacher5).save()
        ClassroomTeacher(classroom=classroom4, teacher=teacher5).save()
        ClassroomTeacher(classroom=classroom5, teacher=teacher6).save()
        ClassroomTeacher(classroom=classroom5, teacher=teacher4).save()

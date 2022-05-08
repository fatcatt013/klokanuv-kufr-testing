from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.base_user import BaseUserManager


class Category(models.Model):
    label = models.CharField(max_length=100)


class Subcategory(models.Model):
    label = models.CharField(max_length=100)
    parent_category = models.ForeignKey(Category, on_delete=models.CASCADE)


class AssessmentType(models.Model):
    label = models.CharField(max_length=100)
    allows_note = models.BooleanField(default=0)


class AssessmentTypeOption(models.Model):
    parent_assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)
    label = models.CharField(max_length=100)

    def __str__(self):
        return self.label


def get_task_diff_choices():
    return [
        ("EASIER", "-"),
        ("SAME", "="),
        ("HARDER", "+"),
    ]


class Task(models.Model):
    id = models.IntegerField(primary_key=True)
    parent_task = models.ForeignKey("self", on_delete=models.CASCADE, null=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True)
    codename = models.CharField(max_length=20, null=True)
    assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)
    task_description = models.TextField()
    difficulty = models.CharField(max_length=50, choices=get_task_diff_choices(), null=True)
    expected_age_from = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    expected_age_to = models.DecimalField(decimal_places=2, max_digits=5, null=True)

    def __str__(self):
        return self.task_description


class Assessment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    option = models.ForeignKey(AssessmentTypeOption, on_delete=models.CASCADE)
    date_of_assessment = models.DateField()
    note = models.TextField(null=True)
    assessed_by = models.TextField(default='Dummy')  # TODO change this to proper user once we've created them
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class School(models.Model):
    name = models.CharField('name', max_length=100)
    address = models.CharField('address', max_length=250, blank=True)

    def __str__(self):
        return self.name


# extending BaseUserManager to use email instead of username
class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    # email instead of username
    username = None
    email = models.EmailField(('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    # can't have users without school assigned
    school = models.ForeignKey(School, related_name='%(class)s',
                               on_delete=models.CASCADE, default=1)  # TODO default=1 je tu zatial preto, aby sme mohli vytvorit superusera

    def __str__(self):
        return self.email


class Classroom(models.Model):
    label = models.TextField()
    school = models.ForeignKey(School, related_name='%(class)s',
                               on_delete=models.CASCADE, default=1)  # TODO default=1 je tu zatial preto, aby sme mohli vytvorit superusera


class TeacherClassroom(models.Model):
    teacher = models.ForeignKey(User, related_name='%(class)s', on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, related_name='%(class)s', on_delete=models.CASCADE)


class Child(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    birthdate = models.DateField()
    classroom = models.ForeignKey(Classroom, related_name='%(class)s', on_delete=models.CASCADE)
    school = models.ForeignKey(School, related_name='%(class)s',
                               on_delete=models.CASCADE, default=1)  # TODO default=1 je tu zatial preto, aby sme mohli vytvorit superusera


class ChildNote(models.Model):
    child = models.ForeignKey(Child, related_name='%(class)s', on_delete=models.CASCADE)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, related_name='updated_by_user', on_delete=models.PROTECT)
    created_by = models.ForeignKey(User, related_name='created_by_user', on_delete=models.PROTECT)


class ClassroomNote(models.Model):
    classroom = models.ForeignKey(Classroom, related_name='%(class)s', on_delete=models.CASCADE)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

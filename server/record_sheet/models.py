from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.base_user import BaseUserManager


class Category(models.Model):
    label = models.CharField(max_length=100)
    is_in_demo = models.BooleanField(null=True)

    def __str__(self):
        return self.label


class Subcategory(models.Model):
    label = models.CharField(max_length=100)
    parent_category = models.ForeignKey(
        Category, related_name="subcategories", on_delete=models.CASCADE
    )
    is_in_demo = models.BooleanField(null=True)

    def __str__(self):
        return self.label


class AssessmentType(models.Model):
    label = models.CharField(max_length=100)
    allows_note = models.BooleanField(default=0)
    is_in_demo = models.BooleanField(null=True)

    def __str__(self):
        return self.label


class AssessmentTypeOption(models.Model):
    parent_assessment_type = models.ForeignKey(
        AssessmentType, related_name="options", on_delete=models.CASCADE
    )
    label = models.CharField(max_length=100)
    is_in_demo = models.BooleanField(null=True)

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
    difficulty = models.CharField(
        max_length=50, choices=get_task_diff_choices(), null=True
    )
    expected_age_from = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    expected_age_to = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    is_in_demo = models.BooleanField(null=True)

    def __str__(self):
        return self.task_description


class School(models.Model):
    name = models.CharField("name", max_length=100)
    address = models.CharField("address", max_length=250, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Školka"
        verbose_name_plural = "Školky"


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
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    # email instead of username
    username = None
    email = models.EmailField(("email address"), unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    # can't have users without school assigned
    school = models.ForeignKey(
        School, related_name="users", on_delete=models.CASCADE, default=1
    )  # TODO: default=1 je tu zatial preto, aby sme mohli vytvorit superusera

    # currently, we suppose that all users should be able to make some changes in admin module
    is_staff = models.BooleanField(
        "staff status",
        default=True,
        help_text=(
            "Designates whether the user can log into this admin site. Please leave this on unless really necessary."
        ),
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Uživatelé"
        verbose_name = "Uživatel"


class Classroom(models.Model):
    label = models.TextField(
        verbose_name="Třída",
    )
    school = models.ForeignKey(
        School,
        related_name="classrooms",
        on_delete=models.CASCADE,
        verbose_name="Školka",
    )
    teachers = models.ManyToManyField(
        User, related_name="classrooms", verbose_name="Učitelé"
    )

    def __str__(self):
        return self.label

    class Meta:
        verbose_name_plural = "Třídy"
        verbose_name = "Třída"


class Child(models.Model):
    first_name = models.TextField(verbose_name="Křestní jméno")
    last_name = models.TextField(verbose_name="Příjmení")
    birthdate = models.DateField(verbose_name="Datum narození")
    classroom = models.ForeignKey(
        Classroom,
        related_name="children",
        on_delete=models.CASCADE,
        verbose_name="Třída",
    )
    school = models.ForeignKey(
        School,
        related_name="%(class)s",
        on_delete=models.CASCADE,
        default=1,
        verbose_name="Školka",
    )  # TODO default=1 je tu zatial preto, aby sme mohli vytvorit superusera

    GENDER_CHOICES = (
        ("M", "Muž"),
        ("F", "Žena"),
    )
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, verbose_name="Pohlaví"
    )

    class Meta:
        verbose_name_plural = "Děti"
        verbose_name = "Dítě"

    def __str__(self):
        return "%s %s, %s" % (self.first_name, self.last_name, self.classroom)


class Assessment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name="Úkol")
    child = models.ForeignKey(Child, on_delete=models.CASCADE, verbose_name="Dítě")
    option = models.ForeignKey(
        AssessmentTypeOption, on_delete=models.CASCADE, verbose_name="Hodnocení"
    )
    date_of_assessment = models.DateField(verbose_name="Datum hodnocení")
    note = models.TextField(null=True, verbose_name="Poznámka")
    assessed_by = models.ForeignKey(
        User, on_delete=models.PROTECT, verbose_name="Hodnotící"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s | %s | %s" % (self.task, self.child, self.option)

    class Meta:
        verbose_name_plural = "Hodnocení úkolů"
        verbose_name = "Hodnocení úkolu"


class ChildNote(models.Model):
    child = models.ForeignKey(
        Child, related_name="notes", on_delete=models.CASCADE, verbose_name="Dítě"
    )
    note = models.TextField(verbose_name="Poznámka")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        User,
        related_name="child_note_updated_by",
        on_delete=models.PROTECT,
        editable=False,
    )
    created_by = models.ForeignKey(
        User,
        related_name="child_note_created_by",
        on_delete=models.PROTECT,
        editable=False,
    )

    def __str__(self):
        return "Poznámka pro: %s" % self.child

    class Meta:
        verbose_name_plural = "Poznámky o dětech"
        verbose_name = "Poznámka"


class ClassroomNote(models.Model):
    classroom = models.ForeignKey(
        Classroom,
        related_name="notes",
        on_delete=models.CASCADE,
        verbose_name="Třída",
    )
    note = models.TextField(verbose_name="Poznámka")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        User,
        related_name="clsrm_note_updated_by",
        on_delete=models.PROTECT,
        editable=False,
    )
    created_by = models.ForeignKey(
        User,
        related_name="clsrm_note_created_by",
        on_delete=models.PROTECT,
        editable=False,
    )

    def __str__(self):
        return "Poznámka pro: %s" % self.classroom

    class Meta:
        verbose_name_plural = "Poznámky o třídách"
        verbose_name = "Poznámka"

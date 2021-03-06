import time
from datetime import timedelta

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


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
    name = models.CharField(max_length=100, verbose_name="n??zev")
    address = models.CharField(max_length=250, blank=True, verbose_name="adresa")
    cin = models.IntegerField("I??O", null=True)
    is_subscriber = models.BooleanField(default=True, verbose_name="Odb??ratel")
    is_in_demo = models.BooleanField(default=False, verbose_name="Pouze demo verze")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "??kolka"
        verbose_name_plural = "??kolky"


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
    email = models.EmailField(unique=True, verbose_name="e-mailov?? adresa")
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    # can't have users without school assigned
    school = models.ForeignKey(
        School, related_name="users", on_delete=models.CASCADE, default=1
    )

    # currently, we suppose that all users should be able to make some changes in admin module
    is_staff = models.BooleanField(
        "staff status",
        default=True,
        help_text=(
            "Designates whether the user can log into this admin site. Please leave this on unless really necessary."
        ),
    )

    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.email

    class Meta:
        verbose_name_plural = "U??itel??"
        verbose_name = "U??itel"


class Classroom(models.Model):
    label = models.TextField(
        verbose_name="T????da",
    )
    school = models.ForeignKey(
        School,
        related_name="classrooms",
        on_delete=models.CASCADE,
        verbose_name="??kolka",
    )
    teachers = models.ManyToManyField(
        User, related_name="classrooms", verbose_name="U??itel??"
    )

    def __str__(self):
        return self.label

    class Meta:
        verbose_name_plural = "T????dy"
        verbose_name = "T????da"


class Child(models.Model):
    first_name = models.TextField(verbose_name="K??estn?? jm??no")
    last_name = models.TextField(verbose_name="P????jmen??")
    birthdate = models.DateField(verbose_name="Datum narozen??")
    classroom = models.ForeignKey(
        Classroom,
        null=True,
        blank=True,
        related_name="children",
        on_delete=models.CASCADE,
        verbose_name="T????da",
    )
    school = models.ForeignKey(
        School,
        related_name="children",
        on_delete=models.CASCADE,
        default=1,
        verbose_name="??kolka",
    )

    GENDER_CHOICES = (
        ("M", "Mu??"),
        ("F", "??ena"),
    )
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, verbose_name="Pohlav??"
    )

    class Meta:
        verbose_name_plural = "D??ti"
        verbose_name = "D??t??"

    def __str__(self):
        return "%s %s, %s" % (
            self.first_name,
            self.last_name,
            self.classroom or "--------",
        )


class Assessment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name="??kol")
    child = models.ForeignKey(
        Child, related_name="assessments", on_delete=models.CASCADE, verbose_name="D??t??"
    )
    option = models.ForeignKey(
        AssessmentTypeOption, on_delete=models.CASCADE, verbose_name="Hodnocen??"
    )
    date_of_assessment = models.DateField(verbose_name="Datum hodnocen??")
    note = models.TextField(null=True, verbose_name="Pozn??mka")
    assessed_by = models.ForeignKey(
        User, on_delete=models.PROTECT, verbose_name="Hodnot??c??"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Vytvo??eno")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Aktualizov??no")

    def __str__(self):
        return "%s | %s | %s" % (self.task, self.child, self.option)

    class Meta:
        verbose_name_plural = "Hodnocen?? ??kol??"
        verbose_name = "Hodnocen?? ??kolu"


class ChildNote(models.Model):
    child = models.ForeignKey(
        Child, related_name="notes", on_delete=models.CASCADE, verbose_name="D??t??"
    )
    note = models.TextField(verbose_name="Pozn??mka")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="vytvo??eno")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="aktualizov??no")
    updated_by = models.ForeignKey(
        User,
        related_name="child_note_updated_by",
        on_delete=models.PROTECT,
        editable=False,
        verbose_name="aktualizoval(a)",
    )
    created_by = models.ForeignKey(
        User,
        related_name="child_note_created_by",
        on_delete=models.PROTECT,
        editable=False,
        verbose_name="vytvo??il(a)",
    )

    def __str__(self):
        return "Pozn??mka pro: %s" % self.child

    class Meta:
        verbose_name_plural = "Pozn??mky o d??tech"
        verbose_name = "Pozn??mka"


class ClassroomNote(models.Model):
    classroom = models.ForeignKey(
        Classroom,
        related_name="notes",
        on_delete=models.CASCADE,
        verbose_name="T????da",
    )
    note = models.TextField(verbose_name="Pozn??mka")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="vytvo??eno")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="aktualizov??no")
    updated_by = models.ForeignKey(
        User,
        related_name="clsrm_note_updated_by",
        on_delete=models.PROTECT,
        editable=False,
        verbose_name="aktualizoval(a)",
    )
    created_by = models.ForeignKey(
        User,
        related_name="clsrm_note_created_by",
        on_delete=models.PROTECT,
        editable=False,
        verbose_name="vytvo??il(a)",
    )

    def __str__(self):
        return "Pozn??mka pro: %s" % self.classroom

    class Meta:
        verbose_name_plural = "Pozn??mky o t????d??ch"
        verbose_name = "Pozn??mka"


class InvoiceManager(models.Manager):
    def create_invoice(self, school, params):
        """
        Create and save a Invoice with given parameters.
        """

        invoice = school.invoices.create(
            note=params["invoice_note"],
            created_at=timezone.now(),
            due_date=timezone.now() + timedelta(days=14),
            serial_number=int(
                params["invoice_number_prefix"]
                + time.strftime("%y", time.localtime())
                + str(Invoice.objects.count() + 1).zfill(4)
            ),
        )
        vat_rate = float(params["vat_rate"])
        unit_price_app = float(params["unit_price_app"])
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
        unit_price_children = float(params["unit_price_children"])
        item_children = invoice.items.create(
            title="evidovan?? d??ti",
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
        return invoice


class Invoice(models.Model):
    objects = InvoiceManager()
    serial_number = models.IntegerField(verbose_name="S??riov?? ????slo")
    school = models.ForeignKey(
        School, related_name="invoices", on_delete=models.CASCADE, verbose_name="??kolka"
    )
    note = models.TextField(verbose_name="Pozn??mka")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Datum vystaven??")
    due_date = models.DateTimeField(verbose_name="Datum splatnosti")
    paid_at = models.DateTimeField(
        null=True, blank=True, verbose_name="Datum zaplacen??"
    )
    total_vat = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    base_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Celkov?? cena",
    )
    is_paid = models.BooleanField(default=False, verbose_name="Zaplaceno")

    class Meta:
        verbose_name = "Faktura"
        verbose_name_plural = "Faktury"

    def __str__(self):
        return str(self.serial_number)


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, related_name="items", on_delete=models.CASCADE)
    title = models.CharField(max_length=100, verbose_name="N??zev polo??ky")
    unit_price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Jednotkov?? cena"
    )
    amount = models.IntegerField(verbose_name="Mno??stv??")
    vat_rate = models.DecimalField(
        max_digits=4, decimal_places=2, verbose_name="Sazba DPH"
    )
    total_vat = models.DecimalField(max_digits=10, decimal_places=2)
    base_price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Z??klad"
    )
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Celkem s DPH"
    )

    class Meta:
        verbose_name = "Polo??ka faktury"
        verbose_name_plural = "Polo??ky faktury"


class Parameter(models.Model):
    name = models.CharField(max_length=100, verbose_name="n??zev")
    value = models.TextField(verbose_name="hodnota")

    class Meta:
        verbose_name = "Parametr"
        verbose_name_plural = "Parametry"

    def __str__(self):
        return self.name

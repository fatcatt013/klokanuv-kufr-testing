from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin
from . import models, forms
from django.contrib.auth.models import Group
from django.forms import Textarea, ValidationError
from django.db import models as db_models
from django_object_actions import DjangoObjectActions
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
import sys

admin.site.site_header = "Administrace webu Klokanův Kufr"


# replacing username with email
class CustomUserAdmin(UserAdmin):
    model = models.User
    list_display = ("email", "display_group", "is_superuser", "is_active")
    list_filter = ("email", "groups__name", "is_superuser", "is_active")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    # "groups",
                    # "is_superuser",
                    # "is_staff",
                    "is_active",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    # "groups",
                    "password1",
                    "password2",
                    # "is_superuser",
                    # "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

    # display group(s) when showing / editing / creating users
    def display_group(self, obj):
        """
        get group, separate by comma, and display empty string if user has no group
        """
        return (
            ",".join([g.name for g in obj.groups.all()]) if obj.groups.count() else ""
        )

    def get_queryset(self, request):
        qs = super(CustomUserAdmin, self).get_queryset(request)
        if not request.user.is_superuser:
            return qs.filter(school=request.user.school)
        return qs


class ChildNoteAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if not obj.id:
            obj.created_by = request.user
        obj.updated_by = request.user

        super().save_model(request, obj, form, change)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "child":
            kwargs["queryset"] = models.Child.objects.filter(
                classroom__teachers__id=request.user.id
            )
            if request.user.is_superuser:
                kwargs["queryset"] = models.Child.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class ClassroomNoteAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if not obj.id:
            obj.created_by = request.user
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)

    # filter results - teachers & headmasters can only see notes of classrooms they belong to
    def get_queryset(self, request):
        qs = super(ClassroomNoteAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(classroom__teachers__id=request.user.id)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "classroom":
            kwargs["queryset"] = models.Classroom.objects.filter(
                teachers__id=request.user.id
            )
            if request.user.is_superuser:
                kwargs["queryset"] = models.Classroom.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class ChildAdmin(DjangoObjectActions, admin.ModelAdmin):
    formfield_overrides = {
        db_models.TextField: {"widget": Textarea(attrs={"rows": 1, "cols": 40})},
    }

    # filter results - teachers & headmasters can only see children if they belong to the same class
    def get_queryset(self, request):
        qs = super(ChildAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(classroom__teachers__id=request.user.id)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "school":
            kwargs["queryset"] = models.School.objects.filter(users__id=request.user.id)
            if request.user.is_superuser:
                kwargs["queryset"] = models.School.objects.all()
        if db_field.name == "classroom":
            kwargs["queryset"] = models.Classroom.objects.filter(
                teachers__id=request.user.id
            )
            if request.user.is_superuser:
                kwargs["queryset"] = models.Classroom.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def toolfunc(self, request, obj):
        pass

    toolfunc.label = "This will be the label of the button"  # optional
    toolfunc.short_description = "This will be the tooltip of the button"  # optional

    def import_children(modeladmin, request, queryset):

        if request.method == "POST":
            csv_file = request.FILES["csv_upload"]

            if not csv_file.name.endswith(".csv"):
                messages.warning(request, "The wrong file type was uploaded")
                return HttpResponseRedirect(request.path_info)
            url_to_redirect = reverse("admin:index")

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\n")
            if csv_data.pop(0) != "jméno|přijmení|datum narození|pohlaví|škola|třída":
                sys.exit()  # TODO pridat rozumnu hlasku - "prvy riadok musia byt nazvy stlpcov"
            ending_empty_lines = True

            # taking care of possible empty line(s) from the end of the csv
            while ending_empty_lines is True:
                if csv_data[-1] == "":
                    csv_data.pop(-1)
                else:
                    ending_empty_lines = False

            # count number of fields of first row, then make sure that each row has same no. of fields
            reference_no_of_fields = len(csv_data[0].split("|"))
            children_to_add = []
            for x in csv_data:
                fields = x.split("|")

                if len(fields) != reference_no_of_fields:
                    sys.exit()  # TODO pridat hlasku - "niektore riadky maju rozny pocet oddelovacov - vsetky musia mat rovnaky pocet"

                try:
                    models.School.objects.get(name=fields[4]),
                except ObjectDoesNotExist:
                    messages.error(
                        request,
                        "Zadaná školka neexistuje. Prosím zkontrolujte CSV data.",
                    )
                    return HttpResponseRedirect(url_to_redirect)

                try:
                    models.Classroom.objects.get(label=fields[4]),
                except ObjectDoesNotExist:
                    messages.error(
                        request,
                        "Zadaná třída neexistuje. Prosím zkontrolujte CSV data.",
                    )
                    return HttpResponseRedirect(url_to_redirect)

                try:
                    first_name, last_name, birthdate, gender, school, classroom = (
                        fields[0],
                        fields[1],
                        fields[2],
                        fields[3],
                        models.School.objects.get(name=fields[4]),
                        models.Classroom.objects.get(label=fields[5]),
                    )
                except IndexError as index_err:
                    messages.error(request, index_err)
                    return HttpResponseRedirect(url_to_redirect)

                try:
                    if gender not in ["F", "M"]:
                        raise ValidationError(
                            """Hodnota pole 'pohlaví' není správná - prosím vyplňte buď 'F' nebo 'M'.\
                                Žádné nové záznamy se neuložili."""
                        )
                except ValidationError as val_err:
                    messages.error(request, val_err)
                    return HttpResponseRedirect(url_to_redirect)

                new_child = models.Child(
                    first_name=first_name,
                    last_name=last_name,
                    birthdate=birthdate,
                    gender=gender,
                    school=models.School.objects.get(name=school),
                    classroom=models.Classroom.objects.get(label=classroom),
                )

                children_to_add.append(new_child)

            try:
                models.Child.objects.bulk_create(children_to_add)
                messages.success(request, "CSV soubor byl úspěšně zpracován.")
            except ValidationError as val_err:
                messages.error(request, val_err)
            return HttpResponseRedirect(url_to_redirect)

        form = forms.CsvImportForm()
        data = {"form": form}
        return render(request, "csv_upload.html", data)

    change_actions = ("toolfunc",)
    changelist_actions = ("import_children",)


class ClassroomAdmin(admin.ModelAdmin):
    formfield_overrides = {
        db_models.TextField: {"widget": Textarea(attrs={"rows": 1, "cols": 20})},
    }

    # filter results - teachers & headmasters can only see notes of classes they belong to
    def get_queryset(self, request):
        qs = super(ClassroomAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return request.user.classrooms

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "school":
            kwargs["queryset"] = models.School.objects.filter(users__id=request.user.id)
            if request.user.is_superuser:
                kwargs["queryset"] = models.School.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "teachers":
            kwargs["queryset"] = models.User.objects.all()
            if not request.user.is_superuser:
                kwargs["queryset"] = kwargs["queryset"].filter(
                    school_id=request.user.school.id
                )
        return super().formfield_for_manytomany(db_field, request, **kwargs)


class SchoolAdmin(admin.ModelAdmin):
    formfield_overrides = {
        db_models.CharField: {"widget": Textarea(attrs={"rows": 3, "cols": 40})},
    }

    # filter results - teachers & headmasters can only see school they belong to
    def get_queryset(self, request):
        qs = super(SchoolAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(users__id=request.user.id)


class AssessmentAdmin(admin.ModelAdmin):
    # filter results - teachers & headmasters can only see assessments of children from classes they belong to as well
    def get_queryset(self, request):
        qs = super(AssessmentAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(child__classroom__teachers__id=request.user.id)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "child":
            kwargs["queryset"] = models.Child.objects.filter(
                classroom__teachers__id=request.user.id
            )
            if request.user.is_superuser:
                kwargs["queryset"] = models.Child.objects.all()
        if db_field.name == "assessed_by":
            if request.user.is_superuser:
                kwargs["queryset"] = models.User.objects.all()
            elif request.user.groups.filter(name="Headmasters").exists():
                kwargs["queryset"] = models.User.objects.filter(
                    school__id=request.user.school.id
                )
            elif request.user.groups.filter(name="Teachers").exists():
                kwargs["queryset"] = models.User.objects.filter(id=request.user.id)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def has_change_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class InvoiceItemInline(admin.TabularInline):
    model = models.InvoiceItem
    fields = ["title", "unit_price", "amount", "vat_rate", "total_vat", "total_price"]
    readonly_fields = fields
    can_delete = False
    extra = 0


class InvoiceAdmin(admin.ModelAdmin):

    fields = [
        "serial_number",
        "school",
        "note",
        "created_at",
        "paid_at",
        "total_price",
        "is_paid",
    ]
    list_display = [
        "serial_number",
        "school",
        "created_at",
        "paid_at",
        "total_price",
        "is_paid",
    ]
    inlines = [
        InvoiceItemInline,
    ]
    readonly_fields = ["serial_number", "school", "note", "created_at", "total_price"]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(school=request.user.school)

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class ParameterAdmin(admin.ModelAdmin):
    list_display = ["name", "value"]


admin.site.register(models.User, CustomUserAdmin)
admin.site.register(models.School, SchoolAdmin)
admin.site.register(models.Classroom, ClassroomAdmin)
admin.site.register(models.Child, ChildAdmin)
admin.site.register(models.ChildNote, ChildNoteAdmin)
admin.site.register(models.ClassroomNote, ClassroomNoteAdmin)
admin.site.register(models.Assessment, AssessmentAdmin)
admin.site.unregister(Group)
admin.site.register(models.Invoice, InvoiceAdmin)
admin.site.register(models.Parameter, ParameterAdmin)

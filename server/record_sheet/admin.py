import sys

from allauth.socialaccount.models import (
    EmailAddress,
    SocialAccount,
    SocialApp,
    SocialToken,
)
from django.apps import apps
from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.signals import user_logged_in
from django.contrib.sites.models import Site
from django.core.exceptions import ObjectDoesNotExist
from django.db import models as db_models
from django.forms import Textarea, ValidationError
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.utils.safestring import mark_safe
from django_object_actions import DjangoObjectActions
from invitations.admin import Invitation as DefaultInvitation
from invitations.admin import InvitationAdmin as DefaultInvitationAdmin
from invitations.models import Invitation

from . import forms, models

admin.site.site_header = "Administrace aplikace Klokanův Kufr"


def logged_in_message(sender, user, request, **kwargs):
    """
    Add a welcome message when the user logs in
    """
    messages.info(
        request,
        mark_safe(
            "Vítejte v administraci aplikace Klokanův Kufr. Dokumentaci najdete <a href='http://localhost:8888'>na tomto odkazu</a>"
        ),
    )


user_logged_in.connect(logged_in_message)


# credits to https://forum.djangoproject.com/t/reordering-list-of-models-in-django-admin/5300 for elegant solution
class BasePriorityAdmin(admin.ModelAdmin):
    # any new model that gets added will be at the end, unless this variable is changed in it's class
    admin_priority = 99


# credits to https://forum.djangoproject.com/t/reordering-list-of-models-in-django-admin/5300 for elegant solution
def get_app_list(self, request):
    app_dict = self._build_app_dict(request)
    from django.contrib.admin.sites import site

    for app_name in app_dict.keys():
        app = app_dict[app_name]
        model_priority = {
            model["object_name"]: getattr(
                site._registry[apps.get_model(app_name, model["object_name"])],
                "admin_priority",
                20,
            )
            for model in app["models"]
        }
        app["models"].sort(key=lambda x: model_priority[x["object_name"]])
        yield app


admin.AdminSite.get_app_list = get_app_list


# replacing username with email
class CustomUserAdmin(UserAdmin, admin.ModelAdmin):
    admin_priority = 3
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

    display_group.short_description = "pozice"

    def get_queryset(self, request):
        qs = super(CustomUserAdmin, self).get_queryset(request)
        if not request.user.is_superuser:
            return qs.filter(school=request.user.school)
        return qs


class ChildNoteAdmin(admin.ModelAdmin):
    admin_priority = 7

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

    # TODO: momentalne sa zobrazuju pre vsetky 3 urovne ako moznosti podla coho filtrovat uplne vsetky deti, ucitelia...
    # treba to obmedzit na tie, ku ktorym ma user pristup
    def get_list_filter(self, request):
        if request.user.is_superuser:
            list_filter = (
                "child",
                "note",
                "created_by",
                "created_at",
                "updated_by",
                "updated_at",
            )
            return list_filter

        if request.user.groups.filter(name="Headmasters").exists():
            list_filter = (
                "child",
                "note",
                "created_by",
                "created_at",
                "updated_by",
                "updated_at",
            )
            return list_filter

        elif request.user.groups.filter(name="Teachers").exists():
            list_filter = (
                "child",
                "note",
                "created_by",
                "created_at",
                "updated_by",
                "updated_at",
            )
            return list_filter

    def get_list_display(self, request):
        if request.user.is_superuser:
            list_display = (
                "child",
                "note",
                "created_by",
                "created_at",
                "updated_by",
                "updated_at",
            )
            return list_display

        if request.user.groups.filter(name="Headmasters").exists():
            list_display = (
                "child",
                "note",
                "created_by",
                "created_at",
                "updated_by",
                "updated_at",
            )
            return list_display

        elif request.user.groups.filter(name="Teachers").exists():
            list_display = (
                "child",
                "note",
                "created_by",
                "created_at",
                "updated_by",
                "updated_at",
            )
            return list_display

    search_fields = (
        "child",
        "note",
    )
    ordering = ("child",)


class ClassroomNoteAdmin(admin.ModelAdmin):
    admin_priority = 6

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

    def get_list_filter(self, request):
        list_filter = (
            "classroom",
            "created_by",
            "created_at",
            "updated_by",
            "updated_at",
        )
        return list_filter

    def get_list_display(self, request):
        list_display = (
            "classroom",
            "note",
            "created_by",
            "created_at",
            "updated_by",
            "updated_at",
        )
        return list_display

    search_fields = (
        "classroom",
        "note",
    )
    ordering = ("classroom",)


class ChildAdmin(DjangoObjectActions, admin.ModelAdmin):
    admin_priority = 5
    formfield_overrides = {
        db_models.TextField: {"widget": Textarea(attrs={"rows": 1, "cols": 40})},
    }

    change_form_template = "child_admin_export.html"

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

    def import_children(modeladmin, request, queryset):
        if request.method == "POST":
            csv_file = request.FILES["csv_upload"]

            if not csv_file.name.endswith(".csv"):
                messages.error(
                    request, "Nahráli jste nesprávný typ souboru. Očekávaný typ je CSV."
                )
                return HttpResponseRedirect(request.path_info)

            file_data = csv_file.read().decode("utf-8")
            csv_data = file_data.split("\n")
            if csv_data.pop(0) != "jméno,přijmení,datum narození,pohlaví,škola,třída":
                messages.error(
                    request,
                    """Nesprávný formát CSV - první řádek musí obsahovat názvy sloupců: \
                        jméno,přijmení,datum narození,pohlaví,škola,třída . Žádné nové záznamy se neuložili.""",
                )
                return HttpResponseRedirect(request.path_info)

            ending_empty_lines = True

            # taking care of possible empty line(s) from the end of the csv
            while ending_empty_lines is True:
                if csv_data[-1] == "":
                    csv_data.pop(-1)
                else:
                    ending_empty_lines = False

            # count number of fields of first row, then make sure that each row has same no. of fields
            reference_no_of_fields = len(csv_data[0].split(","))
            children_to_add = []
            for x in csv_data:
                fields = x.split(",")
                if len(fields) != reference_no_of_fields:
                    messages.error(
                        request,
                        "Některé řádky obsahují různý počet sloupců. Všechny řádky musí mít stejný počet. \
                                Žádné nové záznamy se neuložili.",
                    )
                    return HttpResponseRedirect(request.path_info)

                try:
                    school = models.School.objects.get(name=fields[4])
                except ObjectDoesNotExist:
                    messages.error(
                        request,
                        "Zadaná školka neexistuje. Žádné nové záznamy se neuložili.",
                    )
                    return HttpResponseRedirect(request.path_info)

                try:
                    classroom = models.Classroom.objects.get(
                        label=fields[5], teachers=request.user
                    )
                except ObjectDoesNotExist:
                    messages.error(
                        request,
                        "Zadaná třída neexistuje anebo k ní nemáte přístup. Žádné nové záznamy se neuložili.",
                    )
                    return HttpResponseRedirect(request.path_info)

                try:
                    first_name, last_name, birthdate, gender = (
                        fields[0],
                        fields[1],
                        fields[2],
                        fields[3],
                    )
                except IndexError as index_err:
                    messages.error(request, index_err)
                    return HttpResponseRedirect(request.path_info)

                if gender not in ["F", "M"]:
                    messages.error(
                        request,
                        "Hodnota pole 'pohlaví' není správná - prosím vyplňte buď 'F' nebo 'M'.\
                            Žádné nové záznamy se neuložili.",
                    )
                    return HttpResponseRedirect(request.path_info)

                if classroom.school != request.user.school:
                    messages.error(
                        request,
                        "Zadaná školka neexistuje anebo nepatří pod vaši správu.",
                    )
                    return HttpResponseRedirect(request.path_info)

                new_child = models.Child(
                    first_name=first_name,
                    last_name=last_name,
                    birthdate=birthdate,
                    gender=gender,
                    school=school,
                    classroom=classroom,
                )

                children_to_add.append(new_child)

            try:
                models.Child.objects.bulk_create(children_to_add)
                messages.success(request, "CSV soubor byl úspěšně zpracován.")
            except ValidationError as val_err:
                messages.error(request, val_err)
            return HttpResponseRedirect(request.path_info)

        form = forms.CsvImportForm()
        data = {"form": form}
        return render(request, "csv_upload.html", data)

    import_children.label = "Importovat CSV"
    import_children.short_description = (
        "Nahrát CSV soubor s datami dětí, které se uloží do databáze."
    )
    changelist_actions = ("import_children",)

    # if user is an admin (svcluzanky), we're not showing the importcsv button
    def get_changelist_actions(self, request):
        if request.user.is_superuser:
            return []

        return self.changelist_actions


class ClassroomAdmin(admin.ModelAdmin):
    admin_priority = 4
    formfield_overrides = {
        db_models.TextField: {"widget": Textarea(attrs={"rows": 1, "cols": 20})},
    }

    def teachers_list(self, obj):
        return ", ".join([item.email for item in obj.teachers.all()])

    teachers_list.short_description = "seznam učitelů"

    def get_list_filter(self, request):
        if request.user.is_superuser:
            list_filter = ("school", "teachers")
            return list_filter
        else:
            return self.list_filter

    def get_list_display(self, request):
        if request.user.is_superuser:
            list_display = ("label", "school", "teachers_list")
            return list_display
        else:
            return self.list_display

    search_fields = ("label",)
    ordering = ("label",)

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
    admin_priority = 1

    formfield_overrides = {
        db_models.CharField: {"widget": Textarea(attrs={"rows": 3, "cols": 40})},
    }

    def save_model(self, request, obj, form, change):
        if "is_subscriber" in form.changed_data and not obj.is_subscriber:
            params = {
                param.name: param.value for param in models.Parameter.objects.all()
            }
            models.Invoice.objects.create_invoice(obj, params)
            obj.is_prepaid = True
        super().save_model(request, obj, form, change)

    # filter results - teachers & headmasters can only see school they belong to
    def get_queryset(self, request):
        qs = super(SchoolAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(users__id=request.user.id)

    def get_list_filter(self, request):
        list_filter = ("name", "address", "cin")
        return list_filter

    def get_list_display(self, request):
        list_display = ("name", "address", "cin", "is_subscriber")
        return list_display

    search_fields = ("name", "address", "cin")
    ordering = ("name",)


class AssessmentAdmin(admin.ModelAdmin):
    admin_priority = 8

    list_display = ["task", "child", "option"]

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
    fields = ["title", "amount", "unit_price", "vat_rate", "base_price", "total_price"]
    readonly_fields = fields
    can_delete = False
    extra = 0


class InvoiceAdmin(admin.ModelAdmin):
    admin_priority = 2

    change_form_template = "invoice_admin_export.html"

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
    readonly_fields = [
        "items",
        "serial_number",
        "school",
        "note",
        "created_at",
        "total_price",
    ]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(school=request.user.school)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class ParameterAdmin(admin.ModelAdmin):
    admin_priority = 9
    list_display = ["name", "value"]


class InvitationAdmin(DefaultInvitationAdmin):

    list_display = ("email", "sent", "accepted", "school", "group")

    def save_model(self, request, obj, form, change):
        obj.inviter = request.user
        obj.group = form.cleaned_data.get("group")
        super().save_model(request, obj, form, change)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "school":
            if request.user.is_superuser:
                kwargs["queryset"] = models.School.objects.all()
            else:
                kwargs["queryset"] = models.School.objects.filter(
                    id=request.user.school.id
                )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            form.base_fields["school"].initial = request.user.school
        return form

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(inviter=request.user)


admin.site.register(models.User, CustomUserAdmin)
admin.site.register(models.School, SchoolAdmin)
admin.site.register(models.Classroom, ClassroomAdmin)
admin.site.register(models.Child, ChildAdmin)
admin.site.register(models.ChildNote, ChildNoteAdmin)
admin.site.register(models.ClassroomNote, ClassroomNoteAdmin)
admin.site.register(models.Assessment, AssessmentAdmin)
admin.site.register(models.Invoice, InvoiceAdmin)
admin.site.register(models.Parameter, ParameterAdmin)

admin.site.unregister(Group)
admin.site.unregister(SocialToken)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialApp)
admin.site.unregister(EmailAddress)
admin.site.unregister(Site)

admin.site.unregister(DefaultInvitation)
admin.site.register(Invitation, InvitationAdmin)

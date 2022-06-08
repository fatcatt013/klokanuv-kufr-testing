from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models, forms
from django.contrib.auth.models import Group
from django.forms import Textarea
from django.db import models as db_models
from django_object_actions import DjangoObjectActions
from django.urls import path, reverse
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

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

    # TODO: pridat filter na zobrazovanie pola is_superuser - treba ho vobec? - netreba


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


class MyModelAdmin(DjangoObjectActions, admin.ModelAdmin):
    def toolfunc(self, request, obj):
        pass

    toolfunc.label = "This will be the label of the button"  # optional
    toolfunc.short_description = "This will be the tooltip of the button"  # optional

    def make_published(modeladmin, request, queryset):
        queryset.update(status="p")

    change_actions = ("toolfunc",)
    changelist_actions = ("make_published",)


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


# TODO: options pre assessment su velmi neprehladne (mb to nie je ani treba v adminovi?) - zakazat edit a add
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

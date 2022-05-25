from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models
from django.contrib.auth.models import Group
from django.forms import Textarea
from django.db import models as db_models


# replacing username with email
class CustomUserAdmin(UserAdmin):
    model = models.User
    list_display = ("email", "display_group", "is_superuser", "is_staff", "is_active")
    list_filter = ("email", "groups__name", "is_superuser", "is_staff", "is_active")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Permissions",
            {"fields": ("groups", "is_superuser", "is_staff", "is_active")},
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "groups",
                    "password1",
                    "password2",
                    "is_superuser",
                    "is_staff",
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
        return qs.filter(school=self.request.user.school)


class ChildNoteAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if not obj.id:
            obj.created_by = request.user
        obj.updated_by = request.user

        super().save_model(request, obj, form, change)


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


class ChildAdmin(admin.ModelAdmin):
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
        if db_field.name == "classroom":
            kwargs["queryset"] = models.Classroom.objects.filter(
                teachers__id=request.user.id
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


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


# todo modify filter fields
# def formfield_for_foreignkey(self, db_field, request, **kwargs):
#     if db_field.name == "child":
#         kwargs["queryset"] = models.Child.objects.filter(users__id=request.user.id)
#     if db_field.name == "user":
#         kwargs["queryset"] = models.User.objects.filter(
#             teachers__id=request.user.id
#         )
#     return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(models.User, CustomUserAdmin)
admin.site.register(models.School, SchoolAdmin)
admin.site.register(models.Classroom, ClassroomAdmin)
admin.site.register(models.Child, ChildAdmin)
admin.site.register(models.ChildNote, ChildNoteAdmin)
admin.site.register(models.ClassroomNote, ClassroomNoteAdmin)
admin.site.register(models.Assessment, AssessmentAdmin)
admin.site.unregister(Group)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models


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

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class ParameterAdmin(admin.ModelAdmin):
    list_display = ["name", "value"]


admin.site.register(models.User, CustomUserAdmin)
admin.site.register(models.School)
admin.site.register(models.Classroom)
admin.site.register(models.Child)
admin.site.register(models.ChildNote, ChildNoteAdmin)
admin.site.register(models.ClassroomNote, ClassroomNoteAdmin)
admin.site.register(models.Invoice, InvoiceAdmin)
admin.site.register(models.Parameter, ParameterAdmin)

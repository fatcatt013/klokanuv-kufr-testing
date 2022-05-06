from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models  # custom models


# we want to work with User and School in admin module
admin.site.register(models.User)
admin.site.register(models.School)
admin.site.register(models.Classroom)
admin.site.register(models.TeacherClassroom)
admin.site.register(models.Child)
admin.site.register(models.ChildNote)
admin.site.register(models.ClassroomNote)


# replacing username with email
class CustomUserAdmin(UserAdmin):
    model = models.User
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}),
    )
    search_fields = ('email',)
    ordering = ('email',)

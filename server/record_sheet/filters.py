from django.contrib import admin
from .models import Classroom


class ClassroomListFilter(admin.SimpleListFilter):

    """
    This filter will always return a subset of the instances in a Model, either filtering by the
    user choice or by a default value.
    """

    # Human-readable title which will be displayed in the
    # right admin sidebar just above the filter options.
    title = "Třída"

    # Parameter for the filter that will be used in the URL query.
    parameter_name = "classroom"

    default_value = None

    def lookups(self, request, model_admin):
        """
        Returns a list of tuples. The first element in each
        tuple is the coded value for the option that will
        appear in the URL query. The second element is the
        human-readable name for the option that will appear
        in the right sidebar.
        """
        list_of_classrooms = []
        queryset = Classroom.objects.all().filter(teachers=request.user.id)
        for classroom in queryset:
            list_of_classrooms.append((str(classroom.id), classroom.label))
        return sorted(list_of_classrooms, key=lambda tp: tp[1])

    def queryset(self, request, queryset):
        """
        Returns the filtered queryset based on the value
        provided in the query string and retrievable via
        `self.value()`.
        """
        # Compare the requested value to decide how to filter the queryset.
        if self.value():
            return queryset.filter(classroom_id=self.value())
        return queryset

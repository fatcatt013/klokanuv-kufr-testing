from rest_framework import viewsets, permissions
from record_sheet import models, serializers, permissions as custom_permissions
from django.contrib.auth.models import AnonymousUser


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """

    serializer_class = serializers.TaskSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if isinstance(self.request.user, AnonymousUser):
            return models.Task.objects.filter(is_in_demo=True)
        else:
            return models.Task.objects.all()


class SubcategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    serializer_class = serializers.SubcategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if isinstance(self.request.user, AnonymousUser):
            return models.Subcategory.objects.filter(is_in_demo=True)
        else:
            return models.Subcategory.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """

    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if isinstance(self.request.user, AnonymousUser):

            return models.Category.objects.filter(is_in_demo=True)
        else:
            return models.Category.objects.all()


class AssessmentTypeOptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows assessment type opions to be viewed or edited.
    """

    serializer_class = serializers.AssessmentTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if isinstance(self.request.user, AnonymousUser):
            type_ids = (
                models.Task.objects.filter(is_in_demo=True)
                .values("assessment_type")
                .distinct()
            )
            return models.AssessmentTypeOption.objects.filter(
                parent_assessment_type__in=type_ids
            )
        else:
            return models.AssessmentType.objects.all()


class AssessmentTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows assessment types to be viewed or edited.
    """

    serializer_class = serializers.AssessmentTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if isinstance(self.request.user, AnonymousUser):
            type_ids = (
                models.Task.objects.filter(is_in_demo=True)
                .values("assessment_type")
                .distinct()
            )
            return models.AssessmentType.objects.filter(id__in=type_ids)
        else:
            return models.AssessmentType.objects.all()


class AssessmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows assessments to be viewed or edited.
    """

    serializer_class = serializers.AssessmentSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Assessment.objects.all()
        return models.Assessment.objects.filter(
            child__classroom__teachers__id=self.request.user.id
        )


class SchoolViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows schools to be viewed or edited.
    """

    serializer_class = serializers.SchoolSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.School.objects.all()
        return models.School.objects.filter(users__id=self.request.user.id)


class ClassroomViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows classrooms to be viewed or edited.
    """

    serializer_class = serializers.ClassroomSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Classroom.objects.all()
        return self.request.user.classrooms


class ChildViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows children to be viewed or edited.
    """

    serializer_class = serializers.ChildSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Child.objects.all()
        return models.Child.objects.filter(classroom__teachers__id=self.request.user.id)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.User.objects.all()
        return models.User.objects.filter(school=self.request.user.school)


class ChildNoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows children notes to be viewed or edited.
    """

    serializer_class = serializers.ChildNoteSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.ChildNote.objects.all()

        return models.ChildNote.objects.filter(
            child__classroom__teachers__id=self.request.user.id
        )


class ClassroomNoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows classroom notes to be viewed or edited.
    """

    serializer_class = serializers.ClassroomNoteSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.ClassroomNote.objects.all()

        return models.ClassroomNote.objects.filter(
            classroom__teachers__id=self.request.user.id
        )

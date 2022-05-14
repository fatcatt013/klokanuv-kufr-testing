from rest_framework import viewsets, permissions
from record_sheet import models, serializers
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from record_sheet.permissions import CustomDjangoModelPermission


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """

    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer


class SubcategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.Subcategory.objects.all()
    serializer_class = serializers.SubcategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class AssessmentTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.AssessmentType.objects.all()
    serializer_class = serializers.AssessmentTypeSerializer


class AssessmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    serializer_class = serializers.AssessmentSerializer

    def get_queryset(self):
        return models.Assessment.objects.filter(
            child__classroom__teachers__id=self.request.user.id
        )


class SchoolViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    serializer_class = serializers.SchoolSerializer

    def get_queryset(self):
        return models.School.objects.filter(users__id=self.request.user.id)


class ClassroomViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows classrooms to be viewed or edited.
    """

    serializer_class = serializers.ClassroomSerializer

    def get_queryset(self):
        return self.request.user.classrooms


class ChildViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    serializer_class = serializers.ChildSerializer

    def get_queryset(self):
        return models.Child.objects.filter(classroom__teachers__id=self.request.user.id)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        return models.User.objects.filter(school=self.request.user.school)


class ChildNoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    serializer_class = serializers.ChildNoteSerializer

    def get_queryset(self):
        return models.ChildNote.objects.filter(
            child__classroom__teachers__id=self.request.user.id
        )


class ClassroomNoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    serializer_class = serializers.ClassroomNoteSerializer

    def get_queryset(self):
        return models.ClassroomNote.objects.filter(
            classroom__teachers__id=self.request.user.id
        )

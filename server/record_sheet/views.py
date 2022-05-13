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

    permission_classes = (permissions.IsAuthenticated, CustomDjangoModelPermission)
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class AssessmentTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.AssessmentType.objects.all()
    serializer_class = serializers.AssessmentTypeSerializer


class AssessmentTypeOptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.AssessmentTypeOption.objects.all()
    serializer_class = serializers.AssessmentTypeOptionSerializer


class AssessmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.Assessment.objects.all()
    serializer_class = serializers.AssessmentSerializer


class SchoolViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer


class ClassroomViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows classrooms to be viewed or edited.
    """

    queryset = models.Classroom.objects.all()
    serializer_class = serializers.ClassroomSerializer


class ClassroomTeacherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows classrooms to be viewed or edited.
    """

    serializer_class = serializers.ClassroomTeacherSerializer

    #  TODO: PRIDAT FILTER NA SKOLU PRE HEADMASTEROV
    def get_queryset(self):
        if self.request.user.groups.filter(name="Teachers").exists():
            queryset = models.ClassroomTeacher.objects.filter(teacher=self.request.user)
        elif self.request.user.groups.filter(name="Headmasters").exists():
            queryset = models.ClassroomTeacher.objects.all()
        else:
            queryset = models.ClassroomTeacher.objects.all()

        return queryset


class ChildViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.Child.objects.all()
    serializer_class = serializers.ChildSerializer


class ChildNoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.ChildNote.objects.all()
    serializer_class = serializers.ChildNoteSerializer


class ClassroomNoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.ClassroomNote.objects.all()
    serializer_class = serializers.ClassroomNoteSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

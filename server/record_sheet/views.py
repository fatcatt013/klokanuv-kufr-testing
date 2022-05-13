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

    permission_classes = (permissions.IsAuthenticated, CustomDjangoModelPermission)

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


class ClassroomViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows classrooms to be viewed or edited.
    """

    # TODO: vzdy volame ClassroomTeacherSerializer, tym padom ClassroomSerializer moze ist do pice, je to k?
    serializer_class = serializers.ClassroomTeacherSerializer

    def get_queryset(self):
        # TODO: sem pojde if na headmasters / managers, ktory odstrani ten filter na konci, where applicable - uvidi tak vsetko
        queryset = models.ClassroomTeacher.objects.filter(teacher=self.request.user)
        return queryset


class ClassroomTeacherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """

    queryset = models.ClassroomTeacher.objects.all()
    serializer_class = serializers.ClassroomTeacherSerializer


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

from rest_framework import viewsets, permissions
from record_sheet import models, serializers


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
    API endpoint that allows subcategories to be viewed or edited.
    """
    queryset = models.Classroom.objects.all()
    serializer_class = serializers.ClassroomSerializer


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

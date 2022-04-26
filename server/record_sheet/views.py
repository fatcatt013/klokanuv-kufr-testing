from rest_framework import viewsets, permissions
from record_sheet import models, serializers

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]


class SubcategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """
    queryset = models.Subcategory.objects.all()
    serializer_class = serializers.SubcategorySerializer
    # permission_classes = [permissions.IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]


class AssessmentTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """
    queryset = models.AssessmentType.objects.all()
    serializer_class = serializers.AssessmentTypeSerializer
    # permission_classes = [permissions.IsAuthenticated]


class AssessmentTypeOptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """
    queryset = models.AssessmentTypeOption.objects.all()
    serializer_class = serializers.AssessmentTypeOptionSerializer
    # permission_classes = [permissions.IsAuthenticated]

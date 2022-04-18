from record_sheet.models import Task, Subcategory, Category
from rest_framework import viewsets
from rest_framework import permissions
from record_sheet.serializers import TaskSerializer, SubcategorySerializer, CategorySerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]


class SubcategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer
    # permission_classes = [permissions.IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subcategories to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

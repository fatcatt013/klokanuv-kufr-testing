from collections import defaultdict

from django.contrib.auth.models import AnonymousUser
from django.views.generic.detail import DetailView
from django_xhtml2pdf.views import PdfMixin
from rest_framework import permissions, viewsets
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView

from record_sheet import models
from record_sheet import permissions as custom_permissions
from record_sheet import serializers
from record_sheet.permissions import CustomDjangoModelPermission


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


class InvoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows invoices to be viewed or edited by superuser
    """

    serializer_class = serializers.InvoiceSerializer

    def get_queryset(self):
        return models.Invoice.objects.filter(school=self.request.user.school)


class InvoiceItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows invoice items to be viewed or edited by superuser
    """

    serializer_class = serializers.InvoiceItemSerializer

    def get_queryset(self):
        return models.InvoiceItem.objects.filter(
            invoice__school=self.request.user.school
        )


class InvoicePdfView(PdfMixin, DetailView):
    model = models.Invoice
    template_name = "invoice.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["parameters"] = {
            param.name: param.value for param in models.Parameter.objects.all()
        }
        return context


class ChildPdfView(DetailView):
    model = models.Child
    template_name = "child.html"

    def has_permission(self):
        print("has_permission")
        return self.request.user.is_superuser or (
            self.request.user in self.object.classroom.teachers.all()
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["teachers"] = ", ".join(
            [
                f"{teacher.first_name} {teacher.last_name}"
                for teacher in self.object.classroom.teachers.all()
            ]
        )

        categorized = defaultdict(lambda: defaultdict(dict))

        for task in models.Task.objects.all():
            options = task.assessment_type.options.all()
            subcategory = task.subcategory
            category = subcategory.parent_category
            categorized[category.label][subcategory.label]["headers"] = [
                opt.label for opt in options
            ]
            categorized[category.label][subcategory.label][task.id] = {
                "data": task,
                "codename": task.codename.split(" "),
            }
            categorized[category.label][subcategory.label][task.id]["options"] = {
                opt.id: [] for opt in options
            }

        for assessment in self.object.assessments.all():
            task = assessment.task
            subcategory = task.subcategory
            category = subcategory.parent_category
            categorized[category.label][subcategory.label][task.id]["options"][
                assessment.option.id
            ].append(
                f"{assessment.date_of_assessment.strftime('%m/%y')}{f' {assessment.note}' if assessment.note else ''}"
            )

        context["tasks"] = {
            category: dict(subcategories)
            for category, subcategories in categorized.items()
        }
        return context


class ParameterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows parameters to be viewed or edited by superuser
    """

    queryset = models.Parameter.objects.all()
    serializer_class = serializers.ParameterSerializer

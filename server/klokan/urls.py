"""klokan URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from rest_framework import routers
from record_sheet import views
from django.contrib import admin
from rest_framework.schemas import get_schema_view

router = routers.DefaultRouter()
router.register(r"tasks", views.TaskViewSet)
router.register(r"subcategories", views.SubcategoryViewSet)
router.register(r"categories", views.CategoryViewSet)
router.register(r"assessment-types", views.AssessmentTypeViewSet)
router.register(r"assessment-type-options", views.AssessmentTypeOptionViewSet)
router.register(r"assessments", views.AssessmentViewSet)
router.register(r"classrooms", views.ClassroomViewSet)
router.register(r"classroom-teachers", views.ClassroomTeacherViewSet)
router.register(r"children", views.ChildViewSet)
router.register(r"children-notes", views.ChildNoteViewSet)
router.register(r"classrooms-notes", views.ClassroomNoteViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
    path(
        "openapi",
        get_schema_view(
            title="Klokanuv-kufr",
            description="OpenAPI of Klokanuv-kufr",
            version="1.0.0",
        ),
        name="openapi-schema",
    ),
]

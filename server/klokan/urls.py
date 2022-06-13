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
from django.contrib import admin
from django.urls import include, path
from record_sheet import views
from rest_framework import routers
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt import views as jwt

router = routers.DefaultRouter()
router.register(r"tasks", views.TaskViewSet, basename="task")
router.register(r"subcategories", views.SubcategoryViewSet, basename="subcategory")
router.register(r"categories", views.CategoryViewSet, basename="category")
router.register(
    r"assessment-types", views.AssessmentTypeViewSet, basename="assessment-type"
)
router.register(r"assessments", views.AssessmentViewSet, basename="assessment")
router.register(r"child-notes", views.ChildNoteViewSet, basename="child-note")
router.register(r"class-notes", views.ClassroomNoteViewSet, basename="class-note")
router.register(r"classes", views.ClassroomViewSet, basename="classroom")
router.register(r"children", views.ChildViewSet, basename="child")
router.register(r"user", views.UserViewSet, basename="user")
router.register(r"school", views.SchoolViewSet, basename="school")
router.register(r"invoice", views.InvoiceViewSet, basename="invoice")
router.register(r"invoice-item", views.InvoiceItemViewSet, basename="invoice-item")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("invoice/<int:pk>/pdf/", views.InvoicePdfView.as_view(), name="invoice_pdf"),
    path("child/<int:pk>/pdf/", views.ChildPdfView.as_view(), name="child_pdf"),
    path("api/token/", jwt.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", jwt.TokenRefreshView.as_view(), name="token_refresh"),
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
    path("accounts/", include("allauth.urls")),
    path("invitations/", include("invitations.urls", namespace="invitations")),
]

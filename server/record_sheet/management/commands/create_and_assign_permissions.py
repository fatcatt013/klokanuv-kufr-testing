from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand


# zatial command, pojde do migrations
class Command(BaseCommand):
    help = "Creates user groups - Headmasters, Teachers - and assigns them correct permissions"

    def handle(self, **options):

        (headmasters_group, _) = Group.objects.get_or_create(name="Headmasters")
        (teacher_group, _) = Group.objects.get_or_create(name="Teachers")

        # ASK - ucitelom view na vsetko?
        teacher_permissions = [
            "view_assessment",
            "view_assessmenttype",
            "view_category",
            "view_subcategory",
            "view_child",
            "view_classroom",
            "view_school",
            "view_task",
            "view_assessmenttypeoption",
            "view_childnote",
            "view_classroomnote",
            # "view_user",
            "add_assessment",
            "change_assessment",
            "delete_assessment",
            "add_childnote",
            "change_childnote",
            "delete_childnote",
            "add_classroomnote",
            "change_classroomnote",
            "delete_classroomnote",
            "add_child",
            "change_child",
            "delete_child",
        ]
        for permission in teacher_permissions:
            teacher_group.permissions.add(Permission.objects.get(codename=permission))

        headmaster_permissions = [
            "add_logentry",
            "change_logentry",
            "delete_logentry",
            "view_logentry",
            # "add_permission",
            # "change_permission",
            # "delete_permission",
            # "view_permission",
            # "add_group",
            # "change_group",
            # "delete_group",
            # "view_group",
            "add_contenttype",
            "change_contenttype",
            "delete_contenttype",
            "view_contenttype",
            "add_session",
            "change_session",
            "delete_session",
            "view_session",
            # "add_user",
            # "change_user",
            # "delete_user",
            "view_user",
            # "add_assessmenttype",
            # "change_assessmenttype",
            # "delete_assessmenttype",
            "view_assessmenttype",
            # "add_category",
            # "change_category",
            # "delete_category",
            "view_category",
            # "add_subcategory",
            # "change_subcategory",
            # "delete_subcategory",
            "view_subcategory",
            "add_child",
            "change_child",
            "delete_child",
            "view_child",
            "add_classroom",
            "change_classroom",
            "delete_classroom",
            "view_classroom",
            # "add_school",
            "change_school",
            # "delete_school",
            "view_school",
            # "add_task",
            # "change_task",
            # "delete_task",
            # "view_task",
            "add_classroomnote",
            "change_classroomnote",
            "delete_classroomnote",
            "view_classroomnote",
            "add_childnote",
            "change_childnote",
            "delete_childnote",
            "view_childnote",
            # "add_assessmenttypeoption",
            # "change_assessmenttypeoption",
            # "delete_assessmenttypeoption",
            # "view_assessmenttypeoption",
            "add_assessment",
            "change_assessment",
            "delete_assessment",
            "view_assessment",
            # "add_invoice",
            # "change_invoice",
            # "delete_invoice",
            "view_invoice",
            # "add_invoiceitem",
            # "change_invoiceitem",
            # "delete_invoiceitem",
            "view_invoiceitem",
            "add_invitation",
            "change_invitation",
            "delete_invitation",
        ]

        for permission in headmaster_permissions:
            headmasters_group.permissions.add(
                Permission.objects.get(codename=permission)
            )

        # permission template, might use later
        # permission = Permission.objects.create(codename='can_add_project',
        #                                    name='Can add project',
        #                                    content_type=ct)

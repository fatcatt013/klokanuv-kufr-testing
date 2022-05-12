from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand


# zatial command, pojde do migrations
class Command(BaseCommand):
    help = 'Creates user groups - Headmasters, Teachers - and assigns them correct permissions'

    def handle(self, **options):

        # create all 3 groups
        headmasters_group = Group.objects.create(name='Headmasters')
        teacher_group = Group.objects.create(name='Teachers')

        teacher_permissions = ["add_assessment", "change_assessment", "delete_assessment", "view_assessment",
                               "view_user"]
        for permission in teacher_permissions:
            teacher_group.permissions.add(Permission.objects.get(codename=permission))

        # assign permissions to headmaster
        headmaster_permissions = ["add_assessmenttype", "change_assessmenttype", "delete_assessmenttype",
                                  "view_assessmenttype", "add_category", "change_category", "delete_category",
                                  "view_category", "add_subcategory", "change_subcategory", "delete_subcategory",
                                  "view_subcategory", "add_task", "change_task", "delete_task", "view_task",
                                  "add_assessmenttypeoption", "change_assessmenttypeoption",
                                  "delete_assessmenttypeoption", "view_assessmenttypeoption", "add_assessment",
                                  "change_assessment", "delete_assessment", "view_assessment", "add_user",
                                  "change_user", "delete_user", "view_user"]

        for permission in headmaster_permissions:
            headmasters_group.permissions.add(Permission.objects.get(codename=permission))

        # permission template, might use later
        # permission = Permission.objects.create(codename='can_add_project',
        #                                    name='Can add project',
        #                                    content_type=ct)

from allauth.account.signals import user_signed_up
from django.contrib.auth.models import Group
from django.dispatch import receiver
from invitations.utils import get_invitation_model


@receiver(user_signed_up)
def on_user_signed_up(request, user, **kwargs):
    try:
        Invitation = get_invitation_model()
        invite = Invitation.objects.get(email=user.email)
        user.school = invite.school
        if invite.group == "manager":
            user.is_superuser = True
        elif invite.group == "headmaster":
            user.groups.add(Group.objects.get(name="Headmasters"))
        else:
            user.groups.add(Group.objects.get(name="Teachers"))

        user.save()
    except Invitation.DoesNotExist:
        print("signed up user was not invited.")

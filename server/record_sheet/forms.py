from django import forms
from invitations.forms import InvitationAdminAddForm as DefaultInvitationAdminAddForm
from allauth.account.forms import SignupForm

from django.utils.translation import gettext, gettext_lazy as _, pgettext

from . import models


class CustomSignupForm(SignupForm):
    first_name = forms.CharField(max_length=30, label="First Name", required=True)
    last_name = forms.CharField(max_length=30, label="Last Name", required=True)

    def save(self, request):
        user = super(CustomSignupForm, self).save(request)
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.save()
        return user


class InvitationAdminAddForm(DefaultInvitationAdminAddForm):
    def save(self, *args, **kwargs):
        cleaned_data = super(DefaultInvitationAdminAddForm, self).clean()
        email = cleaned_data.get("email")
        params = {"email": email}
        if cleaned_data.get("inviter"):
            params["inviter"] = cleaned_data.get("inviter")
        params["school"] = cleaned_data.get("school")
        instance = models.Invitation.create(**params)
        instance.send_invitation(self.request)
        super(DefaultInvitationAdminAddForm, self).save(*args, **kwargs)
        return instance

    class Meta:
        model = models.Invitation
        fields = ("email", "inviter", "school")

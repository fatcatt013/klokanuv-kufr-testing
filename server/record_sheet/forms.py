from django import forms
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


class CsvImportForm(forms.Form):
    csv_upload = forms.FileField()

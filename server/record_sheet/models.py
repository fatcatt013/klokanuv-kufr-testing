from enum import Enum
from django.db import models


class Category(models.Model):
    label = models.CharField(max_length=100)


class Subcategory(models.Model):
    label = models.CharField(max_length=100)
    parent_category = models.ForeignKey(Category, on_delete=models.CASCADE)


class AssessmentType(models.Model):
    label = models.CharField(max_length=100)
    allows_note = models.BooleanField(default=0)


def get_task_diff_choices():
    difficulty_choices = [
        ("EASIER", "-"),
        ("SAME", "="),
        ("HARDER", "+"),
    ]
    return difficulty_choices


class Task(models.Model):
    id = models.IntegerField(primary_key=True)
    parent_task = models.ForeignKey("self", on_delete=models.CASCADE, null=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True)
    codename = models.CharField(max_length=20, null=True)
    assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)
    task_description = models.TextField()
    difficulty = models.CharField(max_length=50, choices=get_task_diff_choices(), null=True)
    expected_age_from = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    expected_age_to = models.DecimalField(decimal_places=2, max_digits=5, null=True)


class AssessmentTypeOption(models.Model):
    parent_assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)
    label = models.CharField(max_length=100)


class Assessment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    option = models.ForeignKey(AssessmentTypeOption, on_delete=models.CASCADE)
    date_of_assessment = models.DateField()
    note = models.TextField(null=True)
    assessed_by = models.TextField(default='Dummy') # TODO change this to proper user once we've created them
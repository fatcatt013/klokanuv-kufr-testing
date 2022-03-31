from django.db import models


class Category(models.Model):
    label = models.CharField(max_length=100)


class Subcategory(models.Model):
    label = models.CharField(max_length=100)
    parent_category = models.ForeignKey(Category, on_delete=models.CASCADE)


class AssessmentType(models.Model):
    label = models.CharField(max_length=100)
    allows_note = models.BooleanField(default=0)


class Task(models.Model):
    parent_task = models.ForeignKey("self", on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)  # TODO discuss - how strict do we want to be here?
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True)  # and here
    assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)  # and here
    task_text = models.CharField(max_length=500)
    difficulty = models.CharField(max_length=50, null=True)  # TODO enum solved by some testing / 
    expected_age_from = models.DecimalField(decimal_places=2,max_digits=5)
    expected_age_to = models.DecimalField(decimal_places=2,max_digits=5)


class AssessmentTypeOption(models.Model):
    parent_assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)
    label = models.CharField(max_length=100)


class Assessment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    option = models.ForeignKey(AssessmentTypeOption, on_delete=models.CASCADE)
    date_of_assessment = models.DateField()
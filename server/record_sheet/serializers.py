from record_sheet import models
from rest_framework import serializers


class AssessmentTypeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AssessmentTypeOption
        fields = ["id", "label"]


class AssessmentSerializer(serializers.ModelSerializer):
    option = serializers.PrimaryKeyRelatedField(
        queryset=models.AssessmentTypeOption.objects.all()
    )

    class Meta:
        model = models.Assessment
        fields = [
            "id",
            "task",
            "child",
            "option",
            "date_of_assessment",
            "note",
            "assessed_by",
        ]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class AssessmentTypeSerializer(serializers.ModelSerializer):
    options = AssessmentTypeOptionSerializer(many=True, read_only=True)

    class Meta:
        model = models.AssessmentType
        fields = ["id", "label", "allows_note", "options", "url"]


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.School
        fields = ["id", "name", "address", "url"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = [
            "id",
            "parent_task",
            "subcategory",
            "codename",
            "assessment_type",
            "task_description",
            "difficulty",
            "expected_age_from",
            "expected_age_to",
            "url",
        ]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class SubcategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Subcategory
        fields = ["id", "label", "url"]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ["id", "label", "subcategories", "url"]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class ChildNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChildNote
        fields = ["id", "child", "note"]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class ClassroomNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClassroomNote
        fields = ["id", "classroom", "note"]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class ClassroomSerializer(serializers.ModelSerializer):
    notes = ClassroomNoteSerializer(many=True, read_only=True)

    class Meta:
        model = models.Classroom
        fields = ["id", "label", "school", "children", "notes", "url"]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class ChildSerializer(serializers.ModelSerializer):
    notes = ChildNoteSerializer(many=True, read_only=True)

    class Meta:
        model = models.Child
        fields = ["id", "first_name", "last_name", "birthdate", "notes", "url"]
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "updated_by": {"default": serializers.CurrentUserDefault()},
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"

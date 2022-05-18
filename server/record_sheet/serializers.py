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
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
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


class SubcategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Subcategory
        fields = ["id", "label", "url"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ["id", "label", "subcategories", "url"]


class ChildNoteSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = models.ChildNote
        fields = ["id", "child", "note"]


class ClassroomNoteSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = models.ClassroomNote
        fields = ["id", "classroom", "note"]


class ClassroomSerializer(serializers.ModelSerializer):
    notes = ClassroomNoteSerializer(many=True, read_only=True)
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = models.Classroom
        fields = ["id", "label", "school", "children", "notes", "url"]


class ChildSerializer(serializers.ModelSerializer):
    notes = ChildNoteSerializer(many=True, read_only=True)
    created_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    updated_by = serializers.StringRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )

    class Meta:
        model = models.Child
        fields = ["id", "first_name", "last_name", "birthdate", "notes", "url"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"

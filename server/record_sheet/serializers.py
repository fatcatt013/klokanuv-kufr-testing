from record_sheet import models
from rest_framework import serializers


class AssessmentTypeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AssessmentTypeOption
        fields = ["id", "label", "url"]


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


class AssessmentTypeSerializer(serializers.ModelSerializer):
    options = AssessmentTypeOptionSerializer(
        source="assessmenttypeoption_set", many=True, read_only=True
    )

    class Meta:
        model = models.AssessmentType
        fields = ["id", "label", "allows_note", "options", "url"]


class TaskSerializer(serializers.ModelSerializer):
    assessment_type = AssessmentTypeSerializer(read_only=True)

    class Meta:
        model = models.Task
        fields = "__all__"  # TODO: ADD URL


class SubcategorySerializer(serializers.HyperlinkedModelSerializer):
    tasks = TaskSerializer(source="task_set", many=True, read_only=True)

    class Meta:
        model = models.Subcategory
        fields = ["id", "label", "tasks", "url"]


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(
        source="subcategory_set", many=True, read_only=True
    )

    class Meta:
        model = models.Category
        fields = ["id", "label", "subcategories", "url"]


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Classroom
        fields = ["id", "label", "url"]


class ClassroomTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClassroomTeacher
        fields = ["id", "teacher", "classroom", "url"]


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Child
        fields = "__all__"


class ChildNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChildNote
        fields = ["id", "child", "note", "url"]


class ClassroomNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Classroom
        fields = ["id", "classroom", "note", "url"]

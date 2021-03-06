from rest_framework import serializers

from record_sheet import models


class AssessmentTypeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AssessmentTypeOption
        fields = ["id", "label"]


class AssessmentSerializer(serializers.ModelSerializer):
    option = serializers.PrimaryKeyRelatedField(
        queryset=models.AssessmentTypeOption.objects.all()
    )
    assessed_by = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        return models.Assessment.objects.create(
            assessed_by=self.context["request"].user,
            **validated_data,
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
            "note": {
                "required": False,
                "allow_blank": True,
            }
        }


class AssessmentTypeSerializer(serializers.ModelSerializer):
    options = AssessmentTypeOptionSerializer(many=True, read_only=True)

    class Meta:
        model = models.AssessmentType
        fields = ["id", "label", "allows_note", "options"]


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.School
        fields = ["id", "name", "address", "url", "cin"]


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
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    updated_by = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        return models.ChildNote.objects.create(
            created_by=self.context["request"].user,
            updated_by=self.context["request"].user,
            **validated_data,
        )

    class Meta:
        model = models.ChildNote
        fields = ["id", "child", "note", "created_by", "updated_by"]


class ClassroomNoteSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    updated_by = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        return models.ClassroomNote.objects.create(
            created_by=self.context["request"].user,
            updated_by=self.context["request"].user,
            **validated_data,
        )

    class Meta:
        model = models.ClassroomNote
        fields = ["id", "classroom", "note", "created_by", "updated_by"]


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Classroom
        fields = ["id", "label", "school", "children", "notes", "url"]


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Child
        fields = [
            "id",
            "first_name",
            "last_name",
            "birthdate",
            "gender",
            "notes",
            "url",
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Invoice
        fields = "__all__"


class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InvoiceItem
        fields = "__all__"


class ParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Parameter
        fields = "__all__"

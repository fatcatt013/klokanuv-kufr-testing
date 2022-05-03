from record_sheet import models
from rest_framework import serializers


class AssessmentTypeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AssessmentTypeOption
        fields = ['id', 'label']


class AssessmentSerializer(serializers.ModelSerializer):
    option = serializers.PrimaryKeyRelatedField(queryset=models.AssessmentTypeOption.objects.all())
    class Meta:
        model = models.Assessment
        fields = ['id', 'task', 'option', 'date_of_assessment', 'note', 'assessed_by']


class AssessmentTypeSerializer(serializers.ModelSerializer):
    options = AssessmentTypeOptionSerializer(source='assessmenttypeoption_set', many=True, read_only=True)
    class Meta:
        model = models.AssessmentType
        fields = ['id', 'label', 'allows_note', 'options']


class TaskSerializer(serializers.ModelSerializer):
    assessment_type = AssessmentTypeSerializer(read_only=True)
    class Meta:
        model = models.Task
        fields = '__all__'


class SubcategorySerializer(serializers.HyperlinkedModelSerializer):
    tasks = TaskSerializer(source='task_set', many=True, read_only=True)
    class Meta:
        model = models.Subcategory
        fields = ['id', 'label', 'tasks']


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(source='subcategory_set', many=True, read_only=True)
    class Meta:
        model = models.Category
        fields = ['id', 'label', 'subcategories']

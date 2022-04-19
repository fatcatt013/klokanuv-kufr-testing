from django.core.management.base import BaseCommand
from record_sheet.models import Category, Subcategory, AssessmentType, Task
import os
import csv


# sheet1 csv file containing categories, tasks, subcategories
def base_list_sheet1():
    current_filepath = os.path.dirname(os.path.abspath(__file__))

    csv_filepath = "%s/csv/diagnostika_sheet1.csv" % current_filepath

    # read csv file and put it's contents into list of dictionaries
    # serves as a baseline for information extraction
    with open(csv_filepath, 'r', encoding='utf-8') as file:
        data_reader = list(csv.DictReader(file, delimiter='|'))
        return data_reader


# take base data and extract Category label from them
def populate_categories(base_data):
    category_names = []

    # iterate base_data and keep unique category entries
    for row in base_data:
        if row['category'] not in category_names:
            category_names.append(row['category'])
    
    category_model_instances = []
    for cat_name in category_names:
        cat_model_inst = Category(label=cat_name)
        category_model_instances.append(cat_model_inst)

    Category.objects.bulk_create(category_model_instances)


# transform subcategory names and their parent's model instances into subcategory instances
def populate_subcategories(base_data):
    subcategory_pairs = []
    subcats_already_added = []

    # this way we get all pairs of subcategory + category
    for row in base_data:
        if row['subcategory'] not in subcats_already_added:
            subcategory_pairs.append(
                {'subcategory': row['subcategory'],
                 'category': row['category']}
            )
            subcats_already_added.append(row['subcategory'])

    subcategory_model_instances = []

    for subcat_pair in subcategory_pairs:
        # retrieve existing Category object to be able to pass it as parent_category
        parent_category = Category.objects.get(label=subcat_pair['category'])
        subcat_model_inst = Subcategory(label=subcat_pair['subcategory'], parent_category=parent_category)
        subcategory_model_instances.append(subcat_model_inst)

    Subcategory.objects.bulk_create(subcategory_model_instances)


# take base data and extract assessment_type labels from them
def populate_assessment_types(base_data):
    assessment_types = []

    # iterate base_data and keep unique assessment_type entries
    for row in base_data:
        if row['assessment_type'] not in assessment_types:
            assessment_types.append(row['assessment_type'])

    assessment_type_model_instances = []
    for ass_type_name in assessment_types:
        ass_model_inst = AssessmentType(label=ass_type_name)
        assessment_type_model_instances.append(ass_model_inst)

    AssessmentType.objects.bulk_create(assessment_type_model_instances)


# take base data and using already existing models, create tasks
def populate_tasks(base_data):

    task_model_instances = []

    for task_match in base_data:
        # retrieve existing Subcategory object and Assessment_type object to be able to pass it as object instances
        subcategory = Subcategory.objects.get(label=task_match['subcategory'])
        assessment_type = AssessmentType.objects.get(label=task_match['assessment_type'])
        # determine difficulty as one of "+/-/=", if applicable
        if task_match['difficulty'] == 'same':
            difficulty = '='
        elif task_match['difficulty'] == 'harder':
            difficulty = '+'
        elif task_match['difficulty'] == 'easier':
            difficulty = '-'
        else:
            difficulty = None

        # retrieve stuff from csv module's datatypes
        expected_age_from = task_match['age_from'],
        expected_age_to = task_match['age_to'],
        expected_age_from = float(expected_age_from[0] or 0)
        expected_age_to = float(expected_age_to[0] or 8)
        
        # create final Task object instance and add it to a list
        task_model_inst = Task(
            id=task_match['temporary_task_id'],
            task_description=task_match['task_description'],
            codename=task_match['task_code'],
            subcategory=subcategory,
            assessment_type=assessment_type,
            difficulty=difficulty,
            expected_age_from=expected_age_from,
            expected_age_to=expected_age_to,
        )

        task_model_instances.append(task_model_inst)

    Task.objects.bulk_create(task_model_instances)

    # now we update relevant records with their parent_task
    # (have to do this next in sequence, since it's the same class and not all objects are created yet)
    for task_match in base_data:
        if not task_match['parent_temporary_id']:
            continue
        else:
            task_instance = Task.objects.get(id=task_match['temporary_task_id'])
            task_instance.parent_task = Task.objects.get(id=task_match['parent_temporary_id'])
            task_instance.save()


class Command(BaseCommand):
    help = 'Populates database with prepaired data.'

    # TODO maybe add some args w.r.t. automatic data truncation...?
    def handle(self, *args, **options):
        base_data = base_list_sheet1()

        populate_categories(base_data)
        populate_subcategories(base_data)
        populate_assessment_types(base_data)
        populate_tasks(base_data)

        self.stdout.write(self.style.SUCCESS('Successfully populated database tables'))

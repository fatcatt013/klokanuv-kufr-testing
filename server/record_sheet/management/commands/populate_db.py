from django.core.management.base import BaseCommand, CommandError
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


# take base data and using already existing models, create tasks
def populate_tasks(base_data):

    # TODO since we don't have assessment_type data yet, we need to create this dummy to proceed with other code
    dummy_assessment_type = AssessmentType(label="Dummy")
    dummy_assessment_type.save()

    task_model_instances = []

    # separately extract subcat and cat, now parent category at 0th and subcategory at 1st index
    for task_match in base_data:
        # retrieve existing Category object to be able to pass it as parent_category
        subcategory = Subcategory.objects.get(label=task_match['subcategory'])

        # create final Task object instance and add it to a list
        task_model_inst = Task(
            task_text=task_match['task'],
            subcategory=subcategory,
            expected_age_from=9, # TODO adjust once data is complete
            expected_age_to=9, # TODO adjust once data is complete
            assessment_type=dummy_assessment_type, # TODO adjust once data is complete
        )

        task_model_instances.append(task_model_inst)

    Task.objects.bulk_create(task_model_instances)

class Command(BaseCommand):
    help = 'Populates database with prepaired data.'


    # TODO maybe add some args w.r.t. automatic data truncation...?
    def handle(self, *args, **options):
        base_data = base_list_sheet1()

        populate_categories(base_data)
        populate_subcategories(base_data)
        populate_tasks(base_data)

        self.stdout.write(self.style.SUCCESS('Successfully populated database tables'))

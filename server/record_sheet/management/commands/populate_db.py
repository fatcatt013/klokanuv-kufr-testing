from django.core.management.base import BaseCommand
from record_sheet.models import AssessmentTypeOption, Category, School, Subcategory, AssessmentType, Task, Assessment
import os
import csv


# read csv file and put it's contents into list of dictionaries
# serves as a baseline for information extraction
def base_list_sheet1():
    current_filepath = os.path.dirname(os.path.abspath(__file__))

    csv_filepath = "%s/../../../../docs/csv/diagnostika_sheet1.csv" % current_filepath

    with open(csv_filepath, 'r', encoding='utf-8') as file:
        data_reader = list(csv.DictReader(file, delimiter='|'))
        return data_reader


# extract data about Category from base_data, save newly created instances
def populate_categories(base_data):
    cats_already_added = []
    for row in base_data:
        if row['category'] not in cats_already_added and row['category']:
            cats_already_added.append(row['category'])
            Category(label=row['category']).save()


# extract data about Subcategory from base_data, retrieve FK objects, save newly created instances
def populate_subcategories(base_data):
    subcats_already_added = []

    # get all and unique pairs of subcategory + category
    for row in base_data:
        if row['subcategory'] not in subcats_already_added and row['subcategory']:
            parent_category = Category.objects.get(label=row['category'])
            Subcategory(label=row['subcategory'], parent_category=parent_category).save()
            subcats_already_added.append(row['subcategory'])


# extract data about AssessmentType from base_data, save newly created instances
def populate_assessment_types(base_data):
    assessment_types_already_added = []

    for row in base_data:
        # ensure uniqueness
        if row['assessment_type'] not in assessment_types_already_added:
            AssessmentType(label=row['assessment_type']).save()
            assessment_types_already_added.append(row['assessment_type'])


# take existing instances of AssessmentType, extract AssessmentTypeOption labels from them, save new instances
def populate_assessment_type_options():
    for ass_type in AssessmentType.objects.all():
        labels_split = ass_type.label.split(' / ')
        for label in labels_split:
            AssessmentTypeOption(parent_assessment_type=ass_type, label=label).save()


# extract data about Task from base_data, retrieve FK objects, save newly created instances
def populate_tasks(base_data):

    for task_match in base_data:
        # retrieve existing Subcategory object and Assessment_type objects to pass it as object instances
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

        Task(
            id=task_match['temporary_task_id'],
            task_description=task_match['task_description'],
            codename=task_match['task_code'],
            subcategory=subcategory,
            assessment_type=assessment_type,
            difficulty=difficulty,
            expected_age_from=float(task_match['age_from'] or 0),
            expected_age_to=float(task_match['age_to'] or 8),
        ).save()

    # now we update records with their parent_task, if there is one
    # have to do this next in sequence, since it's the same class and not all objects are created yet
    for task_match in base_data:
        if not task_match['parent_temporary_id']:
            continue
        else:
            task_instance = Task.objects.get(id=task_match['temporary_task_id'])
            task_instance.parent_task = Task.objects.get(id=task_match['parent_temporary_id'])
            task_instance.save()


# add base school, mainly for being able to create superuser
# TODO: if I dont need this, delete
def add_base_school():
    School(name='Base School', address='').save()


# truncate everything before we start populating database (only runs if '--truncate' or '-t' is provided)
def truncate_existing_data():
    Assessment.objects.all().delete()
    Task.objects.all().delete()
    Subcategory.objects.all().delete()
    Category.objects.all().delete()
    AssessmentTypeOption.objects.all().delete()
    AssessmentType.objects.all().delete()


class Command(BaseCommand):
    help = 'Populates database with prepaired data. Use "--truncate" or "-t" to first delete all existing records.'

    def add_arguments(self, parser):
        # optional argument
        parser.add_argument(
            "--truncate", "-t",
            action='store_true',
            help='Truncate all records for task, category, subcategory, assessment_type, assessment_type_option',
        )

    def handle(self, **options):
        base_data = base_list_sheet1()
        if options['truncate']:
            truncate_existing_data()
        populate_categories(base_data)
        populate_subcategories(base_data)
        populate_assessment_types(base_data)
        populate_assessment_type_options()
        populate_tasks(base_data)
        add_base_school()

        self.stdout.write(self.style.SUCCESS('Successfully populated database tables'))

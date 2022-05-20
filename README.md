# Klokanuv kufr

## Prototype
1. Install Expo Go: <https://expo.dev/client>
2. Open this link in the app: <https://expo.dev/@luzanky/klokanuv-kufr?serviceType=classic&distribution=expo-go>

## Developing

### Test server
<https://klokan.zarybnicky.com/>

### Running a local server
```
cd server
poetry install
poetry run python manage.py migrate
poetry run python manage.py populate_db
poetry run python manage.py runserver
```

For quick local setup - this also loads the CSV, and creates a superuser with
email and password "superuser".

```
poetry shell
python manage.py migrate
python manage.py create_and_assign_permissions
python manage.py create_test_users
python manage.py populate_db -t
python manage.py runserver
```

### `create_test_users`
Creates 6 teachers, 2 headmasters, 2 schools, 5 classrooms, assigns classrooms
to teachers & headmasters.

- teachers
  - email: `teacherX@mail.com` (X is a number from 1 to 6)
  - password: `password` (constant for all)
- headmasters
  - email: `headmasterX@mail.com` (X is a number 1 or 2)
  - password: `password`
- manager
  - email: `superadmin`
  - password: `superadmin`

### Running the app locally
```
cd app
yarn
yarn start  # `yarn start --web` for local testing
```

## English translations glossary (for uniform code, docs ... )
- Záznamový arch --> Record sheet
- Kategorie/arch --> Category
- Podkategorie --> Subcategory
- Úkol --> Task
  - ID, číslo řádku --> Task ID
  - Očekávaný věk --> Expected age (median age when 50% of children should succeed)
  - Nezvládá --> Incapable
  - Zvládá s dopomocí --> Capable, Assisted
  - Zvládá samostatně --> Capable, Independently
  - způsob splnění úkolu --> Assessment Type
  - vyhodnocení úkolu --> Assessment
  - vyhodnocení stavu třídy --> Class evaluation

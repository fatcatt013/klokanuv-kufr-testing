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

### Running the app locally
```
cd app
yarn
yarn start  # `yarn start --web` for local testing
```

TODO:
- Figma link
- OpenAPI (generated in Django, used in TypeScript in React)
- Tenant system: https://blog.nicolasmesa.co/posts/2018/10/saas-like-isolation-in-django-rest-framework/

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

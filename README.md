# Klokanovy archy

TODO:
- Docker
- EAS
- Figma link
- OpenAPI (generated in Django, used in TypeScript in React)
- OAuth
- Tenant system: https://blog.nicolasmesa.co/posts/2018/10/saas-like-isolation-in-django-rest-framework/

## Server
Django, Poetry

```
cd server
poetry install
poetry run python manage.py migrate
poetry run python manage.py runserver
```

## App
Expo, React Native, Paper

```
cd app
yarn
yarn start   # `yarn start --web` for local testing
```

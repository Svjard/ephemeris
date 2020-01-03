## Ephemeris

Everyday scheduling with the help of AI.

## Features
* [Flask REST API](https://github.com/Nobatek/flask-rest-api)
  * OpenAPI
  * Swagger UI
  * Redoc
* [Pytest using database subtransactions](https://pypi.org/project/pytest-flask-sqlalchemy/) for test isolation
* [Pytest-FactoryBoy](https://pytest-factoryboy.readthedocs.io/en/latest/#model-fixture) for generating sample data for seeding DB and tests.
* Flake8 with [Mypy](http://mypy-lang.org/) for type-checking
* AWS Lambda integration
  * [Serverless AWS](https://serverless.com/framework/docs/providers/aws/)
  * Load Flask config from AWS Secrets Manager
* [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/) for DB migrations with alembic and Flask CLI
* [Pipenv](https://pipenv.readthedocs.io/en/latest/) for dependency management


## Quickstart:

### Prerequisites:
`brew install pipenv`

virtualenv venv
source venv/bin/activate
pipenv install --dev
FLASK_ENV=development flask run --reload

### Create Project:
```
npm -g install serverless
sls install --url https://github.com/jetbridge/sls-flask --name myapp
cd myapp
make init  # install dependencies and initialize project
```

### Python Virtual Environment:
```
pipenv shell  # activate python virtual environment
```

### Do Stuff:
```
flask  # CLI commands
flask run --reload  # run flask dev server
sls wsgi serve  # run flask server under serverless
sls deploy  # deploy serverless app
make deploy-dev  # deploy dev to AWS and reset database
```

### Database:
```
createdb scheduleai
flask init-db  # recreate schema from models
flask seed  # populate with sample data

flask db  # other utilities
```

### API Documentation:
Once your flask dev server is running:
* [OpenAPI JSON](http://localhost:5000/api/openapi.json) (http://localhost:5000/api/openapi.json)
* [Swagger UI](http://localhost:5000/api/swagger) (http://localhost:5000/api/swagger)
* [ReDoc](http://localhost:5000/api/doc) (http://localhost:5000/api/doc)

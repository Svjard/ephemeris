## Ephemeris

Everyday scheduling with the help of AI.

## Development

### Pre-requisites:

You will need to have the following dependencies:
* python 3+
* pip3
* pipenv
  * ```brew install pipenv```
* docker (for running locally)
* docker-compose (for running locally)

### Setting up your environment

To set up a virtual env and install the required dependencies run the following commands:

```
virtualenv venv
source venv/bin/activate
pipenv install --dev
```

### Running the API

```FLASK_ENV=development flask run --reload```

### API Documentation:

Once your flask dev server is running:
* [OpenAPI JSON](http://localhost:5000/api/openapi.json) (http://localhost:5000/api/openapi.json)
* [Swagger UI](http://localhost:5000/api/swagger) (http://localhost:5000/api/swagger)
* [ReDoc](http://localhost:5000/api/doc) (http://localhost:5000/api/doc)

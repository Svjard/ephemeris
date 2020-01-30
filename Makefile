.PHONY: all-tests cfn-lint test run

VENV=pipenv run

run:
	FLASK_ENV=development flask run --reload

dynamodb:
	docker run -d -p 8000:8000 amazon/dynamodb-local 

dynamodb-purge:
	aws dynamodb delete-table --table-name user --endpoint-url http://localhost:8000

test:
	pytest

cfn-lint:
	npm run sls-package
	cfn-lint

all-tests:
	flake8
	pytest

deploy-dev:
	sls deploy -s dev
	sls invoke -f initDb -s dev
	sls invoke -f seed -s dev

deploy-staging:
	sls deploy -s staging
	sls invoke -f initDb -s staging
	sls invoke -f seed -s staging

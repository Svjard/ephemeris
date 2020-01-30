## Ephemeris

Bulk scheduling with variable variation with the help of machine learning.

Coming Soon...

![Coming Soon](https://raw.githubusercontent.com/Svjard/ephemeris/master/.github/screenshot1.png)

## Development

### API
  
  #### Pre-requisites:

  You will need to have the following dependencies:
  * python 3+
  * pip3
  * pipenv
    * ```brew install pipenv```
  * docker (for running locally)
  * docker-compose (for running locally)
  * dynamodb-admin (for running locally)
    * ```sudo npm install dynamodb-admin -g```

  #### Setting up your environment

  To set up a virtual env and install the required dependencies run the following commands:

  ```
  virtualenv venv
  source venv/bin/activate
  pipenv install --dev
  docker run -d -p 8000:8000 amazon/dynamodb-local 
  ```

  ### Running the API

  ```FLASK_ENV=development flask run --reload```

  ### Viewing the local DynamoDB

  Load http://localhost:8001 in the browser window.

  ### API Documentation:

  Once your flask dev server is running:
  * [OpenAPI JSON](http://localhost:5000/api/openapi.json) (http://localhost:5000/api/openapi.json)

### Frontend

  #### Pre-requisites:

  Run the following commands to setup dependencies:

  ```npm install```

  #### Running

  ```npm run start```

  Then open http://localhost:3000/ in the browser.

  #### Testing

  ```npm run test```

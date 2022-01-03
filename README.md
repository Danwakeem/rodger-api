# Rodger API
This is just a graphql test API.

## How to deploy
Feel free to comment out the org/app section in the serverless.yml file they are not important for the demo

- `yarn install`
- `yarn deploy -s STAGE_NAME`

## How to inspect the logs
- Go to the AWS account you deployed to and open the cloudwatch logs for the lambda function.
- Hit the test endpoint in this app.
- Check the logs for the otel output
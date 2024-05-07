# appsync-merged-api-cars

A simple CDK app demonstrating [AppSync Merged APIs](https://docs.aws.amazon.com/appsync/latest/devguide/merged-api.html). Specifically, this shows the resolution of the field of a type in one AppSync API resolving to a type in another AppSync API.  

## Infrastructure

Both AppSync APIs use the `APPSYNC_JS` runtime and `None` data sources, for simplicity.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

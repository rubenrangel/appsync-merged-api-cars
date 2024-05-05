import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { Construct } from 'constructs';

export class AppsyncMergedApiCarsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new appsync.GraphqlApi(this, 'wheely-api', {
      name: 'Wheely API',
      definition: appsync.Definition.fromSourceApis({
        sourceApis: [],
      }),
    });
  }
}

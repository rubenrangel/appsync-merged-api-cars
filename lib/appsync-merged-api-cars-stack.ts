import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { Construct } from 'constructs';

export class AppsyncMergedApiCarsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const carAssemblyApi = new appsync.GraphqlApi(this, 'car-manufacturing-api', {
      name: 'Car Assembly API',
      definition: appsync.Definition.fromFile('car-manufacturing.schema.graphql'),
    });

    const partsManufacturingApi = new appsync.GraphqlApi(this, 'parts-manufacturing-api', {
      name: 'Parts Manufacturing API',
      definition: appsync.Definition.fromFile('parts-assembly.schema.graphql'),
    });

    new appsync.GraphqlApi(this, 'wheely-api', {
      name: 'Wheely API',
      definition: appsync.Definition.fromSourceApis({
        sourceApis: [
          {
            sourceApi: carAssemblyApi,
            mergeType: appsync.MergeType.AUTO_MERGE,
          },
          {
            sourceApi: partsManufacturingApi,
            mergeType: appsync.MergeType.AUTO_MERGE,
          },
        ],
      }),
    });
  }
}
